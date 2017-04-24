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

// ===================== ROUTING SETUP ===========================

app.get('/api', function (req, res) {
    getLastAPICall(res);
});

app.get('/api/:newVal', function (req, res) {
    setLastAPICall(req.params.newVal, function () {
        getLastAPICall(res)
    });
});

app.get('/api/zipToCords/:zipcode', function (req, res) {
    setLastAPICall("zipToCords - " + req.params.zipcode);
    res.send({
        "lat": getZipLat(req.params.zipcode),
        "lng": getZipLong(req.params.zipcode)
    });
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
    console.log("Last API Call: " + call);
    db.ref("data").set(call, cb);
}

function getLastAPICall(res) {
    db.ref("data").once("value", function (snapshot) {
        res.send({
            "Last API Call": snapshot.val()
        });
    });
}

function checkUserExists(res, id) {
    db.ref("users").child(id).once('value', function (snapshot) {
        res.send({
            "exists": snapshot.val() !== null
        });
    });
}

function closestStore(res, zipcode) {
    db.ref("stores").once('value', function (snapshot) {
        var storeZips = Object.keys(snapshot.val());
        var storeDistances = storeZips.slice();
        for (zip in storeDistances)
            storeDistances[zip] = getDistanceFromLatLonInKm(getZipLat(zipcode), getZipLong(zipcode), getZipLat(storeDistances[zip]), getZipLong(storeDistances[zip]));
        res.send({
            "storeId": storeZips[storeDistances.reduce((iMin, x, i, arr) => x < arr[iMin] ? i : iMin, 0)]
        });
    });
}

function checkout(res, userId) {
    writeOrderID(userId, function (orderId) {
        clearCartFinalizeOrder(userId, orderId, function (rtnOrderId) {
            if (!rtnOrderId)
                res.send({
                    "trackingOrder": null
                });
            else
                db.ref("orders").child(rtnOrderId.toString()).set(userId).then(function () {
                    doDelivery(userId, rtnOrderId);
                    res.send({
                        "trackingOrder": rtnOrderId
                    });
                });
        });
    });
}

// ======================== PASSIVE FUNCTIONS =========================

setUpRefresh(50);

function setUpRefresh(defaultVal) {
    db.ref("stores").once("value", function (snapshot) {
        for (var store in snapshot.val())
            for (var food in snapshot.val()[store].stock)
                refreshStock(("stores/" + store + "/stock/" + food), defaultVal);
    });
}

function refreshStock(path, defaultVal) {
    db.ref(path + "/quantity").on("value", function (snapshot) {
        if (snapshot.val() < 1) updateStock(path, -defaultVal);
    });
}

function updateStock(path, deduction) { // function to update the stock for product
    db.ref(path + "/quantity").transaction(function (quanta) {
        return quanta - deduction;
    });
}

function getZipLat(zip) {
    if(zips[zip])
        return zips[zip].LAT;
    return null;
}

function getZipLong(zip) {
    if(zips[zip])
        return zips[zip].LNG;
    return null;
}

function getUserLat(udata) {
    return udata.addrlat ? udata.addrlat : udata.ziplat ? udata.ziplat : zips[udata.zipcode].LAT;
}

function getUserLong(udata) {
    return udata.addrlng ? udata.addrlng : udata.ziplng ? udata.ziplng : zips[udata.zipcode].LNG;
}

function getLatIncrement(lat1, lon1, lat2, lon2) {
    var incre = 4.5000045000045e-6;
    var angle = getAngleFromLatLon(lat1, lat2, lon1, lon2);
    var xdistance = incre*Math.cos(angle);
    return xdistance;
}

function getLongIncrement(lat1, lon1, lat2, lon2) {
    var incre = 4.5000045000045e-6;
    var angle = getAngleFromLatLon(lat1, lat2, lon1, lon2);
    var ydistance = incre*Math.sin(angle);
    return ydistance;
    //return 0.001;
}

function getNextLat(latStart, latEnd) {
    return latStart + latEnd;
}

function getNextLong(longStart, longEnd) {
    return longStart + longEnd;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var p = 0.017453292519943295; // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p) / 2 +
        c(lat1 * p) * c(lat2 * p) *
        (1 - c((lon2 - lon1) * p)) / 2;
    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function rad2deg(rad) {
    return (rad / Math.PI) * 180;
}

function getAngleFromLatLon(lat1, lat2, lng1, lng2) {
//

    var phi1 = deg2rad(lat1);
    var phi2 =  deg2rad(lat2)
    var deltaphi =  deg2rad(lat2-lat1);
    var deltalambda = deg2rad(lng2-lng1);
    


    var a = Math.sin(deltaphi/2) * Math.sin(deltaphi/2) + Math.cos(phi1) * Math.cos(phi2) *Math.sin(deltalambda/2) * Math.sin(deltalambda/2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return c;
    /*
    var dLon = lng2 - lng1;
    var y = Math.sin(dLon) * Math.cos(lat2);
    var x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    return Math.atan2(y, x);
//    return 360 - ((rad2deg(Math.atan2(y, x)) + 360) % 360);
*/
}

/*
console.log(rad2deg(getAngleFromLatLon(0, 0, 0, 90)));
console.log(rad2deg(getAngleFromLatLon(34, 45, -127, -125)));
console.log(getAngleFromLatLon(0, 90, 0, 0));
console.log(rad2deg(getAngleFromLatLon(getZipLat(95125), getZipLat(95111), getZipLong(95125), getZipLong(95111))));
console.log(rad2deg(getAngleFromLatLon(getZipLat(95111), getZipLat(95125), getZipLong(95111), getZipLong(95125))));
*/

function writeOrderID(userId, cb) {
    db.ref("orders").once("value", function (snapshot) {
        // var orderArray = Object.keys(snapshot.val());
        var orders = snapshot.val();
        do {
            var orderId = "";
            for (i = 0; i < 21; i++)
                orderId = orderId + (Math.floor((Math.random() * 9) + 1)); //generates ID out of numbers 1-9, 10 digits
            if (!orders[orderId.toString()]) //checks if ID is not taken
                cb(orderId);
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
                "latIncrement": getLatIncrement(getZipLat(userData.storeId), getZipLong(userData.storeId), getUserLat(userData), getUserLong(userData)),
                "longIncrement": getLongIncrement(getZipLat(userData.storeId), getZipLong(userData.storeId), getUserLat(userData), getUserLong(userData)),
                "steps": getDistanceFromLatLonInKm(getZipLat(userData.storeId), getZipLong(userData.storeId), getUserLat(userData), getUserLong(userData)) * 2
            }
        };
        userData.orders[orderId].cart[userData.storeId] = {};
        for (var food in userData.cart[userData.storeId])
            if (userData.cart[userData.storeId][food] > 0) {
                userData.orders[orderId].cart[userData.storeId][food] = userData.cart[userData.storeId][food];
                updateStock("stores/" + userData.storeId + "/stock/" + food, userData.cart[userData.storeId][food]);
                userData.cart[userData.storeId][food] = "0";
            }
        if (Object.keys(userData.orders[orderId].cart[userData.storeId]).length === 0 && userData.orders[orderId].cart[userData.storeId].constructor === Object)
            cb(null);
        else {
            if (firstOrder)
                userData.orderId = orderId;
            db.ref("users/" + userId).update(userData).then(function () {
                cb(orderId);
            });
        }
    });
}

function doDelivery(userId, orderId) {
    db.ref("users/" + userId + "/orders/" + orderId + "/delivery").once("value", function (snapshot) {
        var deliveryData = snapshot.val();
        deliveryData.status = "Shipping";
        deliveryData.currentLat = getNextLat(deliveryData.currentLat, deliveryData.latIncrement);
        deliveryData.currentLong = getNextLong(deliveryData.currentLong, deliveryData.longIncrement);
        deliveryData.steps -= 1;
        if (deliveryData.steps < 1) {
            deliveryData.currentLat = deliveryData.endLat + 0.0015;
            deliveryData.currentLong = deliveryData.endLong - 0.0015;
            deliveryData.status = "Delivered";
        }
        db.ref("users/" + userId + "/orders/" + orderId + "/delivery").update(deliveryData).then(setTimeout(function () {
            if (deliveryData.status != "Delivered")
                doDelivery(userId, orderId);
        }, 1500));
    });
}