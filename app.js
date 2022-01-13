const express = require('express');
const jsforce = require('jsforce');
const path    = require('path');

const app     = express();
const port    = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// REDIRECT_URI - SHOULD BE THE SAME AS IN THE CONNECTED APP THE "CALLBACK URL"
const REDIRECT_URI    = 'https://lwc-with-lightning-out.herokuapp.com/oauth2/callback';
const CONSUMER_KEY    = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const RESTAURANT_FOOD_ID     = '0012v00002STk9AAAT';
const RESTAURANT_FOOD_NAME   = 'food_dreams';
const RESTAURANT_DRINKS_ID   = '0012v00002STk97AAD';
const RESTAURANT_DRINKS_NAME = 'alc_paradise';

const PAGE_DATA = {
  restaurantName : '',
  restaurantId   : '',
  accessToken    : '',
};


//SALESFORCE CONNECTION

const oauth2Instance = new jsforce.OAuth2({
  loginUrl     : 'https://login.salesforce.com',
  clientId     : CONSUMER_KEY,
  clientSecret : CONSUMER_SECRET,
  redirectUri  : REDIRECT_URI
});

app.get('/oauth2/callback', (req, res) => {
  const sfConnection = new jsforce.Connection({ oauth2 : oauth2Instance });
  const code         = req.param('code'); // auth code

  sfConnection.authorize(code, (err, userInfo) => {
    if (err) return res.send(error(err));

    PAGE_DATA.accessToken = sfConnection.accessToken;

    res.redirect('/index');
  });
});


//API FOR THE CLIENT SIDE

app.get('/' , (req, res, next) => {
  res.sendfile('public/pages/welcome.html');
} );
app.get('/login' , (req, res, next) => {
  res.redirect('/oauth2/auth');
} );
app.get('/oauth2/auth', (req, res) => {
  res.redirect(oauth2Instance.getAuthorizationUrl({ scope : 'full' }));
});

app.get('/getWidgetData', (req, res) => {
  res.send(PAGE_DATA);
});

app.get('/food', (req, res) => {
  if (PAGE_DATA.restaurantId !== RESTAURANT_FOOD_ID) {
    PAGE_DATA.accessToken    = undefined;
    PAGE_DATA.restaurantId   = RESTAURANT_FOOD_ID;
    PAGE_DATA.restaurantName = RESTAURANT_FOOD_NAME
  }

  res.sendfile('public/pages/index.html');
});

app.get('/drinks', (req, res) => {
  if (PAGE_DATA.restaurantId !== RESTAURANT_DRINKS_ID) {
    PAGE_DATA.accessToken    = undefined;
    PAGE_DATA.restaurantId   = RESTAURANT_DRINKS_ID;
    PAGE_DATA.restaurantName = RESTAURANT_DRINKS_NAME
  }

  res.sendfile('public/pages/index.html');
});

app.get('/caterpillar', (req, res) => {

  res.sendfile('public/pages/caterpillar.html');
});

app.get('/index' , (req, res, next) => {
  res.sendfile('public/pages/index.html');
} );



app.listen(port);