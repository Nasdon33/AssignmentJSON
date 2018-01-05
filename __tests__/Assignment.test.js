const root = process.env.SERVER_URL || 'http://localhost:6000'
const fetch = require('node-fetch');
const assignmentsRoot = root + '/assignments';
const exampleAssignment = {
    "workerID": "ao90p3",
    "taskID": "Raccolta dati bilancia",
    "assignmentResult": {"url": "google.com"},
    "status": "minim"
}
const example3Assignment = {
    "workerID": "ao90p3",
    "taskID": "Inserimento dati database",
    "assignmentResult": {"url": "wikipedia.it"},
    "status": "minim"
}
const example4Assignment = {
    "workerID": "54eh7y",
    "taskID": "Raccolta dati bilancia",
    "assignmentResult": {"color": "red"},
    "status": "minim"
}


const example2Assignment = {
    "workerID": "ao90p3",
    "taskID": "Raccolta dati bilancia",
    "assignmentResult": {
        "url": "google.com",
        "color": "green"    
    },
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

const putAssignments = function (assignment, assignmentID) {
    return fetch(assignmentsRoot+'/'+assignmentID, {
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

test('Modifico Assignment', () => {
    return putAssignments(example2Assignment, exampleAssignment.assignmentID)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        example2Assignment.assignmentID = postResponseJson.assignmentID;
        return getOneAssignment(exampleAssignment.assignmentID);
    })
    .then(getResponse => { return getResponse.json() })
    .then(jsonResponse => expect(jsonResponse.assignmentResult).toEqual(example2Assignment.assignmentResult))
    .catch(e => console.log(e))
});


test('Aggiungo degli Assignment e poi li ricevo tutti', () => {
    return postAssignments(example3Assignment)
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        example3Assignment.assignmentID = postResponseJson.assignmentID;
        return postAssignments(example4Assignment);
    }) 
    .then(postResponse => { return postResponse.json() })
    .then(postResponseJson => {
        example4Assignment.assignmentID = postResponseJson.assignmentID;
        return getManyAssignments();
    })
    .then(getResponse => { return getResponse.json() })
    .then(jsonResponse => { 
        const array = [example2Assignment, example3Assignment, example4Assignment];
        expect(array).toEqual(
            expect.arrayContaining(jsonResponse),
        )
    })
    .catch(e => console.log(e))
    // Sistemare questo caso di test
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
