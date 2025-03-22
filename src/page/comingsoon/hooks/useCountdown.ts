import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

const useCountdown = (targetDate: string) => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  dayjs.extend(duration);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = dayjs();
      const target = dayjs(targetDate);
      const diff = target.diff(now);

      if (diff <= 0) {
        // 목표 날짜가 지난 경우
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const dayJsDuration = dayjs.duration(diff);

      setCountdown({
        days: Math.floor(dayJsDuration.asDays()),
        hours: dayJsDuration.hours(),
        minutes: dayJsDuration.minutes(),
        seconds: dayJsDuration.seconds(),
      });
    };

    // 초기 계산
    calculateTimeLeft();

    // 1초마다 업데이트
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return countdown;
};

export default useCountdown;
