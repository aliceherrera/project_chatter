import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import TweetsComponent from "./Components/TweetsComponent";
import React from "react";

const appEL = document.getElementById("root");
if (appEL) {
  const root = createRoot(appEL);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}

const e = React.createElement;

const TweetsEl = document.getElementById("chatter");
if (TweetsEl) {
  const root = createRoot(TweetsEl);
  root.render(e(TweetsComponent, TweetsEl.dataset));
}

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
