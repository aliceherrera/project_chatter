import "./App.css";
import TweetsComponent from "./Components/TweetsComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatter</h1>
        <div>
          <TweetsComponent />
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
