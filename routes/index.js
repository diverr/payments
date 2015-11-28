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
    
    app.get('/payment/:id', function(req, res, next) {
        id = req.params.id;
        db.payments.findOne({
            _id: mongojs.ObjectId(id)
        }, function(err, doc) {
            res.send(doc);
        });
    });
    
    app.post('/payment', function(req, res, next) {
        
        var data = req.body;
        data.uid = uuid.v1();
        data.fecha = moment().format();
        data.pagado = 0;
        
        console.log(data);
        
        db.payments.save(data, function(err, saved) {
            res.send(data.uid);
        });
    });
    
    app.put('/payment', function(req, res, next) {
        
        var data = req.body;
        
        db.payments.findAndModify({
            query: {_id: mongojs.ObjectId(data._id)},
            update: {
                $set: {
                    nombre: data.nombre,
                    cliente: data.cliente,
                    descripcion: data.descripcion,
                    importe: data.importe
                }
            }
            
        }, function(err, saved) {
            res.send(saved);
        });
    });
    
    app.delete('/payment/:id', function(req, res, next) {
        
        var id = req.params.id;
        
        
        db.payments.remove({
            
            _id: mongojs.ObjectId(id)
        
        }, function(err, docs) {  
            
            if (err) return err;
            
            console.log(docs);
            res.send(docs);
        });
    });
    
    app.get('/paymentsList', function(req, res, next) {
        
        // cogemos los pagos
        db.payments.find(function(err, docs) {
            res.json(docs);
        });
        
    });
};
