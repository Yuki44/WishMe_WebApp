'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin'); // Admin is necessary in order to call firebase CRUD methods
admin.initializeApp(functions.config().firebase);

exports.deletedWishlist = functions.firestore // exports the function to Firebase
  .document('wishlist/{id}') // We check for the wishlist id
  .onDelete((snap, context) => { // When a wishlist is deleted

    // Block of code to run:

       admin.firestore().collection('wish').where('owner', '==', snap.id).get().then(refs => {
         refs.forEach(snapshot => { // We check for the wish with the owner id from deleted wishlist
           console.log("snapshot: ", JSON.stringify(snapshot));
           snapshot.ref.delete().then(function () { // Then we get the snapshot of it so we can delete it
             console.log("1 documents successfully deleted!")
           }) .catch(function (error) {
             console.error("Error removing document: ", error);
           });
         })
       });
    return true; // Cloud Functions needs to return something or especially a promise
  });


