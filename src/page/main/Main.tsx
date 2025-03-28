// import React from "react";
// import { Puppy, Clover, Heart } from "../memo/icon/MemoIcon";
// import { Icon } from "./types/main";
// import MainLogo from "./mainlogo/MainLogo";
// import MainFace from "./mainface/MainFace";

// const Main = () => {
//   const IconItem = React.memo(
//     ({ icon, children }: { icon: Icon; children: React.ReactNode }) => {
//       return (
//         <div
//           className="absolute  opacity-40 z-10 "
//           style={{
//             ...(icon.top && { top: icon.top }),
//             ...(icon.left && { left: icon.left }),
//             ...(icon.bottom && { bottom: icon.bottom }),
//             ...(icon.right && { right: icon.right }),
//           }}
//         >
//           {children}
//         </div>
//       );
//     }
//   );

//   const puppyIcons: Icon[] = [
//     { id: 1, left: "5%", bottom: "20%" },
//     { id: 2, left: "50%", top: "10%" },
//     { id: 3, left: "85%", bottom: "20%" },
//   ];

//   const flowIcons: Icon[] = [
//     { id: 1, left: "13%", top: "10%" },
//     { id: 2, left: "40%", bottom: "5%" },
//   ];

//   const circleIcons: Icon[] = [
//     { id: 1, right: "5%", top: "10%" },
//     { id: 2, right: "96%", bottom: "50%" },
//   ];

//   return (
//     <main className="w-full h-[100dvh] flex flex-col justify-center items-center bg-[#000000]"></main>
//   );
// };

// export default Main;
