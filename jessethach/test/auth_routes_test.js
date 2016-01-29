const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
require(__dirname + '/../server');
process.env.MONGOLABL_URI = 'mongodb://localhost/jedis_app_test';
const User = require(__dirname + '/../models/users');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');
const httpBasic = require(__dirname + '/../lib/basic_http');
const request = chai.request;

describe('httpBasic function', () => {
  it('should be able to parse authorization', () => {
    var req = {
      headers: {
        authorization: 'Basic ' + (new Buffer('testing1:passwordintest').toString('base64'))
      }
    };

    httpBasic(req, {}, () => {
      expect(typeof req.basicHTTP).to.eql('object');
      expect(req.basicHTTP.email).to.eql('testing1');
      expect(req.basicHTTP.password).to.eql('passwordintest');
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
      .send({email: 'footest1', password: 'foobar123'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body.token).to.exist;
        expect(res.body.token).to.have.length.above(0);
        done();
      });
  });

  describe('user already in database', () => {

    before((done) => {
      var user = new User();
      user.username = 'footest1';
      user.hash = user.hashPassword('foobar123');
      this.token = user.generateToken();
      user.save(() => {
        done();
      });
    });

    it('should be able to sign in', (done) => {
      request('localhost:3000/api')
        .get('/signin')
        .auth('footest1', 'foobar123')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.token).to.exist;
          expect(res.body.token).to.have.length.above(0);
          done();
        });
    });

    it('should authenticate with jwtAuth', (done) => {
      var token = this.token;
      var req = {
        headers: {
          token: token
        }
      };

      jwtAuth(req, {}, () => {
        expect(req.user.username).to.eql('footest1');
        done();
      });
    });

  });
});
