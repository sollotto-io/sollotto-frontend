import { useEffect, useState } from "react";
export default function useCountdown(endDate: string): {
  years: string;
  days: string;
  hours: string;
  min: string;
  sec: string;
} {
  const [time, setTime] = useState<{
    years: string;
    days: string;
    hours: string;
    min: string;
    sec: string;
  }>({
    years: "00",
    days: "00",
    hours: "00",
    min: "00",
    sec: "00",
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const date = calculateCountdown();
      if (date) {
        setTime(date);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const calculateCountdown = () => {
    let diff = (Date.parse(endDate) - Date.now()) / 1000;

    // clear countdown when date is reached
    // if (diff <= 0) return false;

    const timeLeft = {
      years: 0,
      days: 0,
      hours: 0,
      min: 0,
      sec: 0,
      millisec: 0,
    };

    // calculate time difference between now and expected date
    if (diff >= 365.25 * 86400) {
      // 365.25 * 24 * 60 * 60
      timeLeft.years = Math.floor(diff / (365.25 * 86400));
      diff -= timeLeft.years * 365.25 * 86400;
    }
    if (diff >= 86400) {
      // 24 * 60 * 60
      timeLeft.days = Math.floor(diff / 86400);
      diff -= timeLeft.days * 86400;
    }
    if (diff >= 3600) {
      // 60 * 60
      timeLeft.hours = Math.floor(diff / 3600);
      diff -= timeLeft.hours * 3600;
    }
    if (diff >= 60) {
      timeLeft.min = Math.floor(diff / 60);
      diff -= timeLeft.min * 60;
    }
    timeLeft.sec = Math.floor(diff);

    const convertNumber = (number: number) => {
      return Math.floor(number) < 10 ? `0${number}` : `${number}`;
    };

    return {
      years: convertNumber(timeLeft.years),
      days: convertNumber(timeLeft.days),
      hours: convertNumber(timeLeft.hours),
      min: convertNumber(timeLeft.min),
      sec: convertNumber(timeLeft.sec),
    };
  };
  return time;
}
