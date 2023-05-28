 import React, { useState, useEffect } from 'react';

const TARGET_KEYS = 'asdfjkl;';

function App() {
  const [currentKeyIndex, setCurrentKeyIndex] = useState(0);
  const [keyCount, setKeyCount] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTypingStarted, setIsTypingStarted] = useState(false);

  const handleKeyPress = (event) => {
    if (!isTypingStarted) {
      setIsTypingStarted(true);
    }

    const targetKey = TARGET_KEYS[currentKeyIndex];
    const keyPressed = event.key.toLowerCase();

    if (keyPressed === targetKey) {
      setCurrentKeyIndex((prevIndex) => (prevIndex + 1) % TARGET_KEYS.length);
      setKeyCount((prevCount) => prevCount + 1);
    } else {
      setAccuracy((prevAccuracy) => ((keyCount * 100) / (keyCount + 1)).toFixed(2));
    }
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      setIsTypingStarted(false);
    }
  }, [timer]);

  return (
    <div className="App">
      <h1>Touch Typing Practice</h1>
      <p>Press the keys: {TARGET_KEYS}</p>

      {isTypingStarted && <p>Timer: {timer} seconds</p>}

      <input type="text" onKeyPress={handleKeyPress} />

      <p>Keys Pressed: {keyCount}</p>
      <p>Accuracy: {accuracy}%</p>
    </div>
  );
}

export default App;