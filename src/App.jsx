import reactLogo from "./assets/react.svg";
import "./App.css";
import Webcam from "./components/Webcam";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={reactLogo} className="logo react" alt="React logo" />

        <h1>Hello from Amplify</h1>
        <Webcam />
      </header>
    </div>
  );
}

export default App;