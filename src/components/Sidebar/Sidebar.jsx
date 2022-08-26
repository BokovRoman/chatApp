import SearchIcon from '@material-ui/icons/Search';
import SidebarThread from '../SidebarThread/SidebarThread';
import { Avatar, IconButton} from '@material-ui/core';
import styles from './Sidebar.module.css';
import {selectUser} from '../../features/userSlice';
import { useSelector } from 'react-redux';
import db, { auth } from '../../firebase';
import  BorderColorOutlinedIcon  from '@material-ui/icons/BorderColor';
import { useEffect, useState } from 'react';

function Sidebar() {

  const user = useSelector(selectUser);
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    db.collection('threads').onSnapshot((snapshot) => {
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
        
        {
          threads.map(({ id, data: { threadName } }
          ) => (
            <SidebarThread
              key={id}
              id={id}
              threadName={threadName}
            />
          ))
        }
        </div>  
    </div>
  )
}

export default Sidebar;