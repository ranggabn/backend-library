var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");

// controller untuk register
exports.reqistrasi = function (req, res) {
  var post = {
    email: req.body.email,
    nama_lengkap: req.body.nama_lengkap,
    universitas: req.body.universitas,
    jurusan: req.body.jurusan,
    nomor_telefon: req.body.nomor_telefon,
    ktm: req.body.ktm,
    password: md5(req.body.password),
  };

  var query = "SELECT email FROM ?? WHERE ??=?";
  var table = ["user", "email", post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              status: "00",
              message: "Pendaftaran Berhasil",
            });
          }
        });
      } else {
        res.json({
          status: "99",
          message: "Email anda sudah terdaftar!",
        });
      }
    }
  });
};

//controller login
exports.login = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  var query = "SELECT id, email, role FROM ?? WHERE ??=? AND ??=?";
  var table = ["user", "password", md5(post.password), "email", post.email];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: "12h",
        });
        res.json({
          status: "00",
          message: "Login success",
          token: token,
          data: rows[0],
        });
      } else {
        res.json({
          status: "99",
          message: "Email atau password anda salah",
        });
      }
    }
  });
};
