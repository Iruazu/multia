/**
 * dateString形式の日付を「YYYY/MM/DD」形式にフォーマットする
 * @param {string} dateString - ISO形式の日付文字列 (例: "2023-04-01")
 * @returns {string} フォーマットされた日付文字列 (例: "2023/04/01")
 */
export const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // 無効な日付の場合、元の文字列を返す
      }
      return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    } catch (error) {
      console.error('日付のフォーマットエラー:', error);
      return dateString;
    }
  };
  
  /**
   * 日付をロケールに応じた形式でフォーマットする
   * @param {string|Date} date - フォーマットする日付
   * @param {string} locale - ロケール (デフォルト: 'ja-JP')
   * @param {object} options - Intl.DateTimeFormatのオプション
   * @returns {string} フォーマットされた日付文字列
   */
  export const formatDateLocale = (date, locale = 'ja-JP', options = { year: 'numeric', month: 'long', day: 'numeric' }) => {
    try {
      const dateObj = typeof date === 'string' ? new Date(date) : date;
      if (isNaN(dateObj.getTime())) {
        return String(date);
      }
      return new Intl.DateTimeFormat(locale, options).format(dateObj);
    } catch (error) {
      console.error('ロケール日付フォーマットエラー:', error);
      return String(date);
    }
  };