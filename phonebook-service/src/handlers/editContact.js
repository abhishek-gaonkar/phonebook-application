const AWS = require("aws-sdk");
const validator = require("@middy/validator");
const { commonMiddleware } = require("../lib/commonMiddleware");
const { schema } = require("../lib/schemas/editContactSchema");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const editContact = async (event, context) => {
  const { update, contactName, contactPhone } = event.body;
  const { phone } = event.requestContext.authorizer.lambda;

  const params = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Key: { phone },
  };

  let contactResultArray = [];

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
      body: "No contacts found with this phone number " + err,
    };
  }

  let updateContactIndex = 0;

  if (update === "contactName") {
    for (
      let contactIndex = 0;
      contactIndex < contactResultArray.length;
      contactIndex++
    ) {
      const contact = contactResultArray[contactIndex];
      if (contact.contactPhone === contactPhone) {
        updateContactIndex = contactIndex;
        break;
      }
    }
    try {
      await dynamodb
        .update({
          TableName: process.env.PHONEBOOK_TABLE_NAME,
          Key: { phone },
          UpdateExpression: `SET #contacts[${updateContactIndex}].#contactName = :contactNameVal`,
          ExpressionAttributeNames: {
            "#contacts": "contacts",
            "#contactName": "contactName",
          },
          ExpressionAttributeValues: {
            ":contactNameVal": contactName,
          },
        })
        .promise();
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "Name updation failed " + err,
      };
    }
  } else if (update === "contactPhone") {
    for (
      let contactIndex = 0;
      contactIndex < contactResultArray.length;
      contactIndex++
    ) {
      const contact = contactResultArray[contactIndex];
      if (contact.contactName === contactName) {
        updateContactIndex = contactIndex;
        break;
      }
    }
    try {
      await dynamodb
        .update({
          TableName: process.env.PHONEBOOK_TABLE_NAME,
          Key: { phone },
          UpdateExpression: `SET #contacts[${updateContactIndex}].#contactPhone = :contactPhoneVal`,
          ExpressionAttributeNames: {
            "#contacts": "contacts",
            "#contactPhone": "contactPhone",
          },
          ExpressionAttributeValues: {
            ":contactPhoneVal": contactPhone,
          },
        })
        .promise();
    } catch (err) {
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "Phone updation failed " + err,
      };
    }
  } else {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "Unidentified updation Parameter " + update,
    };
  }

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.PHONEBOOK_TABLE_NAME,
        Key: { phone },
      })
      .promise();
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

module.exports.handler = commonMiddleware(editContact).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      strict: false,
    },
  })
);
