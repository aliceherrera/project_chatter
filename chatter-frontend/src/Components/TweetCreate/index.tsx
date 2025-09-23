import React, { useRef } from "react";
import { apiTweetCreate } from "../TweetLookup";
import type { Tweet, Tweet as TweetType } from "../BackendLookup";

interface TweetCreateProps {
  didTweet: (newTweet: TweetType) => void;
  className?: string;
}

const TweetCreate: React.FC<TweetCreateProps> = (props) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const { didTweet } = props;

  const handleBackendUpdate = (response: Tweet, status: number) => {
    if (status === 201) {
      didTweet(response);
    } else {
      console.log(response);
      alert("Ocorreu um erro, por favor tente novamente.");
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (textAreaRef.current) {
      const newVal = textAreaRef.current.value;
      // backend api request
      apiTweetCreate({ content: newVal }, handleBackendUpdate);
      textAreaRef.current.value = "";
    }
  };
  return (
    <div className={props.className}>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={textAreaRef}
          required={true}
          className="form-control"
          name="tweet"
        ></textarea>
        <button type="submit" className="btn btn-primary my-3">
          Tweet
        </button>
      </form>
    </div>
  );
};

export default TweetCreate;
