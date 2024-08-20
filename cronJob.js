const cron = require('node-cron');
const { calculateAndSendResults } = require('./resultsService');
cron.schedule('0 * * * *', async () => {
  console.log('Running cron job to evaluate test results...');
  await calculateAndSendResults();
});
