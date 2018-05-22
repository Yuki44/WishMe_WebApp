'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.deletedWishlist = functions.firestore
    .document('wishlist/{id}')
    .onDelete((snap, context) => {
    const deletedValue = snap.data();
    console.log("Deleted: " + deletedValue.id + " " + context);
    admin.firestore().collection('wish').where('owner', '==', "igaXZSdnlp2pHqwm203h").get().then(result => {
        console.log("Checking for the retrieved test wish: ", JSON.stringify(result));
    });
    // const wishlistId = deletedValue.id;
    // const wish = document('wish');
});
//# sourceMappingURL=index.js.map