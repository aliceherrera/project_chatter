import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TweetsComponent, {
  TweetDetailComponent,
  FeedComponent,
} from "./Components/TweetsComponent";

const appEL = document.getElementById("root");
if (appEL) {
  const root = createRoot(appEL);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

const TweetsEl = document.getElementById("chatter");
if (TweetsEl) {
  const root = createRoot(TweetsEl);
  root.render(<TweetsComponent {...TweetsEl.dataset} />);
}

const TweetFeedEl = document.getElementById("chatter-feed");
if (TweetFeedEl) {
  const root = createRoot(TweetFeedEl);
  root.render(<FeedComponent {...TweetFeedEl.dataset} />);
}

const tweetDetailElements = document.getElementsByClassName("chatter-detail");
console.log("quantidade de chatter-detail:", tweetDetailElements.length);
Array.from(tweetDetailElements).forEach((container) => {
  if (container instanceof HTMLElement) {
    const root = createRoot(container);
    root.render(
      <TweetDetailComponent
        tweetId={container.dataset.tweetId!}
        className={container.dataset.className}
      />
    );
  }
});
