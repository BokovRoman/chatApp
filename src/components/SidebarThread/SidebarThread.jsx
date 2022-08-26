import { Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import styles from './SidebarThread.module.css';
import { useState, useEffect } from 'react';
import db from '../../firebase';
import { setThread } from '../../features/threadSlice';


function SidebarThread({ id, threadName }) {
    
    const dispatch = useDispatch();
    const [threadInfo, setThreadInfo] = useState([]);

    useEffect(() => {
        db.collection('threads').doc(id).collection('messages')
            .orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
            setThreadInfo(snapshot.docs.map((doc)=>doc.data()))
        })
    },[id])

    return (
    <>
        <div className={styles.Container}
                onClick={() => dispatch(setThread({
                    threadId: id,
                    threadName:threadName,
                }))}
            >
                <Avatar
                    src={threadInfo[0]?.photo}
                />
            <div className={styles.ThreadDetail}>
                    <h3>{threadName}</h3>
                    <p>{threadInfo[0]?.message}</p>
                    <p className={styles.Time}>
                        {new Date
                        (threadInfo[0]?.timestamp?.toDate())
                            .toLocaleString()}
                    </p>
            </div>
        </div>
        
    </>
  )
}

export default SidebarThread