import first from "@/assets/image/first.png";
import second from "@/assets/image/second.png";
///Users/jisoo/ho/happy/src/assets/clip.png

const MainFace = () => {
  return (
    <section className="absolute -bottom-5 -left-10 flex justify-center items-center w-full h-full z-50">
      <img src={first} alt="얼굴사진" className=" w-[46%] h-[65%] z-50" />
      <img
        src={second}
        alt="얼굴사진"
        className="absolute bottom-50   w-[46%] h-[60%] z-40 "
      />
    </section>
  );
};

export default MainFace;
