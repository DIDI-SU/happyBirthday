const MemoText = ({ currentMemo }: { currentMemo: string }) => {
  return (
    <div
      className={`w-[50%] h-[60%] rounded-xl p-5 flex justify-center items-center transition-colors duration-500`}
      style={{
        backgroundImage: `url(${currentMemo})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <textarea
        className="w-[35%] h-[50%] bg-transparent border-none resize-none font-sans text-base text-gray-700 outline-dotted placeholder:text-gray-500 p-1 rounded-md"
        placeholder="여기에 메모를 입력하세요..."
        maxLength={200}
      />
    </div>
  );
};

export default MemoText;
