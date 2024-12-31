const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const promisifiedUpload = (params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (err, data) => {
      if (err) {
        console.log("Error uploading to S3:", err);
        reject("Error uploading file"); 
      } else {
        console.log("this was the data returned");
        console.log(data);
        resolve(data.Location); 
      }
    });
  });
};

const uploadImageToS3 = async (image, imageName) => {
  const timestamp = Date.now()
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `images/${imageName}${timestamp}`,
    Body: image.buffer,
    ContentType: image.mimetype,
    ACL: "public-read",
  };

  try {
    const data = await promisifiedUpload(params);

    return data;
  } catch (error) {
    console.log("Error uploading to S3:", err);
    return "Error uploading file";
  }
};

module.exports = uploadImageToS3;
