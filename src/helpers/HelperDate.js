import moment from "moment";

const toFormat = (date, format) => moment(date).add(1, "days").format(format);
const getAgeByFecNac = (date) => moment().diff(moment(date), "years");
export default { toFormat, getAgeByFecNac };
