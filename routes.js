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
  app.route("/getMember").get(jsonku.getMember);
  app.route("/getListPeminjam").get(jsonku.getListPeminjam);

  app.route("/postKeranjang").post(jsonku.postKeranjang);
  app.route("/postPeminjaman").post(jsonku.postPeminjaman);

  app.route("/deleteAllKeranjang").delete(jsonku.deleteAllKeranjang);
  app.route("/deleteKeranjang").delete(jsonku.deleteKeranjang);
};
