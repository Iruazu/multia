import { useState, useEffect } from 'react';

const useSystemTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // クリーンアップ関数
    return () => clearInterval(intervalId);
  }, []);

  // 時間のフォーマット
  const formatTime = (date) => {
    return date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  // 日付のフォーマット
  const formatDate = (date) => {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  // 曜日の取得
  const getWeekday = (date) => {
    const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
    return weekdays[date.getDay()];
  };

  return {
    currentTime,
    formattedTime: formatTime(currentTime),
    formattedDate: formatDate(currentTime),
    weekday: getWeekday(currentTime)
  };
};

export default useSystemTime;