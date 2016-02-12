/**
 * Main project controller
 */

module.exports = {
  index: function(req, res) {
    var we = req.getWe();

    if (!res.locals.metadata) res.locals.metadata = {};

    res.locals.metadata.description = 'Host your company social network with groups, categories and contents';
    res.locals.metadata.image = 'http://wejs.org/public/plugin/we-core/files/images/logo.png';
    res.locals.metadata.keywords = 'groups, social network, we.js, node.js, javascript';

    res.view({ title: we.config.appName });
    // res.goTo('/post');
  }

};