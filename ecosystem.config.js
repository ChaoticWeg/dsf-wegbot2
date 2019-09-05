require('dotenv').config();

module.exports = {
  apps : [{
    name: 'dsf-wegbot2',
    script: 'lib/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PIN_THRESHOLD: '3',
      COMMAND_PREFIX: '?'
    }
  }]
};

