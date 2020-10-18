const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const db = admin.firestore();
const requestCollectionName = 'tutoringRequests';

app.post('/api/requests', async (req, res) => {
  var querySnapshot = null;
  try {
    const request = {
      name: req.body.name,
      pantherID: req.body.pantherID,
      course: req.body.course,
      completed: false,
      requestedAt: new Date().toString()
    }
    const requestCollection = db.collection(requestCollectionName);
    querySnapshot = await requestCollection.where("pantherID", "==", request.pantherID).where("course", "==", request.course ).get();
  } catch (error){
    functions.logger.error(error);
    res.status(400).send("Issue with query");
  }

  try {
    functions.logger.log(querySnapshot);
    if (!querySnapshot.size) {
      const newDoc = await requestCollection.add(request);
      res.status(201).send(`Created a new user: ${newDoc.id}`);
    } else {
      functions.logger.log("Already added in queue");
      res.status(400).send('Already added in queue!!');
    }

  } catch (error) {
    functions.logger.error(error);
    res.status(400).send(`User should cointain name, pantherID, course, and requested time!!!`);
  }
})

app.get('/api', async (req, res) => {
  functions.logger.log(req);
  try {
    const testGet = (await db.collection(requestCollectionName).get()).docs.map(doc => doc.data());
    functions.logger.log(testGet);
    res.send(JSON.stringify(testGet));
  } catch (error){
    functions.logger.error(error);
    res.send("Get request issue.");
  }
})

exports.api = functions.https.onRequest(app);