const redis= require('redis');

var redis_client = redis.createClient({
    port: global.gConfig.redis_db.port,
    host: global.gConfig.redis_db.host,
    password: global.gConfig.redis_db.password
})

module.exports=redis_client;