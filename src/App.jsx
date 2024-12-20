
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AnalyzerView from "./components/AnalyzerView";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function App() {
  const tableRef = useRef(null);
  const [state, setState] = useState({ type: 'nothingDetected' });

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = new SockJS(backendUrl + '/ws');
    const client = Stomp.over(socket);

    socket.onopen = function () {
      console.log('open socket');
    }

    client.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      client.subscribe('/topic/messages', (response) => {
        const responseObj = JSON.parse(response.body);
        setState(responseObj.foundWaste ? { type: responseObj.state, foundWaste: responseObj.foundWaste } : { type: responseObj.state });
      });
    });
  }, [tableRef]);

  const enterFullscreen = () => {
    const elem = tableRef.current;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
  };

  return (
    <div>
      <button onClick={handleFullscreen}>Full Screen</button>
      <div ref={tableRef} className="app-container">
        <AnalyzerView state={state} />
      </div>
    </div>
  );
}

export default App;