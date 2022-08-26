import axios from 'axios';
import { Avatar, IconButton } from '@material-ui/core';
import styles from './Thread.module.css';
import MessageWindow from '../MessageWindow/MessageWindow';
import SendIcon from '@material-ui/icons/Send';
import { useState, useEffect } from "react";
import db from '../../firebase';
import { useSelector } from 'react-redux';
import { selectThreadId, selectThreadName } from '../../features/threadSlice';
import firebase from "firebase/compat/app";
import { selectUser } from '../../features/userSlice';
axios.defaults.timeout = 5000;



function Thread() {

    const [input, setInput] = useState("");
    const [response, setResponse] = useState({ joke: '' });
    const [messages, setMessages] = useState([]);
    const threadName = useSelector(selectThreadName);
    const threadId = useSelector(selectThreadId);
    const user = useSelector(selectUser);

    useEffect(() => {

        if (threadId) {
            db.collection('threads').doc(threadId).collection
            ('messages').orderBy("timestamp", "desc").onSnapshot(
                (snapshot) => setMessages(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data:doc.data(),
            }))))
        }

    }, [threadId])


    const responseMessage = async () => {
        const result = await axios.get('https://api.chucknorris.io/jokes/random');
        // console.log(result.data.value);
        setResponse({
            ...response,
            joke:result.data.value
        })
    }
    
    const sendMessage = (e) => {
        e.preventDefault()
        db.collection('threads').doc(threadId).collection('messages').add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                uid: user.uid,
                photo: user.photo,
                email: user.email,
                displayName: user.displayName,
                response:response.joke
        })
        responseMessage();
        
        setInput('');
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Header}>
                <div className={styles.HeaderDetails}>
                        {threadId ? (<Avatar
                             src={user.photo}
                            />):(<Avatar/>)}
                    <div className={styles.Name}>
                        <h4>{threadId ? threadName : "Click on any ChatName"}</h4>
                    </div>
                </div>
            </div>
            <div className={styles.Message}>
          
                    {messages.map(({ id, data:{message,photo, timestamp, email,response} }) => (
                    <MessageWindow id={id}
                        key={id}
                        message={message}
                        photo={photo}
                        timestamp={timestamp}
                            email={email}
                            response={response}
                    />
                ))}
            </div>
            <div className={styles.Input}>
                <form>
                    <input
                        onChange={(e) => setInput(e.target.value)}
                        value={input}
                        placeholder='Type your message'
                        type='text'
                    />
                    <IconButton onClick={sendMessage } type="submit">
                        <SendIcon
                        />
                    </IconButton>
                </form>
            </div>
        </div>
    )
}

export default Thread;
