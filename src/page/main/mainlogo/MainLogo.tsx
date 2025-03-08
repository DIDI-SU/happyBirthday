import Paper from "@/assets/image/paper.png";
import Yellow from "@/assets/image/yellow_paper.png";
import String1 from "@/assets/image/string1.png";
import String2 from "@/assets/image/string2.png";
import String3 from "@/assets/image/string3.png";
import {
  Ticket,
  OrangeStar,
  Clover,
  BlueStar,
  Book,
  Puppy,
  PostStemp,
  Logo,
  RedStar,
} from "../../memo/icon/MemoIcon";

import { Images } from "../types/main";
import { Link } from "react-router-dom";
import { useState } from "react";

const MainLogo = () => {
  const string1: Images[] = [
    { id: 1, left: "40", top: "13", src: String1 },
    { id: 2, left: "50", top: "15", src: String2 },
    { id: 3, right: "30", bottom: "50", src: String3 },
  ];

  return (
    <>
      <section className="relative flex items-center justify-center w-[50%] ">
        <div className="relative w-[100%] h-full z-50 -rotate-[2.19deg]">
          <img
            src={Yellow}
            alt="yellow"
            className="absolute top-5 left-0 w-[650px] h-[463px] rotate-[4.83deg]"
          />
          <img src={Paper} alt="paper" className="w-[681px] h-[535px]" />
        </div>
        <Puppy className="absolute  w-[120px] h-[120px] top-0 -left-5  z-[110] -rotate-[8.65deg] opacity-95" />
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
        </Link>
        <Logo className="absolute  w-[309px] h-[156px] right-[25%] bottom-[5%] z-[100] rotate-[8.65deg] opacity-96" />
        <RedStar className="absolute  w-[30px] bottom-0 left-[2%]   z-[100] rotate-[8.65deg]" />
      </section>
      {string1.map((string) => (
        <img
          src={string.src}
          alt="string"
          key={string.id}
          style={{
            ...(string.left && { left: `${string.left}%` }),
            ...(string.top && { top: `${string.top}%` }),
            ...(string.bottom && { bottom: `${string.bottom}%` }),
            ...(string.right && { right: `${string.right}%` }),
          }}
          className={`absolute z-20`}
        />
      ))}
    </>
  );
};

export default MainLogo;
