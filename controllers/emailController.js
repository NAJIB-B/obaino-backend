
const client = require("@mailchimp/mailchimp_marketing");
const Joi = require("joi")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")




const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

exports.addEmailSubscriber = catchAsync(async(req, res, next) => {
  const {error, value} =  emailSchema.validate(req.body)

  if (error) {
    return next(new AppError(error.message, 400));
  }
    
  const email = req.body.email
  console.log("the email", email)
  


client.setConfig({ apiKey: process.env.MAILCHIMP_API, server: "us16" });
const run = async () => {
  const response = await client.lists.addListMember(process.env.LIST_ID, {
    email_address: email,
    status: "pending",
  });
  console.log(response);
};

await run()
  res.status(200).json({
    message: "success",
  })

})
