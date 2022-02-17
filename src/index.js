/* 
  2022
  v1.0
  Christopher Gijoh
  github.com/chrisg661
  Interdisiplin PJOK, Fisika, Informatika
*/

function halamanKecepatan() {
  var input = {
    // Elemen input halaman kecepatan
    jarak: document.querySelector("form.kecepatan #kecepatan-jarak"),
    jarakSatuan: document.querySelector(
      "form.kecepatan #kecepatan-jarak-satuan"
    ),
    waktu: {
      jam: document.querySelector("form.kecepatan #kecepatan-waktu-jam"),
      menit: document.querySelector("form.kecepatan #kecepatan-waktu-menit"),
      detik: document.querySelector("form.kecepatan #kecepatan-waktu-detik"),
    },
    kecepatan: document.querySelector("form.kecepatan #kecepatan-kecepatan"),
    kecepatanSatuan: document.querySelector(
      "form.kecepatan #kecepatan-kecepatan-satuan"
    ),
    hitung: document.querySelectorAll('form.kecepatan input[name="hitung"]'),
  };

  // Menjalankan fungsi update ketika nilai dimasukkan
  document.querySelectorAll("form.kecepatan input").forEach((e) => {
    e.oninput = update;
  });
  document.querySelectorAll("form.kecepatan select").forEach((e) => {
    e.onchange = update;
  });
  input.hitung.forEach((e) => {
    e.onchange = (e) => {
      document
        .querySelectorAll("form.kecepatan input[type='number']")
        .forEach((e) => {
          e.value = "";
        }); // Menghapus input sebelumnya
      update(e);
    };
  });

  function kecepatan(d, t, v) {
    // d: jarak, t: waktu, v: kecepatan
    if (v == 0) {
      return d / t; // Menghitung kecepatan
    } else if (t == 0) {
      return d / v; // Menghitung waktu tempuh
    } else if (d == 0) {
      return v * t; // Menghitung jarak
    }
  }

  function update(e) {
    // Melakukan perhitungan saat nilai dimasukkan
    var currentInput = {
      // Variabel saat update
      jarak: parseFloat(input.jarak.value) || 0,
      jarakSatuan: input.jarakSatuan.value,
      waktu: {
        jam: parseFloat(input.waktu.jam.value) || 0,
        menit: parseFloat(input.waktu.menit.value) || 0,
        detik: parseFloat(input.waktu.detik.value) || 0,
      },
      kecepatan: parseFloat(input.kecepatan.value) || 0,
      kecepatanSatuan: input.kecepatanSatuan.value,
      hitung: document
        .querySelector("input[name='hitung']:checked")
        .id.replace("kecepatan-", ""),
    };
    switch (
      currentInput.hitung // Switch mode perhitungan
    ) {
      case "hitung-kecepatan": {
        // Menghitung kecepatan dari input jarak dan waktu
        // Input jarak
        var d = currentInput.jarak;
        if (currentInput.jarakSatuan == "km") {
          d = d * 1000;
        }
        // Input waktu
        var t = waktuDetik(currentInput.waktu);
        ({
          jam: input.waktu.jam.value,
          menit: input.waktu.menit.value,
          detik: input.waktu.detik.value,
        } = waktuFormat(t));

        // Hitung kecepatan
        var v = kecepatan(d, t, 0);
        if (currentInput.kecepatanSatuan == "km/j") {
          v = v * 3.6;
        }
        input.kecepatan.value = roundFloat(v);
        break;
      }
      case "hitung-jarak": {
        // Menghitung jarak dari input waktu dan kecepatan
        // Input waktu
        var t = waktuDetik(currentInput.waktu);
        ({
          jam: input.waktu.jam.value,
          menit: input.waktu.menit.value,
          detik: input.waktu.detik.value,
        } = waktuFormat(t));

        // Input kecepatan
        var v = currentInput.kecepatan;
        if (currentInput.kecepatanSatuan == "km/j") {
          v = v / 3.6;
        }

        // Hitung jarak
        var d = kecepatan(0, t, v);
        if (currentInput.jarakSatuan == "km") {
          d = d / 1000;
        }
        input.jarak.value = roundFloat(d);
        break;
      }
      case "hitung-waktu": {
        // Menghitung waktu dari input jarak dan kecepatan
        // Input jarak
        var d = currentInput.jarak;
        if (currentInput.jarakSatuan == "km") {
          d = d * 1000;
        }

        // Input kecepatan
        var v = currentInput.kecepatan;
        if (currentInput.kecepatanSatuan == "km/j") {
          v = v / 3.6;
        }
        // Hitung waktu
        var t = kecepatan(d, 0, v);
        ({
          jam: input.waktu.jam.value,
          menit: input.waktu.menit.value,
          detik: input.waktu.detik.value,
        } = waktuFormat(t));
        break;
      }
    }
  }
}

function halamanPercepatan() {
  var input = {
    // Elemen input halaman percepatan
    kecepatanAwal: document.querySelector(
      "form.percepatan #percepatan-kecepatan-awal"
    ),
    kecepatanAwalSatuan: document.querySelector(
      "form.percepatan #percepatan-kecepatan-awal-satuan"
    ),
    kecepatanAkhir: document.querySelector(
      "form.percepatan #percepatan-kecepatan-akhir"
    ),
    kecepatanAkhirSatuan: document.querySelector(
      "form.percepatan #percepatan-kecepatan-akhir-satuan"
    ),
    waktu: {
      jam: document.querySelector("form.percepatan #percepatan-waktu-jam"),
      menit: document.querySelector("form.percepatan #percepatan-waktu-menit"),
      detik: document.querySelector("form.percepatan #percepatan-waktu-detik"),
    },
    percepatan: document.querySelector(
      "form.percepatan #percepatan-percepatan"
    ),
    percepatanSatuan: document.querySelector(
      "form.percepatan #percepatan-percepatan-satuan"
    ),
  };

  // Menjalankan fungsi update ketika nilai dimasukkan
  document.querySelectorAll("form.percepatan input").forEach((e) => {
    e.oninput = update;
  });
  document.querySelectorAll("form.percepatan select").forEach((e) => {
    e.onchange = update;
  });

  // a  = v1 - v2 / t
  // v1 = v2 + at
  // v2 = v1 - at
  // t  = v1 - v2 / a
  function update(e) {
    // Melakukan perhitungan saat nilai dimasukkan
    var currentInput = {
      // Variabel saat update
      kecepatanAwal: parseFloat(input.kecepatanAwal.value) || 0,
      kecepatanAwalSatuan: input.kecepatanAwalSatuan.value,
      kecepatanAkhir: parseFloat(input.kecepatanAkhir.value) || 0,
      kecepatanAkhirSatuan: input.kecepatanAkhirSatuan.value,
      waktu: {
        jam: parseFloat(input.waktu.jam.value) || 0,
        menit: parseFloat(input.waktu.menit.value) || 0,
        detik: parseFloat(input.waktu.detik.value) || 0,
      },
      percepatan: parseFloat(input.percepatan.value) || 0,
      percepatanSatuan: input.percepatanSatuan.value,
    };

    // Input kecepatan awal
    var v1 = currentInput.kecepatanAwal;
    if (currentInput.kecepatanAwalSatuan == "km/j") {
      v1 = v1 / 3.6;
    }

    // Input kecepatan akhir
    var v2 = currentInput.kecepatanAkhir;
    if (currentInput.kecepatanAkhirSatuan == "km/j") {
      v2 = v2 / 3.6;
    }

    // Input delta waktu
    var t = waktuDetik(currentInput.waktu);
    ({
      jam: input.waktu.jam.value,
      menit: input.waktu.menit.value,
      detik: input.waktu.detik.value,
    } = waktuFormat(t));

    // Hitung percepatan
    var a = (v2 - v1) / t;
    if (currentInput.percepatanSatuan == "km/j²") {
      a = a * 12960;
    }
    input.percepatan.value = roundFloat(a);
  }
}

function halamanRataRata() {
  var input = {
    // Elemen input halaman rata-rata
    data: document.querySelector("#rata-data"),
    hasil: document.querySelector("#rata-hasil"),
    banyak: document.querySelector("#rata-banyak"),
  };
  input.data.querySelectorAll("li input").forEach((e) => {
    // Menjalankan fungsi update ketika nilai dimasukkan
    e.oninput = update;
  });
  function update(e) {
    // Melakukan perhitungan saat nilai dimasukkan
    var data = [];
    input.data.querySelectorAll("li input").forEach((e) => {
      if (e.value == "") return;
      data.push(parseFloat(e.value)); // Menambahkan tiap input data ke dalam array
    });
    var jumlah = 0;
    for (var i = 0, n = data.length; i < n; i++) {
      jumlah += data[i]; // Menjumlahkan data
    }
    var rata = jumlah / data.length; // Menghitung rata-rata
    input.hasil.value = roundFloat(rata);
    input.banyak.value = data.length;
  }
  halamanRataRata.update = update;
}

function halamanSimpanganBaku() {
  var input = {
    // Elemen input halaman rata-rata
    data: document.querySelector("#simpangan-baku-data"),
    simpanganBaku: document.querySelector("#simpangan-baku-simpangan"),
    banyak: document.querySelector("#simpangan-baku-banyak"),
    rata: document.querySelector("#simpangan-baku-rata"),
    ketidakpastian: document.querySelector("#simpangan-baku-ketidakpastian"),
    hasil: document.querySelector("#simpangan-baku-hasil"),
    hasilKetidakpastian: document.querySelector(
      "#simpangan-baku-hasil-ketidakpastian"
    ),
  };
  input.data.querySelectorAll("li input").forEach((e) => {
    // Menjalankan fungsi update ketika nilai dimasukkan
    e.oninput = update;
  });
  function update(e) {
    // Melakukan perhitungan saat nilai dimasukkan
    var data = [];
    input.data.querySelectorAll("li input").forEach((e) => {
      if (e.value == "") return;
      data.push(parseFloat(e.value)); // Menambahkan tiap input data ke dalam array
    });
    var n = data.length;
    input.banyak.value = n;

    var jumlah = 0;
    for (var i = 0, n = n; i < n; i++) {
      jumlah += data[i]; // Menjumlahkan data
    }

    var jumlahKuadrat = 0;
    for (var i = 0, n = n; i < n; i++) {
      jumlahKuadrat += Math.pow(data[i], 2); // Mengkuadratkan dan menjumlahkan tiap data
    }

    var simpanganBaku =
      (1 / n) * Math.sqrt((n * jumlahKuadrat - Math.pow(jumlah, 2)) / (n - 1)); // Menghitung simpangan baku
    input.simpanganBaku.value = roundFloat(simpanganBaku);

    var rata = jumlah / data.length;
    input.rata.value = roundFloat(rata);

    var ketidakpastian = (simpanganBaku / rata) * 100;
    input.ketidakpastian.value = roundFloat(ketidakpastian);

    // Menghitung angka penting
    var angkaPenting = 0;
    if (ketidakpastian > 1) {
      angkaPenting = 2;
    } else if (ketidakpastian < 1) {
      angkaPenting = 3;
    } else if (ketidakpastian <= 0.1) {
      angkaPenting = 4;
    }

    input.hasil.value = roundFloat(rata).toPrecision(angkaPenting); // Mengatur angka penting
    input.hasilKetidakpastian.value = roundFloat(simpanganBaku);
  }
  halamanSimpanganBaku.update = update;
}

function roundFloat(num, decimal = 5) {
  // Membulatkan float dengan floating point error
  decimal = Math.pow(10, decimal);
  return Math.round((num + Number.EPSILON) * decimal) / decimal;
}

function waktuDetik(t) {
  // Mengubah input waktu ke detik
  return t.jam * 3600 + t.menit * 60 + t.detik;
}

function waktuFormat(t) {
  // Mengubah detik ke format input waktu
  var j = Math.floor(t / 3600),
    m = Math.floor((t % 3600) / 60),
    d = roundFloat(t % 60, 2);
  return {
    jam: j == 0 ? "" : j,
    menit: m == 0 ? "" : m,
    detik: d == 0 ? "" : d,
  };
}

halamanKecepatan();
halamanPercepatan();
halamanRataRata();
halamanSimpanganBaku();
