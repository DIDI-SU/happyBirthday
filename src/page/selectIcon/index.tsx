import { useEffect, useCallback } from "react";
import MemoList from "../memo/list/MemoList";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMemoStore } from "../../store/useStore";

const SelectIcon = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  const { currentMemoId, setCurrentMemoId, setMode } = useMemoStore();

  useEffect(() => {
    setMode("memo");
  }, []);

  const goToWrite = useCallback(() => {
    if (currentMemoId?.length === 2) {
      navigate(`/memo?id=${currentMemoId[0]}&id=${currentMemoId[1]}`);
    }
  }, [currentMemoId]);

  useEffect(() => {
    if (currentMemoId?.length === 2) {
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
      <MemoList
        setCurrentMemoId={setCurrentMemoId}
        currentMemoId={currentMemoId}
      />
    </section>
  );
};

export default SelectIcon;
