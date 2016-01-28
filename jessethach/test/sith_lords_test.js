const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/bears_app_test';
const server = require(__dirname + '/../server');
const Sith = require(__dirname + '/../models/sith_lords');
const request = chai.request;

describe('The Sith API', () => {

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all siths lords', (done) => {
    request('localhost:3000')
      .get('/api/sith-lords')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a sith with a POST', (done) => {
    request('localhost:3000')
      .post('/api/sith-lords')
      .send({name: 'test sith'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test sith');
        expect(res.body).to.have.property('_id');
        done();
      });
  });


  describe('', () => {

    beforeEach((done) => {
      Sith.create({name: 'test-sith-lord-beforeeach'}, (err, data) => {
        this.testSith = data;
        done();
      });
    });

    it('shoud be able to update a sith-lord', (done) => {
      request('localhost:3000')
        .put('/api/sith-lords/' + this.testSith._id)
        .send({name: 'new sith-lord-test-beforeeach'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a sith-lord', (done) => {
      request('localhost:3000')
        .delete('/api/sith-lords/' + this.testSith._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });

});
