import React, { useEffect, useRef } from 'react';

export default function Webcam() {
    const videoRef = useRef(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        const videoElement = videoRef.current;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { exact: 640 },
                    height: { exact: 480 },
                }
            })
                .then(stream => {
                    videoElement.srcObject = stream;
                    processStream(videoElement);
                })
                .catch(error => {
                    console.error('Error accessing webcam: ', error);
                });
        } else {
            console.error('getUserMedia is not supported in this browser.');
        }

        let intervalId;

        function processStream(video) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            intervalId = setInterval(() => {
                console.log('setInterval triggered');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
            
                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    console.log('Video has enough data');
                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const frame = canvas.toDataURL('image/jpeg');
                    sendFrameToBackend(frame);
                }
            }, 1000);
        }

        function sendFrameToBackend(frame) {
            console.log('Preparing to send frame');
            fetch((backendUrl + '/streaming/uploadFrame'), {
                method: 'POST',
                body: JSON.stringify({ frame }),
                headers: { 'Content-Type': 'application/json' },
            })
                .then(() => console.log('Frame sent successfully'))
                .catch(error => console.error('Error sending frame: ', error));
            console.log('Frame function completed');
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
            const stream = videoElement.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ width: '100vw', height: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '8vh', marginBottom: '4vh' }}>
            <div className="arrow-path-left">
                <div className="arrow-head-left delay-1"></div>
                <div className="arrow-head-left delay-2"></div>
                <div className="arrow-head-left delay-3"></div>
                <div className="arrow-head-left delay-4"></div>
                <div className="arrow-head-left delay-5"></div>
            </div>
            <div className='video-wrapper'>
                <video
                    ref={videoRef}
                    autoPlay
                    style={{
                        height: '101%',
                        width: '101%'
                    }}
                />
                <div className="video-overlay"></div>
            </div>
            <div className="arrow-path-right">
                <div className="arrow-head-right delay-5"></div>
                <div className="arrow-head-right delay-4"></div>
                <div className="arrow-head-right delay-3"></div>
                <div className="arrow-head-right delay-2"></div>
                <div className="arrow-head-right delay-1"></div>
            </div>
        </div>
    );
};
