"use client";

import { useState, useEffect } from "react";

export type TimeTheme = "morning" | "afternoon" | "evening";

export interface TimedMessage {
  title: string;
  body: string;
  theme: TimeTheme;
  colors: string[];
}

const messages: Record<TimeTheme, TimedMessage> = {
  morning: {
    title: "The Dawn of Us",
    body: "Every day starts perfectly because of you. My life changed the moment we met, and I'm grateful for every sunrise we share together.",
    theme: "morning",
    colors: ["#f59e0b", "#fbbf24", "#d97706"], // Amber hues
  },
  afternoon: {
    title: "Our World Today",
    body: "You're the gravity that keeps my world together. I love the life we've built, our home, and the beautiful partnership we share every single day.",
    theme: "afternoon",
    colors: ["#ec4899", "#d946ef", "#8b5cf6"], // Pink/Purple hues
  },
  evening: {
    title: "My Forever",
    body: "You are the love of my life, now and always. As the stars come out, I'm reminded that you are the brightest light in my universe.",
    theme: "evening",
    colors: ["#3730a3", "#4f46e5", "#fbbf24"], // Indigo/Gold hues
  },
};

export function useTimedMessage() {
  const [currentMessage, setCurrentMessage] = useState<TimedMessage>(
    messages.morning,
  );

  useEffect(() => {
    const updateMessage = () => {
      const hour = new Date().getHours();

      let theme: TimeTheme = "evening";
      if (hour >= 5 && hour < 12) {
        theme = "morning";
      } else if (hour >= 12 && hour < 18) {
        theme = "afternoon";
      }

      setCurrentMessage(messages[theme]);
    };

    updateMessage();
    const interval = setInterval(updateMessage, 1000 * 60); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return currentMessage;
}
