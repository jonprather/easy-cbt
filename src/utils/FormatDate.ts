import dayjs from "dayjs";
import type { cBT_FormDataType } from "@prisma/client";

const formatDate = (entry: cBT_FormDataType) => {
  if (entry.updatedAt instanceof Date) {
    const dayjsDate = dayjs(String(entry.updatedAt));

    const now = dayjs();

    let formattedDate;
    if (dayjsDate.isSame(now, "day")) {
      formattedDate = dayjsDate.format("h:mm A");
    } else {
      formattedDate = dayjsDate.format("MMMM D, YYYY");
    }

    return formattedDate;
  }
};

export default formatDate;
