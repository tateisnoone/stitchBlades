import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const formatCreatedAt = (createdAt: string): string => {
  const now = dayjs();
  const postDate = dayjs(createdAt);
  if (now.diff(postDate, "day") < 1) {
    return postDate.fromNow();
  } else {
    return postDate.format("HH:mm - DD/MM/YYYY");
  }
};
