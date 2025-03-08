const Error404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center space-y-6">
        <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white">
          404
        </h1>
        <h2 className="text-xl sm:text-2xl md:text-3xl text-white">
          페이지가 준비중이라 오류가 발생했어요
        </h2>
        <p className="text-white text-sm sm:text-base">
          페이지 오픈때까지 기다려주세요🐶
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
};

export default Error404;
