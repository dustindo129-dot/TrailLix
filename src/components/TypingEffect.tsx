import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

interface TypingEffectProps {
  texts: string[];
  className?: string;
  typingSpeed?: number;
  pauseDuration?: number;
}

const TypingEffect: React.FC<TypingEffectProps> = ({
  texts,
  className,
  typingSpeed = 100,
  pauseDuration = 2000,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Typing
          if (displayedText.length < currentText.length) {
            setDisplayedText(currentText.slice(0, displayedText.length + 1));
          } else {
            // Pause before deleting
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        } else {
          // Deleting
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1));
          } else {
            // Move to next text
            setIsDeleting(false);
            setCurrentIndex((currentIndex + 1) % texts.length);
          }
        }
      },
      isDeleting ? typingSpeed / 2 : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [displayedText, currentIndex, isDeleting, texts, typingSpeed, pauseDuration]);

  return (
    <Text 
      className={className}
      style={{ color: '#FFFFFF' }}
    >
      {displayedText}|
    </Text>
  );
};

export default TypingEffect;

