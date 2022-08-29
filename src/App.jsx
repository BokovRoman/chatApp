import Application from './components/Application/Application';
import Login from './components/Login/Login';
import './App.css';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import {login,logout, selectUser } from './features/userSlice';
import { useEffect } from 'react';

function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          displayName: authUser.displayName,
          email:authUser.email,
        }))
      } else {
        dispatch(logout())
      }
      console.log(authUser);
    })
  }, [dispatch])

  return (
    <div className='App'>
      {user ? (<Application />):<Login/>}
      
    </div>
  );
}

export default App;



// $ firebase login:ci
// !  Authenticating with a `login:ci` token is deprecated and will be removed in a future major version of `firebase-tools`. Instead, use a service account key with `GOOGLE_APPLICATION_CREDENTIALS`: https://cloud.google.com/docs/authentication/getting-started

// Visit this URL on this device to log in:
// https://accounts.google.com/o/oauth2/auth?client_id=563584335869-fgrhgmd47bqnekij5i8b5pr03ho849e6.apps.googleusercontent.com&scope=email%20openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloudplatformprojects.readonly%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Ffirebase%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcloud-platform&response_type=code&state=928121506&redirect_uri=http%3A%2F%2Flocalhost%3A9005

// Waiting for authentication...

// +  Success! Use this token to login on a CI server:

// 1//0cC13gZEum1aCCgYIARAAGAwSNwF-L9IrHzjkm2xZFYKiLzgTJttsnIK_1GcBJCwSm8fzwGaqXE7fXMViP5r8fk17Koc9kofeWvQ

// Example: firebase deploy --token "$FIREBASE_TOKEN"