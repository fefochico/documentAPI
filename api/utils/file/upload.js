const multer= require('multer');
const uuidv1 = require('uuid/v1');
const path = require('path')

storage = multer.diskStorage({
    destination: ''+ global.gConfig.pathfile,
    filename: function (req, file, cb) {
        req.name= uuidv1() + path.extname(file.originalname);
        req.originalname= ''+ file.originalname;
        req.localpath= ''+`${global.gConfig.pathfile}/${req.name}`;
        cb(null, req.name)
    }
})

handlerfile = multer({ storage: storage })

module.exports= handlerfile;