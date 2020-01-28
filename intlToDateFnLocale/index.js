const buildFormatLongFn = require("date-fns/locale/_lib/buildFormatLongFn");
const buildLocalizeFn = require("date-fns/locale/_lib/buildLocalizeFn");

const match = require("./match");

module.exports = localeData => {
  return {
    formatLong: {
      date: buildFormatLongFn({
        formats: {
          full: localeData.date.formats.dateFormats.yMMMMEEEEd,
          long: localeData.date.formats.dateFormats.yMMMMd,
          medium: localeData.date.formats.dateFormats.yMMMd,
          short: String(localeData.date.formats.dateFormats.yMd || "").replace(/yy/, "y") // TODO: why is this?
        }
      }),
      time: buildFormatLongFn({
        formats: {
          full: localeData.date.formats.timeFormats.hmmsszzzz,
          long: localeData.date.formats.timeFormats.hmmsz,
          medium: localeData.date.formats.timeFormats.hms,
          short: localeData.date.formats.timeFormats.hm
        }
      }),
      dateTime: buildFormatLongFn({
        formats: {
          full: localeData.date.formats.full
            .replace("{1}", "{{date}}")
            .replace("{0}", "{{time}}"),
          long: localeData.date.formats.long
            .replace("{1}", "{{date}}")
            .replace("{0}", "{{time}}"),
          medium: localeData.date.formats.medium
            .replace("{1}", "{{date}}")
            .replace("{0}", "{{time}}"),
          short: localeData.date.formats.short
            .replace("{1}", "{{date}}")
            .replace("{0}", "{{time}}")
        }
      })
    },
    localize: {
      era: buildLocalizeFn({
        values: {
          narrow: localeData.date.calendars.gregory.eras.narrow.slice(0, 2),
          abbreviated: localeData.date.calendars.gregory.eras.short.slice(0, 2),
          wide: localeData.date.calendars.gregory.eras.long.slice(0, 2)
        },
        defaultWidth: "wide"
      }),
      month: buildLocalizeFn({
        values: {
          narrow: localeData.date.calendars.gregory.months.narrow,
          abbreviated: localeData.date.calendars.gregory.months.short,
          wide: localeData.date.calendars.gregory.months.short.long
        }
      }),
      day: buildLocalizeFn({
        values: {
          narrow: localeData.date.calendars.gregory.days.narrow,
          short: localeData.date.calendars.gregory.days.short,
          abbreviated: localeData.date.calendars.gregory.days.short,
          wide: localeData.date.calendars.gregory.days.long
        }
      }),
      dayPeriod: buildLocalizeFn({
        values: {
          narrow: localeData.date.calendars.gregory.dayPeriods,
          abbreviated: localeData.date.calendars.gregory.dayPeriods,
          wide: localeData.date.calendars.gregory.dayPeriods
        }
      })
    },
    match: match(localeData)
  };
};
