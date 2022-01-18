const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseHistory = require('mongoose-history');


var kD1_K01Schema = new mongoose.Schema({
  nr: String,
  dalykas: String,
  grupe: String,
  semestras: String,
  planuotosVal: Number,
  atliktosVal: Number
});
var nD2_P01Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String
});
var nD2_M01Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String
});
var nD2_M02Schema = new mongoose.Schema({
  nr: String,
  bibliografApr: String,
  tipas: String,
  mokslSrit: String,
  mokslKrypt: String,
  katedra: String
});
var nD2_M03Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  dalykPavad: String,
  apimtisKredit: Number
});
var nD2_M04Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  dalykPavad: String,
  busena: String,
  apimtisKredit: Number
});
var nD2_D01Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  veikla: String,
  rezultatai: String
});
var nD2_D02Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  veikla: String,
  rezultatai: String
});
var nD2_D03Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  veikla: String,
  rezultatai: String
});
var nD2_S01Schema = new mongoose.Schema({
  nr: String,
  veikla: String,
  dataVieta: String
});
var nD2_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});
var tMTEP3_T01Schema = new mongoose.Schema({
  nr: String,
  tyrTemat: String,
  tyrGrup: String,
  mokslSrit: String,
  mokslKrypt: String
});
var tMTEP3_T02Schema = new mongoose.Schema({
  nr: String,
  bibliografApr: String,
  tipas: String,
  mokslSrit: String,
  mokslKrypt: String,
  duomBaze: String
});
var tMTEP3_T03Schema = new mongoose.Schema({
  nr: String,
  pilnasBiblApr: String
});
var tMTEP3_T04Schema = new mongoose.Schema({
  nr: String,
  uzsakovas: String,
  tema: String,
  data: String
});
var tMTEP3_T05Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String
});
var tMTEP3_T06Schema = new mongoose.Schema({
  nr: String,
  autorius: String,
  menoSrit: String,
  pobudis: String,
  realizVieta: String,
  data: String
});
var tMTEP3_T07Schema = new mongoose.Schema({
  nr: String,
  atlikejas: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String
});
var tMTEP3_T08Schema = new mongoose.Schema({
  nr: String,
  atlikejas: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String
});
var tMTEP3_T09Schema = new mongoose.Schema({
  nr: String,
  atlikejas: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String
});
var tMTEP3_T10Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String
});
var tMTEP3_T11Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String
});
var tMTEP3_T12Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  dataVieta: String
});
var tMTEP3_T13Schema = new mongoose.Schema({
  nr: String,
  studDuom: String,
  renginioPavad: String,
  rezultatas: String,
  data: String
});
var tMTEP3_T14Schema = new mongoose.Schema({
  nr: String,
  renginys: String,
  veiklPobud: String,
  dataVieta: String
});
var tMTEP3_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});

var stazuotesSchema = new mongoose.Schema({
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number
});
var seminaraiSchema = new mongoose.Schema({
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number
});
var konferencijosSchema = new mongoose.Schema({
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number
});
var kursaiSchema = new mongoose.Schema({
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number
});

var kTOV4_KV03Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  salis: String,
  institucija: String,
  dalykas: String
});
var kTOV4_O01_1Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  isakNrData: String
});
var kTOV4_O01_2Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  dataVieta: String,
  dalyvSk: String,
  ktKomentarai: String
});
var kTOV4_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});
var kV5_KT01Schema = new mongoose.Schema({
  nr: String,
  diplomantas: String,
  studProgr: String,
  darboTema: String,
  uzsakovas: String
});
var kV5_KT02Schema = new mongoose.Schema({
  nr: String,
  diplomantas: String,
  studProgr: String,
  darboTema: String
});

//katedros vedeju schemos

var kDS1Schema = new mongoose.Schema({
  nr: String,
  vardPavard: String,
  issilavinimas: String,
  pareigos: String,
  darbovTipas: String,
  pedagogStazas: String,
  praktinStazas: String
});
var mV2_M01Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String,
  destytojas: String
});
var mV2_M02Schema = new mongoose.Schema({
  nr: String,
  bibliografApr: String,
  destytojas: String,
  tipas: String,
  mokslSrit: String,
  mokslKrypt: String,
  katedra: String
});
var mV2_M03Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  dalykPavad: String,
  apimtisKredit: Number,
  destytojas: String
});
var mV2_M04Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  dalykPavad: String,
  busena: String,
  apimtisKredit: Number,
  destytojas: String
});
var mV2_D0123Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  veikla: String,
  rezultatai: String,
  destytojas: String
});
var mV2_D04Schema = new mongoose.Schema({
  nr: String,
  studProgrApimt: Number,
  progrKodas: String,
  studKryptis: String,
  rezultatai: String
});
var mV2_D05Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  dalykPavad: String,
  dalykPaskirt: String,
  destytojas: String,
  uzsienKalba: String,
  apimtisKredit: Number
});
var mV2_D06Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  progrKodas: String,
  atlPatobulin: String,
  tobulinPriezast: String,
  tobulinIrod: String
});
var mV2_D08Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  progrKodas: String,
  isakData: String,
  numatomData: String
});
var mV2_S01Schema = new mongoose.Schema({
  nr: String,
  veikla: String,
  dataVieta: String,
  destytojas: String
});
var mV2_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});
var tMTEP3_kT01Schema = new mongoose.Schema({
  nr: String,
  tyrTemat: String,
  tyrGrup: String,
  mokslSrit: String,
  mokslKrypt: String,
  destytojas: String
});
var tMTEP3_kT04Schema = new mongoose.Schema({
  nr: String,
  uzsakovas: String,
  tema: String,
  data: String,
  konsultantas: String
});
var tMTEP3_kT05Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String,
  destytojas: String
});
var tMTEP3_kT10Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String
});
var tMTEP3_kT11Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String
});
var tMTEP3_kT12Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPobud: String,
  dataVieta: String
});
var tMTEP3_kT13Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  studDuom: String,
  renginioPavad: String,
  rezultatas: String,
  data: String
});
var tMTEP3_kT14Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  renginys: String,
  veiklPobud: String,
  dataVieta: String
});
var tMTEP3_kT15Schema = new mongoose.Schema({
  nr: String,
  mokymai: String,
  vykdytojai: String,
  uzsakovas: String,
  suma: Number,
  nrData: String,
  klausytojai: Number,
  trukme: Number
});
var tMTEP3_kT16Schema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  uzsakovas: String,
  rengejai: String
});

var stazuotes_kSchema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number,
  dalyvis: String
});
var seminarai_kSchema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number,
  dalyvis: String
});
var konferencijos_kSchema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number,
  dalyvis: String
});
var kursai_kSchema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  pazymNr: String,
  trukmeVal: Number,
  dalyvis: String
});
var kTOV4_kKV03Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  salis: String,
  institucija: String,
  dalykas: String
});
var kTOV4_kO01_1Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPobud: String,
  isakNrData: String
});
var kTOV4_kO01_2Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPobud: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String
});
var kTOV4_O02_Schema = new mongoose.Schema({
  nr: String,
  atstovas: String,
  partneriai: String,
  forma: String,
  rezultatai: String,
  sutartis: String,
  tipas: String
});
var kV5_kKT03Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  baigSk: Number,
  iregUzimtumSk: Number,
  isidarbinProc: Number
});
var kV5_kKT04Schema = new mongoose.Schema({
  nr: String,
  autorius: String,
  veiklTipas: String,
  pavadinimas: String,
  sutartNr: String,
  uzsakovas: String,
  uzsakSuma: Number
});
var veiklSavinaliz_Schema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});


var userSchema = new mongoose.Schema({ //pagrindinė schema
  email: String,
  password: String,
  busenaVedejo: String,
  busena: String,
  role: String,
  vardas: String,
  pavarde: String,
  fakultetas: String,
  katedra: String,
  rolesKeitimas: Boolean,
  updated_for: String,

  destytojas: {
    issilavinimas: String,
    pareigos: String,
    darbovietesTipas: String,
    pedagogStazas: Number,
    praktVeiklStazas: Number,
    kD1_K01: {
      kD1_K01_array: [kD1_K01Schema],
      isVisoValPlan: Number,
      isVisoValAtl: Number,
      isJuSrautaisValPlan: Number,
      isJuSrautaisValAtl: Number,
      isJuUzsienioValPlan: Number,
      isJuUzsienioValAtl: Number,
      priezastys: String,
    },
    nD2: {
      nekSuStud_planVal: Number,
      nekSuStud_atlVal: Number,
      pasirengDest_planVal: Number,
      pasirengDest_atlVal: Number,
      metod_planVal: Number,
      metod_atlVal: Number,
      dalyvSPKUV_planVal: Number,
      dalyvSPKUV_atlVal: Number,
      studPop_planVal: Number,
      studPop_atlVal: Number,
      isVisoValPlan: Number,
      isVisoValAtl: Number,
      priezastys: String
    },
    nD2_N01: {
      priezastys: String
    },
    nD2_P01: [nD2_P01Schema],
    nD2_M01: [nD2_M01Schema],
    nD2_M02: [nD2_M02Schema],
    nD2_M03: [nD2_M03Schema],
    nD2_M04: [nD2_M04Schema],
    nD2_D01: [nD2_D01Schema],
    nD2_D02: [nD2_D02Schema],
    nD2_D03: [nD2_D03Schema],
    nD2_S01: [nD2_S01Schema],
    nD2_S: [nD2_SSchema],
    tMTEP3: {
      tMTEPveiklRez_planVal: Number,
      tMTEPveiklRez_atlVal: Number,
      menoVeikl_planVal: Number,
      menoVeikl_atlVal: Number,
      tMTEPmenoVeiklPop_planVal: Number,
      tMTEPmenoVeiklPop_atlVal: Number,
      studReng_planVal: Number,
      studReng_atlVal: Number,
      kitaVeikl_planVal: Number,
      kitaVeikl_atlVal: Number,
      isVisoValPlan: Number,
      isVisoValAtl: Number,
      priezastys: String
    },
    tMTEP3_T01: [tMTEP3_T01Schema],
    tMTEP3_T02: [tMTEP3_T02Schema],
    tMTEP3_T03: [tMTEP3_T03Schema],
    tMTEP3_T04: [tMTEP3_T04Schema],
    tMTEP3_T05: [tMTEP3_T05Schema],
    tMTEP3_T06: [tMTEP3_T06Schema],
    tMTEP3_T07: [tMTEP3_T07Schema],
    tMTEP3_T08: [tMTEP3_T08Schema],
    tMTEP3_T09: [tMTEP3_T09Schema],
    tMTEP3_T10: [tMTEP3_T10Schema],
    tMTEP3_T11: [tMTEP3_T11Schema],
    tMTEP3_T12: [tMTEP3_T12Schema],
    tMTEP3_T13: [tMTEP3_T13Schema],
    tMTEP3_T14: [tMTEP3_T14Schema],
    tMTEP3_S: [tMTEP3_SSchema],
    kTOV4: {
      kompTobulinimas_planVal: Number,
      kompTobulinimas_atlVal: Number,
      organizacVeikl_planVal: Number,
      organizacVeikl_atlVal: Number,
      isVisoValPlan: Number,
      isVisoValAtl: Number,
      priezastys: String
    },
    kTOV4_KV01: {
      kTOV4_KV01dalykines_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoDalyk: Boolean
      },
      kTOV4_KV01didaktines_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoDidak: Boolean
      },
      kTOV4_KV01bendrosios_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoBendr: Boolean
      }
    },
    kTOV4_KV02: {
      kTOV4_KV02dalykines_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoDalyk: Boolean
      },
      kTOV4_KV02didaktines_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoDidak: Boolean
      },
      kTOV4_KV02bendrosios_komp: {
        stazuotes: [stazuotesSchema],
        seminarai: [seminaraiSchema],
        konferencijos: [konferencijosSchema],
        kursai: [kursaiSchema],
        dalyvavoBendr: Boolean
      }
    },
    kTOV4_KV03: [kTOV4_KV03Schema],
    kTOV4_O01: {
      kTOV4_O01_1: [kTOV4_O01_1Schema],
      kTOV4_O01_2: [kTOV4_O01_2Schema]
    },
    kTOV4_S: [kTOV4_SSchema],
    kV5_KT01: [kV5_KT01Schema],
    kV5_KT02: {
      kV5_KT02_array: [kV5_KT02Schema],
      analize: String
    },
    ataskaitosPateikimoData: String,
    katedrosV_isvados: String,
    katedrosV_rekomendacijos: {
      kontaktD: String,
      neKontaktD: String,
      tMTEP_vykdymas: String,
      kompTobulinimas: String
    }
  },
  katedrosVedejas: {
    kDS1: [kDS1Schema],
    mV2: {
      mV2_M01: [mV2_M01Schema],
      mV2_M02: [mV2_M02Schema],
      mV2_M03: [mV2_M03Schema],
      mV2_M04: [mV2_M04Schema],
      mV2_D01: [mV2_D0123Schema],
      mV2_D02: [mV2_D0123Schema],
      mV2_D03: [mV2_D0123Schema],
      mV2_D04: [mV2_D04Schema],
      mV2_D05: [mV2_D05Schema],
      mV2_D06: [mV2_D06Schema],
      mV2_D07: {
        derinimas: String
      },
      mV2_D08: [mV2_D08Schema],
      mV2_S01: [mV2_S01Schema],
      mV2_S: [mV2_SSchema]
    },
    tMTEP3: {
      tMTEP3_T01: [tMTEP3_kT01Schema],
      tMTEP3_T02: [tMTEP3_T02Schema],
      tMTEP3_T03: [tMTEP3_T03Schema],
      tMTEP3_T04: [tMTEP3_kT04Schema],
      tMTEP3_T05: [tMTEP3_kT05Schema],
      tMTEP3_T06: [tMTEP3_T06Schema],
      tMTEP3_T07: [tMTEP3_T07Schema],
      tMTEP3_T08: [tMTEP3_T08Schema],
      tMTEP3_T09: [tMTEP3_T09Schema],
      tMTEP3_T10: [tMTEP3_kT10Schema],
      tMTEP3_T11: [tMTEP3_kT11Schema],
      tMTEP3_T12: [tMTEP3_kT12Schema],
      tMTEP3_T13: [tMTEP3_kT13Schema],
      tMTEP3_T14: [tMTEP3_kT14Schema],
      tMTEP3_T15: [tMTEP3_kT15Schema],
      tMTEP3_T16: [tMTEP3_kT16Schema],
      tMTEP3_T17: {
        komentaras: String
      },
      tMTEP3_T18: {
        komentaras: String
      }, //plane pazymeta T.10
      tMTEP3_S: [tMTEP3_SSchema]
    },
    kTOV4: {
      kTOV4_KV01: {
        dalykinesLT: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursaiSk: Number
        },
        didaktinesLT: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursaiSk: Number
        },
        bendrosiosLT: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursaiSk: Number
        },
        kTOV4_KV01dalykines_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        },
        kTOV4_KV01didaktines_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        },
        kTOV4_KV01bendrosios_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        }
      },
      kTOV4_KV02: {
        dalykinesNeLt: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursaiSk: Number
        },
        didaktinesNeLt: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursaiSk: Number
        },
        bendrosiosNeLt: {
          destytojuSk: Number,
          trukmeVal: Number,
          stazuotSk: Number,
          seminarSk: Number,
          konferencSk: Number,
          kursuoseSk: Number
        },
        kTOV4_KV02dalykines_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        },
        kTOV4_KV02didaktines_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        },
        kTOV4_KV02bendrosios_komp: {
          stazuotes: [stazuotes_kSchema],
          seminarai: [seminarai_kSchema],
          konferencijos: [konferencijos_kSchema],
          kursai: [kursai_kSchema]
        }
      },
      kTOV4_KV03: [kTOV4_kKV03Schema],
      kTOV4_KV04: {
        judrumoDinamika: String
      },
      kTOV4_KV05: {
        poveikisVeiklai: String
      },
      kTOV4_O01: {
        kTOV4_O01_1: [kTOV4_kO01_1Schema],
        kTOV4_O01_2: [kTOV4_kO01_2Schema]
      },
      kTOV4_O02: [kTOV4_O02_Schema],
      kTOV4_S: [kTOV4_SSchema],
    },
    kV5: {
      kV5_KT01: [kV5_KT01Schema],
      kV5_KT02: [kV5_KT02Schema],
      kV5_KT03: {
        kV5_KT03_array: [kV5_kKT03Schema],
        isVisoBaigSk: Number,
        isVisoIregUzimt: Number,
        isVisoIsidarbProc: Number
      },
      kV5_KT04: [kV5_kKT04Schema],
      kV5_KT05: {
        bendradarbiavSklaid: String,
        praktVeiklSklaid: String,
        dalyvavSklaid: String,
      },
      kV5_KT06: {
        moklsPopSklaid: String,
        tyrimuSklaid: String,
        modernKultSklaid: String,
        bendrLavinSklaid: String,
        socAtskirtSklaid: String,
        aplinkApsaugSklaid: String
      },
      kV5_KT07: {
        kompUgdymas: String
      },
      kV5_KT08: {
        rezFormulavimas: String
      },
      kV5_KT09: {
        darnVystItrauk: String
      },
      veiklSavinalize: {
        veiklSavinaliz_array: [veiklSavinaliz_Schema],
        isvadosApieVeikl: String
      }
    }
  }
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongooseHistory);

const User = mongoose.model("User", userSchema);

module.exports = User;
