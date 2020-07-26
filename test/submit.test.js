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




describe('/GET all projects', () => {
    it("should return approved projects", (done) => {
        chai.request(server)
            .get('/projects/approved')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})

describe('/POST', () => {
    it('it should return status 201', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "finish this project", postcode: 2000 };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.should.have.status(200);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if post code is below 2000', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "finish this project", postcode: 1000 };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if post code is above 2999', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "finish this project", postcode: 3000 };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if post code is blank', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "finish this project", postcode: '' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if post code is a string', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "finish this project", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if name is blank', (done) => {
        let application = { name: "", title: "Project completion", description: "finish this project", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if name is not a string', (done) => {
        let application = { name: 132, title: "Project completion", description: "finish this project", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if title is not a string', (done) => {
        let application = { name: "Annette", title: 123, description: "finish this project", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if title is blank', (done) => {
        let application = { name: "Annette", title: "", description: "finish this project", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if description is blank', (done) => {
        let application = { name: "Annette", title: "Project completion", description: "", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if description is not a string', (done) => {
        let application = { name: "Annette", title: "Project completion", description: 132, postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if title is more than 50 characters', (done) => {
        let application = { name: "Annette", title: "Lorem ipsum dolor sit amet, consectetuer adipiscing", description: "Description goes here", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if name is more than 50 characters', (done) => {
        let application = { name: "Lorem ipsum dolor sit amet, consectetuer adipiscing", title: "Title", description: "Description goes here", postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})
describe('/POST', () => {
    it('it should return status 500 if description is more than 300 characters', (done) => {
        let application = { name: "Annette", title: "Project completion", description: '    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec p', postcode: '2000' };
        chai.request(server)
            .post('/projects/submissions')
            .send(application)
            .end((err, res) => {
                res.body.should.have.status(500);
                done()

            })
    })
})



describe('/GET approved projects', () => {
    it("should return all pending projects", (done) => {
        chai.request(server)
            .get('/projects/pending')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})

describe('/GET projects', () => {
    it("should return all declined projects", (done) => {
        chai.request(server)
            .get('/projects/declined')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})
describe('/POST vote', () => {
    it("should return status 201", (done) => {
        let project = {
            id: "e7d09d3a-7e20-4d6c-b2d1-592484012bd0",
            timeStamp: "2020-07-21T05:54:",
            status: "approved",
            voteCount: 0,
            name: "Peter Holman",
            descirption: "To rebuild stairs for a church",
            postcode: "2204"
        }
        chai.request(server)
            .post('/projects/approved/vote')
            .send(project)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})
describe('/POST search', () => {
    it("should return status 200", (done) => {
        let search = {
            search: "2204"
        }
        chai.request(server)
            .post('/projects/search')
            .send(search)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
    })
})
describe('/POST search', () => {
    it("should return status 500 if search is empty", (done) => {
        let search = {
            search: ""
        }
        chai.request(server)
            .post('/projects/search')
            .send(search)
            .end((err, res) => {
                res.body.should.have.status(500)
                done()
            })
    })
})
describe('/POST Approve', () => {
    it("should return status 500 if project is already approved", (done) => {
        let id = {
            id: "535705e2-1264-48a9-93a5-0b5817697d95"
        }
        chai.request(server)
            .post('/projects/approve')
            .send(id)
            .end((err, res) => {
                res.body.should.have.status(500)
                done()
            })
    })
})
describe('/POST Decline', () => {
    it("should return status 500 if project is arleady declined", (done) => {
        let id = {
            id: "e7d09d3a-7e20-4d6c-b2d1-592484012bd0"
        }
        chai.request(server)
            .post('/projects/decline')
            .send(id)
            .end((err, res) => {
                res.body.should.have.status(500)
                done()
            })
    })
})



