const TYPE_SONG = 'song';

export const displayTime = (time, type) => {
  const hours = Math.floor(time / 60 / 60);
  const minute = Math.floor((time - (hours * 60 * 60)) / 60);
  const second = Math.floor(time - (minute * 60) - (hours * 60 * 60));

  if (type === TYPE_SONG) {
    if (hours === 0) {
      return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    }

    return `${String(hours).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
  }

  if (hours === 0) {
    return `${minute} 分 ${second} 秒`;
  }

  return `${hours} 時 ${minute} 分 ${second} 秒`;
};
