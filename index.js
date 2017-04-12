// ======================= APP SETUP =============================
var express = require('express');
var admin = require("firebase-admin");
var app = express();
var cors = require('cors');
var zips = require('./public/zips.json');

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

// ===================== FIREBASE SETUP ==========================

//var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
    //credential: admin.credential.cert(serviceAccount),
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "organic-food-store",
        "private_key_id": "2268d5554ea9388635039d672b8a213a939e8580",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDNIpcoTLW84evZ\nUK4WE6+FnRBMdnEWQvzZ4w2ubdxOE9IcZ+j/fI2bRCNdcVgGgfCYoonyzX9RZqpY\n+s2YaL/Aib6AArc9NhmtyepZfFAs0d8wHiGRXVI+tjrU/X/ts6TYq5hPMexqnGnj\nmv3TZTAOjIY8+za0DDhasrGLCDqss2fc9FxBsM3pjr19zjd87+BUzCcaBh7074Cm\nkaeHPZM1sv8iFjC97dhE5iKNfKsKqhiDUhFAwqVZD76s9s4+2DlZKOEChu8ZMPz1\nmDTsBmLmib3vFqL9qYbPcBpFkJwKNUF2pOeF1wEy1fMZdEjafOdnLD7qTjy/bm0U\nbh+GDgfPAgMBAAECggEAExGAE5Lt4dzuW4kQZaT2z+jFtxXbdUJM1sQwZWJ49BkL\nkvBlzDn7v88Zqnn6wMAbaVTSletcRmjQtOy7Z8t056TmPGgEOIBq6qi2TBMuMLxh\njst+O1D9cC7oURwvZB0q2ak5w0LUwyQ/A5VIuvnQ+ck+QTTo5Nut8WBi+JWPPrZT\n+cwWRAe+bWROJacyQueOZIS47SueidyOSnhvgpzC/BKbfD7iKN6RYQqjCN1rIZjp\ni6VHmITGOHoN/GuRgxFVlBlh8MjHMbe+Ad9iz5J6T7rrdq0/k7pZgrnUYN05lXr6\nW2VUwf7t8yEaqjWllG21L8PKug9v0uZP/zcgxfs7YQKBgQDoFoyv/WcLPsKAb1Xd\n0xSiyPGB3GtOqR/Jh+pcwI7m1BLDgrFrB2wrHL+hmCv+MHw/xOh2czEMmIYFc2S3\n8Du2AZrXxvwD/5HAmZN8pfPnrfE5NDfMenBwF+Xm1H9HcEwiQ0LIvdyDan3nNWVO\n8b4fH77PAZFQSodXBU/l6VTMJQKBgQDiRSRENuy0Ke00EMRUiFSL326A2pPEIai2\nUflnjzOQnI7wMuBijPU6Mz5ehVk/d61LW3URD/LOJuSObRvW055VusVreUkHO/T5\nDk15SLUc1IfpWS4/3RHfM8kano1yEj0sYUjmf+GdzRcWrWqX/nVtcuvnV8EL9ZG+\nQJK2HqgH4wKBgBpVVKkzS1nPSSphd5Cvvoup2R0u8U3/iofHUCQuBQjTzz03uwG1\n2eQaYvPm3Db/MVna8bVe5JXVSH+d1DO6okvIatVI0pdxjAwaYM2n1sDWz6P59MrS\nqadOTtueCMMGTt0kXJOCV17h2l89g70tWLEXXQMH3oEJs8l/5MzlaKWxAoGAX8ml\ncLtPuXWGVWRDuQV9xTjxLttZcs5M/eH2E0EsMywT1tuy4gWKSvkmjh0lixi+5Afz\npyV5RIxydVj7UBaGEQTgTn8py0Y2jrjfU1jUU0AlyUNXsPGFf1gM6pf0iTXvb7o/\nglTgzkzkWVVQqseuLodYFrevocBz0nbDpRWVTMECgYAxT/tGtHffHePq5DR5Q7Tl\nUAcUmB5jY93T5jG9xH6mdSwWfsIFh7Yb0N1ocgUSXQbdq+ddWxO+abvqswxNFC53\nfjcLPmVrdM3Nped1DIsWyZZTds28SqyOND7eAMZe1dw32y+cMmx4I87axodOKQwM\nZD2WJzkUi9nnE3eSZcSoPg==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-59nvr@organic-food-store.iam.gserviceaccount.com",
        "client_id": "115565207401489124777",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-59nvr%40organic-food-store.iam.gserviceaccount.com"
    }),
    databaseURL: "https://organic-food-store.firebaseio.com"
});

var db = admin.database();
var ref = db.ref("data");

ref.once("value", function (snapshot) {
    console.log(snapshot.val());
});

// ===================== ROUTING SETUP ===========================

app.get('/api', function (req, res) {
    ref.once("value", function (snapshot) {
        res.send({
            "data is beatiful": snapshot.val()
        });
    });
});

app.get('/api/:newVal', function (req, res) {
    console.log(req.params.newVal);
    ref.set(req.params.newVal);
    //ref.update({"data": req.params.newVal});
    ref.once("value", function (snapshot) {
        res.send({
            "data": snapshot.val()
        });
    });
});

/* Peusdcode
??Create Product Object????

function setupRefresh(){
}

var stores = ["San Jose", "Daly City"];
var catagories = ["dairy", "fruit", "vegatables", "meat", " "]
var products = []

function makeProductArray(){
}
*/

// function to update the stock for product
function updateStock(path, deduction) {
    var ref = db.ref(path + "/quantity");
    var orignal = 0;
    ref.once("value", function (snapshot) {
        orignal = snapshot.val();
        var newAm = parseInt(orignal) - parseInt(deduction);
        db.ref(path).update({
            quantity: newAm
        });
    }, function (errorObject) {
        console.log("Failed to withdraw: " + errorObject.code);
    });

}

function refreshStock(path, defaultVal) {
    var ref = db.ref(path + "/quantity");
    ref.on("value", function (snapshot) {
        if (snapshot.val() == 0) {
            db.ref(path).update({
                quantity: defaultVal
            });
        }
    }, function (errorObject) {
        console.log("Failed to withdraw: " + errorObject.code);
    });
    db.ref(path).update({
        quantity: defaultVal
    });
}

var stores = ["storeId", "storeId2"];
var catagories = ["dairy", "fruit", "vegatables", "meat", " "];
var products = [];

function setupRefresh() {
    var ref = db.ref("stores");
    for (var catagories in stock)
        ref.orderByChild().once("child_added", function (snapshot) {
            console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
        });
}

var path = "stores/storeId/stock/dairy/butter";

//updateStock(path, 10);
//refreshStock(path, 100);
//setInterval(function(){updateStock(path, 10);}, 1000);

function zipToCords(code) {
    return {
        "lat": zips[code].LAT,
        "lng": zips[code].LNG
    };
}

//zipToCords("00601")

function Deg2Rad(deg) {
  return deg * Math.PI / 180;
}

function distance(lat1, lon1, lat2, lon2){
    lat1 = Deg2Rad(lat1);
    lat2 = Deg2Rad(lat2);
    lon1 = Deg2Rad(lon1);
    lon2 = Deg2Rad(lon2);
    var R = 6371; // km
    var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
    var y = (lat2 - lat1);
    var d = Math.sqrt(x * x + y * y) * R;
    return d;
}

function closestStore(zip){
    var ref = db.ref("stores");
    distances = [];
    var count = 0;
    for(var x in ref){

    }

}

app.get('/api/zipToCords/:zipcode', function (req, res) {
    console.log(req.params.zipcode);
    res.send(zipToCords(req.params.zipcode));
});

app.get('/api/userExists/:useruid', function (req, res) {
    console.log(req.params.useruid);
    var usersRef = db.ref("users");
    usersRef.child(req.params.useruid).once('value', function(snapshot) {
        res.send({"exists": (snapshot.val() !== null)});
    });
});

app.get('/api/closestStore/:zipcode', function (req, res) {
    res.send({"storeId": 95125});
});