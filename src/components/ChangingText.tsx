import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChangingTextProps {
  greetingArray: string[];
}

export default function ChangingText({ greetingArray }: ChangingTextProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % greetingArray.length);
      }, 750);
    }, 2000);

    return () => clearInterval(interval);
  }, [greetingArray.length]);

  const getFontStyle = (index: number) => {
    const nextIndex = (index + 1) % greetingArray.length;
    switch (nextIndex) {
      case 3:
        return { fontFamily: 'OpenSans-Italic', fontSize: '64px' };
      case 2:
        return { fontFamily: 'OpenSans-Light', fontSize: '64px' };
      case 1:
        return { fontFamily: 'OpenSans-Bold', fontSize: '64px' };
      default:
        return { fontFamily: 'Poppins-Regular', fontSize: '64px' };
    }
  };

  return (
    <AnimatePresence>
      <motion.h1
        key={currentIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ ease: "easeInOut" }}
        style={{ color: 'white', ...getFontStyle(currentIndex), position: "absolute" }}
      >
        {greetingArray[currentIndex]}
      </motion.h1>
    </AnimatePresence>
  );
};