import {initializeApp, cert} from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
import admin from 'firebase-admin';
import serviceAccount from '../creds.json' assert {type: 'json'};



initializeApp({
    credential: cert(serviceAccount)
})

const db = getFirestore();

export {admin, db};