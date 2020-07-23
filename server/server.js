const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const server = express();

const chai = require('chai');
const chaiHttp = require('chai-http');
// export default server;


(async () => {
    await storage.init({ dir: './data' })

    server.use(express.json());
    server.use(bodyParser.json());
    server.use(cors());

    //gets all approved projects
    server.get('/projects/approved', async (req, res) => {
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("approved")))
        res.json(filteredResults)
    })
    //gets all pending projects
    server.get('/projects/pending', async (req, res) => {
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("pending")))
        res.json(filteredResults)
    })
    //gets all declined projects
    server.get('/projects/declined', async (req, res) => {
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("declined")))
        res.json(filteredResults)
    })
    //post handler for project submissions
    server.post('/projects/submissions', async (req, res) => {
        try {
            let project;
            if (!isNaN(req.body.postcode) && (req.body.title.length <= 50) && (req.body.description.length <= 300) && (req.body.name.length <= 50) && (req.body.postcode > 1999) && (req.body.title != "") && (typeof req.body.name === "string") && (req.body.postcode < 3000) && (req.body.name != "") && (req.body.description != "") && (typeof req.body.name === "string") && (typeof req.body.description === "stirng")) {
                // project ={...req.body}
                project = { id: uuidv4(), timeStamp: new Date().toISOString().slice(0, 17), status: "pending", voteCount: 0, ...req.body };
                await storage.setItem(`project-${project.id}`, project);
                res.json({ satus: 200, data: project });
            }
            else {
                // throw new Error('Invalid details entered')
                res.json({ status: 500, message: error.message });

            }
        }
        catch (error) {
            res.json({ status: 500, message: error.message });
        };
    });
    //post handler for votes
    server.post('/projects/approved/vote', async (req, res) => {
        let toVote = req.body.id
        let project = await storage.getItem(`project-${toVote}`)
        ++project.voteCount
        res.json(project.voteCount)
    })
    //post handler for project searches
    server.post('/projects/search', async (req, res) => {

        try {
            let searchTerm;
            if (req.body.search != "") {
                let searchTerm = req.body.search.toLowerCase()
                let project = await storage.valuesWithKeyMatch(/project-/);
                let filteredResults = project.filter(project => Object.keys(project).some(key => project[key].toString().toLowerCase().includes(searchTerm)))
                res.json({ status: 200, data: filteredResults })
            }
            else {
                res.json({ status: 500, message: error.message });
            }
        }
        catch (error) {
            res.json({ status: 500, message: error.message });
        };

    });
    //post handler for approving pending projects
    server.post('/projects/approve', async (req, res) => {
        try {
            let toApprove = req.body.id;
            let project = await storage.getItem(`project-${toApprove}`)
            if (project.status != "approved") {
                project.status = "approved"
                await storage.updateItem(`project-${project.id}`, project)
                res.json(project)
            } else {
                res.json({ status: 500, message: error.message });

            }
        } catch (error) {
            res.json({ status: 500, message: error.message });
        };
    })
    //post handler for declining projects
    server.post('/projects/decline', async (req, res) => {
        try {
            let toDecline = req.body.id;
            let project = await storage.getItem(`project-${toDecline}`)
            if (project.status != "decline") {
                project.status = "decline"
                await storage.updateItem(`project-${project.id}`, project)
                res.json(project)
            } else {
                res.json({ status: 500, message: error.message });

            }
        } catch (error) {
            res.json({ status: 500, message: error.message });
        };
    })


    server.listen(4001, () => {
        console.log('The server is listening on port 4000 http://localhost:4000');
    });
})();

module.exports = server
