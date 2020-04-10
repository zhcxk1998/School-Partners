const QUERY_TABLE = (tableName, limit, query) => {
  const limitSql = limit ? `WHERE ${limit[0]} = '${limit[1]}'` : ''
  const querySql = query ? query.join(',') : '*'
  return `SELECT ${querySql} FROM ${tableName} ${limitSql}`
}

const INSERT_TABLE = (tableName) => `INSERT INTO ${tableName} SET ?`;

const REPLACE_TABLE = (tableName) => `REPLACE INTO ${tableName} SET ?`;

const UPDATE_TABLE = (tableName, { primaryKey, primaryValue }, { key, value }) => `UPDATE ${tableName} SET ${key} = '${value}' WHERE(${primaryKey}=${primaryValue});`

const DELETE_TABLE = (tableName, { primaryKey, primaryValue }) => `DELETE FROM ${tableName} WHERE(${primaryKey}=${primaryValue});`

const UPDATE_TABLE_MULTI = (tableName, { primaryKey, primaryValue }, params) => {
  const sqlList = []
  for (const [key, value] of Object.entries(params)) {
    sqlList.push(`${key}='${value}'`)
  }
  return `UPDATE ${tableName} SET ${sqlList.join(',')} WHERE ${primaryKey}=${primaryValue}`
}

module.exports = {
  QUERY_TABLE,
  INSERT_TABLE,
  UPDATE_TABLE,
  DELETE_TABLE,
  REPLACE_TABLE,
  UPDATE_TABLE_MULTI
}