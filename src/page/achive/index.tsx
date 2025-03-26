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
import {
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { FCMContext } from "../../context/FCMContext";
import { useContext, useEffect, useState } from "react";
import { AchiveItem } from "../common/types/type";
import { Link } from "react-router-dom";
import { Text } from "@visx/text";
import { useInView } from "react-intersection-observer";

const MEMO_LIST: MemoItem[] = [
  { id: 0, svg: <CloverWStar width={300} height={300} />, x: 160, y: 150 },
  { id: 1, svg: <DogWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 2, svg: <HeartWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 3, svg: <FlowerWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 4, svg: <BookWStar width={300} height={300} />, x: 150, y: 130 },
  { id: 5, svg: <GiftWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 6, svg: <BunnyWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 7, svg: <CottonWStar width={300} height={300} />, x: 150, y: 150 },
  { id: 8, svg: <AppleWStar width={300} height={300} />, x: 150, y: 150 },
];

const Achive = () => {
  const { database } = useContext(FCMContext);
  const [data, setData] = useState<AchiveItem[]>([]);
  const [lastDoc, setLastDoc] = useState<DocumentSnapshot | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const LIMIT = 10; // 한 번에 가져올 데이터 수

  const getData = async () => {
    if (!database || !hasMore) return;

    try {
      let q;
      if (lastDoc) {
        q = query(
          collection(database, "message"),
          orderBy("createdAt", "desc"),
          startAfter(lastDoc),
          limit(LIMIT)
        );
      } else {
        q = query(
          collection(database, "message"),
          orderBy("createdAt", "desc"),
          limit(LIMIT)
        );
      }

      const snapshots = await getDocs(q);
      const newData = snapshots.docs.map((doc) => doc.data() as AchiveItem);

      if (newData.length < LIMIT) {
        setHasMore(false);
      }

      setLastDoc(snapshots.docs[snapshots.docs.length - 1]);
      setData((prev) => [...prev, ...newData]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // 초기 데이터 로드

  useEffect(() => {
    if (inView && hasMore) {
      getData();
    }
  }, [inView]); // 스크롤이 하단에 도달하면 추가 데이터 로드

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
              isMobile ? "30%" : "400px"
            }]`}
          >
            <WideLogo className={`w-full`} />
          </div>
        </Link>
      </section>
      <section
        className={`flex flex-row flex-wrap items-center justify-center w-full absolute top-[13%] p-6`}
      >
        {data?.map((item) => (
          <div
            key={item.createdAt}
            className={`relative h-[250px] w-[250px] flex items-center justify-center ${
              data.length === 1 ? "mr-5" : "mx-3 my-3"
            }`}
          >
            <svg width="300" height="300" viewBox="0 0 300 300">
              <g>
                {MEMO_LIST[item.memoId].svg}
                <g width="100" height="200">
                  <Text
                    x={MEMO_LIST[item.memoId].x}
                    y={MEMO_LIST[item.memoId].y}
                    width={200}
                    verticalAnchor="middle"
                    textAnchor="middle"
                    fill="#4B5563"
                    fontSize={15}
                    fontWeight="bold"
                  >
                    {item.memoText}
                  </Text>
                </g>
              </g>
            </svg>
          </div>
        ))}
        {hasMore && (
          <div
            ref={ref}
            className="w-full h-10 flex items-center justify-center"
          >
            <span className="text-gray-500">데이터를 불러오는 중...</span>
          </div>
        )}
      </section>
    </>
  );
};

export default Achive;
