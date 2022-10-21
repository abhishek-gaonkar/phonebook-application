const AWS = require("aws-sdk");
const { commonMiddleware } = require("../lib/commonMiddleware");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const getContact = async (event, context) => {
  const { contactId: contactPhone } = event.pathParameters;
  const { phone } = event.requestContext.authorizer.lambda;

  const params = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Key: { phone },
  };

  let contactResultArray, contactResult;

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
      body: "DynamoDB error",
    };
  }

  contactResultArray.forEach((contact) => {
    if (contact.contactPhone === parseInt(contactPhone)) {
      contactResult = contact;
    }
  });

  if (contactResult) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ contactResult }),
    };
  } else {
    return {
      statusCode: 404,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Contact with that number not found",
    };
  }
};

module.exports.handler = commonMiddleware(getContact);
