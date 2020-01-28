const parseISO = require("date-fns/parseISO");
const formatDateTime = require("date-fns-tz/format");

const intlToDateFnLocale = require("../intlToDateFnLocale")

const dateFnFormats = {
  short: "P",
  medium: "PP"
};

function formatTime(time, config) {
  const style = config.dateStyle || "short";

  const dateFormat = dateFnFormats[style];

  if (!dateFormat) {
    throw new Error(`Unknown dateStyle: ${style}`);
  }

  const format = `${dateFormat}${config.seconds ? "pp" : "p"}`

  return formatDateTime(parseISO(time), format, {
    locale: intlToDateFnLocale(config.localeData),
    timeZone: config.timeZone
  });
}

module.exports = formatTime;
