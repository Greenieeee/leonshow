
import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import AnalyzerView from "./components/AnalyzerView";
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

function App() {
  const tableRef = useRef(null);
  const [state, setState] = useState({ type: 'nothingDetected' });
  // const [state, setState] = useState({ type: 'analyzing' });
  // const foundWaste = {
  //   category: 'plastic',
  //   desc: 'Plastic bottle',
  //   reason: 'It is recyclable',
  // };
  // const [state, setState] = useState({ type: 'finishedAnalyzing', foundWaste });

  // useEffect(() => {
  //   const socket = new SockJS('http:/localhost:8080/ws');

  //   const client = Stomp.over(socket);

  //   socket.onopen = function () {
  //     console.log('open socket');
  //   }

  //   client.connect({}, function (frame) {
  //     console.log('Connected: ' + frame);
  //     client.subscribe('/topic/messages', (greeting) => {
  //       const foundWaste = {
  //         category: 'plastic',
  //         desc: 'Plastic Bottle',
  //         reason: 'It is recyclable',
  //       };
  //       setState({ type: greeting.body, foundWaste });
  //     });
  //   });

  //   // return () => {
  //   //   client.disconnect();
  //   // }
  // }, [tableRef]);

  useEffect(() => {
    const analyzingTimer = setTimeout(() => {
      setState({ type: 'analyzing' });
    }, 5000);

    const finishedAnalyzingTimer = setTimeout(() => {
      const foundWaste = {
        category: 'plastic',
        desc: 'Plastic Bottle',
        reason: 'It is recyclable',
      };
      setState({ type: 'finishedAnalyzing', foundWaste });
    }, 10000);

    const primaryStateTimer = setTimeout(() => {
      setState({ type: 'nothingDetected' });
    }, 15000);

    return () => {
      clearTimeout(analyzingTimer);
      clearTimeout(finishedAnalyzingTimer);
    };
  }, []);


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