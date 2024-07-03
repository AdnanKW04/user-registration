const createSearchQuery = ({ search, searchArr }) => {
  return searchArr.map((searchCol) => ({
    [searchCol]: { $regex: search, $options: "i" },
  }));
};

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
  getMany: async ({ model, query, options }) => {
    if (options.page && options.limit) {
      const { limit, page } = options;
      const offset = (page - 1) * limit;

      return await model.find(query).limit(limit).skip(offset);
    }
    return await model.find(query);
  },
  update: async ({ model, body, query }) => {
    return await model.updateMany(query, { $set: body });
  },
  destroy: async ({ model, query }) => {
    return await model.deleteMany(query);
  },
};

module.exports = { commonService, createSearchQuery };
