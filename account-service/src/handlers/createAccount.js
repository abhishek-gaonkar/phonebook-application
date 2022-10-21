const AWS = require("aws-sdk");
const { v1: uuidv1 } = require("uuid");
const validator = require("@middy/validator");
const { createHash } = require("../lib/encryptPassword");
const { commonMiddleware } = require("../lib/commonMiddleware");
const { schema } = require("../lib/schemas/createAccountSchema");
const { sendRes } = require("../lib/buildResponse");

const dynamodb = new AWS.DynamoDB.DocumentClient();

const createAccount = async (event, context) => {
  const { name, phone, password } = event.body;
  const repetitionParams = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Key: { phone },
  };

  const checkItem = await dynamodb.get(repetitionParams).promise();

  if (checkItem.Item) {
    return sendRes(400, "Account with that phone number already exists");
  }

  const salt = await uuidv1();
  const hashed_password = await createHash(password, salt);

  if (hashed_password === "") {
    return sendRes(400, "No Password obtained");
  }

  const account = {
    name,
    phone,
    hashed_password,
    salt,
    contacts: [],
  };

  const params = {
    TableName: process.env.PHONEBOOK_TABLE_NAME,
    Item: account,
  };

  try {
    await dynamodb.put(params).promise();
  } catch (error) {
    return sendRes(400, error);
  }

  return sendRes(
    201,
    JSON.stringify({
      message: "Created Successfully",
      user: { name, phone },
    })
  );
};

module.exports.handler = commonMiddleware(createAccount).use(
  validator({
    inputSchema: schema,
    ajvOptions: {
      strict: false,
    },
  })
);
