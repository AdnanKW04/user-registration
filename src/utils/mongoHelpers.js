const commonService = {
  getOne: ({ model, query }) => {
    return model.findOne(query);
  },
  create: ({ model, body }) => {
    const schema = new model(body);
    return schema.save();
  },
};

module.exports = { commonService };
