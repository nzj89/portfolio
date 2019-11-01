//Firebase
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

//Vuex
import store from '../store'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDtexwVlVePljabSz0NVid5NEh_n4wWAaA",
    authDomain: "nz-eportfolio.firebaseapp.com",
    databaseURL: "https://nz-eportfolio.firebaseio.com",
    projectId: "nz-eportfolio",
    storageBucket: "gs://nz-eportfolio.appspot.com",
    messagingSenderId: "648097155256",
    appId: "1:648097155256:web:b91d92dcd550f730"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

//Firebase Products:
//==================
const firestore = firebase.firestore()
const auth = firebase.auth()
const storage = firebase.storage(); // Get a reference to the storage service, which is used to create references in your storage bucket


export default {
    // eslint-disable-next-line
    install: (Vue, options) => {



        //My Firebase Plugin
        Vue.prototype.$firebasePlugin = {

                //Firebase Products
                myStorage: storage,
                myFirestore: firestore,

                /* ==================================================================== 
                                        LOGIN FUNCTIONS
                ======================================================================= */

                //Email & Password Login
                login: async(email, password) => {
                    return await auth.signInWithEmailAndPassword(email, password)
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: "Wrong password."
                                });
                            } else {
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: errorMessage
                                });
                            }
                        });
                },

                //Register
                signUp: async(email, password) => {
                    return await auth.createUserWithEmailAndPassword(email, password)
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorMessage = error.message;
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: errorMessage
                            });
                        });
                },

                //Google Login
                googleLogin: async() => {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    return await auth.signInWithRedirect(provider)
                        .catch(function(error) {
                            // Handle Errors here.
                            var errorCode = error.code;
                            var errorMessage = error.message;
                            if (errorCode === 'auth/wrong-password') {
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: 'Wrong password.'
                                });
                            } else {
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: errorMessage
                                });
                            }
                        });
                },

                //Facebook Login
                facebookLogin() {
                    var provider = new firebase.auth.FacebookAuthProvider();
                    auth.signInWithRedirect(provider);

                },

                //Logout Function
                logout: async() => {
                    await auth.signOut()
                },

                /* ==================================================================== 
                                        USER FUNCTIONS
                ======================================================================= */

                // Return Current User
                getCurrentUser() {
                    return auth.currentUser;
                },

                // Returns the user's profile Pic
                getProfilePic() {
                    var currentUser = this.getCurrentUser();
                    return currentUser.photoURL || require("@/assets/user.png");
                },

                // Returns the user's display name
                getUserName() {
                    var currentUser = this.getCurrentUser();
                    return currentUser.displayName;
                },

                // Returns the user's ID
                getUID() {
                    var currentUser = this.getCurrentUser();
                    return currentUser.uid;
                },

                // Get the name of the Auth Provider
                getProviderId() {
                    var currentUser = this.getCurrentUser();
                    return currentUser.providerData[0].providerId
                },

                //Unlink The Facebook Auth Provider
                async unlinkProvider(name) {
                    var currentUser = this.getCurrentUser();
                    await currentUser.unlink(name).catch(function(error) {
                        // An error happened
                        alert(error)
                    });
                },

                //Link Facebook Provider 
                async linkFacebookProvider() {
                    var provider = new firebase.auth.FacebookAuthProvider();
                    var currentUser = this.getCurrentUser();
                    await currentUser.linkWithPopup(provider).then(function(result) {
                        // Accounts successfully linked.
                        var facebookAccessToken = result.credential.accessToken;
                        store.commit("updateFBAToken", facebookAccessToken);
                    }).catch(function(error) {
                        // An error happened
                        alert(error)
                    });
                },

                //Link Google Provider 
                async linkGoogleProvider() {
                    var provider = new firebase.auth.GoogleAuthProvider();
                    var currentUser = this.getCurrentUser();
                    await currentUser.linkWithPopup(provider).then(function(result) {
                        // Accounts successfully linked.
                        var googleAccessToken = result.credential.accessToken;
                        store.commit("updateGoogleToken", googleAccessToken);
                    }).catch(function(error) {
                        // An error happened
                        alert(error)
                    });
                },

                //Sends the Facebook AccessToken to the store
                async getFacebookAccessToken() {
                    await this.unlinkProvider("facebook.com")
                    await this.linkFacebookProvider()
                },

                //Sends the Google AccessToken to the store
                async getGoogleAccessToken() {
                    await this.unlinkProvider("google.com")
                    await this.linkGoogleProvider()
                },


                // Return Current User Credential
                async getUserCredential(email, password) {
                    switch (this.getProviderId()) {
                        case "password":
                            var credential = await firebase.auth.EmailAuthProvider.credential(
                                email,
                                password
                            );
                            return credential;
                        case "facebook.com":
                            await this.getFacebookAccessToken();
                            var facebookAccessToken = store.getters.fbtGetter
                            return firebase.auth.FacebookAuthProvider.credential(facebookAccessToken);
                        case "google.com":
                            await this.getGoogleAccessToken();
                            var googleAccessToken = store.getters.gtGetter
                            return firebase.auth.GoogleAuthProvider.credential(null,
                                googleAccessToken);
                            //pollovolteado@gmail.com
                        default:
                            return null
                    }
                },

                // Update User's Display Name
                async updateDisplayName(newName) {
                    var currentUser = this.getCurrentUser();
                    currentUser
                        .updateProfile({ displayName: newName })
                        .then(() => {
                            // Update user in the store
                            store.commit("updateUser2", currentUser);
                            //Alert Other components of the update
                            store.commit("changeUpdateFlag", !store.getters.updateFlag);
                            // Success msg on Snackbar
                            store.commit("callSnackBar", {
                                icon: "done_outline",
                                color: "info",
                                msg: "Change successful!"
                            });
                        })
                        .catch(error => {
                            // An error happened.
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: error
                            });
                        });
                },

                // Update The User's Email
                async updateEmail(newEmail, password) {
                    var currentUser = this.getCurrentUser();
                    //Get User Credential
                    var credential = await this.getUserCredential(
                        currentUser.email,
                        password
                    );
                    // Re-authenticate the user with the credential
                    currentUser
                        .reauthenticateWithCredential(credential)
                        .then(() => {
                            // User re-authenticated.
                            currentUser
                                .updateEmail(newEmail)
                                .then(
                                    // This function fires when the update is successful
                                    () => {
                                        // Update user in the store
                                        store.commit("updateUser2", currentUser);
                                        //Alert Other components of the update
                                        store.commit("changeUpdateFlag", !store.getters.updateFlag)
                                            // Success msg on Snackbar
                                        store.commit("callSnackBar", {
                                            icon: "done_outline",
                                            color: "info",
                                            msg: "Change successful!"
                                        });
                                    }
                                )
                                .catch(error => {

                                    // An error happened.
                                    store.commit("callSnackBar", {
                                        icon: "error",
                                        color: "error",
                                        msg: error
                                    });
                                });
                        })
                        .catch(error => {
                            alert(error)
                                // An error happened.
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: error
                            });
                        });
                },


                // Update The User's Password
                async updatePassword(newPassword, currentPassword) {
                    var currentUser = this.getCurrentUser();
                    //Get User Credential
                    var credential = await this.getUserCredential(
                        currentUser.email,
                        currentPassword
                    );
                    // Re-authenticate the user with the credential
                    currentUser
                        .reauthenticateWithCredential(credential)
                        .then(() => {
                            // User re-authenticated.
                            currentUser
                                .updatePassword(newPassword)
                                .then(() => {
                                    // Update User in Store
                                    store.commit("updateUser2", currentUser);
                                    //Alert Other components of the update
                                    store.commit("changeUpdateFlag", !store.getters.updateFlag)
                                    store.commit("callSnackBar", {
                                        icon: "done_outline",
                                        color: "info",
                                        msg: "Change successful!"
                                    });
                                })
                                .catch(error => {
                                    // An error happened.                                     
                                    store.commit("callSnackBar", {
                                        icon: "error",
                                        color: "error",
                                        msg: error
                                    });
                                });
                        })
                        .catch(error => {
                            // An error happened.
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: error
                            });

                        });
                },

                // Returns true or false depending on the presence of the users Profile Img in storage
                async checkProfileImgInStorage() {
                    var currentUser = this.getCurrentUser();
                    // Create a root reference
                    var storageRef = storage.ref();
                    // Create destination ref
                    var imgRef = storageRef.child("profilePictures/" + currentUser.uid);
                    var imgExists = true;
                    await imgRef.getDownloadURL().catch(function() {
                        // An error happened.
                        imgExists = false
                    });
                    return imgExists
                },


                //Deletes Profile Image in Storage
                async deleteProfileImgInStorage(userId) {
                    if (await this.checkProfileImgInStorage()) {
                        // Create a root reference
                        var storageRef = storage.ref();
                        // Create destination ref
                        var imgRef = storageRef.child("profilePictures/" + userId);
                        // Delete the file
                        imgRef
                            .delete()
                            .then(function() {
                                // File deleted successfully
                            })
                            .catch(function(error) {
                                // Uh-oh, an error occurred!
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: "An error ocurred while deleting User Profile Image: " + error
                                });
                            });
                    }
                },

                //Delete The User
                async deleteUser(password) {
                    var currentUser = this.getCurrentUser();
                    var credential = await this.getUserCredential(
                        currentUser.email,
                        password
                    );
                    currentUser.reauthenticateWithCredential(credential).then(() => {
                        // User re-authenticated.
                        currentUser
                            .delete()
                            .then(() => {
                                // Update User in store
                                store.commit("updateUser2", null);
                                //Alert Other components of the update
                                store.commit("changeUpdateFlag", !store.getters.updateFlag);
                            })
                            .catch(error => {
                                // An error happened.
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: error
                                });
                            });
                    });
                },
                /* ==================================================================== 
                                        CHAT FUNCTIONS
                ======================================================================= */
                // Saves a new message on the firestore
                saveMsg(msg) {
                    var today = new Date();
                    var time = today.getHours() + ":" + today.getMinutes();
                    var day = today.getDate()
                    var month = today.getMonth() + 1
                        // Add a new message to the firestore
                    firestore.collection('messages').add({
                        userName: this.getUserName(),
                        msg: msg,
                        profilePic: this.getProfilePic(),
                        imgURL: null,
                        uid: this.getUID(),
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        time: time,
                        day: day,
                        month: month
                    }).then(function() {
                        store.commit("updateMsgRdyFlag", !store.getters.getMsgRdyFlag);
                    }).catch(function(error) {
                        alert('Error writing new message to Firebase Database', error);
                    });
                },

                // Loads chat messages history and listens for upcoming ones.
                loadMsgs() {
                    var msgs = []

                    //.limit(10)
                    var query = firestore.collection('messages').orderBy('timestamp', 'asc');
                    query.onSnapshot(snapshot => {
                        const changes = snapshot.docChanges();
                        changes.forEach((change) => {
                            if (change.type === "added") {

                                // Using the written msg to find the msg ID
                                // Then I can save a img in storage
                                // And update the msg with he help of the ID i just found below
                                if (store.getters.getMsgTracker == change.doc.data().msg) {
                                    store.commit("updateMsgTracker", change.doc.id);
                                }
                                msgs.push({
                                    ...change.doc.data(),
                                    id: change.doc.id
                                });
                            } else if (change.type === 'removed') {
                                var removeIndex = msgs.map(function(item) { return item.id; })
                                    .indexOf(change.doc.id);
                                msgs.splice(removeIndex, 1);
                            } else if (change.type === 'modified') {
                                // This makes a new array with only the ids
                                // Then i ask for the index of my doc id
                                var changeIndex = msgs.map(function(item) { return item.id; })
                                    .indexOf(change.doc.id);
                                msgs[changeIndex].msg = change.doc.data().msg
                                if (change.doc.data().imgURL) {
                                    msgs[changeIndex].imgURL = change.doc.data().imgURL
                                } else {
                                    msgs[changeIndex].imgURL = null
                                }

                            }
                        });

                    });
                    return msgs;
                },
                // Deletes msg in firestore with corresponding ID
                delMsg(id, msgImg) {
                    if (msgImg) {
                        //Del Img in Storage
                        var storageRef = storage.ref();
                        var imgRef = storageRef.child("chatPictures/" + id);
                        imgRef
                            .delete()
                            .catch(function(error) {
                                // Uh-oh, an error occurred!
                                store.commit("callSnackBar", {
                                    icon: "error",
                                    color: "error",
                                    msg: "An error ocurred while deleting Msg Img: " + error
                                });
                            });
                    }
                    firestore.collection('messages').doc(id).delete().catch(function(error) {
                        alert("Error removing document: ", error);
                    });

                },
                // Edit msg in firestore with corresponding ID
                editMessage(id, newMsg) {
                    firestore.collection('messages').doc(id).update({ msg: newMsg });
                },
                // Update the msg with the download URL
                addImg2Msg(docID, imgUrl) {
                    var msgDoc = firestore.collection("messages").doc(docID);

                    return msgDoc.update({
                            imgURL: imgUrl
                        })
                        .catch(function(error) {
                            // The document probably doesn't exist.
                            alert("Error updating document: ", error);
                        });
                },
                deleteImage(msgID) {

                    //Del Img in Storage
                    var storageRef = storage.ref();
                    var imgRef = storageRef.child("chatPictures/" + msgID);
                    imgRef
                        .delete()
                        .then(function() {

                            // File deleted successfully, update the Msg
                            firestore.collection('messages').doc(msgID).update({ imgURL: null });
                        })
                        .catch(function(error) {
                            // Uh-oh, an error occurred!
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: "An error ocurred while deleting Msg Img: " + error
                            });
                        });


                },
                justDeleteImg(msgID) {
                    //Del Img in Storage
                    var storageRef = storage.ref();
                    var imgRef = storageRef.child("chatPictures/" + msgID);
                    imgRef
                        .delete()
                        .catch(function(error) {
                            // Uh-oh, an error occurred!
                            store.commit("callSnackBar", {
                                icon: "error",
                                color: "error",
                                msg: "An error ocurred while deleting Msg Img: " + error
                            });
                        });
                },

                async checkeImgInMsg(msgId) {
                    // Create a root reference
                    var storageRef = storage.ref();
                    // Create destination ref
                    var imgRef = storageRef.child("chatPictures/" + msgId);
                    var imgExists = true;
                    await imgRef.getDownloadURL().catch(function() {
                        // An error happened.
                        imgExists = false
                    });
                    return imgExists
                },

                /* ==================================================================== 
                                    TEST FUNCTIONS
                ======================================================================= */
                test() {

                }
            },

            //Update User in the store when firebase user changes.
            auth.onAuthStateChanged(user => {
                store.commit('updateUser', { user })
            })
    }
}