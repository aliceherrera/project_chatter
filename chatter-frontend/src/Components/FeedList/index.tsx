import React, { useEffect, useState } from "react";
import { type Tweet as TweetType } from "../BackendLookup";
import { type TweetListResponse } from "../BackendLookup";
import { apiTweetFeed } from "../TweetLookup";
import TweetDetail from "../TweetDetail";

interface TweetsListProps {
  newTweets: TweetType[];
  username?: string;
}

const FeedList: React.FC<TweetsListProps> = (props: TweetsListProps) => {
  const [tweetsInit, setTweetsInit] = useState<TweetType[]>([]);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [tweetsDidSet, setTweetsDidSet] = useState<boolean>(false);

  useEffect(() => {
    const final = [...props.newTweets, ...tweetsInit];
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (
        response: TweetListResponse,
        status: number
      ) => {
        if (status === 200) {
          setNextUrl(response.next);
          setTweetsInit(response.results);
          setTweetsDidSet(true);
        } else {
          alert("Ocorreu um erro");
        }
      };
      apiTweetFeed(handleTweetListLookup);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  const handleDidRetweet = (newTweet: TweetType): void => {
    const updateTweetsInit = [newTweet, ...tweetsInit];
    setTweetsInit(updateTweetsInit);
    const updateFinalTweets = [newTweet, ...tweets];
    setTweets(updateFinalTweets);
  };

  const handleLoadMore = (): void => {
    if (nextUrl !== null) {
      const handleLoadMoreResponse = (
        response: TweetListResponse,
        status: number
      ) => {
        if (status === 200) {
          setNextUrl(response.next);
          const newTweets = [...tweets, ...response.results];
          setTweetsInit(newTweets);
          setTweets(newTweets);
          setTweetsDidSet(true);
        } else {
          alert("Ocorreu um erro");
        }
      };
      apiTweetFeed(handleLoadMoreResponse, nextUrl);
    }
  };

  return (
    <>
      {tweets.map((item) => (
        <TweetDetail
          tweet={item}
          didRetweet={handleDidRetweet}
          className="my-5 py-5 border bg-white text-dark"
          key={`${item.id}`}
        />
      ))}
      {nextUrl !== null && (
        <button className="btn btn-outline-primary" onClick={handleLoadMore}>
          Carregar proximo
        </button>
      )}
    </>
  );
};

export default FeedList;
