const AWS = require("aws-sdk");
const validator = require("@middy/validator");
const { commonMiddleware } = require("../lib/commonMiddleware");
const { schema } = require("../lib/schemas/createContactSchema");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createContact = async (event, context) => {
  const { contactName, contactPhone } = event.body;
  const { phone } = event.requestContext.authorizer.lambda;

  const contact = {
    contactPhone,
    contactName,
  };

  let dupContact = false;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.PHONEBOOK_TABLE_NAME,
        Key: { phone },
      })
      .promise();
    result.Item.contacts.forEach((contact) => {
      if (contact.contactPhone === contactPhone) {
        dupContact = true;
      }
    });
    if (dupContact) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "Contact already exists",
      };
    } else {
      const params = {
        TableName: process.env.PHONEBOOK_TABLE_NAME,
        Key: {
          phone,
        },
        UpdateExpression:
          "set contacts = list_append (#contactsName, :contactsValue)",
        ExpressionAttributeNames: {
          "#contactsName": "contacts",
        },
        ExpressionAttributeValues: {
          ":contactsValue": [contact],
        },
        ReturnValues: "ALL_NEW",
      };

      try {
        await dynamodb.update(params).promise();

        return {
          statusCode: 201,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: JSON.stringify({
            message: "contact successfully created",
          }),
        };
      } catch (err) {
        return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "Contact creation failed",
        };
      }
    }
  } catch (err) {}
};

module.exports.handler = commonMiddleware(createContact).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      strict: false,
    },
  })
);
