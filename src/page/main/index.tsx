import BackGroundIcons from "./component/background/BackGroundIcons";
import MainFace from "./mainface/MainFace";
import MainLogo from "./mainlogo/MainLogo";

const Main = () => {
  return (
    <main className="w-full h-[100dvh] flex flex-col justify-center items-center bg-[#000000]">
      <BackGroundIcons>
        <section className=" relative w-[100%] h-[100dvh]  flex flex-col items-center justify-center ">
          <MainLogo />
          {/* <MainFace /> */}
        </section>
      </BackGroundIcons>
    </main>
  );
};

export default Main;
