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
