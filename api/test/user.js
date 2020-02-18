const assert = require('chai').assert;
const request = require('supertest');
const port=3000;
const app= require('../server');

//var request = supertest.agent(app);
var uuid;
var id;
var token;

describe("User unit test",function(){
    describe("Add user",function(){
        it("should return ok message",function(done){
            request(app)
            .post("/user/new")
            .send({"username": "test1", "password": "1q2w3e4r", "email": "gabriel.yeray@gmail.com"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                id = res.body.id;
                assert.isNumber(res.body.id);
                done(err);
            });
        });
    });
  
    describe("Add user without username",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/new")
            .send({"password": "1q2w3e4r", "email": "gabriel.yeray@gmail.com"})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Add user without password",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/new")
            .send({"username": "test1", "email": "gabriel.yeray@gmail.com"})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Add user without email",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/new")
            .send({"username": "test1", "password": "1q2w3e4r"})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
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

    describe("Login not found user",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/login")
            .send({"username": "test12", "password": "1q2w3e4r"})
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Login user without username",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/login")
            .send({"password": "1q2w3e4r"})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });
    
    describe("Login user without password",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/login")
            .send({"username": "test1"})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });
    
    
    describe("Forgot password",function(){
        it("should return ok message",function(done){
            request(app)
            .post("/user/forgot")
            .send({"email": "gabriel.yeray@gmail.com"})
            .expect(200)
            .end(function(err,res){
                uuid=res.body.uuid
                done(err);
            });
        });
    });

    describe("Forgot password not found email",function(){
        it("should return error message",function(done){
            request(app)
            .post("/user/forgot")
            .send({"email": "aaa@aaa.com"})
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Change password",function(){
        it("should return ok message",function(done){
            request(app)
            .patch("/user/updatepass")
            .send({"uuid": uuid, "password": "1234"})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.isNumber(Number(res.body.id));
                done(err);
            });
        });
    });

    describe("Change password wrong uuid",function(){
        it("should return error message",function(done){
            request(app)
            .patch("/user/updatepass")
            .send({"uuid": "1111", "password": "a123456"})
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Remove without token user",function(){
        it("should return error message",function(done){
            request(app)
            .delete("/user/remove")
            .send({"id": id})
            .expect(400) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });

    describe("Remove with wrong token user",function(){
        it("should return error message",function(done){
            request(app)
            .delete("/user/remove")
            .set('Authorization', 'Bearer blabla')
            .send({"id": id})
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
            .send({"id": id})
            .expect(200) // THis is HTTP response
            .end(function(err,res){
                assert.isNumber(res.body.id);
                done(err);
            });
        });
    });
    
    describe("Wrong remove user  ",function(){
        it("should return error message",function(done){
            request(app)
            .delete("/user/remove")
            .set('Authorization', 'Bearer ' + token)
            .send({"id": id})
            .expect(404) // THis is HTTP response
            .end(function(err,res){
                done(err);
            });
        });
    });
    
});

