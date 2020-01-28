const parseISO = require("date-fns/parseISO");
const formatDateFn = require("date-fns/format");

const intlToDateFnLocale = require("../intlToDateFnLocale");

const dateFnFormats = {
  short: "P",
  medium: "PP"
};

function formatDate(date, config) {
  const style = config.dateStyle || "short";

  const dateFormat = dateFnFormats[style];

  if (!dateFormat) {
    throw new Error(`Unknown dateStyle: ${style}`);
  }

  return formatDateFn(parseISO(date), dateFormat, {
    locale: intlToDateFnLocale(config.localeData)
  });
}

module.exports = formatDate;
