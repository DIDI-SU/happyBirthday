import MainLogo from "./mainlogo/MainLogo";
import { Suspense } from "react";
const Main = () => {
  return (
    <section className=" relative w-[100%] flex flex-col items-center justify-center ">
      <Suspense fallback={<div>Loading...</div>}>
        <MainLogo />
      </Suspense>
    </section>
  );
};

export default Main;
