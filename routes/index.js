var mongojs = require('mongojs');

var uuid = require('node-uuid');
var moment = require('moment');

var myConfig = require('../myConfig.js');

// Conection String
var url = myConfig.mongo_url;
// Array de colecciones
var collections = ['payments', 'users'];
// Conexión a mongodb
var db = mongojs(url, collections);


// envio de emails a través de mandrill
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var transport = nodemailer.createTransport(mandrillTransport({
  auth: {
    apiKey: 'kqeKG7_qBDTZcGlrPGLAqA'
  }
}));


function ensureAuthorized(req, res, next) {
    var header = req.headers["authorization"];
    if (typeof header !== 'undefined') {
        var temp = header.split(" ");
        var token = temp[1];
        
        db.users.findOne({token: token}, function(err, doc) {
            if(err) return err;
            
            if(doc != null) {
                next();
                return;
            }
            
            res.send(403);
        })
        
        
    } else {
        res.send(403);
    }
}


module.exports = function (app) {
    
    app.get('/', function (req, res, next) {
        res.render('login');
    });
    
    app.get('/login', function (req, res, next) {
        res.render('login');
    });
    
    app.post('/login', function(req, res, next) {
        var data = req.body;
        
        db.users.findOne({
            user: data.user,
            password: data.password
        }, function(err, doc) {
            
            if(err) return err;
            
            if(!doc) {
                res.json({status: 0});
                return;
            }
            
            res.send({
                status: 1,
                data: doc
            });
            
        });
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
    
    app.get('/paymentsList', ensureAuthorized, function(req, res, next) {
        
        // cogemos los pagos
        db.payments.find(function(err, docs) {
            res.json(docs);
        });
        
    });
    
    app.get('/gotopayment/:uid', function(req, res, next) {
        
        db.payments.findOne({
           uid: req.params.uid 
        }, function(err, doc) {
            if(err) return err;
            
            if(!doc) {
                res.send("ERROR");
                return;
            }
            
            if(doc.pagado == 1) {
                res.send("PAGO YA REALIZADO");
                return;
            }
            
            var data = doc;
            
            data.paypal_email = myConfig.paypal_email;
            data.paypal_url = myConfig.paypal_url;
            data.paypal_notify = myConfig.paypal_notify;
            data.paypal_ok = myConfig.paypal_ok;
            data.paypal_ko = myConfig.paypal_ko;
            
            res.render('gotopayment', data);    
        });
    });
    
    
    app.post('/paypalnotify', function(req, res, next) {
        var data = req.body;
        
        db.payments.findOne({
            _id: mongojs.ObjectId(data.custom)
        }, function(err, doc) {
            if (err) return err;
            
            if(!doc) {
                res.send("ERROR");
                return;
            }
            
            db.payments.findAndModify({
                query: {_id: mongojs.ObjectId(data.custom)},
                update: {
                    $set: {
                        pagado: 1,
                        fechapago: moment().format()
                    }
                }
                
            }, function(err, saved) {
                if (err) return err;
                
                
                
                transport.sendMail({
                    from: 'soporte@piensaenweb.com',
                    to: 'soporte@piensaenweb.com',
                    subject: 'Paypal notification',
                    html: JSON.stringify(data)
                }, function(err, info) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log(info);
                    }
                });
                
                res.send("ok");
                
            });
            
            
        });
        
    });
    
    
    app.post('/paypalok', function(req, res, next) {
        res.render('paypalok');
    });
    
    
    app.post('/paypalko', function(req, res, next) {
        res.render('paypalko');
    });
    
    
};
