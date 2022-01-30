import moment from "moment";

const toFormat = (date, format) => moment(date).format(format);

export default { toFormat };
