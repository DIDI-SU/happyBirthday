import BgImage from "@/assets/image/paperGroups.svg?react";
import First from "@/assets/image/main_face.png";

import MainFace from "@/assets/image/mainFace.svg?react";

import DraggableSVGElement from "../component/draggables/DraggableSVGElement";
import { useEffect, useRef, useState } from "react";

import {
  Ticket,
  Puppy,
  Logo,
  RedStar,
  BlueStar,
  PostStemp,
  Clover,
  Book,
  OrangeStar,
} from "../../memo/icon/MemoIcon";

const MainLogo = () => {
  const currentPicRef = useRef([
    <g
      key="first"
      transform="translate(-220 -140)"
      onClick={() => handlePicChange()}
    >
      <DraggableSVGElement>
        <image
          href={First}
          className="w-[63%] sm:w-[63%] md:w-[63%] lg:w-[63%] xl:w-[63%] "
        />
      </DraggableSVGElement>
    </g>,
    <g
      key="second"
      transform="translate(-220 -140)"
      onClick={() => handlePicChange()}
    >
      <DraggableSVGElement>
        <MainFace className="w-[70%] sm:w-[70%] md:w-[70%] lg:w-[70%] xl:w-[70%] " />
      </DraggableSVGElement>
    </g>,
  ]);

  const handlePicChange = () => {
    const newImages = [...currentPicRef.current];
    const reversedImages = newImages.reverse();
    currentPicRef.current = reversedImages;
    // 강제 리렌더링을 위한 상태 업데이트
    setForceUpdate((prev) => !prev);
  };

  // 강제 리렌더링을 위한 상태
  const [forceUpdate, setForceUpdate] = useState(false);

  useEffect(() => {
    console.log("forceUpdate", forceUpdate);
  }, [forceUpdate]);

  return (
    <>
      <section className="relative flex items-center justify-center w-full px-4 sm:px-6 md:px-8">
        <div className="relative w-full flex justify-center">
          <svg
            viewBox="0 0 1000 1000"
            className="w-[100%] sm:w-[100%] md:w-[100%] lg:w-[1200px] xl:w-[1200px] max-w-[1200px] "
          >
            {/* 배경 이미지 */}
            <g transform="translate(400 400)">
              <g transform="translate(-250 -250)" rotate={2.5}>
                <BgImage className="w-full h-auto z-[100] " />
              </g>

              {/* 얼굴 이미지 */}
              {currentPicRef.current}

              <g transform="translate(-50 260)" className="z-[130]">
                <DraggableSVGElement rotation={-10.5}>
                  <Book width={128} height={156} className=" opacity-[1]" />
                </DraggableSVGElement>
              </g>
              <g transform="translate(300 -200)">
                <DraggableSVGElement rotation={10.5}>
                  <PostStemp width={128} height={156} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(380 20)">
                <DraggableSVGElement rotation={10.5}>
                  <Clover width={99} height={99} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(420 -100)">
                <DraggableSVGElement rotation={18.5}>
                  <BlueStar width={39} height={39} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(380 240)">
                <DraggableSVGElement rotation={-18.5}>
                  <OrangeStar width={39} height={39} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(100 160)">
                <DraggableSVGElement>
                  <Logo width={309} height={154} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(-300 -200)">
                <DraggableSVGElement rotation={-10.5}>
                  <Puppy width={110} height={110} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(-320 -100)" className="z-[140]">
                <DraggableSVGElement>
                  <Ticket width={371} height={481} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(-260 110)">
                <DraggableSVGElement>
                  <RedStar width={50} height={50} />
                </DraggableSVGElement>
              </g>
            </g>
          </svg>
        </div>
      </section>
    </>
  );
};

export default MainLogo;
