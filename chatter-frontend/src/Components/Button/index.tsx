import type { Tweet as TweetType } from "../BackendLookup";
import { apiTweetAction } from "../TweetLookup";

export type Props = {
  action: { type: "like" | "unlike" | "retweet"; display: string };
};

const ActionBtn = (props: {
  tweet: TweetType;
  className?: string;
  action: { type: "like" | "unlike" | "retweet"; display: string };
  didPerformAction: (response: TweetType, status: number) => void;
}) => {
  const { tweet, action, didPerformAction } = props;
  const likes = tweet.likes ? tweet.likes : 0;
  const actionDisplay = action.display ? action.display : "Action";
  const display =
    action.type === "like" ? `${likes} ${actionDisplay}` : actionDisplay;

  const className = props.className
    ? props.className
    : "btn btn-primary btn-sm";

  const handleActionBackendEvent = (response: TweetType[], status: number) => {
    console.log(response, status);
    if ((status === 200 || status === 201) && didPerformAction) {
      if (response && response.length > 0) {
        didPerformAction(response[0], status);
      }
    }
  };
  const handleClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    apiTweetAction(tweet.id, action.type, handleActionBackendEvent);
  };

  return (
    <button className={className} onClick={handleClick}>
      {display}
    </button>
  );
};

export default ActionBtn;
