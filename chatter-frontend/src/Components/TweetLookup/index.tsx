import {
  backendLookup,
  type Tweet,
  type TweetCreateCallback,
  type TweetsCallback,
  type TweetListCallback,
  type TweetListResponse,
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

const apiTweetFeed = (callback: TweetListCallback, nextUrl?: string) => {
  let endpoint = "/tweets/feed/";
  if (nextUrl !== undefined && nextUrl !== null) {
    endpoint = nextUrl.replace("http://localhost:8000/api", "");
  }
  backendLookup<TweetListResponse>("GET", endpoint, callback);
};

const apiTweetList = (
  username: string | undefined,
  callback: TweetListCallback,
  nextUrl?: string
) => {
  let endpoint = "/tweets/";
  if (username) {
    endpoint = `/tweets/?username=${username}`;
  }
  if (nextUrl !== undefined && nextUrl !== null) {
    endpoint = nextUrl.replace("http://localhost:8000/api", "");
  }
  backendLookup<TweetListResponse>("GET", endpoint, callback);
};

const apiTweetDetail = (
  tweetId: string,
  callback: (response: Tweet, status: number) => void
) => {
  const endpoint = `/tweets/${tweetId}`;
  backendLookup<Tweet>("GET", endpoint, callback);
};

export {
  apiTweetCreate,
  apiTweetList,
  apiTweetAction,
  apiTweetDetail,
  apiTweetFeed,
};
