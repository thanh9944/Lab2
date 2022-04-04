var express = require('express');
const {response, json} = require("express");
var router = express.Router();
const multer = require('multer')
// const upload = multer({dest: 'uploads/'})
var fs = require('fs');
var db = 'mongodb+srv://nhatthanh:tH1Q6cm2DALowCiK@cluster0.bjchc.mongodb.net/cars?retryWrites=true&w=majority';

const mongoose = require('mongoose')
mongoose.connect(db).catch(error => {
    console.log("co loi say ra" + error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/hot-view', function (req, res, next) {
    res.render('hotview', {title: 'Hot'});
});
router.get('/buoi4', function (req, res, next) {
    var name = 'Nhat Thanh';
    var array = [1, 2, 3, 6, 9];
    var sinhvien = {name: 'sv1', msv: 'ph123'};
    var danhsach = [{name: 'sv2', msv: 'ph123'}, {name: 'sv3', msv: 'ph123'}, {name: 'sv4', msv: 'ph123'}];
    var thongTin = {
        name: "thanh", sdt: "123",
        danhsach: [
            {name: 'sv2', msv: 'ph123'}, {name: 'sv3', msv: 'ph123'}, {name: 'sv4', msv: 'ph123'}
        ]
    }

    res.render('buoi4', {
        title: 'Buoi4',
        name: name,
        array: array,
        sinhvien: sinhvien,
        danhsach: danhsach,
        thongTin: thongTin
    });

});

router.get('/lab4', function (req, res, next) {

    fs.readFile('files/data.txt', (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        res.render('lab4', {title: 'Lab4', data: data});
    })
});

router.get('/add', function (req, res, next) {
    res.render('add', {title: 'Add'});
});
router.get('/update', function (req, res, next) {

    res.render('update', {title: 'Update', namecar: "", content: "", linkPhoto: "", id: ""});
});
router.get('/show', function (req, res, next) {
    CarLab5.find({}, function (err, data) {
        res.render('show', {title: 'Show', dataLab5: data});
    })

});


var carSchemaLab5 = new mongoose.Schema({
    name: 'string',
    content: 'string',
    linkPhoto: 'string'
})

var CarLab5 = mongoose.model('car', carSchemaLab5)

router.post('/lab5-them', function (req, res, next) {

    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto

    const car = new CarLab5({
        name: name,
        content: content,
        linkPhoto: linkPhoto
    })

    car.save(function (error) {
        var message;
        if (error == null) {
            message = 'successfully'
        } else {
            message = error
        }

        res.render('add');
    })

});

router.post('/lab5-sua', function (req, res, next) {
    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto
    var id = req.body.idCar
    CarLab5.updateOne({_id: id}, {name: name, content: content, linkPhoto: linkPhoto}, function (error) {
        res.render('update', {title: 'Update', namecar: "", content: "", linkPhoto: "", id: ""});
    })
});


router.post('/delete', function (req, res, next) {
    var id = req.body.idCar;
    console.log(id)
    CarLab5.deleteOne({_id: id}, function (err) {
    })
});

router.post('/update-car', function (req, res, next) {
    var name = req.body.name
    var content = req.body.content
    var linkPhoto = req.body.linkPhoto
    var id = req.body.idCar

    res.render('update', {title: 'Update', namecar: name, content: content, linkPhoto: linkPhoto, id: id});
});


router.get('/slide7', function (req, res, next) {
    // Car.find({}, function (err, data) {
    //     var dl=data
    //
    // })
    res.render('slide7', {title: 'slide7'});
});


router.post('/addCar', function (req, res, next) {

    // var ma = req.body.maXe;
    // var gia = req.body.giaXe;
    //
    // const car = new Car({
    //     maXe: ma,
    //     giaXe: gia
    // })
    //
    // car.save(function (error) {
    //     var message;
    //     if (error == null) {
    //         message = 'successfully'
    //     } else {
    //         message = error
    //     }
    //     console.log(ma + gia)
    //     res.render('slide7');
    // })
    //
    // Car.deleteOne({_id: '623f1e81d785512cf74a9a6e'}, function (err) {
    //
    // })
    //
    // Car.updateOne({_id: '623f1e81d785512cf74a9a6e'}, {maXe: '99', giaXe: 'thanh'}, function (error) {
    //
    // })

});

router.get('/asia', function (req, res, next) {
    res.render('asia', {title: 'Asia'});
});

router.get('/euro', function (req, res, next) {
    res.render('euro', {title: 'Euro'});
});
router.get('/american', function (req, res, next) {
    res.render('american', {title: 'American'});
});
router.get('/about', function (req, res, next) {
    res.render('about', {title: 'About', message: ''});
});

router.post('/hotro', function (request, response) {
    var email = request.body.email
    var noidung = request.body.noidung
    var sdt = request.body.sdt

    fs.appendFile('files/' + email + '.txt', "Email:" + email + "\nSDT:" + sdt + "\nNoi dung:" + noidung, function (error) {
        var message = ''
        if (error) {
            message = error
        } else {
            message = "OK, chung toi da nhan phan hoi"
        }
        response.render('about', {title: 'OK', message: message})
    })


});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '-' + file.fieldname)
    }
})

var upload = multer({
    storage: storage,
    limits: {fileSize: 10 * 1024}
}).single('avatar')

router.get('/multer', function (req, res, next) {

    res.render('multer', {title: 'Multer', message: ''});
});

router.post('/upload' ,function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            res.render('multer', {message: err.message})
        } else {
            res.render('multer', {message: 'Tải file thành công!!!'})
        }
    })
})

module.exports = router;
