const jwt = require("jsonwebtoken");

const verifyAccount = async (event, context) => {
  if (!event.headers.authorization) {
    return {
      statusCode: 401,
      body: "No token found",
    };
  }

  const token = event.headers.authorization.replace("Bearer ", "");

  try {
    const vals = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const sendData = {
      name: vals.name,
      phone: vals.phone,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(sendData),
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }
};

module.exports.handler = verifyAccount;
