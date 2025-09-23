import { useEffect, useState } from "react";
import { type Tweet as TweetType } from "../BackendLookup";
import { apiTweetList } from "../TweetLookup";
import TweetDetail from "../TweetDetail";

interface TweetsListProps {
  newTweets: TweetType[];
  username?: string;
}

const TweetsList: React.FC<TweetsListProps> = (props: TweetsListProps) => {
  const [tweetsInit, setTweetsInit] = useState<TweetType[]>([]);
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [tweetsDidSet, setTweetsDidSet] = useState<boolean>(false);

  useEffect(() => {
    // const final = [...props.newTweets].concat(tweetsInit);
    const final = [...props.newTweets, ...tweetsInit]; //para evitar loop infinito
    if (final.length !== tweets.length) {
      setTweets(final);
    }
  }, [props.newTweets, tweets, tweetsInit]);

  useEffect(() => {
    if (tweetsDidSet === false) {
      const handleTweetListLookup = (response: TweetType[], status: number) => {
        if (status === 200) {
          setTweetsInit(response);
          setTweetsDidSet(true);
        } else {
          alert("Ocorreu um erro");
        }
      };
      apiTweetList(props.username, handleTweetListLookup);
    }
  }, [tweetsInit, tweetsDidSet, setTweetsDidSet, props.username]);

  const handleDidRetweet = (newTweet: TweetType): void => {
    const updateTweetsInit = [newTweet, ...tweetsInit];
    // updateTweetsInit.unshift(newTweet);
    setTweetsInit(updateTweetsInit);
    const updateFinalTweets = [newTweet, ...tweets];
    // updateFinalTweets.unshift(tweets); //bug: adicionava o array inteiro dentro de si mesmo.
    setTweets(updateFinalTweets);
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
    </>
  );

  // return (tweets.map((item, index) => {
  //   return (
  //     <Tweet
  //       tweet={item}
  //       didRetweet={handleDidRetweet}
  //       className="my-5 py-5 border bg-white text-dark"
  //       key={`${index}-{item.id}`}
  //     />
  //   );
  // });
};

export default TweetsList;
