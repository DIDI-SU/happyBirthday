import { useState, useCallback } from "react";
import React from "react";
import { ConfettiImage } from "../conffetti/ImageConfetti";
import ImageConfetti from "../conffetti/ImageConfetti";

interface UseConfettiOptions {
  images: ConfettiImage[];
  duration?: number;
  fadeOut?: number | false;
  particleCount?: number;
  speed?: number;
  rotate?: boolean;
  rotateSpeed?: number;
}

export function useConfetti(options: UseConfettiOptions) {
  const [isRunning, setIsRunning] = useState(false);

  const runAnimation = useCallback(() => {
    setIsRunning(true);
  }, []);

  const onAnimationCompleted = useCallback(() => {
    setIsRunning(false);
  }, []);

  return {
    runAnimation,
    isRunning,
    confetti: React.createElement(ImageConfetti, {
      runAnimation: isRunning,
      images: options.images,
      duration: options.duration,
      fadeOut: options.fadeOut,
      particleCount: options.particleCount,
      speed: options.speed,
      rotate: options.rotate,
      rotateSpeed: options.rotateSpeed,
      onAnimationCompleted: onAnimationCompleted,
    }),
  };
}
