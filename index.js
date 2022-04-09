const Client = require('oura-cloud-api');
const { Temporal } = require('@js-temporal/polyfill');

const getToday = () => {
  const dateTimeISO = Temporal.Now.plainDateTimeISO();
  return `${dateTimeISO.year}-${dateTimeISO.month}-${dateTimeISO.day}`;
}

(async () => {
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const client = new Client(accessToken);

    const userInfo = await client.getUserInfo();
    console.log(`userInfo: ${JSON.stringify(userInfo)}`);

    const personalInfo = await client.getPersonalInfo();
    console.log(`personalInfo: ${JSON.stringify(personalInfo)}`);

    const summaryData = await client.getSummaries({ start: getToday(), end: getToday() });
    console.log(summaryData);

    const idealBedtime = await client.getIdealBedtime();
    console.log(`idealBedtime: ${JSON.stringify(idealBedtime)}`);


  } catch (error) {
    console.log(`Oh-no, error occured: ${error}`);
  }
})();