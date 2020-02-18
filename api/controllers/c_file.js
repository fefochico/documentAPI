const Sequelize = require('sequelize');
const m_file = require('../models/m_file');
const Op = Sequelize.Op;
const file= require('../utils/file/handlerFile');


c_file ={
    all: async function(req, res, next){
        //Comprueba si nos dan el idusuario
        if(!req.params.iduser) 
            return next(404)

        //Busca el listado de ficheros
        const existing= await m_file.findAll({where: {iduser: req.params.iduser}});
        if(!existing)
            return next(500) 

        res.status(200).send(existing);
    },
    upload: async function(req, res, next){
        if(!req.files.length>0) 
            return next(404)

        if(!req.body.iduser){
            fileRes= await file.deleteFile(req.localpath);
            return next(404)
        }

        const existing= await m_file.findAll({where: {[Op.and]: [{originalname: req.files[0].originalname}, {iduser: req.body.iduser}]}})
        if(!existing) 
            return next(500)
        else{
            if(existing.length==0){
                fileRes= await m_file.create({name: req.name, originalname: req.originalname, localpath: req.localpath, iduser: req.body.iduser})
                if(!fileRes)
                    return next(500) 
                
                res.status(200).send({action: 'add', data: fileRes});
            }else{
                fileRes2= await file.deleteFile(existing[0].localpath);

                fileRes= await m_file.update({
                    name: req.name,
                    localpath: req.localpath
                },{
                    where: {
                        id: existing[0].id,
                        iduser: req.body.iduser
                    }
                })
                if(!fileRes) 
                    return next(500)

                res.status(200).send({action: 'update', data: fileRes});
            }
        }
    },
    rename: async function(req, res, next){
        if(!req.body.id || !req.body.name)
            return next(400)
        
        const existing= await m_file.findAll({where: {id: req.body.id}})
        if(!existing) return next(500)

        if(existing.length==0)
            return next(404);

        const fileRes= await m_file.update({originalname: req.body.name},{where: {id: existing[0].id,}})
        if(!fileRes) 
            return next(500);

        res.status(200).send({action: 'update', data: fileRes});
    },
    download: async function(req, res, next){
        if(!req.params.id)
            return next(400)
        
        const existing= await m_file.findAll({where: {id: req.params.id}})
        if(!existing) 
            return next(500)

        if(existing.length==0)
            return next(404)

        const fileRes= await file.readFile(existing[0].localpath);
        if(!fileRes) 
            return next(404)
        
        res.setHeader('Content-Disposition', `attachment; filename=${existing[0].originalname}`); 
        res.end(fileRes);
    },
    remove: async function(req, res, next){
        if(!req.body.id) 
            return next(400);
        
        const existing= await m_file.findAll({where: {id: req.body.id}})
        if(!existing) 
            return next(500)

        if(existing.length==0)
            return next(404)

        fileDel= await file.deleteFile(existing[0].localpath);

        const fileRes= await m_file.destroy({where: {id: req.body.id}})
        if(!fileRes) return next(500);

        res.status(200).send({action:'delete', data: existing[0]});
    }
}

module.exports= c_file;