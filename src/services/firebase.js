import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDavgPo5r444s5ORbLRbk6X8sbyNWov-I4",
    authDomain: "bachelorproef-b2b80.firebaseapp.com",
    projectId: "bachelorproef-b2b80",
    storageBucket: "bachelorproef-b2b80.appspot.com",
    messagingSenderId: "70391191216",
    appId: "1:70391191216:web:9f10d15897bd51ec454d75",
    measurementId: "G-GDK6H218RC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();

export const uploadProductImage = (image, id) => {
    const ref = storage.child('products/' + id + '.jpg');
    return ref.put(image);
};

export const uploadProfilePicture = (image, id) => {
    const ref = storage.child('profile-pictures/' + id + '.jpg');
    return ref.put(image);
};

export const uploadTechPicture = (image, id) => {
    const ref = storage.child('techs/' + id + '.jpg');
    return ref.put(image);
};

export const getUrlById = (id) => {
    const ref = storage.child('products/' + id + '.jpg');
    return ref.getDownloadURL();
};

export const getTechUrlById = (id) => {
    const ref = storage.child('techs/' + id + '.jpg');
    return ref.getDownloadURL();
};
