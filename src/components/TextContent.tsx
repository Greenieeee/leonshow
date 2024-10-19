import React from 'react';
import ChangingText from "./ChangingText";
import AnalyzingStateView from './AnalyzingStateView';
import FinishedAnalyzingText from './FinishedAnalyzingText';
import RandomMovingGradientBackground from './RandomMovingGradientBackground';


export const TextContent = ({ state, greetingArray }) => {
    switch (state?.type) {
        case 'nothingDetected':
            return <ChangingText greetingArray={greetingArray} />;
        case 'analyzing':
            return <AnalyzingStateView />;
        case 'finishedAnalyzing':
            return <FinishedAnalyzingText foundWaste={state.foundWaste} />;
        case 'correctThrow':
            return (
                <RandomMovingGradientBackground>
                    <h1 className='black-text'>Well done!</h1>
                </RandomMovingGradientBackground>
            );
        case 'incorrectThrow':
            return (
                <RandomMovingGradientBackground>
                    <h1 className='black-text'>Nooo!</h1>
                </RandomMovingGradientBackground>
            );
        default:
            return null;
    }
};
