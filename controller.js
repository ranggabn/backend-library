"use strict";

var connection = require("./koneksi");

exports.index = function (req, res) {
  res.json({
    status: "00",
    message: "Aplikasi Berjalan",
  });
};

exports.getKategori = function (req, res) {
  connection.query(`SELECT * from kategori`, function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        status: "00",
        message: "Success",
        data: rows,
      });
    }
  });
};

exports.getJudul = function (req, res) {
  connection.query(
    `SELECT DISTINCT judul from book`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getTahun = function (req, res) {
  connection.query(
    `SELECT DISTINCT tahun FROM book`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getPenulis = function (req, res) {
  connection.query(
    `SELECT DISTINCT penulis FROM book`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getBook = function (req, res) {
  var kategori = req.query.kategori;
  var tahun = req.query.tahun;
  var penulis = req.query.penulis;
  var jenis = req.query.jenis;
  var judul = req.query.judul;

  connection.query(
    `SELECT b.*, k.nama from book as b
    LEFT JOIN kategori as k ON b.id_kategori = k.key
    WHERE id_kategori LIKE ? AND tahun LIKE ? AND penulis LIKE ? AND jenis LIKE ? AND judul LIKE ?`,
    [
      "%" + kategori + "%",
      "%" + tahun + "%",
      "%" + penulis + "%",
      "%" + jenis + "%",
      "%" + judul + "%",
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getAllBook = function (req, res) {
  connection.query(
    `SELECT b.*, k.nama from book as b
    LEFT JOIN kategori as k ON b.id_kategori = k.key`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getKeranjang = function (req, res) {
  var id_user = req.query.id_user;

  connection.query(
    `SELECT k.*, judul, penulis, tahun from keranjang as k 
    LEFT JOIN book as b ON k.id_buku = b.key
    WHERE id_user = ?`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getPeminjaman = function (req, res) {
  var id_user = req.query.id_user;

  connection.query(
    `SELECT p.*, b.judul, b.penulis, b.tahun, b.gambar, b.jenis, k.nama, u.id, u.nama_lengkap 
    from peminjaman as p
    INNER JOIN book as b ON p.id_buku = b.key
    INNER JOIN user as u ON p.id_user = u.id
    INNER JOIN kategori as k ON b.id_kategori = k.key
    WHERE id_user = ? 
    ORDER BY insert_date DESC`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getLastPeminjaman = function (req, res) {
  var id_user = req.query.id_user;

  connection.query(
    `SELECT p.*, b.judul, b.penulis, b.tahun, b.gambar, b.jenis, k.nama, u.id, u.nama_lengkap 
    from peminjaman as p
    INNER JOIN book as b ON p.id_buku = b.key
    INNER JOIN user as u ON p.id_user = u.id
    INNER JOIN kategori as k ON b.id_kategori = k.key
    WHERE id_user = ? 
    ORDER BY insert_date DESC
    LIMIT 2`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getMember = function (req, res) {
  connection.query(
    `SELECT * from user WHERE role = 1`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success get data.",
          data: rows,
        });
      }
    }
  );
};

exports.getAllPeminjaman = function (req, res) {
  var id_user = req.query.id_user;

  connection.query(
    `SELECT * from peminjaman as p
    INNER JOIN book as b ON p.id_buku = b.key
    INNER JOIN user as u ON p.id_user = u.id
    WHERE id_user = ? 
    ORDER BY insert_date DESC`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows,
        });
      }
    }
  );
};

exports.getListPeminjam = function (req, res) {
  connection.query(
    `SELECT sum(jumlah_buku) as jumlah_pinjam, kode_pinjam, id_user, insert_date, nama_lengkap, nomor_telefon 
    from peminjaman as p
    LEFT JOIN user as u ON p.id_user = u.id
    GROUP BY kode_pinjam, id_user, insert_date;`,
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success get data.",
          data: rows,
        });
      }
    }
  );
};

exports.postKeranjang = function (req, res) {
  var id_buku = req.body.id_buku;
  var id_user = req.body.id_user;

  connection.query(
    `SELECT * FROM keranjang WHERE id_user = ?`,
    [id_user],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length > 1) {
          res.json({
            status: "99",
            message: "Hanya diperbolehkan meminjam 2 buku.",
          });
        } else {
          connection.query(
            `SELECT * FROM keranjang WHERE id_buku = ? AND id_user = ?`,
            [id_buku, id_user],
            function (error, rows, field) {
              if (error) {
                console.log(error);
              } else {
                if (rows.length > 0) {
                  res.json({
                    status: "99",
                    message: "Hanya diperbolehkan meminjam 1 buku yang sama.",
                  });
                } else {
                  connection.query(
                    `INSERT INTO keranjang (id_buku, id_user, jumlah_buku) VALUES (?, ?, ?)`,
                    [id_buku, id_user, 1],
                    function (error, rows, field) {
                      if (error) {
                        console.log(error);
                      } else {
                        res.json({
                          status: "00",
                          message: "Success insert data",
                        });
                      }
                    }
                  );
                }
              }
            }
          );
        }
      }
    }
  );
};

exports.postPeminjaman = function (req, res) {
  var values = [
    {
      kode_pinjam: req.body.kode_pinjam,
      id_buku: req.body.id_buku,
      id_user: req.body.id_user,
      jumlah_buku: req.body.jumlah_buku,
      status: req.body.status,
    },
  ];

  connection.query(
    `INSERT INTO peminjaman (kode_pinjam, id_buku, id_user, jumlah_buku, status) VALUES ?`,
    [
      values.map((values) => [
        values.kode_pinjam,
        values.id_buku,
        values.id_user,
        values.jumlah_buku,
        0,
      ]),
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Peminjaman buku diproses.",
        });
      }
    }
  );
};

exports.deleteAllKeranjang = function (req, res) {
  connection.query(`TRUNCATE keranjang;`, function (error, rows, field) {
    if (error) {
      console.log(error);
    } else {
      res.json({
        status: "00",
        message: "Success delete data",
      });
    }
  });
};

exports.deleteKeranjang = function (req, res) {
  var key = req.query.key;

  connection.query(
    `DELETE from keranjang WHERE keranjang.key = ?;`,
    [key],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success delete data",
        });
      }
    }
  );
};
