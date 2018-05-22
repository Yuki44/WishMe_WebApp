"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.deletedWishlist = functions.firestore
    .document('wishlist/{id}')
    .onDelete((snap, context) => {
    // Get an object representing the document prior to deletion
    console.log('A wishlist got deleted');
    // e.g. {'name': 'Marie', 'age': 66}
    const deletedValue = snap.data();
    // perform desired operations ...
});
//# sourceMappingURL=index.js.map