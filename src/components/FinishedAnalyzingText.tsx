import React from 'react';

import CapitalizedText from "./CapitalizedText";
import { FoundWaste } from "../types";

interface FinishedAnalyzingText {
    foundWaste: FoundWaste;
}

export default function FinishedAnalyzingText({ foundWaste }: FinishedAnalyzingText) {
    return (
        <>
            {foundWaste.category === 'noDetection' ? (
                <>
                    <h2 className='white-text'>I did not find anything</h2>
                    <h2 className='white-text'>Please retry!</h2>
                </>
            ) : (
                <>
                    <div className="text-container">
                        <CapitalizedText text={foundWaste.desc} className='large-white-text' />
                        <h2 className='medium-white-text'>goes to</h2>
                        <CapitalizedText text={`${foundWaste.category}!`} className='large-white-text' />
                    </div>
                    <div className='medium-white-text'>
                        {foundWaste.reason}
                    </div>
                </>
            )}
        </>
    );
}