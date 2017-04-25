// ===================== GLOBALS SETUP ===========================

var p = 0.017453292519943295;
var s = Math.sin;
var c = Math.cos;
var l = l;
var deliveryStepSpeed = 1500;
var distanceFromEnd = 0.0015;
var stepsMult = 2.5;
var incrementMult = 790;
var zips = require('./public/zips.json');

// ======================= APP SETUP =============================

var express = require('express');
var admin = require("firebase-admin");
var cors = require('cors');
var app = express();

app.use(cors());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.listen(app.get('port'), function () {
    l('Node app is running on port', app.get('port'));
});

app.get('/', function (req, res) {
    res.render('pages/index');
});

// ===================== FIREBASE SETUP ==========================

admin.initializeApp({
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

// ===================== ROUTING SETUP ===========================

app.get('/api', function (req, res) {
    getLastAPICall(res);
});

app.get('/api/:newVal', function (req, res) {
    setLastAPICall(req.params.newVal, function () { getLastAPICall(res); });
});

app.get('/api/zipToCords/:zipcode', function (req, res) {
    setLastAPICall("zipToCords - " + req.params.zipcode);
    if (zips[req.params.zipcode])
        res.send({ "lat": getZipLat(req.params.zipcode), "lng": getZipLong(req.params.zipcode) });
    else
        res.send({ "data": null });
});

app.get('/api/userExists/:useruid', function (req, res) {
    setLastAPICall("userExists - " + req.params.useruid);
    checkUserExists(res, req.params.useruid);
});

app.get('/api/closestStore/:zipcode', function (req, res) {
    setLastAPICall("closestStore - " + req.params.zipcode);
    closestStore(res, req.params.zipcode);
});

app.get('/api/checkout/:useruid', function (req, res) {
    setLastAPICall("checkout - " + req.params.useruid);
    checkout(res, req.params.useruid);
});

// ========================== CALL FUNCTIONS ==========================

function setLastAPICall(call, cb) {
    l("Last API Call: " + call);
    db.ref("data").set(call, cb);
}

function getLastAPICall(res) {
    db.ref("data").once("value", function (snapshot) { res.send({"Last API Call": snapshot.val()}); });
}

function checkUserExists(res, id) {
    db.ref("users").child(id).once('value', function (snapshot) { res.send({ "exists": snapshot.val() !== null }); });
}

function closestStore(res, zipcode) {
    db.ref("stores").once('value', function (snapshot) {
        var storeZips = Object.keys(snapshot.val());
        var storeDistances = storeZips.slice();
        for (zip in storeDistances) storeDistances[zip] = getDistanceFromLatLonInKm(getZipLat(zipcode), getZipLong(zipcode), getZipLat(storeDistances[zip]), getZipLong(storeDistances[zip]));
        res.send({ "storeId": storeZips[storeDistances.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0)] });
    });
}

function checkout(res, userId) {
    writeOrderID(userId, function (orderId) { clearCartFinalizeOrder(userId, orderId, function (rtnOrderId) {
        if (!rtnOrderId)
            res.send({ "trackingOrder": null });
        else
            db.ref("orders").child(rtnOrderId.toString()).set(userId).then(function () {
                doDelivery(userId, rtnOrderId);
                res.send({ "trackingOrder": rtnOrderId });
            });
    }); });
}

// =============== PASSIVE STOCK MANIPULATION FUNCTIONS ===============

function setUpRefresh(defaultVal) {
    db.ref("stores").once("value", function (snapshot) {
        for (var store in snapshot.val())
            for (var food in snapshot.val()[store].stock)
                refreshStock(("stores/" + store + "/stock/" + food), defaultVal);
    });
}

function refreshStock(path, defaultVal) {
    db.ref(path + "/quantity").on("value", function (snapshot) { if (snapshot.val() < 1) updateStock(path, -defaultVal); });
}

function updateStock(path, deduction) {
    db.ref(path + "/quantity").transaction(function (quanta) { return quanta - deduction; });
}

setUpRefresh(50);

// ============= PASSIVE LOCATION MANIPULATION FUNCTIONS ==============

function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
};

function getZipLat(zip) {
    if(zips[zip]) return zips[zip].LAT;
    return null;
}

function getZipLong(zip) {
    if(zips[zip]) return zips[zip].LNG;
    return null;
}

function getUserLat(udata) {
    return udata.addrlat ? udata.addrlat : udata.ziplat ? udata.ziplat : zips[udata.zipcode].LAT;
}

function getUserLong(udata) {
    return udata.addrlng ? udata.addrlng : udata.ziplng ? udata.ziplng : zips[udata.zipcode].LNG;
}

function getLatIncrement(lat1, lon1, lat2, lon2) {
    return incrementMult*4.5000045000045e-6*Math.cos(getAngleFromLatLon(lat1, lat2, lon1, lon2));
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    return 12742 * Math.asin(Math.sqrt(0.5 - c((lat2 - lat1) * p) / 2 + c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p)) / 2));
}

function getAngleFromLatLon(lat1, lat2, lng1, lng2) {
    return Math.atan2((s((lng2 - lng1) * p) * c(lat2 * p)), (c(lat1 * p) * s(lat2 * p) - s(lat1 * p) * c(lat2 * p) * c((lng2 - lng1) * p)));
}

function getLongIncrement(lat1, lon1, lat2, lon2) {
    return incrementMult*4.5000045000045e-6*Math.sin(getAngleFromLatLon(lat1, lat2, lon1, lon2));
}

function writeOrderID(userId, cb) {
    db.ref("orders").once("value", function (snapshot) {
        var orders = snapshot.val();
        do {
            var orderId = "";
            for (i = 0; i < 21; i++) orderId = orderId + (Math.floor((Math.random() * 9) + 1));
            if (!orders[orderId.toString()]) cb(orderId);
        } while (!!orders[orderId.toString()]);
    });
}

function clearCartFinalizeOrder(userId, orderId, cb) {
    db.ref("users/" + userId).once("value", function (snapshot) {
        var userData = snapshot.val();
        var firstOrder = false;
        if (!userData.orders) {
            userData.orders = {};
            firstOrder = true;
        }
        userData.orders[orderId] = {
            "orderId": orderId,
            "storeId": userData.storeId,
            "userId": userId,
            "paymentId": userData.paymentId,
            "timestamp": Date.now(),
            "cart": {},
            "delivery": {
                "status": "Processing",
                "startLat": getZipLat(userData.storeId),
                "startLong": getZipLong(userData.storeId),
                "currentLat": getZipLat(userData.storeId),
                "currentLong": getZipLong(userData.storeId),
                "endLat": getUserLat(userData),
                "endLong": getUserLong(userData),
                "steps": getDistanceFromLatLonInKm(getZipLat(userData.storeId), getZipLong(userData.storeId), getUserLat(userData), getUserLong(userData)) * stepsMult
            }
        };
        userData.orders[orderId].cart[userData.storeId] = {};
        for (var food in userData.cart[userData.storeId])
            if (userData.cart[userData.storeId][food] > 0) {
                userData.orders[orderId].cart[userData.storeId][food] = userData.cart[userData.storeId][food];
                updateStock("stores/" + userData.storeId + "/stock/" + food, userData.cart[userData.storeId][food]);
                userData.cart[userData.storeId][food] = "0";
            }
        if (Object.keys(userData.orders[orderId].cart[userData.storeId]).length === 0 && userData.orders[orderId].cart[userData.storeId].constructor === Object) cb(null);
        else {
            if (firstOrder) userData.orderId = orderId;
            db.ref("users/" + userId).update(userData).then(function () { cb(orderId); });
        }
    });
}

function doDelivery(userId, orderId) {
    db.ref("users/" + userId + "/orders/" + orderId + "/delivery").once("value", function (snapshot) {
        var deliveryData = snapshot.val();
        deliveryData.status = "Shipping";
        deliveryData.currentLat = deliveryData.currentLat + getLatIncrement(deliveryData.currentLat, deliveryData.currentLong, deliveryData.endLat, deliveryData.endLong);
        deliveryData.currentLong = deliveryData.currentLong + getLongIncrement(deliveryData.currentLat, deliveryData.currentLong, deliveryData.endLat, deliveryData.endLong);
        deliveryData.steps -= 1;
        if (deliveryData.steps < 1) {
            deliveryData.currentLat = deliveryData.endLat + generateRandomNumber(-distanceFromEnd, distanceFromEnd);
            deliveryData.currentLong = deliveryData.endLong + generateRandomNumber(-distanceFromEnd, distanceFromEnd);
            deliveryData.status = "Delivered";
        }
        db.ref("users/" + userId + "/orders/" + orderId + "/delivery").update(deliveryData).then(setTimeout(function () { if (deliveryData.status != "Delivered") doDelivery(userId, orderId); }, deliveryStepSpeed));
    });
}