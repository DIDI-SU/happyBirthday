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
} from "../common/icon/MemoIcon";

import { MemoItem } from "../selectIcon/type/selectIcon";
import { getDocs, collection } from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { useContext, useEffect, useState } from "react";
import { AchiveItem } from "../common/types/type";
import { Link } from "react-router-dom";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <CloverWStar width={250} height={250} /> },
  { id: 1, svg: <DogWStar width={250} height={250} /> },
  { id: 2, svg: <HeartWStar width={250} height={250} /> },
  { id: 3, svg: <FlowerWStar width={250} height={250} /> },
  { id: 4, svg: <BookWStar width={250} height={250} /> },
  { id: 5, svg: <GiftWStar width={250} height={250} /> },
  { id: 6, svg: <BunnyWStar width={250} height={250} /> },
  { id: 7, svg: <CottonWStar width={250} height={250} /> },
  { id: 8, svg: <AppleWStar width={250} height={250} /> },
];

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

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <section className="flex flex-row items-center justify-start w-full p-6 absolute top-0">
        <Link to="/main">
          <div
            className={`flex items-center justify-center w-[${
              isMobile ? "200px" : "400px"
            }]`}
          >
            <WideLogo className={`min-w-[${isMobile ? "200px" : "200px"}]`} />
          </div>
        </Link>
      </section>
      <section
        className={`flex flex-row flex-wrap items-center justify-center w-full absolute top-[13%] p-6`}
      >
        {data?.map((item) => (
          <div
            key={item.createdAt}
            className={`relative h-[250px] flex items-center justify-center min-w-[200px] min-h-[200px] ${
              data.length === 1 ? "mr-5" : "mx-3 my-3"
            }`}
          >
            {MEMO_LIST[item.memoId].svg}
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-gray-600 text-center text-md font-bold break-words whitespace-pre-wrap max-w-[180px] overflow-wrap-anywhere">
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
