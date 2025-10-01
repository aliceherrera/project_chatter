import React from "react";
import { useState } from "react";

import ActionBtn from "../Button";
import type { Tweet as TweetType, User } from "../BackendLookup";
import UserDisplay, { UserPicture } from "../UserDisplay";

const ParentTweet = (props: { tweet: TweetType; retweeter: User }) => {
  const { tweet, retweeter } = props;
  return tweet.parent ? (
    <Tweet
      isRetweet
      retweeter={retweeter}
      hideActions
      className={" "}
      tweet={tweet.parent}
    />
  ) : null;
};

const Tweet = (props: {
  tweet: TweetType;
  didRetweet?: (response: TweetType) => void;
  hideActions?: boolean;
  isRetweet?: boolean;
  retweeter?: User;
  className?: string;
}) => {
  const { tweet, didRetweet, hideActions, isRetweet, retweeter } = props;
  const [actionTweet, setActionTweet] = useState(
    props.tweet ? props.tweet : null
  );
  const className = props.className
    ? props.className
    : "col-10 mx-auto col-md-6";

  const path = window.location.pathname;
  const match = path.match(/(?<tweetid>\d+)/);
  const urlTweetId = match?.groups?.tweetid ?? -1;
  const isDetail = `${tweet.id}` === `${urlTweetId}`;

  const handlerPerformAction = (newActionTweet: TweetType, status: number) => {
    if (status === 200) {
      setActionTweet(newActionTweet);
    } else if (status === 201) {
      if (didRetweet) {
        didRetweet(newActionTweet);
      }
    }
  };

  const handleLink = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    window.location.href = `/${tweet.id}`;
  };

  if (!actionTweet) {
    return null;
  }

  return (
    <div className={className}>
      {isRetweet && retweeter && (
        <p className="mb-3 small text-muted">
          Repostado por <UserDisplay user={retweeter} includeFullName={false} />
        </p>
      )}
      <div className="d-flex flex-row">
        <div className="col-1">
          <UserPicture user={tweet.user} />
        </div>
        <div className="col-11">
          <div>
            <p>
              <UserDisplay user={tweet.user} includeFullName={true} />
            </p>
            {isRetweet === true && <span>Retweet</span>}
            <p>{tweet.content}</p>
            <ParentTweet tweet={tweet} retweeter={tweet.user} />
            <p>♥ {tweet.likes}</p>
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
      </div>
    </div>
  );
};

export default Tweet;
