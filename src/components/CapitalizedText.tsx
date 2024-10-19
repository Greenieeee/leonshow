import React from 'react';

interface CapitalizedTextProps {
  text: string;
  className?: string;
}

export default function CapitalizedText({ text, className }: CapitalizedTextProps) {
  const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);

  return <h1 className={className}>{capitalizedText}</h1>;
};