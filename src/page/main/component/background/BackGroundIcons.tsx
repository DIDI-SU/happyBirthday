import React from "react";
import { BackgroundIcons } from "../../types/main";

import { Apple, Heart, Bunny, Cotton } from "../../../memo/icon/MemoIcon";

const IconItem = React.memo(
  ({
    icon,
    children,
  }: {
    icon: BackgroundIcons;
    children: React.ReactNode;
  }) => {
    // percentage를 viewport 좌표로 변환
    const getPosition = () => {
      const x = icon.left
        ? icon.left * 10
        : icon.right
        ? 1000 - icon.right * 10
        : 0;

      const y = icon.top
        ? icon.top * 10
        : icon.bottom
        ? 1000 - icon.bottom * 10
        : 0;

      return `translate(${x} ${y})`;
    };

    return (
      <g transform={getPosition()} opacity="0.4">
        {children}
      </g>
    );
  }
);

const BackGroundIcons = ({ children }: { children: React.ReactNode }) => {
  const appleIcons: BackgroundIcons[] = [
    { id: 1, left: 5, top: 10 }, // 좌상단 구석
    { id: 2, right: 5, top: 5 }, // 우상단 구석
    { id: 3, left: 30, bottom: 15 }, // 좌하단
  ];

  const heartIcons: BackgroundIcons[] = [
    { id: 1, right: 15, bottom: 35 }, // 우측 중하단
    { id: 2, right: 40, top: 15 }, // 우상단
    { id: 3, left: 45, bottom: 25 }, // 중앙하단
    { id: 4, left: 25, top: 30 }, // 좌상단
  ];

  const bunnyIcons: BackgroundIcons[] = [
    { id: 1, left: 15, top: 45 }, // 좌측 중단
    { id: 2, right: 25, bottom: 15 }, // 우하
    { id: 3, left: 60, top: 20 }, // 우상단
    { id: 4, right: 35, bottom: 40 }, // 중앙하단
  ];

  const cottonIcons: BackgroundIcons[] = [
    { id: 1, right: 10, top: 40 }, // 우측 중단
    { id: 2, left: 5, bottom: 50 }, // 좌측 최하단
    { id: 3, right: 5, bottom: 20 }, // 우측 하단
  ];

  return (
    <section className="w-[100%] flex flex-col items-center justify-center relative z-0">
      <svg
        viewBox="0 0 1000 1000"
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none" }}
      >
        {appleIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Apple width={50} height={60} />
          </IconItem>
        ))}
        {heartIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Heart width={50} height={60} />
          </IconItem>
        ))}
        {bunnyIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Bunny width={50} height={60} />
          </IconItem>
        ))}
        {cottonIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Cotton width={50} height={60} />
          </IconItem>
        ))}
      </svg>
      {children}
    </section>
  );
};

export default BackGroundIcons;
