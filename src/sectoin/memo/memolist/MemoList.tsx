const MEMO_LIST = [
  {
    id: 0,
    src: "/src/assets/memo.png",
  },
  {
    id: 1,
    src: "/src/assets/slimract.png",
  },
  {
    id: 2,
    src: "/src/assets/ractangle.png",
  },
  {
    id: 3,
    src: "/src/assets/round.png",
  },
];

const MemoList = ({
  setCurrentMemo,
}: {
  setCurrentMemo: (id: number) => void;
}) => {
  return MEMO_LIST?.map((memo) => {
    return (
      <img
        key={memo.id}
        src={memo.src}
        className="w-[30%] h-[300px] mr-3 "
        onClick={() => setCurrentMemo(memo.id)}
      />
    );
  });
};

export default MemoList;
