import { useState } from "react";
import { ComingSoonImage } from "../memo/icon/MemoIcon";
import { useTranslation } from "react-i18next";
import useSound from "use-sound";
import { useNavigate } from "react-router-dom";
const ComingSoon = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
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
      navigate("/main");
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
        <ComingSoonImage
          width="100%"
          height="auto"
          className="w-[300px] md:w-[500px] lg:w-[665px] mx-auto"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-white  text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-abordage">
          {t("comingsoon.date")}
        </h1>
        <h2 className="text-white  text-base sm:text-xl md:text-2xl lg:text-2xl font-normal font-abordage">
          {t("comingsoon.title")}
        </h2>
      </div>
    </div>
  );
};

export default ComingSoon;
