import app from 'firebase/app'
import 'firebase/remote-config'
import 'firebase/database'

const config = {
  apiKey: "AIzaSyDRzY2ZcMmwca0H3DSo7A_DiXiSXCjbM8Y",
  authDomain: "imageexperiments-988de.firebaseapp.com",
  databaseURL: "https://imageexperiments-988de.firebaseio.com",
  projectId: "imageexperiments-988de",
  storageBucket: "imageexperiments-988de.appspot.com",
  messagingSenderId: "1032440433118",
  appId: "1:1032440433118:web:51a058e904f7e529ba754f"
};

const lapp = app.initializeApp(config);
const rmconfig = app.remoteConfig();

rmconfig.settings = {
      fetchTimeMillis: 60000,
      minimumFetchIntervalMillis: 3600000,
    };

const RmFetch = () => {
  rmconfig.fetchAndActivate()
    .then(activated => {
      console.log(activated);
    })
    .catch((err) => {
      console.error(err);
    });
};

class Firebase {
	constructor(){
    this.db = app.database();
    rmconfig.ensureInitialized()
  .then(() => {
    console.log('Firebase Remote Config is initialized');
    RmFetch()
  })
  .catch((err) => {
    console.error('Firebase Remote Config failed to initialize', err);
  });
    

	}

  attempt = aid => this.db.ref(`atms/${aid}`);
  attempts = () => this.db.ref('atms');
  value_images = () => JSON.parse(rmconfig.getString('value_images_links'));
  test_images = () => JSON.parse(rmconfig.getString('test_images_links'));
}

export default Firebase;

