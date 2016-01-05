module.exports = {
  /**
   * Install function run in we.js site install.
   *
   * @param  {Object}   we    we.js object
   * @param  {Function} done  callback
   */
  install: function install(we, done) {
    we.log.info('Starting project install...');

    we.utils.async.series([
      function registerUser1(done) {
        var user1 = {
          username: 'administrator',
          biography: 'The administrator user account!',
          email: 'contato@albertosouza.net',
          password: '123', // change after install
          displayName: 'Administrator',
          language: 'en-us',
          active: true
        };

        we.log.info('I will create the user: ', user1);

        we.db.models.user.create(user1)
        .then(function (user) {
          we.log.info('New User with id: ', user.id);
          // set the password
          user.updatePassword(user1.password , function(error) {
            if (error) return done(error);
            // add as admin
            // check if the role exists
            we.db.models.role.find({
              where: { name: 'administrator' }
            }).then(function (role) {
              if (!role) return done('administrator role not found');
              user.addRole(role).then(function() {
                we.log.info('role ' +role.name+ ' set to user ' + user.username);
                return done();
              });
            });
          });
        });
      },
      // function setDefaultRolePermissions(done) {
      //   var setRolePermissions = require('./bin/install/4_setRolePermissions.js');
      //   setRolePermissions(we, done);
      // },
      function createDefaultMenus(done) {
        we.utils.async.series([
          function createMainMenu(done) {
            we.db.models.menu.create({
              name: 'main',
              class: 'nav navbar-nav collapse navbar-collapse '
            }).then(function (r){
              we.log.info('New menu with name: '+r.name+' and id: '+r.id);
              // then create menu links
              we.db.models.link.bulkCreate([
                {
                  href: '/post',
                  text: 'POsts',
                  title: 'Posts page',
                  menuId: r.id
                },
                {
                  href: '/group',
                  text: 'Groups',
                  title: 'Groups page',
                  menuId: r.id
                }
              ]).then(function(){
                done();
              }).catch(done);
            }).catch(done);
          },
          function createSocialMenu(done) {
            we.db.models.menu.create({
              name: 'social',
              class: 'list-inline text-center'
            }).then(function (r) {
              we.log.info('New menu with name: '+r.name+' and id: '+r.id);
                done();
            }).catch(done);
          }
        ], done);
      }
    ], done);
  }
};