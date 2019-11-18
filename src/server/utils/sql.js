const QUERY_TABLE = (tableName) => `SELECT * FROM ${tableName};`;

// const INSERT_TABLE = (tableName, { key, value }) => `INSERT INTO ${tableName}(${key}) VALUES(${value});`;
const INSERT_TABLE = (tableName) => `INSERT INTO ${tableName} SET ?`;

const UPDATE_TABLE = (tableName, { primaryKey, primaryValue }, { key, value }) => `UPDATE ${tableName} SET ${key} = '${value}' WHERE(${primaryKey}=${primaryValue});`

const DELETE_TABLE = (tableName, { primaryKey, primaryValue }) => `DELETE FROM ${tableName} WHERE(${primaryKey}=${primaryValue});`

module.exports = {
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
}