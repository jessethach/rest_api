const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/bears_app_test';
const server = require(__dirname + '/../server');
const Jedi = require(__dirname + '/../models/jedis');
const request = chai.request;

describe('The Jedis API', () => {

  after(() => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all jedis', (done) => {
    request('localhost:3000')
      .get('/jedis')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(status).to.have.status(200);
        expect(res.body.name).to.eql('jedi test');
        expect(res.body).to.have.property('_id');
        done();
      });
  });


});
