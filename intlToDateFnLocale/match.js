const widthMapping = {
  narrow: "narrow",
  short: "short",
  abbreviated: "short",
  wide: "long",
  any: ["long", "short", "narrow"]
};

function matchFn(entries) {
  return function match(string, options) {
    for (const width of [].concat(widthMapping[options.width || "any"])) {
      const entriesForWidth = entries[width];

      if (!entriesForWidth) {
        continue;
      }

      const match = entriesForWidth.find(
        x => string.startsWith(x) || string.startsWith(x.toLowerCase())
      );

      if (match) {
        return {
          value: entriesForWidth.indexOf(match),
          rest: string.slice(match.length)
        };
      }
    }

    return null;
  };
}

function match(localeData) {
  return {
    era: matchFn(localeData.date.calendars.gregory.eras),
    month: matchFn(localeData.date.calendars.gregory.months),
    day: matchFn(localeData.date.calendars.gregory.days),
    dayPeriod: matchFn(localeData.date.calendars.gregory.dayPeriods),
    quarter() {}
  };
};

module.exports = match;
