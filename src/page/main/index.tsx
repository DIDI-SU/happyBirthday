import BackGroundIcons from "./component/background/BackGroundIcons";
import MainLogo from "./mainlogo/MainLogo";

const Main = () => {
  return (
    <BackGroundIcons>
      <section className=" relative w-[100%] flex flex-col items-center justify-center ">
        <MainLogo />
      </section>
    </BackGroundIcons>
  );
};

export default Main;
