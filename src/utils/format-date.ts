import dayjs from "dayjs"
import isYesterday from "dayjs/plugin/isYesterday"
import isToday from "dayjs/plugin/isToday"

dayjs.extend(isYesterday)
dayjs.extend(isToday)

export const formatDate = (initialDate: Date): string => {
  let formatedDate = null
  const date = dayjs(initialDate)
  if (date.isToday()) formatedDate = `Today at ${date.format("h:mm A")}`
  if (date.isYesterday()) formatedDate = `Yesterday at ${date.format("h:mm A")}`
  else formatedDate = date.format("MM/DD/YYYY h:mm A")
  return formatedDate
}
