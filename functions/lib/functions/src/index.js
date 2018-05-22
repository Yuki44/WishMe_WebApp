'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
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
    console.log("Deleted: " + deletedValue + " " + context);
    let testWish = admin.firestore().collection('Wish').where('owner', '==', "EVtdLD7KUIBF37W16Iii");
    // const wishlistId = deletedValue.id;
    console.log("Checking for the retrieved test wish: ", JSON.stringify(testWish()));
    // const wish = document('wish');
});
//# sourceMappingURL=index.js.map