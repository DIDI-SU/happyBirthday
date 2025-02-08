import React from "react";
import { Puppy, Flower, Round, Star } from "../memo/icon/MemoIcon";
import { Icon } from "./types/main";
import MainLogo from "../../sectoin/mainlogo/MainLogo";
import MainFace from "../../sectoin/mainface/MainFace";
const Main = () => {
  const IconItem = React.memo(
    ({ icon, children }: { icon: Icon; children: React.ReactNode }) => {
      return (
        <div
          className="absolute  opacity-40 z-10 "
          style={{
            ...(icon.top && { top: icon.top }),
            ...(icon.left && { left: icon.left }),
            ...(icon.bottom && { bottom: icon.bottom }),
            ...(icon.right && { right: icon.right }),
          }}
        >
          {children}
        </div>
      );
    }
  );

  const puppyIcons: Icon[] = [
    { id: 1, left: "5%", bottom: "20%" },
    { id: 2, left: "50%", top: "10%" },
    { id: 3, left: "85%", bottom: "20%" },
  ];

  const flowIcons: Icon[] = [
    { id: 1, left: "13%", top: "10%" },
    { id: 2, left: "40%", bottom: "5%" },
  ];

  const circleIcons: Icon[] = [
    { id: 1, right: "5%", top: "10%" },
    { id: 2, right: "96%", bottom: "50%" },
  ];

  const starIcons: Icon[] = [
    { id: 1, left: "15%", bottom: "20%" },
    { id: 2, left: "45%", top: "15%" },
    { id: 3, left: "55%", bottom: "20%" },
    { id: 4, left: "85%", bottom: "20%" },
    { id: 5, left: "90%", top: "50%" },
    { id: 6, left: "25%", bottom: "50%" },
  ];

  return (
    <main className="w-full h-[100dvh] flex flex-col justify-center items-center bg-[#000000]">
      {/* 메인 화면 */}
      <section className=" w-[100%] h-[100dvh]  flex flex-col items-center justify-center relative">
        {puppyIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Puppy width={120} height={120} />
          </IconItem>
        ))}
        {flowIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Flower width={100} height={100} />
          </IconItem>
        ))}
        {circleIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Round width={100} height={100} />
          </IconItem>
        ))}
        {starIcons.map((icon) => (
          <IconItem key={icon.id} icon={icon}>
            <Star width={20} height={20} />
          </IconItem>
        ))}
        <MainLogo />
        <MainFace />
      </section>
    </main>
  );
};

export default Main;
