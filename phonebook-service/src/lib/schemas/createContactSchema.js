exports.schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        contactName: { type: "string" },
        contactPhone: { type: "number" },
      },
      required: ["contactName", "contactPhone"],
    },
  },
  required: ["body"],
};
