import { useContext, useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { AchiveItem } from "../common/types/type";
import {
  CloverWStar,
  DogWStar,
  HeartWStar,
  FlowerWStar,
  BookWStar,
  GiftWStar,
  BunnyWStar,
  CottonWStar,
  AppleWStar,
} from "../common/icon/MemoIcon";
import { MemoItem } from "../selectIcon/type/selectIcon";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <CloverWStar width={200} height={200} /> },
  { id: 1, svg: <DogWStar width={200} height={200} /> },
  { id: 2, svg: <HeartWStar width={200} height={200} /> },
  { id: 3, svg: <FlowerWStar width={200} height={200} /> },
  { id: 4, svg: <BookWStar width={200} height={200} /> },
  { id: 5, svg: <GiftWStar width={200} height={200} /> },
  { id: 6, svg: <BunnyWStar width={200} height={200} /> },
  { id: 7, svg: <CottonWStar width={200} height={200} /> },
  { id: 8, svg: <AppleWStar width={200} height={200} /> },
];

const Drop = () => {
  const { database } = useContext(FCMContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<AchiveItem | null>(null);

  const getData = async () => {
    if (!database) return;
    const targetId = localStorage.getItem("memo");

    if (targetId) {
      // 특정 ID의 문서를 가져옵니다
      const docRef = doc(database, "message", JSON.parse(targetId));
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data() as AchiveItem);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div
      className={`relative h-[250px] flex items-center justify-center min-w-[200px] min-h-[200px]`}
    >
      {data && (
        <>
          {MEMO_LIST[data?.memoId].svg}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-gray-600 text-center text-md font-bold break-words whitespace-pre-wrap max-w-[180px] overflow-wrap-anywhere">
              {data?.memoText}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Drop;
