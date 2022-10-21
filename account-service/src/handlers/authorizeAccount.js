const jwt = require("jsonwebtoken");

// By default, API Gateway authorizations are cached (TTL) for 300 seconds.
// This policy will authorize all requests to the same API Gateway instance where the
// request is coming from, thus being efficient and optimising costs.
const generatePolicy = (principalId, routeArn) => {
  const apiGatewayWildcard = routeArn.split("/", 2).join("/") + "/*";

  return {
    principalId,
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: apiGatewayWildcard,
        },
      ],
    },
  };
};

const authorizeAccount = async (event, context) => {
  if (!event.headers.authorization) {
    return {
      statusCode: 401,
      body: "No token found",
    };
  }

  const token = event.headers.authorization.replace("Bearer ", "");

  try {
    const claims = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const policy = generatePolicy(claims.phone, event.routeArn);

    return {
      ...policy,
      context: claims,
    };
  } catch (err) {
    return {
      statusCode: 401,
      body: "Unauthorized",
    };
  }
};

module.exports.handler = authorizeAccount;
