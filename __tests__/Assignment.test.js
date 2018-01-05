const root = process.env.SERVER_URL || 'http://localhost:6000'
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
    return postAssignments(exampleAssignment)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        exampleAssignment.assignmentID = postResponseJson.assignmentID;
        return getOneAssignment(exampleAssignment.assignmentID);
    })
    .then(getResponse => { return getResponse.json() })
    .then(jsonResponse => { expect(jsonResponse.assignmentResult).toEqual(exampleAssignment.assignmentResult)})
    .catch(e => {console.log(e)})
});

test('Cancello assignment esistente', () => {
    return deleteAssignments(exampleAssignment.assignmentID)
    .then (res => expect(res.status).toBe(204))
    .catch(e => { console.log(e) })
});

test('Cancello assignment inesistente', () => {
    return deleteAssignments(exampleAssignment.assignmentID)
    .then (res => expect(res.status).toBe(404))
    .catch(e => { console.log(e) })
});

test('Aggiungo Assignment e poi lo modifico', () => {
    
});

test('Aggiungo degli Assignment e poi ne ricevo alcuni filtrandoli per Task ID', () => {
    
});