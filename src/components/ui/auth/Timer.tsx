import { createSignal, onCleanup, onMount } from "solid-js";

const CountdownTimer = (props: { 
  time: number; 
  onStart?: () => void;
  callback?: () => void; 
}) => {
  const { time, callback, onStart } = props;
  const [timeLeft, setTimeLeft] = createSignal(time);
  let interval: number | undefined;

  onMount(() => {
    onStart?.(); // Panggil onStart saat timer mulai
    interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          callback?.(); // Panggil callback kalau ada
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  });

  onCleanup(() => clearInterval(interval));

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  return <>{formatTime(timeLeft())}</>;
};

export default CountdownTimer;
