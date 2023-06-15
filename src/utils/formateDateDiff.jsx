import moment from 'moment'

/**
 * 格式化時間 -> 距今時間
 * @param {string} date 
 */
const formateDateDiff = (date) => {
  const currentDate = moment()
  const startDate = moment(date)
  const years = currentDate.diff(startDate, 'years')
  const months = currentDate.diff(startDate, 'months')
  const days = currentDate.diff(startDate, 'days')
  const hours = currentDate.diff(startDate, 'hours')
  const minutes = currentDate.diff(startDate, 'minutes')
  let dateDiff = 'Just now'

  if (years) {
    dateDiff = `${years} year${(years > 1) ? 's' : ''} ago`

  } else if (months) {
    dateDiff = `${months} month${(months > 1) ? 's' : ''} ago`

  } else if (days) {
    dateDiff = `${days} day${(days > 1) ? 's' : ''} ago`

  } else if (hours) {
    dateDiff = `${hours} hour${(hours > 1) ? 's' : ''} ago`

  } else if (minutes) {
    dateDiff = `${minutes} minute${(minutes > 1) ? 's' : ''} ago`
  }

  return dateDiff
}

export default formateDateDiff