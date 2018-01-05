var express = require('express');
var bodyParser = require('body-parser');
const assignments = express.Router();

var uuid = require('uuid/v4');

const deliveredAssignment = [];



// Mandare il proprio assignment
assignments.route('/')
    .post(function(req,res){
    const newAssignment = req.body;
    console.log(newAssignment);
    newAssignment.assignmentID = uuid();
    newAssignment.lastModified = new Date();
    console.log("TASK ID: " + newAssignment.taskID + ". \n "
            + "ASSIGNMENT ID: " + newAssignment.assignmentID + ". \n "
            + "WORKER ID: " + newAssignment.workerID + ". \n "
            + "ASSIGNMENT RESULT: " + newAssignment.assignmentResult + ".");
    deliveredAssignment.push(newAssignment);
    console.log("Risultati pushati?");
    res.json(newAssignment);
    })
    .get(function(req, res){
        //filter
        const filteredWorkerAssignment = deliveredAssignment;
        if(req.query.workerID)
            filteredWorkerAssignment = deliveredAssignment.filter(item =>
                                { return item.workerID === req.query.workerID});
        const filteredTaskAssignment  = filteredWorkerAssignment;
        if(req.query.taskID)
            filteredTaskAssignment = filteredWorkerAssignment.filter(item =>
                                    { return item.taskID === req.query.taskID});
        res.json(filteredTaskAssignment);
    });


assignments.route('/:assignmentid')
    .get(function(req, res) {
        // Visualizzare il proprio assignment
        const id = req.params.assignmentid;
        const i = deliveredAssignment.findIndex(item => { return item.assignmentID === id});
        if (i==-1)
            res.sendStatus(404);
        else
            {
                res.sendStatus(200);
                res.json(deliveredAssignment[i]);
            }
    })
    .post(function(req, res) {
        // Modificare il proprio assignment
        const id = req.params.assignmentid;
        const i = deliveredAssignment.findIndex(item => { return item.assignmentID === id});
        if (i==-1)
            res.sendStatus(404);
        else
            {
                deliveredAssignment[i] = req.body;
                deliveredAssignment[i].assignmentID = id;
                deliveredAssignment[i].lastModified = new Date();
                res.sendStatus(200);
                res.json(deliveredAssignment[i]);
            }
    })
    .delete(function(req, res) {
        // Cancellare il proprio assignment  
        const id = req.params.assignmentid;
        const i = deliveredAssignment.findIndex(item => { return item.assignmentID === id});
        if (i==-1)
            res.sendStatus(404);
        else
            {
                const deleted = deliveredAssignment[i];
                deliveredAssignment.splice(i,1);
                res.sendStatus(204);
                res.json(id);
            }
    });

module.exports = assignments;