const commonService = {
  create: async ({ model, body }) => {
    return await model.create(body);
  },
  bulkCreate: async ({ model, body }) => {
    return await model.insertMany(body);
  },
  getOne: async ({ model, query }) => {
    return await model.findOne(query);
  },
  getMany: async ({ model, query }) => {
    return await model.find(query);
  },
  update: async ({ model, body, query }) => {
    return await model.updateMany(query, { $set: body });
  },
  destroy: async ({ model, query }) => {
    return await model.deleteMany(query);
  },
};

module.exports = { commonService };
