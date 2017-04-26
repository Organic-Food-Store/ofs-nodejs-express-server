<h1 align="center">OFS - NodeJS - Express - Server</h1>

<p align="center">
  <a href="https://organic-food-store.firebaseapp.com" target="_blank">
    <img src="https://raw.githubusercontent.com/Organic-Food-Store/ofs-client/master/images/logo.png" width="50%">
  </a>
</p>

<p align="center">The Independent Node JS Express Server hosted on <a href="https://organic-food-store.herokuapp.com/api" target="_blank">Heroku</a>.</p>

## Setup

### Install Prerequisites

[![Verify Steps with Client & Server Setup Video](https://raw.githubusercontent.com/Organic-Food-Store/ofs-client/master/dev/Capture.PNG)](https://www.useloom.com/share/0130bb002fcf408a908689f09be91490 "Verify Steps with Client & Server Setup Video")
##### Verify below step results with Client & Server Setup Video above

1. Install [Git](https://git-scm.com/downloads).

2. Install [Node.js](https://nodejs.org/en/download/current), preferably (7.x).

3. Update npm.
```sh
    $ npm install npm@latest -g
```

## Running Locally

3. Clone the server, install the 

```sh
    $ git clone https://github.com/Organic-Food-Store/ofs-nodejs-express-server
    $ cd ofs-nodejs-express-server
    $ npm install
    $ npm start
```

Your server should now be running on [localhost:5000](http://localhost:5000/).

Or use the same hosted server at [https://organic-food-store.herokuapp.com/api](https://organic-food-store.herokuapp.com/api).

***Note: Whether local or hosted, the [app](https://github.com/Organic-Food-Store/ofs-client) will only use the [organic-food-store.herokuapp.com/api](https://organic-food-store.herokuapp.com/api) for all serverside calls.***

## API Paths Documentation

***All documentation will assume either path:***
- [http://localhost:5000/api](http://localhost:5000/api)
- [https://organic-food-store.herokuapp.com/api](https://organic-food-store.herokuapp.com/api)

### Zips to Co-ordinates - `latitude` & `longitude` Return

### `/api/zipToCords/:zipcode`

Simply replace `:zipcode` with any zipcode to get the latitude and longitude of the zipcode, if valid.

Ex: [/api/zipToCords/95111](http://localhost:5000/api/zipToCords/95111)

Invalid zipcode inputs return `null`.

### User Existing Check - `true` or `false` Return

### `/api/userExists/:useruid`

Simply replace `:useruid` with any User ID, obtainable at the [App Dashboard](https://organic-food-store.firebaseapp.com/dashboard) to see if the user exists.

Ex: [/api/userExists/oYn79tnDmzOQbQAmNPpNEEbG1CC2](http://localhost:5000/api/userExists/oYn79tnDmzOQbQAmNPpNEEbG1CC2)

Nonexisting User ID inputs return `false`.

### Determine Closest Store to Zipcode - `95125` or `94401` Return

### `/api/closestStore/:zipcode`

Simply replace `:zipcode` with any zipcode to get the store ID of the closest store to the input zipcode.

Ex: [/api/closestStore/95111](http://localhost:5000/api/closestStore/95111)

Invalid zipcode inputs returns the store ID of the San Jose Willow Glen Branch.

### Execute Checkout of User - `trackingId` Return 

### `/api/checkout/:useruid`

Simply replace `:useruid` with any User ID, obtainable at the [App Dashboard](https://organic-food-store.firebaseapp.com/dashboard) to  perform the checkout method if the user with ID `:userid` has items in the cart.

The tracking ID number of the order is then returned, which can be put into the [App Tracking](https://organic-food-store.firebaseapp.com/tracking) input to then track the movement of the order.

You can track an id, i.e. `732331788976195636611` using a hashtag after the tracking URL: [https://organic-food-store.firebaseapp.com/tracking#732331788976195636611](https://organic-food-store.firebaseapp.com/tracking#732331788976195636611)

Ex: [/api/checkout/oYn79tnDmzOQbQAmNPpNEEbG1CC2](http://localhost:5000/api/checkout/oYn79tnDmzOQbQAmNPpNEEbG1CC2)

Invalid user ID inputs or users with empty carts returns `null`.
