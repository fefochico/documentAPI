const redis = require('redis');
const uuidv1 = require('uuid/v1');
const uuidtimeout= global.gConfig.redis_db.timenoutUUID //1h
const client_redis= require('../data/redis_db');


uuidcontainer={
    create: function(id, email){
        return new Promise(function(resolve, reject) {
            let uuid=uuidv1();
            return client_redis.hmset(uuid, {id: id, email: email}, function(errCrea, repCre){
                if(errCrea){
                    reject();
                }
                return client_redis.expire(uuid, uuidtimeout, function(errExp, repExp){
                    if(errExp){
                        reject();
                    }
                    resolve(uuid);
                })
            });
        });
    },
    find: function(uuid){
        return new Promise(function(resolve, reject) {
            return client_redis.hgetall(uuid, function(err, result){
                if(err){
                    reject()
                }
                resolve(result);
            })
        });
    },
    remove: function(uuid){
        return new Promise(function(resolve, reject) {
            return client_redis.del(uuid, function(err, result){
                if(err){
                    reject(err)
                }
                resolve(result);
            })
        });
    }

}

module.exports= uuidcontainer;