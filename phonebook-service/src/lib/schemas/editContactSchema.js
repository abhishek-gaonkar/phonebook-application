exports.schema = {
  type: "object",
  properties: {
    body: {
      type: "object",
      properties: {
        update: { type: "string" },
        contactName: { type: "string" },
        contactPhone: { type: "number" },
      },
      required: ["update", "contactName", "contactPhone"],
    },
  },
  required: ["body"],
};
