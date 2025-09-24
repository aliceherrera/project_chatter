import React from "react";
import { useState } from "react";

import ActionBtn from "../Button";
import type { Tweet as TweetType } from "../BackendLookup";

const ParentTweet = (props: { tweet: TweetType }) => {
  const { tweet } = props;
  return tweet.parent ? (
    <div className="row">
      <div className={"col-11 mx-auto p-3 border rounded"}>
        <p className="mb-0 text-muted">Retweet</p>
        <Tweet hideActions className={" "} tweet={tweet.parent} />
      </div>
    </div>
  ) : null;
};

const Tweet = (props: {
  tweet: TweetType;
  didRetweet?: (response: TweetType) => void;
  hideActions?: boolean;
  className?: string;
}) => {
  const { tweet, didRetweet, hideActions } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  // const [actionTweet, setActionTweet] = useState<TweetType | null>(props.tweet ? props.tweet : null);

  const handlerPerformAction = (newActionTweet: TweetType, status: number) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";

  const handleLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };

  const path = window.location.pathname;
  const match = path.match(/(?<tweetid>\d+)/);
  const urlTweetId = match?.groups?.tweetid ?? -1;
  // const urlTweetId = match ? match.groups.tweetid : -1;
  const isDetail = `${tweet.id}` === `${urlTweetId}`;

  if (!actionTweet) {
    return null;
  }

  return (
    <div className={className}>
      <div>
        <p>
          {tweet.id},{tweet.content}, {tweet.likes}
          <ParentTweet tweet={tweet} />
        </p>
      </div>
      <div className="btn btn-group">
        {actionTweet && !hideActions && (
          <React.Fragment>
            <ActionBtn
              tweet={actionTweet}
              didPerformAction={handlerPerformAction}
              action={{ type: "like", display: "Likes" }}
            />
            <ActionBtn
              tweet={actionTweet}
              didPerformAction={handlerPerformAction}
              action={{ type: "unlike", display: "Unlike" }}
            />
            <ActionBtn
              tweet={actionTweet}
              didPerformAction={handlerPerformAction}
              action={{ type: "retweet", display: "Retweets" }}
            />
          </React.Fragment>
        )}
        {!isDetail ? (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleLink}
          >
            View
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Tweet;
