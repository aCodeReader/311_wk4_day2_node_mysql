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
  pool.query('INSERT INTO users SET ?', {first_name: 'test', last_name: 'user' }, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.json({ newId: results.insertId });
  })
}

const updateUserById = (req, res) => {
  let sql = `UPDATE ?? SET first_name = ?, last_name = ? WHERE id =  ${req.params.id}`
  sql = mysql.format(sql, ['users', 'Yubba', 'Yubba' ])
  pool.query(sql, (err, results) => {
    if (err) return handleSQLError(res, err)
    return res.status(204).json(results);
  })
}

const deleteUserByFirstName = (req, res) => {
  let sql = `DELETE FROM ?? WHERE ?? = '${req.params.first_name}'`
  sql = mysql.format(sql, ['users', 'first_name'])
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
  deleteUserByFirstName
}