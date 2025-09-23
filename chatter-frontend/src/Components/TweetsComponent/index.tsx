import { useState } from "react";
import TweetCreate from "../TweetCreate";
import TweetsList from "../TweetsList";
import type { Tweet as TweetType } from "../BackendLookup";

interface TweetsComponentProps {
  username?: string;
  className?: string;
  canTweet?: boolean;
}

const TweetsComponent: React.FC<TweetsComponentProps> = (props) => {
  const [newTweets, setNewTweets] = useState<TweetType[]>([]);
  // const canTweet = props.canTweet === "false" ? false : true;
  const { canTweet = true } = props;
  const handleNewTweet = (newTweet: TweetType): void => {
    const tempNewTweets = [...newTweets];
    tempNewTweets.unshift(newTweet);
    setNewTweets(tempNewTweets);
  };
  return (
    <div className={props.className}>
      {canTweet === true && (
        <TweetCreate didTweet={handleNewTweet} className="col-12 mb-3" />
      )}
      <TweetsList newTweets={newTweets} {...props} />
    </div>
  );
};

export default TweetsComponent;
