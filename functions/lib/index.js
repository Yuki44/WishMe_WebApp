'use strict';
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
exports.deletedWishlist = functions.firestore
    .document('wishlist/{id}')
    .onDelete((snap, context) => {
    admin.firestore().collection('wish').where('owner', '==', snap.id).get().then(refs => {
        refs.forEach(snapshot => {
            console.log("snapshot: ", JSON.stringify(snapshot));
            snapshot.ref.delete().then(function () {
                console.log("1 documents successfully deleted!");
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
        });
    });
    return true;
});
//# sourceMappingURL=index.js.map