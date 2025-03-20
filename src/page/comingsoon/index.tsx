import { useState } from "react";
import Packege from "../../assets/image/package.png";
// import { useTranslation } from "react-i18next";
import useSound from "use-sound";
import useCountdown from "./hooks/useCountdown";
const ComingSoon = () => {
  const { days, hours, minutes, seconds } = useCountdown("2025-03-22 15:26:00");
  // const { t } = useTranslation();
  const [isAnimating, setIsAnimating] = useState(false);
  const [play] = useSound("/sounds/coming.mp3", {
    sprite: {
      short: [0, 500], // 0ms부터 1000ms(1초)까지만 재생
    },
  });

  const handlePlay = async () => {
    try {
      play({ id: "short" }); // 단순히 play() 호출
      setIsAnimating(true);
      // 애니메이션 종료 후 상태 리셋
      setTimeout(() => setIsAnimating(false), 800); // 0.8초 후 리셋
    } catch (error) {
      console.error("오디오 재생 실패:", error);
    }
  };

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-black">
      <div
        className={`w-full max-w-[1200px] px-4 mb-6  md:px-6 lg:px-8 cursor-pointer ${
          isAnimating ? "wobble-hor-bottom" : ""
        }`}
        onClick={handlePlay}
      >
        <img
          src={Packege}
          alt="Packege"
          width="100%"
          height="auto"
          className="w-[300px] md:w-[500px] lg:w-[665px] mx-auto"
        />
      </div>
      <div className="flex flex-row items-center justify-center text-white text-xl">
        <p className="mr-2">{days}Days</p>
        <p className="mr-2">{hours}Hours</p>
        <p className="mr-2">{minutes}Minutes</p>
        <p className="mr-2">{seconds}Seconds</p>
      </div>
    </div>
  );
};

export default ComingSoon;
