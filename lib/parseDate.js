const dateParser = require("date-fns/parse");
const formatISO = require("date-fns/formatISO");

const intlToDateFnLocale = require("../intlToDateFnLocale");

function parseDate(input, config) {
  const allFormats = {
    ...config.localeData.date.formats.availableFormats,
    ...config.localeData.date.formats.dateFormats
  };

  for (const format in allFormats) {
    const localFormat = allFormats[format].replace(/y+/g, "yyyy");

    const date = dateParser(input, localFormat, new Date(), {
      locale: intlToDateFnLocale(config.localeData)
    });

    if (date && !isNaN(date.getTime())) {
      return formatISO(date).split(/T/)[0];
    }
  }
}

module.exports = parseDate;
