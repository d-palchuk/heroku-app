const express      = require('express');
const path         = require('path');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const jsforce      = require('jsforce');
const fs           = require('fs');


const app  = express();
const port = process.env.PORT || 8000;

const CONSUMER_KEY    = '3MVG9G9pzCUSkzZshQPF13Ib7bBPk2kQ3pVcnAyPePRUgLyC4eMsa4CasJMeNNBUuOKWHNG2zmSKUKt7bBFth';
const CONSUMER_SECRET = '0A76794BE73E909EDB0A93C24CC83C38791E246234EA1E5D0484D8360F279B54';
const REDIRECT_URI    = 'https://lwc-with-lightning-out.herokuapp.com/oauth2/callback';

const ORG_URL         = 'https://lwc-with-lightning-out-dev-ed.lightning.force.com';
const COMMUNITY_URL   = 'https://food-delivery-developer-edition.ap15.force.com/customers'

const RESTAURANT_ID_FOOD   = '0012v00002STk9AAAT';
const RESTAURANT_ID_DRINKS = '0012v00002STk97AAD';

let pageData    = {
  restaurantId : '',
  accessToken  : '',
};

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


//SALESFORCE CONNECTION

let oauth2Instance = new jsforce.OAuth2({
  loginUrl     : 'https://login.salesforce.com',
  clientId     : CONSUMER_KEY,
  clientSecret : CONSUMER_SECRET,
  redirectUri  : REDIRECT_URI
});


// needs to make redirect to the Salesforce login page
app.get('/oauth2/auth', (req, res) => {
  res.redirect(oauth2Instance.getAuthorizationUrl({ scope : 'full' }));
});

// the URL which Salesforce use to redirect after successful login
app.get('/oauth2/callback', (req, res) => {
  const sfConnection = new jsforce.Connection({ oauth2 : oauth2Instance });
  const code         = req.param('code');

  //finally we authorize in the Salesforce after the Salesforce provide us the auth code
  sfConnection.authorize(code, (err, userInfo) => {
    if (err) return console.error(err);

    pageData.accessToken = sfConnection.accessToken;

    res.redirect('/index');
  });
});


//OUR API

app.get('/' , (req, res, next) => {
  res.send('Hello World!');
  // res.redirect('/oauth2/auth');
} );

app.get('/food', (req, res) => {
  pageData.accessToken  = undefined;
  pageData.restaurantId = RESTAURANT_ID_FOOD;

  res.sendfile('public/pages/index.html');
});
app.get('/drinks', (req, res) => {
  pageData.accessToken  = undefined;
  pageData.restaurantId = RESTAURANT_ID_DRINKS;

  res.sendfile('public/pages/index.html');
});

app.get('/getWidgetData', (req, res) => {
  res.send({ data : pageData });
});

app.get('/login' , (req, res, next) => {

  if (token === '' ) res.redirect('/oauth2/auth');
    else res.sendfile('public/pages/index.html');
} );


app.listen(port);