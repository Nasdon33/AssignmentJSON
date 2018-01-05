const root = process.env.SERVER_URL | 'http://127.0.0.1:5000'
const fetch = require('node-fetch');
const assignmentsRoot = root + '/assignments';
const exampleAssignment = {
    "workerID": "ao90p3",
    "taskID": "Raccolta dati bilancia",
    "assignmentResult": {"url": "google.com"},
    "status": "minim"
}

// WIP

const postAssignments = function (newAssignment) {
    return fetch(assignmentsRoot, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(newAssignment)
    })
}

const putAssignments = function (assignment) {
    return fetch(assignmentsRoot+'/assignmentID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(assignment)
    })
}

const deleteAssignments = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })
}

const getOneAssignment = function (assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}

const getManyAssignments = function () {
    return fetch(assignmentsRoot, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
}



test('Aggiungo Assignment e poi lo ricevo', () => {

});

test('Aggiungo Assignment e poi lo cancello', () => {
    
});

test('Aggiungo Assignment e poi lo modifico', () => {
    
});

test('Aggiungo degli Assignment e poi ne ricevo alcuni filtrandoli per Task ID', () => {
    
});