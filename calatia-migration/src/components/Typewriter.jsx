import React from 'react';
export { Typewriter };

function Typewriter({ text, speed = 30, onDone }) {
  const [shown, setShown] = React.useState('');
  const [done, setDone] = React.useState(false);
  const idxRef = React.useRef(0);
  const timerRef = React.useRef(null);

  React.useEffect(() => {
    setShown('');
    setDone(false);
    idxRef.current = 0;
    const tick = () => {
      idxRef.current += 1;
      if (idxRef.current > text.length) {
        setDone(true);
        if (onDone) onDone();
        return;
      }
      setShown(text.slice(0, idxRef.current));
      timerRef.current = setTimeout(tick, speed);
    };
    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  }, [text]);

  // Click to skip
  const skipToEnd = () => {
    clearTimeout(timerRef.current);
    setShown(text);
    setDone(true);
    if (onDone) onDone();
  };

  return (
    <span className="typewriter" onClick={skipToEnd}>
      {shown}
      {!done && <span className="typewriter-cursor"/>}
    </span>
  );
}
