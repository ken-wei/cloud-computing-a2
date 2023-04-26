const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(createProxyMiddleware("/maps/api/place", {
          target: "https://maps.googleapis.com",
          secure: false,
          changeOrigin: true
    }));
}