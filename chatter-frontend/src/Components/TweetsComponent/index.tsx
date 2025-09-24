import React, { useState, useEffect } from "react";
import TweetCreate from "../TweetCreate";
import TweetsList from "../TweetsList";
import { apiTweetDetail } from "../TweetLookup";
import type { Tweet as TweetType } from "../BackendLookup";
import Tweet from "../TweetDetail";

interface TweetsComponentProps {
  username?: string;
  className?: string;
  canTweet?: boolean;
}

const TweetsComponent: React.FC<TweetsComponentProps> = (props) => {
  console.log("TweetsComponent RENDERIZOU com ID:", props.username);
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

interface TweetDetailProps {
  tweetId: string;
  className?: string;
}

const TweetDetailComponent: React.FC<TweetDetailProps> = ({
  tweetId,
  className,
}) => {
  console.log("TweetDetailComponent RENDERIZOU com ID:", tweetId);
  // const [didLookup, setDitLookup] = useState(false);
  const [tweet, setTweet] = useState<TweetType | null>(null);

  useEffect(() => {
    const handleBackendLookup = (response: TweetType, status: number) => {
      if (status === 200) {
        setTweet(response);
      } else {
        alert("Erro ao buscar tweet");
      }
    };
    apiTweetDetail(tweetId, handleBackendLookup);
  }, [tweetId]);

  if (tweet === null) {
    return null;
  }
  return <Tweet tweet={tweet} className={className} />;
};

export { TweetDetailComponent };
export default TweetsComponent;
