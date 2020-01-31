const axios = require("axios");
const parser = require("fast-xml-parser");
const groupBy = require("lodash/groupBy");
const mapValues = require("lodash/mapValues");
const uniq = require("lodash/uniq");

setImmediate(async () => {
  // URL taken from:
  // https://www.iso.org/iso-4217-currency-codes.html
  // https://www.currency-iso.org/en/home/tables/table-a1.html
  const { data } = await axios({
    url: "https://www.currency-iso.org/dam/downloads/lists/list_one.xml"
  });

  const items = parser.parse(data).ISO_4217.CcyTbl.CcyNtry;

  console.log(
    JSON.stringify(
      mapValues(
        groupBy(
          items.filter(x => x.Ccy && !isNaN(Number(x.CcyMnrUnts))),
          x => x.CcyMnrUnts
        ),
        items => uniq(items.map(x => x.Ccy)).join(",")
      )
    )
  );
});
