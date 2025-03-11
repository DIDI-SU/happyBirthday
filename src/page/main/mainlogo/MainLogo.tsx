import BgImage from "@/assets/image/bgImage.svg?react";
import First from "@/assets/image/main_face.png";

import ButtonGroups from "@/assets/image/buttonGroups.svg?react";
import MainFace from "@/assets/image/mainFace.svg?react";

import { useEffect } from "react";

const MainLogo = () => {
  useEffect(() => {
    // 특정 g 요소 찾기
    const targetElement = document.querySelector(
      'g[filter="url(#filter0_d_281_8)"]'
    );

    if (targetElement) {
      // 클릭 이벤트 핸들러
      const handleClick = () => {
        // 이미 애니메이션 중이라면 리턴
        if (targetElement.classList.contains("wobble-animation")) return;

        // 애니메이션 클래스 추가
        targetElement.classList.add("wobble-animation");

        // 애니메이션 종료 후 클래스 제거
        setTimeout(() => {
          targetElement.classList.remove("wobble-animation");
        }, 1000);
      };

      // 클릭 이벤트 리스너 추가
      targetElement.addEventListener("click", handleClick);

      // 클린업 함수
      return () => {
        targetElement.removeEventListener("click", handleClick);
      };
    }
  }, []);
  return (
    <>
      <section className="relative flex items-center justify-center w-full h-full px-4 sm:px-6 md:px-8">
        <div className="relative w-full flex justify-center">
          {/* BgImage - 배경 이미지 */}
          <BgImage className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[1000px] xl:w-[1000px] max-w-[1000px] h-auto z-[100]" />
          <ButtonGroups className="top-[10%] z-[160] absolute w-[90%] sm:w-[90%] md:w-[85%] lg:w-[1000px] xl:w-[1000px] max-w-[1000px] h-auto " />

          {/* First 이미지 */}
          <img
            src={First}
            alt="얼굴사진"
            className="absolute bottom-[5%] z-[120] -rotate-[2.5deg]
            w-[80%] 
            sm:w-[70%] sm:max-w-[550px]
            md:w-[70%] md:max-w-[650px]
            lg:w-[75%] lg:max-w-[850px]
            xl:w-[75%] xl:max-w-[850px]"
          />

          {/* MainImage 컴포넌트 */}
          <div
            className="absolute z-[140] 
            bottom-[3%] 
            sm:bottom-[4%] 
            md:bottom-[5%]
            w-[85%] 
            sm:w-[70%] sm:max-w-[550px]
            md:w-[70%] md:max-w-[650px]
            lg:w-[75%] lg:max-w-[850px]
            xl:w-[75%] xl:max-w-[850px]"
          >
            <MainFace className="w-full h-auto rotate-[1.5deg]" />
          </div>
        </div>

        {/* <Puppy className="absolute  w-[120px] h-[120px] top-0 -left-5  z-[110] -rotate-[8.65deg] opacity-95" />
        <Ticket className="absolute  w-[272px] h-[455px] bottom-0 -left-10  z-[100] -rotate-[2.65deg] opacity-95" />
        <Book className="absolute  w-[110px] h-[110px] -bottom-10 left-[20%]  z-[100] -rotate-[10.65deg] opacity-95" />
        <OrangeStar className="absolute  w-[30px] h-[30px] bottom-[16%] right-[20%] z-[100] rotate-[8.65deg]" />
        <BlueStar className="absolute  w-[30px] h-[30px] top-44  right-[20%] z-[100] rotate-[8.65deg]" />
        <PostStemp className="absolute  w-[128px] h-[156px] top-0  right-[20%] z-[100] rotate-[8.65deg]" />
        <Link to="/memo">
          <div className="group">
            <Clover className="absolute  w-[90px] h-[90px] bottom-48  right-[20%] z-[100] rotate-[8.65deg] opacity-96" />
            <div className="invisible group-hover:visible absolute bottom-[32%]  right-[10%] z-[100] -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md whitespace-nowrap">
              메모 페이지로 이동
            </div>
          </div>
        </Link> */}

        {/* <RedStar className="absolute  w-[30px] bottom-0 left-[2%]   z-[100] rotate-[8.65deg]" /> */}
      </section>
    </>
  );
};

export default MainLogo;
