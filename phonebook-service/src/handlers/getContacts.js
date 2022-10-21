const AWS = require("aws-sdk");
const { commonMiddleware } = require("../lib/commonMiddleware");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getContacts = async (event, context) => {
  const { phone } = event.requestContext.authorizer.lambda;

  const params = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Key: { phone },
  };

  let contactResultArray;

  try {
    const result = await dynamodb.get(params).promise();
    contactResultArray = result.Item.contacts;
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "No contacts found with this phone number",
    };
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ contactResultArray }),
  };
};

module.exports.handler = commonMiddleware(getContacts);
