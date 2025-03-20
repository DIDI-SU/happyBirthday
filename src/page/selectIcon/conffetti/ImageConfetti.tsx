import { useEffect, useRef, useState } from "react";

export type ConfettiImage = {
  src: string;
  size?: number;
  weight?: number;
};

export type ImageConfettiProps = {
  runAnimation: boolean;
  images: ConfettiImage[];
  onAnimationCompleted?: () => void;
  duration?: number;
  particleCount?: number;
  speed?: number;
  fadeOut?: number | false;
  rotate?: boolean;
  rotateSpeed?: number;
};

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  image: HTMLImageElement;
  opacity: number;
}

const ImageConfetti = ({
  duration = 2000,
  fadeOut = 1000,
  images,
  onAnimationCompleted,
  particleCount = 50,
  rotate = false,
  runAnimation,
  speed = 50,
  rotateSpeed = 0.5,
}: ImageConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const imageElementsRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // 이미지 로드
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = images.map((img) => {
        return new Promise<HTMLImageElement>((resolve) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.src = img.src;
        });
      });
      imageElementsRef.current = await Promise.all(imagePromises);
      setLoaded(true);
    };

    if (images.length > 0) {
      loadImages();
    }
  }, [images]);

  // 파티클 초기화
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = (canvas.width = window.innerWidth);

    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const imgIndex = Math.floor(
        Math.random() * imageElementsRef.current.length
      );
      const imgInfo = images[imgIndex % images.length];
      const particleSize = imgInfo.size || 24;

      // 넓게 분포된 시작 위치 계산
      const section = width / particleCount;
      const sectionMiddle = section * i + section / 2;
      const randomOffset = (Math.random() - 0.5) * section * 0.6; // 60% 범위 내에서 랜덤 오프셋
      const xPos = sectionMiddle + randomOffset;

      particles.push({
        x: xPos,
        y: -particleSize * 2 - Math.random() * 300, // 시작 높이에 랜덤성 추가
        size: particleSize,
        speed: (Math.random() * 2 + 1) * (speed / 50),
        rotation: Math.random() * 360,
        rotationSpeed: rotate ? (Math.random() * 2 - 1) * rotateSpeed : 0,
        image: imageElementsRef.current[imgIndex],
        opacity: 1,
      });
    }

    particlesRef.current = particles;
  };

  // 애니메이션 렌더링
  const renderAnimation = (timestamp: number) => {
    if (!canvasRef.current) return;
    if (!startTimeRef.current) startTimeRef.current = timestamp;

    const elapsed = timestamp - startTimeRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 페이드아웃 계산
    const shouldFadeOut = fadeOut !== false && fadeOut > 0;
    const fadeOutStart = duration - (fadeOut as number);
    const fadeOutProgress =
      shouldFadeOut && elapsed > fadeOutStart
        ? (elapsed - fadeOutStart) / (fadeOut as number)
        : 0;

    // 파티클 업데이트 및 그리기
    particlesRef.current.forEach((particle) => {
      particle.y += particle.speed;
      if (rotate) {
        particle.rotation += particle.rotationSpeed;
      }

      // 페이드아웃 적용
      if (shouldFadeOut && elapsed > fadeOutStart) {
        particle.opacity = 1 - fadeOutProgress;
      }

      ctx.save();
      ctx.globalAlpha = particle.opacity;
      ctx.translate(particle.x, particle.y);
      ctx.rotate((particle.rotation * Math.PI) / 180);
      ctx.drawImage(
        particle.image,
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size
      );
      ctx.restore();
    });

    // 애니메이션 종료 조건
    if (elapsed < duration) {
      animationRef.current = requestAnimationFrame(renderAnimation);
    } else {
      if (onAnimationCompleted) {
        onAnimationCompleted();
      }
    }
  };

  // 애니메이션 시작/종료
  useEffect(() => {
    if (runAnimation && loaded) {
      // 캔버스 크기 설정
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }

      startTimeRef.current = 0;
      initParticles();
      animationRef.current = requestAnimationFrame(renderAnimation);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [runAnimation, loaded]);

  // 화면 크기 변경 처리
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      id="confetti-canvas"
      ref={canvasRef}
      style={{
        display: runAnimation ? "block" : "none",
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        opacity: 1,
        zIndex: 2000,
      }}
    />
  );
};

export default ImageConfetti;
