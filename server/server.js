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

    server.get('/projects/approved', async(req, res)=>{
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("approved")))
        res.json(filteredResults)
    })
    server.get('/projects/pending', async(req, res)=>{
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("pending")))
        res.json(filteredResults)
    })
    server.put('/projects/pending', async(req, res)=>{
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("pending")))
        res.json(filteredResults)
    })
    server.get('/projects/declined', async(req, res)=>{
        let projects = await storage.valuesWithKeyMatch(/project-/);
        let filteredResults = projects.filter(projects => Object.keys(projects).some(key => projects[key].toString().toLowerCase().includes("declined")))
        res.json(filteredResults)
    })

    server.post('/projects/submissions', async (req, res) => {
        try {
            let project;
            if (!isNaN(req.body.postcode) && (req.body.postcode > 1999) && (req.body.title !="") && (typeof req.body.name === "string") && (req.body.postcode < 3000) && (req.body.name != "") && (req.body.description != "") && (typeof req.body.name === "string") && (typeof req.body.description === "stirng")) {
                // project ={...req.body}
                project = { id: uuidv4(), timeStamp: new Date().toISOString().slice(0, 17), status: "pending", voteCount: 0, ...req.body };
                await storage.setItem(`project-${project.id}`, project);
                res.json({satus:200, data:project});
            }
            else{
                // throw new Error('Invalid details entered')
            res.json({status: 500, message: error.message});

            }
        }
        catch (error) {
            res.json({status: 500, message: error.message});
        };
    });
    
    server.post('/projects/approved/vote', async(req, res)=>{
        let toVote = req.body.id
        let project = await storage.getItem(`project-${toVote}`)
        ++project.voteCount
        res.json(project.voteCount)
    })

    // server.get('/projects/search/:result', async(req, res)=>{
    //     let searchTerm = req.params.result.toLowerCase()
    //     let project = await storage.valuesWithKeyMatch(/project-/);
    //     let filteredResults = project.filter(project => Object.keys(project).some(key => project[key].toString().toLowerCase().includes(searchTerm)))
    //     res.json(filteredResults)
    // });


    server.listen(4001, () => {
        console.log('The server is listening on port 4000 http://localhost:4000');
    });
})();

module.exports = server
