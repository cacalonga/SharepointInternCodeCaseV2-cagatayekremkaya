var mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/KitaplikDB");

var KitapSchema = mongoose.Schema({
    KitapAdi: {
        type: String,
        trim: true,
        required: true
    },
    Yazar: {
        type: String,
        trim: true,
        required: true
    },
    YayinEvi: {
        type: String,
        trim: true,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

var Kitaplik = module.exports = mongoose.model("Kitaplik", KitapSchema);

Kitaplik.find({}, function (err, kitaplar) {
    if (err) {
        console.log(err);
        throw err;
    } else {
        if (kitaplar.length === 0) {
            console.log("Kitaplık Boş");
            for (let i = 0; i < 25; i++) {
                new Kitaplik({
                    KitapAdi: 'KitapAdi ' + i,
                    Yazar: 'Yazar ' + i,
                    YayinEvi: 'YayinEvi ' + i
                }).save(function (err, result) {
                    if (err) {
                        console.log(err);
                        throw err;
                    } else {
                        console.log(result);
                    }
                });
            }
        }
    }
})