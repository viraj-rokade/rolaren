const dbConnection = require("./connection");


const getCollectionFn = collection => {
  let _col = undefined;

  return async () => {
    if (!_col) {
      const db = await dbConnection();
      _col = await db.collection(collection);
    }

    return _col;
  };
};


module.exports = {
    user_reg_data: getCollectionFn("user_reg_data"),
    registration_access_codes_data: getCollectionFn("registration_access_codes_data"),
};