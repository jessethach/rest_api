const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/jedis_app_test';
const server = require(__dirname + '/../server');
const User = require(__dirname + '/../models/users');
const jwt = require('jsonwebtoken');
const httpBasic = require(__dirname + '/../lib/basic_http');
const request = chai.request;

describe('httpBasic function', () => {
  it('should be able to parse authorization', () => {
    var req = {
      headers: {
      authorization: 'Basic ' + (new Buffer('testing1:passwordintest')).toString('base64')
      }
    };

    httpBasic(req, {}, () => {
      expect(typeof req.auth).to.eql('object');
      expect(req.auth.email).to.eql('testing1');
      expect(req.auth.password).to.eql('passwordintest');
    });
  });
});

describe('authorization', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to generate a user', (done) => {
    request('localhost:3000/api')
      .post('/signup')
      .send({email: 'testuser@testuser.com', password: 'testpassword'})
      .end((err, res) => {
        expect(err).to.eql(null)
        expect(res.body.token).to.not.eql(0)
        done();
      });
  });

});
