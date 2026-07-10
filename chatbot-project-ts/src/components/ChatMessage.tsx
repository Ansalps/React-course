import dayjs from "dayjs";
import RobotProfileImage from "../assets/robot.png";
import UserProfileImage from "../assets/user.png";
import ScreenShot from "../assets/Screenshot From 2026-06-08 18-43-20.png";
import "./ChatMessage.css";
import LoadingSpinner from "../assets/loading-spinner.gif";

type ChatMessageProps = {
  message: string;
  sender: "user" | "robot";
  time: number;
  loading?: boolean;
};

export function ChatMessage({
  message,
  sender,
  time,
  loading = false,
}: ChatMessageProps) {
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

  console.log(UserProfileImage);

  return (
    <div
      className={sender === "user" ? "chat-message-user" : "chat-message-robot"}
    >
      {sender === "robot" && (
        <img src={RobotProfileImage} alt="" className="chat-message-profile" />
      )}

      <div className="chat-message-text">
        {loading ? (
          <img
            src={LoadingSpinner}
            alt="Loading..."
            className="loading-spinner"
          />
        ) : (
          <>
            {message}
            <div className="chat-message-time">
              {dayjs(time).format("h:mma")}
            </div>
          </>
        )}
      </div>

      {sender === "user" && (
        <img
          src={ScreenShot}
          alt=""
          className="chat-message-profile chat-message-user"
        />
      )}
    </div>
  );
}
