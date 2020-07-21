const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');

(async () => {
    await storage.init({ dir: './data' })

    const server = express();
    server.use(express.json());
    server.use(bodyParser.json());
    server.use(cors());

    server.post('/projects/submissions', async (req, res) => {
        try {
            let project;
            if (!isNaN(req.body.postcode) && (req.body.postcode > 1999) && (req.body.postcode < 3000)) {
                project ={...req.body}
                // project = { id: uuidv4(), timeStamp: new Date().toISOString().slice(0, 17), status: "pending", voteCount: 0, ...req.body };
                res.json(project);
                // await storage.setItem(`project-${project.id}`, project);

            }
            else{
                throw new Error('wrong postcode')
            }
        }
        catch (error) {
            res.json({status: 500, message: error.message});
            // res.send(e.message)
        }


    })


    server.listen(4000, () => {
        console.log('The server is listening on port 4000 http://localhost:4000');
    })
})();

