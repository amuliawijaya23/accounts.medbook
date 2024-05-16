const oauth2orize = require('oauth2orize');
const passport = require('passport');
const login = require('connect-ensure-login');

const { uid } = require('../helpers');

const Client = require('../db/models/Client');
const Code = require('../db/models/Code');
const Token = require('../db/models/Token');
const RefreshToken = require('../db/models/RefreshToken');

const server = oauth2orize.createServer();

// eslint-disable-next-line no-underscore-dangle
server.serializeClient((client, done) => done(null, client._id));

server.deserializeClient(async (id, done) => {
  try {
    if (!id) {
      return done(null, false);
    }

    const client = await Client.getClientById(id);

    if (!client) {
      return done(null, false);
    }

    return done(null, client);
  } catch (error) {
    return done(error);
  }
});

exports.authorization = [
  login.ensureLoggedIn(),
  server.authorization(async (clientId, redirectUri, scope, state, done) => {
    try {
      console.log(`clientId: ${clientId}, redirectUri: ${redirectUri}, scope: ${scope}, state: ${state}`);

      const client = await Client.getClientByClientId(clientId);

      if (!client) {
        return done(null, false);
      }

      return done(null, client, redirectUri);
    } catch (error) {
      return done(error);
    }
  }),
  function (req, res) {
    res.render('dialog', {
      transactionID: req.oauth2.transactionID,
      user: req.user,
      client: req.oauth2.client,
      scope: req.query.scope,
    });
  },
];

exports.decision = [
  login.ensureLoggedIn(),
  server.decision((req, done) => {
    console.log('REQ: ', req);
    done(null, { scope: req.body.scope });
  }),
];

server.grant(
  oauth2orize.grant.code(async (client, redirectUri, user, ares, done) => {
    try {
      const code = uid(16);

      console.log(`Grants code: ${code}, client: ${client}, ares: ${ares}, user: ${user}`);

      await Code.createCode({
        code,
        clientId: client.clientId,
        // eslint-disable-next-line no-underscore-dangle
        userId: user._id,
        redirectUri,
        scope: ares.scope,
      });

      return done(null, code);
    } catch (error) {
      return done(error);
    }
  }),
);

server.exchange(
  oauth2orize.exchange.code(async (client, code, redirectUri, done) => {
    try {
      const authorizationCode = await Code.findCode(code);

      if (authorizationCode.clientId !== client.clientId) {
        return done(null, false);
      }

      if (redirectUri !== authorizationCode.redirectUri) {
        return done(null, false);
      }

      const token = uid(256);

      const refreshToken = uid(256);

      const expirationTimestamp = new Date().getTime();

      const expirationDate = new Date(expirationTimestamp + 10000);

      await Token.createToken({
        token,
        refreshToken,
        clientId: authorizationCode.clientId,
        userId: authorizationCode.userId,
        scope: authorizationCode.scope,
        expiration: expirationDate,
      });

      await RefreshToken.createRefreshToken({
        token: refreshToken,
      });

      return done(null, token, refreshToken, { expires_in: 3600 });
    } catch (error) {
      return done(error);
    }
  }),
);

server.exchange(
  oauth2orize.exchange.refreshToken(async (client, refreshToken, scope, done) => {
    try {
      const refreshAccessToken = await RefreshToken.findRefreshToken(refreshToken);

      if (!refreshAccessToken) {
        return done(null, false);
      }

      const accessToken = await Token.findTokenByRefreshToken(refreshToken);

      if (!accessToken) {
        return done(null, false);
      }

      const newToken = uid(256);
      const newRefreshToken = uid(256);

      accessToken.token = newToken;
      accessToken.refreshToken = newRefreshToken;

      await accessToken.save();

      await refreshAccessToken.delete();

      await RefreshToken.createRefreshToken({ token: newRefreshToken });

      return done(null, newToken, newRefreshToken, { expires_in: 3600 });
    } catch (error) {
      return done(error);
    }
  }),
);

exports.token = [passport.authenticate(['basic', 'oauth2-client-password'], { session: false }), server.token(), server.errorHandler()];
