const axios = require("axios");
const parser = require("fast-xml-parser");
const keyBy = require("lodash/keyBy");
const mapValues = require("lodash/mapValues");

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
        keyBy(
          items.filter(x => x.Ccy && x.CcyNm),
          x => x.Ccy
        ),
        x => x.CcyNm
      ),
      null,
      2
    )
  );
});
