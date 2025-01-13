const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({ apiKey: process.env.MAILCHIMP_API, server: "us16" });
const run = async () => {
  const response = await client.lists.addListMember("list_id", {
    email_address: "Ebony_Brekke@gmail.com",
    status: "pending",
  });
  console.log(response);
};
