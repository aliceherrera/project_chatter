import {
  backendLookup,
  type Tweet,
  type TweetCreateCallback,
  type TweetsCallback,
} from "../BackendLookup";

export type TweetAction = "like" | "unlike" | "retweet";

const apiTweetCreate = (
  newTweetContent: { content: string },
  callback: TweetCreateCallback
) => {
  backendLookup<Tweet>("POST", "/tweets/create/", callback, newTweetContent);
};

const apiTweetAction = (
  tweetId: number,
  action: TweetAction,
  callback: TweetsCallback
) => {
  const data = { id: tweetId, action: action };
  backendLookup<Tweet[]>("POST", "/tweets/action/", callback, data);
};

const apiTweetList = (
  username: string | undefined,
  callback: TweetsCallback
) => {
  let endpoint = "/tweets/";
  if (username) {
    endpoint = `/tweets/?username=${username}`;
  }
  backendLookup<Tweet[]>("GET", endpoint, callback);
};

const apiTweetDetail = (tweetId: string, callback: TweetsCallback) => {
  backendLookup<Tweet[]>("GET", `/tweets/?username=${tweetId}`, callback);
};

export { apiTweetCreate, apiTweetList, apiTweetAction, apiTweetDetail };
