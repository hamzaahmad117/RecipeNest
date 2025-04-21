const {initializeApp, cert} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
const admin = require('firebase-admin');

const serviceAccount = require('./creds.json');


initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

module.exports = {admin, db};