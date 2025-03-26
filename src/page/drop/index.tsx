import React, { useContext, useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { AchiveItem } from "../common/types/type";
import {
  CloverWStar,
  DogWStar,
  HeartWStar,
  FlowerWStar,
  BookWStar,
  GiftWStar,
  BunnyWStar,
  CottonWStar,
  AppleWStar,
  StraightLogo,
  Clover,
  Puppy,
  Heart,
  Primrose,
  Book,
  Gift,
  Bunny,
  Cotton,
  Apple,
  Home,
  Archive,
} from "../common/icon/MemoIcon";
import { MemoItem } from "../selectIcon/type/selectIcon";
import AchiveLoading from "../achive/achiveLoading";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const ACHIVE_MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover width={220} height={220} /> },
  { id: 1, svg: <Puppy width={220} height={220} /> },
  { id: 2, svg: <Heart width={220} height={220} /> },
  { id: 3, svg: <Primrose width={220} height={220} /> },
  { id: 4, svg: <Book width={220} height={220} /> },
  { id: 5, svg: <Gift width={220} height={220} /> },
  { id: 6, svg: <Bunny width={220} height={220} /> },
  { id: 7, svg: <Cotton width={220} height={220} /> },
  { id: 8, svg: <Apple width={220} height={220} /> },
];

const starSize = 250;
const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <CloverWStar width={starSize} height={starSize} /> },
  { id: 1, svg: <DogWStar width={starSize} height={starSize} /> },
  { id: 2, svg: <HeartWStar width={starSize} height={starSize} /> },
  { id: 3, svg: <FlowerWStar width={starSize} height={starSize} /> },
  { id: 4, svg: <BookWStar width={starSize} height={starSize} /> },
  { id: 5, svg: <GiftWStar width={starSize} height={starSize} /> },
  { id: 6, svg: <BunnyWStar width={starSize} height={starSize} /> },
  { id: 7, svg: <CottonWStar width={starSize} height={starSize} /> },
  { id: 8, svg: <AppleWStar width={starSize} height={starSize} /> },
];

const Drop = () => {
  const { database } = useContext(FCMContext);
  const [data, setData] = useState<AchiveItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  // 화면 줌 레벨 초기화 (100%로 설정)
  useEffect(() => {
    // 1. meta viewport 태그 조정
    const viewportMeta = document.querySelector('meta[name="viewport"]');
    if (viewportMeta) {
      viewportMeta.setAttribute(
        "content",
        "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      );
    }

    // 2. 줌 레벨 자바스크립트로 초기화 (모바일에서 더 효과적인 방법)
    if (typeof window !== "undefined" && "visualViewport" in window) {
      window.visualViewport?.addEventListener("resize", resetZoom);

      // 페이지 로드 시 자동으로 줌 레벨 초기화
      resetZoom();
    }

    return () => {
      if (typeof window !== "undefined" && "visualViewport" in window) {
        window.visualViewport?.removeEventListener("resize", resetZoom);
      }
    };
  }, []);

  // 줌 레벨 100%로 초기화하는 함수
  const resetZoom = () => {
    // CSS 스케일링
    document.body.style.transform = "scale(1)";
    document.body.style.transformOrigin = "center top";

    // iOS Safari에서 효과적인 방법
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      setTimeout(() => {
        // 텍스트 크기 변경 트릭으로 리플로우 강제 유발
        const originalFontSize = document.body.style.fontSize;
        document.body.style.fontSize = "1.001em";
        setTimeout(() => {
          document.body.style.fontSize = originalFontSize;
        }, 0);
      }, 300);
    }

    // 스크롤 맨 위로 초기화
    window.scrollTo(0, 0);
  };

  // 윈도우 크기에 따른 위치 계산 함수들
  const getStartX = () => {
    if (windowSize.width < 640) return -70; // 모바일
    if (windowSize.width < 1024) return -120; // 태블릿
    return -380; // 데스크탑
  };

  const getEndYPercent = () => {
    if (windowSize.width < 640) return "53dvh"; // 모바일
    if (windowSize.width < 1024) return "60dvh"; // 태블릿
    return "50dvh"; // 데스크탑
  };

  // 데이터 가져오기
  const getData = async () => {
    if (!database) return;
    const targetId = localStorage.getItem("memo");

    if (targetId) {
      const docRef = doc(database, "message", JSON.parse(targetId));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data() as AchiveItem);
        console.log(docSnap.data());
      }
    }
  };

  // 윈도우 크기 감지
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 데이터 로딩
  useEffect(() => {
    let loadingTimer: NodeJS.Timeout;

    const initializeData = async () => {
      await getData();
      loadingTimer = setTimeout(() => {
        setIsLoading(false);
        localStorage.removeItem("memoId");
        // 로딩 후에도 다시 한번 줌 레벨 확인
        resetZoom();
      }, 3000);
    };

    initializeData();

    return () => {
      if (loadingTimer) clearTimeout(loadingTimer);
    };
  }, [database]);

  // 전체 메시지 데이터 다운로드 함수

  // 로딩 중이면 로딩 화면 표시
  if (isLoading) {
    return <AchiveLoading />;
  }

  // 메인 렌더링
  return (
    <>
      <div className="flex flex-col items-center justify-center absolute top-10 w-full">
        <StraightLogo width={"80%"} />
        <div className="flex items-center justify-center gap-2 mt-11">
          <Link
            to="/main"
            className="flex flex-col items-center justify-center mr-4 "
          >
            <Home width={32} height={32} className="mb-1" />
            <div className="flex flex-col items-center justify-center">
              <p className=" text-[12px] text-white">홈으로 </p>
              <p className="  text-[12px] text-white">돌아가기</p>
            </div>
          </Link>
          <Link
            to="/achive"
            className="flex flex-col items-center justify-center ml-8 "
          >
            <Archive width={32} height={32} />
            <div className="flex flex-col items-center justify-center ">
              <p className="  text-[12px] text-white">아카이빙</p>
              <p className="  text-[12px] text-white">보러가기</p>
            </div>
          </Link>
        </div>
      </div>

      <AnimatePresence>
        {data && (
          <motion.div
            variants={{
              initial: {
                y: "-20vh", // 화면 높이의 -20% 위치에서 시작
                opacity: 0,
                rotateZ: 0,
                x: getStartX(),
              },
              animate: {
                y: getEndYPercent(), // 퍼센트 기반 종료 위치
                opacity: 1,
                rotateZ: [0, -2, 4, -6, 2],
                x:
                  windowSize.width < 640
                    ? [getStartX(), getStartX() + 20, getStartX() + 30] // 모바일은 짧게
                    : [
                        getStartX(),
                        getStartX() + 30,
                        getStartX() + 50,
                        getStartX() + 70,
                      ],
                transition: {
                  y: {
                    duration: windowSize.width < 640 ? 2 : 3,
                    ease: [0.23, 0.75, 0.36, 0.95],
                  },
                  opacity: { duration: 0.5 },
                  rotateZ: {
                    duration: windowSize.width < 640 ? 2 : 3,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "easeInOut",
                  },
                  x: {
                    duration: windowSize.width < 640 ? 2 : 3,
                    ease: "easeInOut",
                  },
                },
              },
              exit: { opacity: 0 },
            }}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              transformOrigin: "center",
              transform: "perspective(500px)",
              position: "absolute",
              zIndex: 1000,
              borderRadius: "2px",
              top: "7vh", // 화면 높이의 7% 위치
              width: "280px",
              maxWidth: "85%",
              backgroundColor: "transparent",
              left: "50%",
              marginLeft: "-140px",
            }}
            className="px-6 py-4 text-black font-medium"
          >
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="block text-center whitespace-pre-wrap"
            >
              <div
                className={`relative h-[250px] flex items-center justify-center min-w-[200px] min-h-[200px]`}
                onClick={() => {
                  navigate(`/achive`);
                }}
              >
                {ACHIVE_MEMO_LIST[data?.memoId].svg}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-600 text-center text-md font-bold break-words whitespace-pre-wrap max-w-[180px] overflow-wrap-anywhere">
                    {data?.memoText}
                  </p>
                </div>
              </div>
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 left-0 right-0 ">
        <div className="relative h-[180px] w-full bg-transparent">
          {windowSize.width < 640 ? (
            <>
              <div className="absolute bottom-[-30%] left-[-10%] transform rotate-[8deg] opacity-[93%]">
                {MEMO_LIST[2]?.svg &&
                  React.cloneElement(MEMO_LIST[2].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-35%] left-[20%] transform rotate-[-5deg] opacity-[93%] z-20">
                {MEMO_LIST[1]?.svg &&
                  React.cloneElement(MEMO_LIST[1].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-30%] left-[55%] transform rotate-[4deg] opacity-[93%] z-10">
                {MEMO_LIST[0]?.svg &&
                  React.cloneElement(MEMO_LIST[0].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[30%] left-[53%] transform rotate-[4deg] opacity-[93%] z-0">
                {MEMO_LIST[6]?.svg &&
                  React.cloneElement(MEMO_LIST[6].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
            </>
          ) : (
            <>
              {/* 왼쪽 끝부터 아이콘들 */}
              <div className="absolute bottom-[-30px] left-0 transform rotate-5 z-10 opacity-[93%]">
                {MEMO_LIST[7]?.svg &&
                  React.cloneElement(MEMO_LIST[7].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-30px] left-[23%] transform rotate-5 z-10 opacity-[93%]">
                {ACHIVE_MEMO_LIST[0]?.svg &&
                  React.cloneElement(
                    ACHIVE_MEMO_LIST[0].svg as React.ReactElement,
                    {
                      width: 230,
                      height: 230,
                    }
                  )}
              </div>
              <div className="absolute bottom-[-20px] left-[11%] transform rotate-[-8deg] opacity-[93%]">
                {MEMO_LIST[8]?.svg &&
                  React.cloneElement(MEMO_LIST[8].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-20px] left-[45%] transform rotate-[8deg] opacity-[93%]">
                {MEMO_LIST[1]?.svg &&
                  React.cloneElement(MEMO_LIST[1].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-20px] left-[35%] transform rotate-[-8deg] opacity-[93%]">
                {MEMO_LIST[3]?.svg &&
                  React.cloneElement(MEMO_LIST[3].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-20px] left-[55%] transform rotate-[3deg] opacity-[93%]">
                {MEMO_LIST[5]?.svg &&
                  React.cloneElement(MEMO_LIST[5].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-20px] left-[65%] transform rotate-[-5deg] opacity-[93%]">
                {MEMO_LIST[4]?.svg &&
                  React.cloneElement(MEMO_LIST[4].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-15px] left-[76%] transform -rotate-[7deg] z-10 opacity-[93%]">
                {MEMO_LIST[6]?.svg &&
                  React.cloneElement(MEMO_LIST[6].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[-25px] right-[-10px] transform rotate-[-4deg] z-10 opacity-[93%]">
                {MEMO_LIST[2]?.svg &&
                  React.cloneElement(MEMO_LIST[2].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[65%] right-[0px] transform rotate-[6deg] z-0 opacity-[93%]">
                {MEMO_LIST[0]?.svg &&
                  React.cloneElement(MEMO_LIST[0].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[65%] right-[200px] transform rotate-[-7deg] z-0 opacity-[93%]">
                {MEMO_LIST[1]?.svg &&
                  React.cloneElement(MEMO_LIST[1].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
              <div className="absolute bottom-[65%] left-0 transform rotate-[-7deg] z-0 opacity-[93%]">
                {MEMO_LIST[6]?.svg &&
                  React.cloneElement(MEMO_LIST[6].svg as React.ReactElement, {
                    width: 230,
                    height: 230,
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Drop;
