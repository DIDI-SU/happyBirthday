import MainLogo from "./mainlogo/MainLogo";
import Arrow from "@/assets/icons/arrow.png";
import UnderArrow from "@/assets/icons/underArrow.png";
import { useState, useEffect } from "react";
const Main = () => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  // 리사이즈 이벤트 감지하여 isMobile 상태 업데이트
  useEffect(() => {
    // 리사이즈 핸들러 함수
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 설정
    handleResize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", handleResize);

    // 클린업 함수 (컴포넌트 언마운트 시 이벤트 리스너 제거)
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // 빈 의존성 배열로 마운트 시 한 번만 실행

  useEffect(() => {
    console.log("isMobile", isMobile);
  }, [isMobile]);
  return (
    <section className=" relative w-[100%] flex flex-col items-center justify-center ">
      <MainLogo />
    </section>
  );
};

export default Main;
