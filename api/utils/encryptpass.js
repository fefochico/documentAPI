const bcrypt= require('bcrypt');
const saltRounds= 10;

encryptpass= {
    encrypt: function(password){
        return new Promise(function(resolve, reject) {
            if(password){
                resolve(bcrypt.hash(password, saltRounds));
            }else{
                reject();
            }
        });
    },
    verify: function(password, password_db){
        return new Promise(function(resolve, reject){
            if(password && password_db){
                resolve(bcrypt.compare(password, password_db));
            }else{
                reject();
            }
        });
    }
}

module.exports= encryptpass;