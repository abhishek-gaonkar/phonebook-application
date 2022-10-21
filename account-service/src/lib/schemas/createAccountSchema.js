exports.schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        name: { type: "string" },
        phone: { type: "number" },
        password: { type: "string" },
      },
      required: ["name", "phone", "password"],
    },
  },
  required: ["body"],
};
