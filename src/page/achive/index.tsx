import {
  Clover,
  Puppy,
  Heart,
  Primrose,
  Book,
  Gift,
  Bunny,
  Cotton,
  Apple,
} from "../selectIcon/icon/MemoIcon";
import { MemoItem } from "../selectIcon/type/selectIcon";
import { getDocs, collection } from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { useContext, useEffect, useState } from "react";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <Clover width={300} height={300} /> },
  { id: 1, svg: <Puppy width={300} height={300} /> },
  { id: 2, svg: <Heart width={300} height={300} /> },
  { id: 3, svg: <Primrose width={300} height={300} /> },
  { id: 4, svg: <Book width={300} height={300} /> },
  { id: 5, svg: <Gift width={300} height={300} /> },
  { id: 6, svg: <Bunny width={300} height={300} /> },
  { id: 7, svg: <Cotton width={300} height={300} /> },
  { id: 8, svg: <Apple width={300} height={300} /> },
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
    <section className="flex flex-row flex-wrap items-center justify-center w-full h-full">
      <div className="text-white flex flex-row flex-wrap items-center justify-center w-full h-full">
        {data?.map((item) => (
          <div key={item.createdAt} className="relative w-[300px] h-[300px]">
            {MEMO_LIST[item.memoId].svg}
            <div className="absolute bottom-[50%]  flex-warp right-[30%] text-black text-md  max-w-[200px] ">
              <p>{item.memoText}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Achive;
