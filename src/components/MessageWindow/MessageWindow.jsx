import { Avatar } from '@material-ui/core';
import "./Message.css";
import { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';


const MessageWindow=forwardRef(({
    id,
    timestamp,
    message,
    photo,
    email,
    response,
    responseTimestamp
}, ref) => {
  
  const user = useSelector(selectUser);

  return (
    <>
      <div className={`message ${user.email===email&&`message-sender`}`} ref={ref}>
        <Avatar className='message-photo'
          src={photo}
        />
        <div className='message-contents'>
          <p className='message-content'>
              {message}
          </p>
          <small className='message-timestamp'>{new Date
            (timestamp?.toDate()).toLocaleString()}</small>  
        </div>
      </div>
      {response?(<div className={`message`} ref={ref}>
      <Avatar className='message-photo'
      />
        <div className='message-contents'>
            <p className='message-content'>
              {response}
        </p>
        <small className='message-timestamp'>{new Date
          (responseTimestamp?.toDate()).toLocaleString()}</small>  
        </div></div>):(<div></div>)}
    </>
  )
})

export default MessageWindow;