import BgImage from "@/assets/image/paperGroups.svg?react";
import First from "@/assets/image/main_face.png";

import MainFace from "@/assets/image/mainFace.svg?react";

import DraggableSVGElement from "../component/draggables/DraggableSVGElement";
import { useRef, useState } from "react";

import {
  Ticket,
  Puppy,
  Logo,
  RedStar,
  BlueStar,
  PostStemp,
  Clover,
  Book,
} from "../../memo/icon/MemoIcon";

const MainLogo = () => {
  const currentPicRef = useRef([
    <g
      key="first"
      transform="translate(-190 -140)"
      onClick={() => handlePicChange()}
    >
      <DraggableSVGElement rotation={-2.5}>
        <image
          href={First}
          className="w-[65%] sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]"
        />
      </DraggableSVGElement>
    </g>,
    <g
      key="second"
      transform="translate(-190 -140)"
      onClick={() => handlePicChange()}
    >
      <DraggableSVGElement rotation={1.5}>
        <MainFace className="w-[65%] sm:w-[65%] md:w-[65%] lg:w-[65%] xl:w-[65%]" />
      </DraggableSVGElement>
    </g>,
  ]);

  const handlePicChange = () => {
    const newImages = [...currentPicRef.current];
    newImages.reverse();
    currentPicRef.current = newImages;
    // 강제 리렌더링을 위한 상태 업데이트
    setForceUpdate((prev) => !prev);
  };

  // 강제 리렌더링을 위한 상태
  const [forceUpdate, setForceUpdate] = useState(false);

  console.log(forceUpdate);

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
              <g transform="translate(-250 -250)">
                <BgImage className="w-full h-auto z-[100] " />
              </g>

              {/* 얼굴 이미지 */}
              {currentPicRef.current}
              {/* <g transform="translate(-250 -160)">
                <ButtonGroups className=" w-full h-auto z-[180]" />
              </g> */}
              <g transform="translate(-50 260)">
                <DraggableSVGElement rotation={-10.5}>
                  <Book width={128} height={156} className="z-[140]" />
                </DraggableSVGElement>
              </g>
              <g transform="translate(300 -200)">
                <DraggableSVGElement rotation={10.5}>
                  <PostStemp width={128} height={156} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(380 -60)">
                <DraggableSVGElement rotation={10.5}>
                  <Clover width={128} height={156} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(450 -100)">
                <DraggableSVGElement rotation={10.5}>
                  <BlueStar width={50} height={50} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(100 160)">
                <DraggableSVGElement rotation={-10.5}>
                  <Logo width={309} height={154} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(-300 -200)">
                <DraggableSVGElement rotation={-10.5}>
                  <Puppy width={110} height={110} />
                </DraggableSVGElement>
              </g>
              <g transform="translate(-320 -100)">
                <DraggableSVGElement>
                  <Ticket width={371} height={481} className="z-[130]" />
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
