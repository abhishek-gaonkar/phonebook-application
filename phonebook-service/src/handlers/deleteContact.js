const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const deleteContact = async (event, context) => {
  const { phone } = event.requestContext.authorizer.lambda;
  const { contactId } = event.pathParameters;

  let delContact = false;
  let delContactIndex = 0;

  try {
    const result = await dynamodb
      .get({
        TableName: process.env.PHONEBOOK_TABLE_NAME,
        Key: { phone },
      })
      .promise();

    for (
      let contactIndex = 0;
      contactIndex < result.Item.contacts.length;
      contactIndex++
    ) {
      const contact = result.Item.contacts[contactIndex];
      if (contact.contactPhone === parseInt(contactId)) {
        delContact = true;
        break;
      } else {
        delContactIndex++;
      }
    }
    if (delContact) {
      try {
        await dynamodb
          .update({
            TableName: process.env.PHONEBOOK_TABLE_NAME,
            Key: { phone },
            UpdateExpression: `remove contacts[${delContactIndex}]`,
            ReturnValues: "UPDATED_NEW",
          })
          .promise();
      } catch (err) {
        return {
          statusCode: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          body: "could not delete contact" + err,
        };
      }
    } else {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: "No contact found with that phone",
      };
    }
  } catch (err) {
    return {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: "No contact found with that phone" + err,
    };
  }

  return {
    statusCode: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({}),
  };
};

module.exports.handler = deleteContact;
