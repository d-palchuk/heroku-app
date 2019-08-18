let express      = require('express');
let path         = require('path');
let fs           = require('fs');
let https        = require('https');
let request      = require('request');
let bodyParser   = require('body-parser');
let cookieParser = require('cookie-parser');
let createError  = require('http-errors');
let jsforce      = require('jsforce');

const CONSUMER_KEY    = '3MVG9G9pzCUSkzZshQPF13Ib7bBPk2kQ3pVcnAyPePRUgLyC4eMsa4CasJMeNNBUuOKWHNG2zmSKUKt7bBFth';
const CONSUMER_SECRET = '0A76794BE73E909EDB0A93C24CC83C38791E246234EA1E5D0484D8360F279B54';
const ENDPOINT        = 'https://lwc-with-lightning-out-dev-ed.lightning.force.com';
const REDIRECT_URI    = 'https://lwc-with-lightning-out.herokuapp.com//oauth2/callback';

let token = '';

let app  = express();
let port = process.env.PORT || 8000;


app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//
// OAuth2 client information can be shared with multiple connections.
//
let oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com',
  clientId     : CONSUMER_KEY,
  clientSecret : CONSUMER_SECRET,
  redirectUri  : REDIRECT_URI
});
//
// Get authorization url and redirect to it.
//
app.get('/oauth2/auth', (req, res) => {
  res.redirect(oauth2.getAuthorizationUrl({ scope : 'api id web' }));
});

//
// Pass received authorization code and get access token
//
app.get('/oauth2/callback', (req, res) => {
  var conn = new jsforce.Connection({ oauth2 : oauth2 });
  var code = req.param('code');
  conn.authorize(code, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token, refresh token, and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.refreshToken);
    console.log(conn.instanceUrl);
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
    res.send('success'); // or your desired response
  });
});

app.get('/token', (req, res) => {
  res.send({ token : token });
});

app.get('/index' , (request, response, next) => {
  response.sendfile('public/pages/index.html');
} );


app.get('/' , (request, response, next) => {
  response.redirect('/oauth2/auth');
} );

app.listen(port);