var mongojs = require('mongojs');

var uuid = require('node-uuid');
var moment = require('moment');

// Conection String
var url = 'mongodb://localhost:27017/payments';

// Array de colecciones
var collections = ['payments'];

// Conexión a mongodb
var db = mongojs(url, collections);

module.exports = function (app) {
    app.get('/', function (req, res, next) {
        res.render('index');
    });
    
    app.post('/new', function(req, res, next) {
        
        var data = req.body;
        data.uid = uuid.v1();
        data.fecha = moment().format();
        
        console.log(data);
        
        db.payments.save(data, function(err, saved) {
            res.send(data.uid);
        });
    });
    
    app.get('/paymentsList', function(req, res, next) {
        
        // cogemos los pagos
        db.payments.find(function(err, docs) {
            res.json(docs);
        });
        
    });
};
