const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');

admin.initializeApp(functions.config().firebase);
const router = express.Router();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const db = admin.firestore();
const requestCollectionName = 'tutoringRequests';

app.post('/api/requests', async (req, res) => {
  var querySnapshot = null;
  const requestCollection = db.collection(requestCollectionName);
  try {
    querySnapshot = await requestCollection.where("pantherID", "==", req.body.pantherID).where("course", "==", req.body.course ).get();
  } catch (error){
    functions.logger.error(error);
    res.status(400).send("Issue with query");
  }

  try {
    const request = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      pantherID: req.body.pantherID,
      course: req.body.course,
      completed: false,
      requestedAt: new Date().toString()
    }
    functions.logger.log(querySnapshot);
    if (!querySnapshot.size) {
      const newDoc = await requestCollection.add(request);
      res.status(201).send(`Created a new request: ${newDoc.id}`);
    } else {
      functions.logger.log("Already added in queue");
      res.status(400).send('Already added in queue!!');
    }

  } catch (error) {
    functions.logger.error(error);
    res.status(400).send(`User should cointain name, pantherID, course, and requested time!!!`);
  }
})

app.get('/api/requests', async (req, res) => {
  functions.logger.log(req);
  try {
    const requests = (await db.collection(requestCollectionName).orderBy('requestedAt').get()).docs.map(doc => doc.data());
    functions.logger.log(requests);
    res.send(JSON.stringify(requests));
  } catch (error){
    functions.logger.error(error);
    res.send("Get request issue.");
  }
})

app.use('/api', router);

exports.api = functions.https.onRequest(app);