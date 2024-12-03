"use client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useState, useRef, useEffect, ChangeEvent } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Input } from "@/components/ui/input";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button } from "@/components/ui/button";

export default function Countdown() {
  
  const [duration, setDuration] = useState<number | string>("");
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isActive, setisActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timeRef = useRef<NodeJS.Timeout | null>(null);

  const handleSetDuration = (): void => {
    if (typeof duration === "number" && duration > 0) setTimeLeft(duration);
    setisActive(false);
    setIsPaused(false);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };
  const handleStart = (): void => {
    if (timeLeft > 0) {
      setisActive(true);
      setIsPaused(false);
    }
  };
  const handlePaused = (): void => {
    if (isActive) {
      setIsPaused(true);
      setisActive(false);
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  };
  const handleReset = (): void => {
    setisActive(false);
    setIsPaused(false);
    setTimeLeft(typeof duration === "number" ? duration : 0);
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
  };
  useEffect(() => {
    if (isActive && !isPaused) {
      timeRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isActive, isPaused]);

  const fromatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDuration(Number(e.target.value) || "");
  };

  return (
    
    <div className="flex flex-col items-center justify-center h-screen bg-slate-100 space-y-6 p-4">
      {/* Input */}
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={duration}
          onChange={handleDurationChange}
          className="w-24 px-3 py-2 border rounded-lg text-center text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Minutes"
        />
        <button
          onClick={handleSetDuration}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        >
          Set Timer
        </button>
      </div>

      {/* Countdown Display */}
      <div className="text-4xl font-bold text-gray-800">
        {fromatTime(timeLeft)}
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleStart}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        >
          Start
        </button>
        <button
          onClick={handlePaused}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-300"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring-2 focus:ring-red-300"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
