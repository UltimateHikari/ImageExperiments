import app from 'firebase/app'

const config = {
  apiKey: "AIzaSyDRzY2ZcMmwca0H3DSo7A_DiXiSXCjbM8Y",
  authDomain: "imageexperiments-988de.firebaseapp.com",
  databaseURL: "https://imageexperiments-988de.firebaseio.com",
  projectId: "imageexperiments-988de",
  storageBucket: "imageexperiments-988de.appspot.com",
  messagingSenderId: "1032440433118",
  appId: "1:1032440433118:web:51a058e904f7e529ba754f"
};

class Firebase {
	constructor(){
		app.initializeApp(config);
	}
}

export default Firebase;

