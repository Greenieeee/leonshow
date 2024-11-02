import React from 'react';
import { TRAnalyzingState } from '../types';
import RandomMovingGradientBackground from './RandomMovingGradientBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { TextContent } from './TextContent';
import { VisualContent } from './VisualContent';

interface AnalyzerViewProps {
  state?: TRAnalyzingState;
}

export default function AnalyzerView({ state }: AnalyzerViewProps) {
  const greetingArray = [
    'Hello, I\'m Greenie!',
    'Bring item closer',
    'I will advise you',
    'Get a prize for sorting!',
  ];

  return (
    <div className='main-wrapper-container padding-vertical-small'>
      <RandomMovingGradientBackground>
        <TextContent state={state} greetingArray={greetingArray} />
      </RandomMovingGradientBackground>
      <div style={{ marginTop: '4vh', height: '30vh' }}>
        <AnimatePresence mode='wait'>
          <motion.div
            key={state?.type}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <VisualContent state={state} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
