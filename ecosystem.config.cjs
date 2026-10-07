module.exports = {
  apps: [{
    name: 'digital-card',
    script: 'dist/main.js',
    cwd: '/opt/digital-card',
    env: { NODE_ENV: 'production' },
  }],
};
