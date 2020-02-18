const assert = require('chai').assert;
const request = require('supertest');
const app= require('../server');

const port=3000;

//var request = supertest.agent(app);
var id;
var iduser;
var token;

describe("File unit test",function(){
    describe("Add user",function(){
        it("should return ok message",function(done){
            request(app)
            .post("/user/new")
            .send({"username": "test1", "password": "1q2w3e4r", "email": "gabriel.yeray@gmail.com"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                iduser = res.body.id;
                assert.isNumber(res.body.id);
                done(err);
            });
        });
    });

    describe("Login user",function(){
        it("should return ok message",function(done){
            request(app)
            .post("/user/login")
            .send({"username": "test1", "password": "1q2w3e4r"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                token=res.body.token
                assert.isNumber(res.body.id)
                done(err);
            });
        });
    });

    describe("Upload file",function(){
        it("should return ok message",function(done){
            request(app)
            .post("/file/upload")
            .set('Authorization', 'Bearer ' + token)
            .field('iduser', iduser)
            .attach('file','test/test.jpg')
            .expect(200) // THis is HTTP response
            .end(function(err, res){
                id= res.body.data.id;
                assert.equal(res.status, 200);
                done(err);
            });
        });
    });


    describe("Upload fail file",function(){
        it("should return error message",function(done){
            request(app)
            .post("/file/upload")
            .set('Authorization', 'Bearer ' + token)
            .field('iduser', iduser)
            .expect(404) // THis is HTTP response
            .end(function(err, res){
                done(err);
            });
        });
    });
    describe("Upload fail iduser file",function(){
        it("should return error message",function(done){
            request(app)
            .post("/file/upload")
            .set('Authorization', 'Bearer ' + token)
            .attach('file','test/test.jpg')
            .expect(404) // THis is HTTP response
            .end(function(err, res){
                done(err);
            });
        });
    });

    describe("List files user",function(){
        it("should return ok message",function(done){
            request(app)
            .get(`/file/all/${iduser}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.equal(res.status, 200)
                done(err);
            });
        });
    });

    describe("List wrong files user",function(){
        it("should return error message",function(done){
            request(app)
            .get(`/file/all`)
            .set('Authorization', 'Bearer ' + token)
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Rename file",function(){
        it("should return ok message",function(done){
            request(app)
            .patch('/file/rename')
            .set('Authorization', 'Bearer ' + token)
            .send({"id": id, "name": "newname.jpg"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.equal(res.status, 200)
                done(err);
            });
        });
    });

    describe("Rename wrong file",function(){
        it("should return error message",function(done){
            request(app)
            .patch('/file/rename')
            .set('Authorization', 'Bearer ' + token)
            .send({"id": 199, "name": "newname.jpg"})
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Download file",function(){
        it("should return ok message",function(done){
            request(app)
            .get(`/file/download/${id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Remove file",function(){
        it("should return ok message",function(done){
            request(app)
            .delete("/file/remove/")
            .set('Authorization', 'Bearer ' + token)
            .send({"id": id})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.isNumber(res.body.data.id);
                done(err);
            });
        });
    });


    describe("Remove not id file",function(){
        it("should return error message",function(done){
            request(app)
            .delete("/file/remove")
            .set('Authorization', 'Bearer ' + token)
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Remove user",function(){
        it("should return ok message",function(done){
            request(app)
            .delete("/user/remove")
            .set('Authorization', 'Bearer ' + token)
            .send({"id": iduser})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.isNumber(Number(res.body.id));
                done(err);
            });
        });
    });
});
