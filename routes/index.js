var express = require('express');
var router = express.Router();
var Kitaplik = require("./../models/KitapDB");

function KitaplikListesi(cbKitaplar) {
  Kitaplik.find({
    deleted: false
  }, function (err, kitaplar) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      cbKitaplar(kitaplar);
    }
  })
}

/* GET home page. */
router.get('/', function (req, res, next) {
  KitaplikListesi(function (kitaplar) {
    res.render('index', {
      Condition: false,
      kitaplistesi: kitaplar
    })
  });

});

router.get("/detail/:id", function (req, res, next) {
  Kitaplik.findById(req.params.id, function (err, kitap) {
    if (err) {
      console.log(err)
    } else {
      KitaplikListesi(function (kitaplar) {
        res.render('index', {
          Condition: true,
          kitaplistesi: kitaplar,
          kitapDetay: kitap
        })
      })
    }
  })
});

router.get("/create", function (req, res, next) {
  res.render('create', {
    title: 'Yeni Kitap Ekleme'
  });
});

router.post('/create', function (req, res, next) {
  var yeniKitap = {
    KitapAdi: req.body.KitapAdi,
    Yazar: req.body.Yazar,
    YayinEvi: req.body.YayinEvi
  };
  new Kitaplik(yeniKitap).save(function (err, result) {
    if (err) {
      console.log(err);
      throw err;
    } else {
      res.redirect('/');
    }
  })
})

module.exports = router;