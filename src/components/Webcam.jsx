import React, { useEffect, useRef } from 'react';

export default function Webcam() {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        console.log(JSON.stringify(navigator));
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Request access to the webcam
            navigator.mediaDevices.getUserMedia({ video: true })
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

                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = canvas.toDataURL('image/jpeg');

                // Send the frame to the backend
                sendFrameToBackend(frame);
            }, 200); // 5 FPS (1000 ms / 5 FPS = 200 ms)
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
            // Cleanup logic to stop video stream when component unmounts
            const stream = videoElement.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <div>
            <video ref={videoRef} autoPlay />
        </div>
    );
};
