"use strict";

const md5 = require("md5");
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

exports.getBookById = function (req, res) {
  var id_buku = req.query.id_buku;

  connection.query(
    `SELECT b.*, k.nama from book as b
    LEFT JOIN kategori as k ON b.id_kategori = k.key
    WHERE b.key = ? `,
    [id_buku],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success",
          data: rows[0],
        });
      }
    }
  );
};

exports.getAllBook = function (req, res) {
  connection.query(
    `SELECT b.*, k.nama from book as b
    LEFT JOIN kategori as k ON b.id_kategori = k.key
    ORDER BY b.key DESC`,
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
    `SELECT p.*, b.judul, b.penulis, b.tahun, b.gambar, b.jenis, b.pdf, k.nama, u.id, u.nama_lengkap 
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
    `SELECT p.*, b.judul, b.penulis, b.tahun, b.gambar, b.jenis, b.pdf, k.nama, u.id, u.nama_lengkap 
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

exports.getLastPeminjamanOnline = function (req, res) {
  var id_user = req.query.id_user;

  connection.query(
    `SELECT p.*, b.judul, b.penulis, b.tahun, b.gambar, b.jenis, b.pdf, k.nama, u.id, u.nama_lengkap 
    from peminjaman as p
    INNER JOIN book as b ON p.id_buku = b.key
    INNER JOIN user as u ON p.id_user = u.id
    INNER JOIN kategori as k ON b.id_kategori = k.key
    WHERE id_user = ? AND b.jenis = ? AND p.status = ?
    ORDER BY insert_date DESC
    LIMIT 2`,
    [id_user, "2", 4],
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

exports.getMemberById = function (req, res) {
  var id = req.query.id;

  connection.query(
    `SELECT * from user WHERE id = ?`,
    [id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Success get data.",
          data: rows[0],
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
    `SELECT sum(jumlah_buku) as jumlah_pinjam, kode_pinjam, id_user, insert_date, nama_lengkap, nomor_telefon, status 
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

exports.getPeminjamById = function (req, res) {
  var kode_pinjam = req.query.kode_pinjam;

  connection.query(
    `SELECT kode_pinjam, insert_date, tanggal_approve, tanggal_pengembalian, id_buku, jumlah_buku, status, judul, stok, nama_lengkap, nomor_telefon, jurusan, universitas, jenis
    from peminjaman as p
    LEFT JOIN book as b ON p.id_buku = b.key
    LEFT JOIN user as u ON p.id_user = u.id
    WHERE kode_pinjam=?;`,
    [kode_pinjam],
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

exports.postForgot = function (req, res) {
  var email = req.body.email;

  connection.query(
    `SELECT * FROM user WHERE email = ?`,
    [email],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length) {
          connection.query(
            `UPDATE user SET status_forgot = ? WHERE email = ?`,
            [1, email],
            function (error, rows, field) {
              if (error) {
                console.log(error);
              } else {
                res.json({
                  status: "00",
                  message: "Pengajuan perubahan password berhasil",
                });
              }
            }
          );
        } else {
          res.json({
            status: "99",
            message: "Email tidak terdaftar.",
          });
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
    },
  ];

  connection.query(
    `INSERT INTO peminjaman (kode_pinjam, id_buku, id_user, jumlah_buku) VALUES ?`,
    [
      values.map((values) => [
        values.kode_pinjam,
        values.id_buku,
        values.id_user,
        values.jumlah_buku,
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

exports.postBuku = function (req, res) {
  var judul = req.body.judul;
  var penulis = req.body.penulis;
  var tahun = req.body.tahun;
  var stok = req.body.stok;
  var id_kategori = req.body.id_kategori;
  var jenis = req.body.jenis;
  var gambar = req.body.gambar;
  var pdf = req.body.pdf;

  connection.query(
    `INSERT INTO book (judul, penulis, tahun, stok, id_kategori, jenis, gambar, pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [judul, penulis, tahun, stok, id_kategori, jenis, gambar, pdf],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Berhasil tambah buku.",
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

exports.deleteBook = function (req, res) {
  var id_buku = req.query.id_buku;

  connection.query(
    `DELETE from book WHERE book.key = ?;`,
    [id_buku],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Berhasil hapus buku.",
        });
      }
    }
  );
};

exports.putBuku = function (req, res) {
  var judul = req.body.judul;
  var penulis = req.body.penulis;
  var tahun = req.body.tahun;
  var stok = req.body.stok;
  var id_kategori = req.body.id_kategori;
  var jenis = req.body.jenis;
  var gambar = req.body.gambar;
  var key = req.body.key;

  connection.query(
    `UPDATE book set judul=?, penulis=?, tahun=?, stok=?, id_kategori=?, jenis=?, gambar=? WHERE book.key=?`,
    [judul, penulis, tahun, stok, id_kategori, jenis, gambar, key],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Berhasil update buku.",
        });
      }
    }
  );
};

exports.changeStatus = function (req, res) {
  var kode_pinjam = req.body.kode_pinjam;
  var id_buku = req.body.id_buku;
  var status = req.body.status;
  var stok = req.body.stok;
  var d = new Date();
  var now = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  d.setDate(d.getDate() + 5);
  var pengembalian =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();

  connection.query(
    `UPDATE peminjaman SET status = ?, tanggal_approve=?, tanggal_pengembalian=? WHERE kode_pinjam = ? AND id_buku = ?`,
    [status, now, pengembalian, kode_pinjam, id_buku],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        var new_stok;
        if (status == "5") {
          new_stok = stok + 1;
        } else if (status != "6" && status != "7") {
          new_stok = stok - 1;
        } else {
          new_stok = stok;
        }
        connection.query(
          `UPDATE book set stok=? WHERE book.key=?`,
          [new_stok, id_buku],
          function (error, rows, field) {
            if (error) {
              console.log(error);
            } else {
              res.json({
                status: "00",
                message: "Berhasil update peminjaman.",
              });
            }
          }
        );
      }
    }
  );
};

exports.putForgot = function (req, res) {
  var id = req.body.id;
  var new_password = md5(req.body.nomor_telefon);

  connection.query(
    `UPDATE user SET status_forgot = ?, password = ? WHERE id = ?`,
    [2, new_password, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Password berhasil diubah.",
        });
      }
    }
  );
};

exports.putProfil = function (req, res) {
  var nama_lengkap = req.body.nama_lengkap;
  var nomor_telefon = req.body.nomor_telefon;
  var email = req.body.email;
  var id = req.body.id;

  connection.query(
    `UPDATE user set nama_lengkap=?, nomor_telefon=?, email=? WHERE id=?`,
    [nama_lengkap, nomor_telefon, email, id],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        res.json({
          status: "00",
          message: "Profil berhasil diubah.",
        });
      }
    }
  );
};

exports.putPassword = function (req, res) {
  var old_password = md5(req.body.old_password);
  var password = md5(req.body.password);
  var id = req.body.id;

  connection.query(
    `SELECT * FROM user WHERE id=? AND password=?`,
    [id, old_password],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        if (rows.length) {
          connection.query(
            `UPDATE user SET password=? WHERE id=?`,
            [password, id],
            function (error, rows, field) {
              if (error) {
                console.log(error);
              } else {
                res.json({
                  status: "00",
                  message: "Berhasil mengubah password.",
                });
              }
            }
          );
        } else {
          res.json({
            status: "99",
            message: "Password lama anda salah.",
          });
        }
      }
    }
  );
};
