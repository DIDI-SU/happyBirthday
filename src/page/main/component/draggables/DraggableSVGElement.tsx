import { ReactNode, useState } from "react";

interface DraggableSVGElementProps {
  children: ReactNode;
  rotation?: number;
}

const DraggableSVGElement = ({
  children,
  rotation = 0,
}: DraggableSVGElementProps) => {
  const [isShaking, setIsShaking] = useState(false);

  const handleElementClick = () => {
    // 이미 흔들리고 있지 않을 때만 애니메이션 시작
    if (!isShaking) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 900); // 0.9초 애니메이션 시간
    }

    // 이벤트 전파 방지 (선택사항)
    // e.stopPropagation();
  };

  // onClick 핸들러를 g 요소에 직접 적용
  return (
    <g
      transform={`rotate(${rotation})`}
      className={isShaking ? "jello-vertical" : ""}
      style={{
        transformOrigin: "center center",
        transformBox: "fill-box",
      }}
      onClick={handleElementClick}
    >
      {children}
    </g>
  );
};

export default DraggableSVGElement;
