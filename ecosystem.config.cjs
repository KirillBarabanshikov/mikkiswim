module.exports = {
  apps: [
    {
      name: 'mikkiswim',
      port: '3007',
      exec_mode: 'cluster',
      instances: 2,
      script: './.output/server/index.mjs',
      max_memory_restart: '500M',
    }
  ]
}
