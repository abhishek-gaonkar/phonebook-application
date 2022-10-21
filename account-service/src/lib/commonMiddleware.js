const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const httpEventNormalizer = require("@middy/event-normalizer");
const httpErrorHandler = require("@middy/http-error-handler");
const cors = require("@middy/http-cors");

exports.commonMiddleware = (handler) =>
  middy(handler).use([
    httpJsonBodyParser(),
    httpEventNormalizer(),
    httpErrorHandler(),
    cors(),
  ]);