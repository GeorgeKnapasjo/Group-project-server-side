const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const server = require('../server/server');
const chai = require('chai');
const chaiHttp = require('chai-http');
// import { server } from '../server/server'
// const  expect = chai.expect;
const { expect, assert } = require("chai");
const should = chai.should();
chai.use(chaiHttp);




describe('/GET projects', () => {
    it("should return all projects", (done) => {
        chai.request(server)
            .get('/projects/approved')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})

// describe('/POST', () => {
//     it('it should return status 201', (done) => {
//         let application = { name: "Annette", description: "finish this project", postcode: 2000 };
//         chai.request(server)
//             .post('/projects/submissions')
//             .send(application)
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 assert.isNotNaN(res.body.postcode, 'postcode is not NaN')
//                 expect(res.body.name).to.not.equal('')
//                 expect(res.body.description).to.not.equal('')
//                 expect(res.body.postcode).to.be.gt(1999)
//                 expect(res.body.postcode).to.be.lt(3000)
//                 // expect(res.body.postcode).to.be.within(1999, 3000)
//                 done()
//             })
//     })
// })

// describe('/test POST METHOD',()=>{
//     it("it should not do the post if we don't have postcode",(done)=>{
//         let project={
//             name:"mariam",
//             title:"project 3",
//             description:" dapibus augue imperdiet.",
//             postcode:1502
//         }

//         chai.request(server)
//         .post("/projects/submissions")
//         .send(project)
//         .end((err,res)=>{
//             console.log(res)
//             console.log(res.status)
//             res.should.have.status(500);
//             done();
//         });
//     });
// })