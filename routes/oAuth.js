const oAuthRoutes = require("express").Router();
const fetch = require("node-fetch");
const { User } = require("../db/userModel");



const GOOGLE_OAUTH_SCOPES = [
  "https%3A//www.googleapis.com/auth/userinfo.email",

  "https%3A//www.googleapis.com/auth/userinfo.profile",
];

oAuthRoutes.get("/callback", async (req, res) => {
  // #swagger.tags = ['Authentication']
  // #swagger.description = 'Returns the authentication token if authentication is successful.'
  const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

  const GOOGLE_ACCESS_TOKEN_URL = process.env.GOOGLE_ACCESS_TOKEN_URL;
  const GOOGLE_REDIRECT_URL = process.env.GOOGLE_REDIRECT_URL;
  const { code } = req.query;

  const data = {
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_REDIRECT_URL,
    grant_type: "authorization_code",
  };


  // exchange authorization code for access token & id_token

  const response = await fetch(GOOGLE_ACCESS_TOKEN_URL, {
    method: "POST",

    body: JSON.stringify(data),
  });

  const access_token_data = await response.json();
  
  const { id_token } = access_token_data;

  

  // verify and extract the information in the id token

  const token_info_response = await fetch(
    `${process.env.GOOGLE_TOKEN_INFO_URL}?id_token=${id_token}`
  );
  const token_data = await token_info_response.json();
  const { email, name } = token_data;
  let user = await User.findOne({ email }).select("-password");
  if (!user) {
    user = await User.create({ email, name });
  }
  const token = user.generateToken();
  res.status(token_info_response.status).json({ user, token });
});

oAuthRoutes.get("/", async (req, res, next) => {
  // #swagger.tags = ['Authentication']
  // #swagger.description = 'Triggers oAuth authentication - redirecting to Google Sign in.'
  const GOOGLE_OAUTH_URL = process.env.GOOGLE_OAUTH_URL;
  const GOOGLE_CALLBACK_URL = "http%3A//localhost:8080/oauth/callback";
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const state = "some_state";
  const scopes = GOOGLE_OAUTH_SCOPES.join(" ");
  const GOOGLE_OAUTH_CONSENT_SCREEN_URL = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_CALLBACK_URL}&access_type=offline&response_type=code&state=${state}&scope=${scopes}`;
  res.redirect(GOOGLE_OAUTH_CONSENT_SCREEN_URL);
});

module.exports = oAuthRoutes;
