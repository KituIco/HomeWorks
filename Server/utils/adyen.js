const {Client, Config, CheckoutAPI} = require('@adyen/api-library');
const config = new Config();

config.apiKey = process.env.ADYEN_API_KEY;
config.merchantAccount = process.env.ADYEN_MERCHANT_ACCOUNT;
const client = new Client({ config });
client.setEnvironment("TEST");
const checkout = new CheckoutAPI(client);

module.exports = checkout;