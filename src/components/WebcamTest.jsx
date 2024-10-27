import React, { useEffect, useRef } from 'react';

export default function WebcamTest() {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        // { width: 1920, height: 1080 }
        navigator.mediaDevices.getUserMedia({
            video: {
                width: { exact: 1920 },
                height: { exact: 1080 },
            }
        })
        .then(stream => {
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(error => {
            console.error('Error accessing webcam:', error);
        });

        return () => {
            if (videoElement.srcObject) {
                videoElement.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            style={{ width: '100%', height: 'auto' }}
        />
    );
}
