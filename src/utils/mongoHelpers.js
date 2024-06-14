const commonService = {
  getOne: ({ model, query }) => {
    return model.findOne(query);
  },
  create: ({ model, body }) => {
    const schema = new model(body);
    return schema.save();
  },
  update: ({ model, body, query }) => {
    return model.findOneAndUpdate(query, body, { new: true });
  },
};

module.exports = { commonService };
