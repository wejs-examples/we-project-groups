/**
 * Main project controller
 */

module.exports = {
  index: function(req, res) {
    var we = req.getWe();

    var hostname = req.we.config.hostname;

    res.locals.metatag +=
      '<meta property="og:url" content="'+hostname+'" />'+
      '<meta property="og:title" content="We.js groups plugin" />' +
      '<meta property="og:site_name" content="We.js framework" />'+
      '<meta property="og:type" content="profile" />'+
      '<meta property="og:description" content="'+
        'Host your company social network with groups, categories and contents'+
      '" />'+
      '<meta property="og:image" content="http://wejs.org/public/plugin/we-core/files/images/logo.png" />';

    res.view({ title: we.config.appName });
  }

};