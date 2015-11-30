var pm2 = require('pm2');

pm2.connect(function() {
  pm2.start({
    script    : '/usr/bin/grunt',         // Script to be run
    args: 'server',
  }, function(err, apps) {
    pm2.disconnect();
  });
});
