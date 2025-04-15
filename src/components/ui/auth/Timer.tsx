import { useEffect, useState } from "react";

const CountdownTimer = ({
  time,
  onStart,
  callback,
}: {
  time: number;
  onStart?: () => void;
  callback?: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(time);

  useEffect(() => {
    onStart?.(); // Panggil onStart saat timer mulai

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          callback?.(); // Panggil callback kalau habis
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup
  }, [callback, onStart]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return <>{formatTime(timeLeft)}</>;
};

export default CountdownTimer;
