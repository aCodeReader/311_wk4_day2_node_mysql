const mysql = require('mysql')
const pool = require('../sql/connection')
const { handleSQLError } = require('../sql/error')

const getAllUsers = (req, res) => {
  // SELECT ALL USERS
  pool.query("SELECT * FROM users", (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const getUserById = (req, res) => {
  // SELECT USERS WHERE ID = <REQ PARAMS ID>
  let sql = `SELECT ??, ??, ?? FROM ?? WHERE ?? = ${req.params.id}`
  sql = mysql.format(sql, ['id', 'first_name', 'last_name', 'users', 'id'])
  pool.query(sql, (err, rows) => {
    if (err) return handleSQLError(res, err)
    return res.json(rows);
  })
}

const createUser = (req, res) => {
  pool.query('INSERT INTO users SET ?', {first_name: `${req.body.first_name}`, last_name: `${req.body.last_name}` }, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let sql = `UPDATE ?? SET first_name = ?, last_name = ? WHERE id =  ${req.params.id}`
  sql = mysql.format(sql, ['users', `${req.body.first_name}`, `${req.body.last_name}` ])
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json(results);
  })
}

const deleteUser = (req, res) => {
  const value = req.params.field == 'id' ? req.params.value : `'${req.params.value}'`
  let sql = `DELETE FROM users WHERE ?? = ${value}`
  sql = mysql.format(sql, [req.params.field])
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ message: `Deleted ${results.affectedRows} user(s)` });
  })
}




module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  }