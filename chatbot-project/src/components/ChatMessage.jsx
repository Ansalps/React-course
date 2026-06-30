import dayjs from 'dayjs'
import RobotProfileImage from '../assets/robot.png'
import UserProfileImage from '../assets/user.png'
import ScreenShot from '../assets/Screenshot From 2026-06-08 18-43-20.png'
import './ChatMessage.css'

export function ChatMessage({message,sender,time}){
    //const message=props.message;
    //const sender=props.sender;
    //const {message,sender}=props; 

    /*
    if (sender==='robot'){
        return(
            <div>
                <img src="./images/robot.png" alt="" width="50"/>
                {message}
            </div>
        )
    }
    */

    console.log(UserProfileImage)
  

    return(
        <div className={
            sender==='user'
            ?'chat-message-user'
            :'chat-message-robot'
        }>
            {sender==='robot' && (
                <img src={RobotProfileImage} alt="" className="chat-message-profile"/>
            )}

            <div className="chat-message-text">
                {message}
                <div className='chat-message-time'>
                    {dayjs(time).format('h:mma')}
                </div>
            </div>
            
            {sender==='user' && (
                <img src={ScreenShot} alt="" className="chat-message-profile chat-message-user"/>
            )}
        </div>
    )
}