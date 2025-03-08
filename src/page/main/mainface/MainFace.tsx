import First from "@/assets/image/main_face.png";
import Second from "@/assets/image/sub_face.png";

///Users/jisoo/ho/happy/src/assets/clip.png
//rotate-[1.5deg]
const MainFace = () => {
  return (
    <section className="absolute right-20 flex justify-center items-center w-full h-full z-50">
      <img
        src={Second}
        alt="얼굴사진"
        className=" w-[607px] h-[457px] z-50 -rotate-[2.5deg]"
      />
      <img
        src={First}
        alt="얼굴사진"
        className="absolute   w-[599px] h-[451px] z-40 rotate-[1.5deg]"
      />
    </section>
  );
};

export default MainFace;
