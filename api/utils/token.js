const jwt= require('jsonwebtoken');
const SECRET='estoEsUnSecreto;';
const timeoutToken= global.gConfig.timeouttoken; //El token expira en 3 horas

token= {
    generate: function(id, username){
        return new Promise(function(resolve, reject) {
            resolve(jwt.sign(
                { id: id, username: username },
                SECRET,
                {expiresIn: timeoutToken }
            ))
        });
    },
    verify: function(req, res, next){
        var auth = req.headers['authorization'];
        if(auth){
            authDiv=auth.split(' ');
            jwt.verify(authDiv[1], SECRET, function(err){
                if(err){
                    if(err.name=='TokenExpiredError'){
                        return res.status(489).json({message: "Expired token"});
                    }else{
                        return res.status(400).json({message: "Wrong token"});
                    }
                }else{
                    next();
                }
            })
        }else{
            return res.status(400).json({message: "Unauthorized access"})
        }
    }
}

module.exports= token;