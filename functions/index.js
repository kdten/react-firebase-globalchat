const functions = require("firebase-functions");
const filter = require("leo-profanity");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

exports.detectEvilUsers = functions.firestore
    .document("messages/{msgId}")
    .onCreate(async (snap, context) => {
      const {text, uid} = snap.data();

      if (filter.check(text)) {
        const cleaned = filter.clean(text);
        // eslint-disable-next-line max-len
        await snap.ref.update({text: `I got banned for life for saying... ${cleaned}`});
        await db.collection("banned").doc(uid).set({});
      }
    });
