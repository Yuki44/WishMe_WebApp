import * as functions from 'firebase-functions';
import {document} from 'firebase-functions/lib/providers/firestore';
import {Wish} from '../../src/app/shared/entities/wish';
import {object} from 'firebase-functions/lib/providers/storage';
import {firestore} from 'firebase-admin';
import {forEach} from '@angular/router/src/utils/collection';

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
    // e.g. {'name': 'Marie', 'age': 66}
    const deletedValue = snap.data();
    const wishlistId = deletedValue.id;
    // perform desired operations ...
const wish = document('wish');
    

  });


