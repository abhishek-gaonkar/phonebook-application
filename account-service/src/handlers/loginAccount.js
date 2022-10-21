const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const { commonMiddleware } = require("../lib/commonMiddleware");
const { createHash } = require("../lib/encryptPassword");
const { sendRes } = require("../lib/buildResponse");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const loginAccount = async (event, context) => {
  const { phone, password } = event.body;
  const params = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Key: { phone },
  };

  const dyDBDoc = await dynamodb.get(params).promise();
  const dyDBItem = dyDBDoc.Item;

  if (!dyDBItem) {
    return sendRes(400, "No account with that phone number!");
  }

  const calc_hash = createHash(password, dyDBItem.salt);

  if (dyDBItem.hashed_password !== calc_hash) {
    return sendRes(401, "Wrong Password");
  } else {
    let token = jwt.sign(
      {
        name: dyDBItem.name,
        phone: dyDBItem.phone,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return sendRes(
      200,
      JSON.stringify({
        token,
        account: {
          name: dyDBItem.name,
          phone: dyDBItem.phone,
          contacts: dyDBItem.contacts,
        },
      })
    );
  }
};

module.exports.handler = commonMiddleware(loginAccount);
