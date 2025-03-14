import { useCallback, useEffect, useState } from "react";
import MemoList from "../../sectoin/memo/memolist/MemoList";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Memo = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [currentMemo, setCurrentMemo] = useState<number[] | null>(null);

  const goToWrite = useCallback(() => {
    navigate(`/write/${currentMemo?.join(",")}`);
  }, [currentMemo, searchParams]);

  useEffect(() => {
    if (currentMemo?.length === 2) {
      goToWrite();
    }
  }, [goToWrite]);

  return (
    <section className="flex flex-col items-center justify-center h-full w-full p-10">
      <div className="flex flex-row items-center justify-center flex-wrap  ">
        <h4 className="text-white font-bold text-nowraps sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-2xl ">
          {t("memo.title1")}
        </h4>
        <p className="text-white font-bold text-nowrap sm:text-[12px] md:text-[16px] lg:text-[20px] xl:text-2xl ">
          {t("memo.title2")}
        </p>
      </div>
      <MemoList setCurrentMemo={setCurrentMemo} />
    </section>
  );
};

export default Memo;
