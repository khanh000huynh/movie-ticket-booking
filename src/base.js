import firebase from "firebase";
import Rebase from "re-base";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCsHahr72cWn0Nn2J8jAngxwyMwb3J9Vcw",
  authDomain: "movie-ticket-booking-web.firebaseapp.com",
  databaseURL: "https://movie-ticket-booking-web.firebaseio.com",
  projectId: "movie-ticket-booking-web",
  storageBucket: "movie-ticket-booking-web.appspot.com",
  messagingSenderId: "630077472785",
  appId: "1:630077472785:web:bc70ac97dda6d7ccba31b0",
});

const base = Rebase.createClass(firebase.database());

export { firebaseConfig };
export default base;
