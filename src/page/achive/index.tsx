import {
  AppleWStar,
  BookWStar,
  CloverWStar,
  CottonWStar,
  HeartWStar,
  FlowerWStar,
  DogWStar,
  GiftWStar,
  BunnyWStar,
  WideLogo,
} from "../selectIcon/icon/MemoIcon";
import { MemoItem } from "../selectIcon/type/selectIcon";
import { getDocs, collection } from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { useContext, useEffect, useState } from "react";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <CloverWStar width={250} height={250} /> },
  { id: 1, svg: <DogWStar width={250} height={250} /> },
  { id: 2, svg: <HeartWStar width={250} height={250} /> },
  { id: 3, svg: <FlowerWStar width={250} height={250} /> },
  { id: 4, svg: <BookWStar width={250} height={250} /> },
  { id: 5, svg: <BunnyWStar width={250} height={250} /> },
  { id: 6, svg: <GiftWStar width={250} height={250} /> },
  { id: 7, svg: <CottonWStar width={250} height={250} /> },
  { id: 8, svg: <AppleWStar width={250} height={250} /> },
];
interface AchiveItem {
  createdAt: string;
  memoId: number;
  memoText: string;
}

const Achive = () => {
  const { database } = useContext(FCMContext);
  const [data, setData] = useState<AchiveItem[]>([]);
  const getData = async () => {
    if (!database) return;
    const data = await getDocs(collection(database, "message"));
    const dataArray = data.docs.map((doc) => doc.data());
    if (dataArray.length > 0) {
      setData(dataArray as AchiveItem[]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section className="flex flex-row items-center justify-start w-full p-6 absolute top-0 ">
        <WideLogo className="min-w-[200px]" />
      </section>
      <section className="flex flex-row flex-wrap items-center justify-start w-full absolute top-[13%]  p-6">
        {data?.map((item) => (
          <div
            key={item.createdAt}
            className="relative  h-[250px] flex items-center justify-center min-w-[200px] min-h-[200px] mr-5 flex-1"
          >
            {MEMO_LIST[item.memoId].svg}
            <div className="w-full flex-wrap flex items-center justify-center absolute max-w-[200px] min-w-[200px] h-[160px] p-6">
              <p className="flex-wrap text-gray-600 text-center text-md font-bold break-words whitespace-pre-wrap w-full overflow-wrap-anywhere">
                {item.memoText}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Achive;
