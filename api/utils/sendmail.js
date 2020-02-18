const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    pool: true,
    host: global.gConfig.email.host,
    secure: false,
    ignoreTLS: false,
    tls:{
        rejectUnauthorized: false
    },
    auth: {
        user: global.gConfig.email.dir,
        pass: global.gConfig.email.password,
    }
})

sendmail= function(username, email, uuid){
    var options={
        from: global.gConfig.email.from,
        to: email,
        subject: global.gConfig.email.subject,
        html: 'Estimado ' + username +',<br> El enlace para cambiar la contraseña es el siguiente: <br> <a href="' + global.gConfig.email.url_base + uuid +'">' + global.gConfig.email.url_base + uuid +'</a><br> Un saludo.'
    };
    return new Promise(function(resolve, reject) {
        return transporter.sendMail(options, function(err, info){
            if(err){
                reject();
            }
            resolve(info);
        }) 
    })
}

module.exports= sendmail;