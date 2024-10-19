import React from 'react';
import depositAnimation from '../assets/animations/depositAnimation.json';
import electronicsAnimation from '../assets/animations/electronicsAnimation.json';
import foodwasteAnimation from '../assets/animations/foodwasteAnimation.json';
import glassAnimation from '../assets/animations/glassAnimation.json';
import paperAnimation from '../assets/animations/paperAnimation.json';
import plasticAnimation from '../assets/animations/plasticAnimation.json';
import Lottie from "react-lottie";
import { FoundWaste } from "../types";
import LottieWrapper from './LottieWrapper';

interface FinishedAnalyzingText {
    foundWaste: FoundWaste;
}

export default function FinishedAnalyzingLottie({ foundWaste }: FinishedAnalyzingText) {
    const getLottieAnimation = (category: string) => {
        switch (category) {
            case 'deposit':
                return depositAnimation;
            case 'electronics':
                return electronicsAnimation;
            case 'foodwaste':
                return foodwasteAnimation;
            case 'glass':
                return glassAnimation;
            case 'paper':
                return paperAnimation;
            case 'plastic':
                return plasticAnimation;
            default:
                return null;
        }
    };

    return (
        <>
            {foundWaste.category === 'noDetection' ? (
                null
            ) : (
                <LottieWrapper>
                    <Lottie
                        options={{
                            animationData: getLottieAnimation(foundWaste.category),
                            loop: true,
                        }}
                        height={400}
                        width={400}
                    />
                </LottieWrapper>
            )}
        </>
    );
}