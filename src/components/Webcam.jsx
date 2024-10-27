import React, { useEffect, useRef } from 'react';

export default function Webcam() {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
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

        function processStream(video) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            setInterval(() => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                if (video.readyState === video.HAVE_ENOUGH_DATA) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    context.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const frame = canvas.toDataURL('image/jpeg');

                    sendFrameToBackend(frame);
                }
            }, 1000);
        }

        function sendFrameToBackend(frame) {
            // fetch('http://localhost:8080/streaming/uploadFrame', {
            //     method: 'POST',
            //     body: JSON.stringify({ frame }),
            //     headers: { 'Content-Type': 'application/json' },
            // })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.triggered) {
            //         console.log('Pose triggered: ', data);
            //         // Handle the triggered event in the frontend
            //     }
            // })
            // .catch(error => console.error('Error sending frame: ', error));
            console.log('frame sent');
        }

        return () => {
            const stream = videoElement.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div style={{ paddingTop: '4vh', width: '63.8vh', height: '48vh' }}>
            <video
                ref={videoRef}
                autoPlay
                style={{
                    objectFit: 'fill',
                    height: '48vh',
                    width: '63.8vh',
                    borderRadius: '10px',
                    border: '3px solid #82b956',
                    boxShadow: 'inset 0px 0px 30px rgba(0, 0, 0, 0.7), 0px 0px 20px rgba(0, 0, 0, 0.5)'
                }}
            />
        </div>
    );
};
