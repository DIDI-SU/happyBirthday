import { ComingSoonImage } from "../memo/icon/MemoIcon";

const ComingSoon = () => {
  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-[1200px] px-4 md:px-6 lg:px-8">
        <ComingSoonImage
          width="100%"
          height="auto"
          className="w-full md:w-[500px] lg:w-[665px] mx-auto"
        />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal font-abordage">
            3/21, 2025
          </h1>
          <h2 className="text-white text-base sm:text-xl md:text-2xl lg:text-2xl font-normal">
            Coming soon
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
