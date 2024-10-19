import React from 'react';
import Webcam from './Webcam';
import LottieWrapper from './LottieWrapper';
import Lottie from 'react-lottie';
import scanAnimation from '../assets/animations/scanAnimation2.json';
import FinishedAnalyzingLottie from './FinishedAnalyzingLottie';

export const VisualContent = ({ state }) => {
    switch (state?.type) {
        case 'nothingDetected':
            return <Webcam />;
        case 'analyzing':
            return (
                <LottieWrapper>
                    <Lottie
                        options={{
                            animationData: scanAnimation,
                            loop: true,
                        }}
                        height={400}
                        width={400}
                    />
                </LottieWrapper>
            );
        case 'finishedAnalyzing':
            return <FinishedAnalyzingLottie foundWaste={state.foundWaste} />;
        case 'correctThrow':
        case 'incorrectThrow':
            return null;
        default:
            return null;
    }
};
