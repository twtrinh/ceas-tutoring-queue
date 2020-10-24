const functions = require('firebase-functions');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const cors = require('cors');
const { auth } = require('firebase-admin');
const { decode } = require('firebase-functions/lib/providers/https');

admin.initializeApp(functions.config().firebase);
const router = express.Router();
app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const db = admin.firestore();
const requestCollectionName = 'tutoringRequests';

app.use(decodeIDToken);
console.log("lol nice");
async function decodeIDToken(req, res, next) {
  const hasToken = req.headers && req.headers.authorization && req.headers.authorization.startsWith('Bearer ');
  if (hasToken) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      const user = await admin.auth().getUser(decodedToken.uid);
      if (user.disabled) {
        res.send("https://bit.ly/2Ht6Wpa");
        return;
      }
      req['currentUser'] = user;
    } catch (err) {
      console.log(err);
    }
  }

  next();
}

app.post('/api/requests/dequeue', async (req, res) => {
  if (req.currentUser) {
    const requestRef = db.collection(requestCollectionName).doc(req.body.requestID);
    await requestRef.update({
      completed: true
    })
    res.status(200).send();
  }
  functions.logger.log(req.currentUser);
})

app.post('/api/requests', async (req, res) => {
  var querySnapshot = null;
  const requestCollection = db.collection(requestCollectionName);
  try {
    querySnapshot = await requestCollection.where("pantherID", "==", req.body.pantherID).where("course", "==", req.body.course).get();
  } catch (error) {
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
  try {
    const requests = (await db.collection(requestCollectionName).orderBy('requestedAt').get()).docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.send(JSON.stringify(requests));
  } catch (error) {
    functions.logger.error(error);
    res.send("Get request issue.");
  }
})

app.use('/api', router);

exports.api = functions.https.onRequest(app);

exports.processSignUp = functions.auth.user().onCreate((user) => {
  admin.auth().updateUser(user.uid, { disabled: true });
  functions.logger.log(user);
});