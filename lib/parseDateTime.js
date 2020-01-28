const dateParser = require("date-fns/parse");
const zonedTimeToUtc = require("date-fns-tz/zonedTimeToUtc");

function parseDateTime(input, config) {
  for (const dateLength of ["short", "medium", "full", "long"]) {
    const dateTimePattern = config.localeData.date.formats[dateLength];

    for (const dateFormatKey in config.localeData.date.formats.dateFormats) {
      const dateFormat = config.localeData.date.formats.dateFormats[
        dateFormatKey
      ].replace(/y+/g, "yyyy");

      for (const timeFormatKey in config.localeData.date.formats.timeFormats) {
        const timeFormat =
          config.localeData.date.formats.timeFormats[timeFormatKey];

        const dateTimeFormat = dateTimePattern
          .replace("{1}", dateFormat)
          .replace("{0}", timeFormat);

        const date = dateParser(input, dateTimeFormat, new Date(), {
          locale: config.dateLocale
        });

        if (date && !isNaN(date.getTime())) {
          return zonedTimeToUtc(date, config.timeZone).toISOString();
        }
      }
    }
  }
}

module.exports = parseDateTime;
