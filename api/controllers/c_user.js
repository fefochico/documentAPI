const Sequelize = require('sequelize');
const m_user = require('../models/m_user');
const Op = Sequelize.Op;
const encrypted= require('../utils/encryptpass');
const sendmail= require('../utils/sendmail');
const uuidcontainer= require('../utils/uuidcontainer');

c_user ={
    add: async function(req, res, next){
        //Verificacion de parámetros
        if(!req.body.username || !req.body.email || !req.body.password) 
            return next(400)

        //Buscar por usename o email
        const existing= await m_user.findOne({where: {[Op.or]: [{username: req.body.username},{email: req.body.email}]}});
        if(existing) 
            return next(404)

        //Encriptar password
        const hash= await encrypted.encrypt(req.body.password)
        if(!hash) 
            return next(500)
        
        //Crear usuario
        const userRes= await m_user.create({username: req.body.username, password: hash, email: req.body.email})
        if(!userRes) 
            return next(500)
        else 
            res.status(200).send(userRes); 
    },
    login: async function(req, res, next){
        //Verificacion de parámetros
        if(!req.body.username || !req.body.password) 
            return next(400) 
        
        //Buscar por username
        const existing= await m_user.findOne({where: {username: req.body.username}})
        if(!existing) 
            return next(404);

        if(existing.length==0)
            return next(404)
        
        const rightpass= await encrypted.verify(req.body.password, existing.password);
        if(!rightpass) 
            return next(500);

        //Crear token
        const newToken= await token.generate(existing.id, existing.username);
        if(!newToken) return next(500)
        
        res.status(200).send({id: existing.id, username: existing.username, token: newToken})
    },
    remove: async function(req, res, next){
        //Verificacion de parámetros
        if(!req.body.id) return next(400)

        //Buscar id
        const existing= await m_user.findOne({where: {id: req.body.id}});
        if(!existing) 
            return next(404)

        //Eliminación de registro
        const userRes = await m_user.destroy({where: {id: existing.id}});
        if(!userRes) return next(500)
        
        res.status(200).send(existing);

    },
    sendMail: async function(req, res, next){
        //Verificacion de parámetros
        if(!req.body.email) 
            return next(400)

        //Buscar email
        const existing=  await m_user.findOne({where: {email: req.body.email}});
        if(!existing) 
            return next(404)

        //Genarando uuid del email
        //Añadiendolo a al contenedor de uuids de 1 hora de duración.
        const uuid = await uuidcontainer.create(existing.id, existing.email); 
        if(!uuid) 
            return next(404)

        //Envio de mail con la dirección construidad a partir del uuid
        const mail= await sendmail(existing.username, existing.email, uuid)
        if(!mail) 
            return next(500) 

        res.status(200).send({uuid: uuid});
    },
    updatePassword: async function(req, res, next){
        if(!req.body.uuid || !req.body.password) 
            return next(400)

        const existing = await uuidcontainer.find(req.body.uuid);
        if(!existing) 
            return next(404)


        //Encriptar nueva password
        const hash= await encrypted.encrypt(req.body.password)
        if(!hash) 
            return next(500)

        //Cambio de password en la base de datos
        const userRes = await m_user.update({password: hash},{where: {id: existing.id}});
        if(!userRes) 
            return next(500)

        //Borrar uuid del contenedor para que nadie pueda cambiar la contraseña
        const uuidRes = await uuidcontainer.remove(req.body.uuid);
        if(!uuidRes) 
            return next(404)

        res.status(200).send(userRes);
    }
};

module.exports= c_user;