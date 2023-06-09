const expect = require("chai").expect;
const index = require("../index");
const mongoose = require('mongoose');
// const config = require('../config');
const env = process.env.MONGO_DB_URL|| 'development';

describe("should connect to the database",function(){
    it("should connect and disconnect to mongodb", async () => {
        // console.log(mongoose.connection.states);
        mongoose.disconnect();
        mongoose.connection.on('disconnected', () => {
          expect(mongoose.connection.readyState).to.equal(0);
        });
        mongoose.connection.on('connected', () => {
          expect(mongoose.connection.readyState).to.equal(1);
        });
        mongoose.connection.on('error', () => {
          expect(mongoose.connection.readyState).to.equal(99);
        });
  
        // await mongoose.connect(config.db[env], config.dbParams);
    });
});