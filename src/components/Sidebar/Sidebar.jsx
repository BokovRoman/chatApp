import SearchIcon from '@material-ui/icons/Search';
import SidebarThread from '../SidebarThread/SidebarThread';
import { Avatar, IconButton} from '@material-ui/core';
import styles from './Sidebar.module.css';
import {selectUser} from '../../features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from '../../firebase';
import  BorderColorOutlinedIcon  from '@material-ui/icons/BorderColor';
import { useEffect, useState } from 'react';
import firebase from "firebase/compat/app";

function Sidebar() {

  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);



  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
   
        if (searchInput !== '') {
            const filteredData = threads.filter((item) => {
               return item.data.threadName.toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else{
            setFilteredResults(threads)
        }
    
    }
  


  useEffect(() => {
    db.collection('threads').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setThreads(snapshot.docs.map((doc) => ({
        id: doc.id,
        data:doc.data(),
      })))
    })
  }, [])

  const addThread = () => {
    const threadName = prompt("Enter a thread Name");
    db.collection("threads").add({
      threadName: threadName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
    });
  };


  return (
      <div className={styles.Container}>
        <div className={styles.Avatar}>
          <Avatar
          src={user.photo}
          onClick={()=>
          auth.signOut()}
          />
      </div>
      <div className={styles.SearchContainer}>
        <div className={styles.Search}>
          <SearchIcon />
              <input
                onChange={(e) => searchItems(e.target.value)}
                className={styles.Input} 
                placeholder='Search or start new chat' /
            >
      </div>
      <IconButton onClick={addThread} className={styles.Btn}>
            <BorderColorOutlinedIcon/>
        </IconButton>
      </div>
          <div className={styles.BottomBorder}>
          </div>
          <div className={styles.HeadText}>Chats</div>
      <div className={styles.ThreadName}>
       
        {searchInput.length > 1 ? (
                    filteredResults.map(({ id, data: { threadName } }
          ) => {
                        return (
                            <SidebarThread
                            key={id}
                            id={id}
                            threadName={threadName}
                          />
                        )
                    })
                ) : (
                    threads.map(({ id, data: { threadName } }
          ) => (
            <SidebarThread
              key={id}
              id={id}
              threadName={threadName}
            />
          ))
                )}

        </div>  
    </div>
  )
}

export default Sidebar;