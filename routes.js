"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);

  app.route("/getKategori").get(jsonku.getKategori);
  app.route("/getJudul").get(jsonku.getJudul);
  app.route("/getTahun").get(jsonku.getTahun);
  app.route("/getPenulis").get(jsonku.getPenulis);
  app.route("/getBook").get(jsonku.getBook);
  app.route("/getAllBook").get(jsonku.getAllBook);
  app.route("/getKeranjang").get(jsonku.getKeranjang);
  app.route("/getPeminjaman").get(jsonku.getPeminjaman);
  app.route("/getLastPeminjaman").get(jsonku.getLastPeminjaman);
  app.route("/getLastPeminjamanOnline").get(jsonku.getLastPeminjamanOnline);
  app.route("/getMember").get(jsonku.getMember);
  app.route("/getListPeminjam").get(jsonku.getListPeminjam);
  app.route("/getBookById").get(jsonku.getBookById);
  app.route("/getPeminjamById").get(jsonku.getPeminjamById);
  app.route("/getMemberById").get(jsonku.getMemberById);

  app.route("/postKeranjang").post(jsonku.postKeranjang);
  app.route("/postPeminjaman").post(jsonku.postPeminjaman);
  app.route("/postBuku").post(jsonku.postBuku);
  app.route("/postForgot").post(jsonku.postForgot);

  app.route("/deleteAllKeranjang").delete(jsonku.deleteAllKeranjang);
  app.route("/deleteKeranjang").delete(jsonku.deleteKeranjang);
  app.route("/deleteBook").delete(jsonku.deleteBook);

  app.route("/putBuku").put(jsonku.putBuku);
  app.route("/changeStatus").put(jsonku.changeStatus);
  app.route("/putForgot").put(jsonku.putForgot);
  app.route("/putProfil").put(jsonku.putProfil);
  app.route("/putPassword").put(jsonku.putPassword);
};
