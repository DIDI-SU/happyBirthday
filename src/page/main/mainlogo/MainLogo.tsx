import BgImage from "@/assets/image/paperGroups.svg?react";
import First from "@/assets/image/back.png";
import MainFace from "@/assets/image/front.png";

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
  Pencil,
  Archive,
} from "../../common/icon/MemoIcon";

import { Link, useNavigate } from "react-router-dom";

const MainLogo = () => {
  const navigate = useNavigate();
  const currentPicRef = useRef([
    <g
      key="second"
      transform="translate(-220 -140)"
      onClick={() => handlePicChange()}
    >
      <image
        href={First}
        className="w-[63%] sm:w-[63%] md:w-[63%] lg:w-[63%] xl:w-[63%]"
      />
    </g>,
    <g
      key="first"
      transform="translate(-220 -140)"
      onClick={() => handlePicChange()}
    >
      <image
        href={MainFace}
        className="w-[63%] sm:w-[63%] md:w-[63%] lg:w-[63%] xl:w-[63%] "
      />
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
    <>
      <section className="relative flex items-center justify-center w-full px-4 sm:px-6 md:px-8">
        <div className="relative w-full flex justify-center flex-col items-center">
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

              <g transform="translate(-50 260)" className="z-[200] ">
                <DraggableSVGElement rotation={-10.5}>
                  <Book width={110} height={110} className=" opacity-[1]" />
                </DraggableSVGElement>
              </g>
              <g transform="translate(300 -200)">
                <DraggableSVGElement rotation={10.5}>
                  <PostStemp width={128} height={156} />
                </DraggableSVGElement>
              </g>
              <g
                transform="translate(380 20)"
                onClick={() => navigate("/selectIcon")}
              >
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
              <g transform="translate(-320 -100)">
                <DraggableSVGElement>
                  <Link to="https://youtu.be/FBqN2VfcoV4?feature=shared">
                    <Ticket width={371} height={481} />
                  </Link>
                </DraggableSVGElement>
              </g>
              <g transform="translate(-260 110)">
                <DraggableSVGElement>
                  <RedStar width={50} height={50} />
                </DraggableSVGElement>
              </g>
            </g>

            {isMobile && (
              <>
                {" "}
                <g
                  transform="translate(400 800)"
                  onClick={() => navigate("/selectIcon")}
                  className="sm:w-[50px] sm:h-[50px] "
                >
                  <Pencil
                    width={window.innerWidth < 640 ? 50 : 32}
                    height={window.innerWidth < 640 ? 50 : 32}
                  />
                  <text
                    x="25"
                    y="60" // 아이콘 아래에 위치하도록 y값 조정
                    textAnchor="middle"
                    fill={"white"}
                    fontSize={15}
                    fontFamily="sans-serif"
                    style={{ pointerEvents: "none" }} // 텍스트가 클릭을 방해하지 않도록
                  >
                    컨페티
                  </text>
                  <text
                    x="25"
                    y="80" // 아이콘 아래에 위치하도록 y값 조정
                    textAnchor="middle"
                    fill={"white"}
                    fontSize={15}
                    fontFamily="sans-serif"
                    style={{ pointerEvents: "none" }} // 텍스트가 클릭을 방해하지 않도록
                  >
                    작성하기
                  </text>
                </g>
                <g
                  transform="translate(550 800)"
                  onClick={() => navigate("/achive")}
                >
                  <Archive
                    width={window.innerWidth < 640 ? 50 : 32}
                    height={window.innerWidth < 640 ? 50 : 32}
                  />
                  <text
                    x="25"
                    y="60" // 아이콘 아래에 위치하도록 y값 조정
                    textAnchor="middle"
                    fill={"white"}
                    fontSize={15}
                    fontFamily="sans-serif"
                    style={{ pointerEvents: "none" }} // 텍스트가 클릭을 방해하지 않도록
                  >
                    아카이빙
                  </text>
                  <text
                    x="25"
                    y="80" // 아이콘 아래에 위치하도록 y값 조정
                    textAnchor="middle"
                    fill={"white"}
                    fontSize={15}
                    fontFamily="sans-serif"
                    style={{ pointerEvents: "none" }} // 텍스트가 클릭을 방해하지 않도록
                  >
                    보러가기
                  </text>
                </g>
              </>
            )}
          </svg>
        </div>
      </section>
    </>
  );
};

export default MainLogo;
