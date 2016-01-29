const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/jedis_app_test';
// const server = require(__dirname + '/../server');
const Jedi = require(__dirname + '/../models/jedis');
const request = chai.request;

describe('The Jedis API', () => {

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all jedis', (done) => {
    request('localhost:3000')
      .get('/api/jedis')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a jedi with a POST', (done) => {
    request('localhost:3000')
      .post('/api/jedis')
      .send({name: 'test-jin'})
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('test-jin');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a jedi already in db', () => {

    beforeEach((done) => {
      Jedi.create({name: 'test-beforeeach'}, (err, data) => {
        this.testJedi = data;
        done();
      });
    });

    it('shoud be able to update a jedi', (done) => {
      request('localhost:3000')
        .put('/api/jedis/' + this.testJedi._id)
        .send({name: 'new-test-beforeeach'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a jedi', (done) => {
      request('localhost:3000')
        .delete('/api/jedis/' + this.testJedi._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

  });

});
