import { useEffect, useState } from 'react';

function ScrambleText({ 
  text, 
  delay = 0,
  scrambleSpeed = 50,
  scrambledLetterCount = 2,
  characters = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()_+" 
}) {
  const [displayText, setDisplayText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [visibleLetterCount, setVisibleLetterCount] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAnimating(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    let interval;

    if (isAnimating) {
      interval = setInterval(() => {
        if (visibleLetterCount < text.length) {
          setVisibleLetterCount(prev => prev + 1);
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }

        const remainingSpace = Math.max(0, text.length - visibleLetterCount);
        const currentScrambleCount = Math.min(remainingSpace, scrambledLetterCount);

        const scrambledPart = Array(currentScrambleCount)
          .fill(0)
          .map(() => characters[Math.floor(Math.random() * characters.length)])
          .join("");

        setDisplayText(text.slice(0, visibleLetterCount) + scrambledPart);
      }, scrambleSpeed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, text, visibleLetterCount, scrambledLetterCount, characters, scrambleSpeed]);

  return (
    <span className="inline-block whitespace-pre-wrap">
      {displayText}
    </span>
  );
}

export default ScrambleText;
