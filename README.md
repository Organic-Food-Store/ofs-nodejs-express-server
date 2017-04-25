# OFS - NodeJS - Express - Server

## Setup

The Independent Node JS Express Server hosted on [Heroku](https://organic-food-store.herokuapp.com/api)

### Install Prerequisites

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

## API Documentation

***All documentation will assuming either path:***
- [http://localhost:5000/api](http://localhost:5000/api)
- [https://organic-food-store.herokuapp.com/api](https://organic-food-store.herokuapp.com/api)

### Paths

- `/api/zipToCords/:zipcode`

- /api/userExists/:useruid

- /api/closestStore/:zipcode

- /api/checkout/:useruid
