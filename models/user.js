const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseHistory = require('mongoose-history');

var kDS1Schema = new mongoose.Schema({
  nr: String,
  vardPavard: String,
  pareigos: String,
  darbovietesTipas: String,
  pedagogStazas: Number,
  praktVeiklStazas: Number, //ives kaip Number, isves kaip String ?
});
var kD1_K01Schema = new mongoose.Schema({
  nr: String,
  dalykas: String,
  grupe: String,
  semestras: String,
  planuotosVal: Number,
  atliktosVal: Number
});
var nD2_M02Schema = new mongoose.Schema({
  nr: String,
  bibliografApr: String,
  tipas: String,
  mokslSrit: String,
  mokslKrypt: String
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
  komitetas: String,
  veikla: String,
  rezultatai: String
});
var nD2_D02Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  veikla: String,
  rezultatai: String
});
var nD2_D03Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
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
  pilnasBiblApr: String,
  rengTipas: String
});
var tMTEP3_T04Schema = new mongoose.Schema({
  nr: String,
  uzsakovas: String,
  tema: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T05Schema = new mongoose.Schema({
  nr: String,
  veiklPavad: String,
  veiklRezult: String,
  atlygArNe: String
});
var tMTEP3_142Schema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  pastabos: String
});
var tMTEP3_143Schema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  uzsakovas: String
});
var tMTEP3_T06Schema = new mongoose.Schema({
  nr: String,
  autorius: String,
  menoSrit: String,
  pobudis: String,
  realizVieta: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T07Schema = new mongoose.Schema({
  nr: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T08Schema = new mongoose.Schema({
  nr: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T09Schema = new mongoose.Schema({
  nr: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T10Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String,
  atlygArNe: String
});
var tMTEP3_T11Schema = new mongoose.Schema({
  nr: String,
  veiklPobud: String,
  veiklTiksl: String,
  dataVieta: String,
  dalyvSk: Number,
  ktKomentarai: String,
  atlygArNe: String
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
var kompetencijuSchema = new mongoose.Schema({
  pavadinimas: String,
  pazymNr: String,
  trukmeValLT: Number,
  trukmeValUžs: Number
});
var kTOV4_25Schema = new mongoose.Schema({
  nr: String,
  renginysTema: String,
  kompGrupe: String,
  skirta: String
});
var kTOV4_26Schema = new mongoose.Schema({
  nr: String,
  imonIstaig: String,
  kompGrupe: String,
  trukmeVal: Number,
  data: String
});

var kTOV4_KV03Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
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
  destytojas: String,
  veiklPobud: String,
  dataVieta: String,
  ktKomentarai: String
});
var kTOV4_29Schema = new mongoose.Schema({
  nr: String,
  veikla: String,
  socPartneris: String
});
var kTOV4_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});
var kV5_KT01Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  diplomantas: String,
  darboTema: String,
  uzsakovas: String
});
var kV5_KT02Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  diplomantas: String,
  darboTema: String
});
var kV5_32Schema = new mongoose.Schema({
  aprasymas: String
});
var kV5_33Schema = new mongoose.Schema({
  nr: String,
  veikla: String,
  veiklPartner: String,
  organizac: String,
  veiklOrientavim: String,
  dalyviai: String,
  laikas: String,
  vieta: String
});
var kV5_34Schema = new mongoose.Schema({
  nr: String,
  pavadinimas: String,
  vykdytPartner: String,
  dalyviai: String,
  finansavim: String,
  rezultatai: String,
  salisData: String
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
    kDS1: [kDS1Schema], //1 lentelė
    kD1_K01: { //2 lentelė
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
    nD2_M02: [nD2_M02Schema], //3 lentelė
    nD2_M03: [nD2_M03Schema], //8
    nD2_M04: [nD2_M04Schema], //4
    nD2_D01: [nD2_D01Schema], //5
    nD2_D02: [nD2_D02Schema], //6
    nD2_D03: [nD2_D03Schema], //7
    nD2_S01: [nD2_S01Schema], //9
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
    tMTEP3_T01: [tMTEP3_T01Schema], //10 lentelė
    tMTEP3_T02: [tMTEP3_T02Schema],//11
    tMTEP3_T03: [tMTEP3_T03Schema],//12
    tMTEP3_T04: [tMTEP3_T04Schema], //13
    tMTEP3_T05: [tMTEP3_T05Schema], //14.1
    tMTEP3_142: [tMTEP3_142Schema], //14.2
    tMTEP3_143: [tMTEP3_143Schema], //14.3
    tMTEP3_T06: [tMTEP3_T06Schema], //15
    tMTEP3_T07: [tMTEP3_T07Schema], //16
    tMTEP3_T08: [tMTEP3_T08Schema],//17
    tMTEP3_T09: [tMTEP3_T09Schema],//18
    tMTEP3_T10: [tMTEP3_T10Schema],//19
    tMTEP3_T11: [tMTEP3_T11Schema],//20
    tMTEP3_T12: [tMTEP3_T12Schema],//21
    tMTEP3_T13: [tMTEP3_T13Schema],//22
    tMTEP3_T14: [tMTEP3_T14Schema],//23
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
    kTOV4_KV01: { //24 lentelė
      kompetencijos: {
        mokymosi: [kompetencijuSchema],
        tyrimu: [kompetencijuSchema],
        bendrosios: [kompetencijuSchema],
        dalykines: [kompetencijuSchema],
        isVisoValLT: Number,
        isVisoValUžs: Number,
        dalyvavoDalyk: Boolean
      }
    },
      kTOV4_25: [kTOV4_25Schema], //25 lentelė
      kTOV4_26: [kTOV4_26Schema], //26
    kTOV4_KV03: [kTOV4_KV03Schema], //27
    kTOV4_O01: {
      kTOV4_O01_1: [kTOV4_O01_1Schema], //28.1
      kTOV4_O01_2: [kTOV4_O01_2Schema] //28.2
    },
    kTOV4_29: [kTOV4_29Schema], //29
    kTOV4_S: [kTOV4_SSchema],
    kV5_KT01: [kV5_KT01Schema], //31
    kV5_KT02: [kV5_KT02Schema], //30
    kV5_32: { //32
    socAtskMaz: [kV5_32Schema],
    aplinkosaugInic: [kV5_32Schema],
    lietValstybPuosel: [kV5_32Schema],
    lietEtnokPuos: [kV5_32Schema],
    savanorystIniciatyv: [kV5_32Schema]
    },
    kV5_33: [kV5_33Schema], //33 lentelė
    kV5_34: [kV5_34Schema], //34
    kV5_kitaInfo: String,
    katedrosV_isvados: String,
    katedrosV_rekomendacijos: {
      kontaktD: String,
      neKontaktD: String,
      tMTEP_vykdymas: String,
      kompTobulinimas: String,
      kitosVeikl: String
    },
    ataskaitosPateikimoData: String,
  }
  //, // !!! ok viskas iki vedejo

  // katedrosVedejas: {
  //   kDS1: [kDS1Schema],
  //   mV2: {
  //     mV2_M01: [mV2_M01Schema],
  //     mV2_M02: [mV2_M02Schema],
  //     mV2_M03: [mV2_M03Schema],
  //     mV2_M04: [mV2_M04Schema],
  //     mV2_D01: [mV2_D0123Schema],
  //     mV2_D02: [mV2_D0123Schema],
  //     mV2_D03: [mV2_D0123Schema],
  //     mV2_D04: [mV2_D04Schema],
  //     mV2_D05: [mV2_D05Schema],
  //     mV2_D06: [mV2_D06Schema],
  //     mV2_D07: {
  //       derinimas: String
  //     },
  //     mV2_D08: [mV2_D08Schema],
  //     mV2_S01: [mV2_S01Schema],
  //     mV2_S: [mV2_SSchema]
  //   },
  //   tMTEP3: {
  //     tMTEP3_T01: [tMTEP3_kT01Schema],
  //     tMTEP3_T02: [tMTEP3_T02Schema],
  //     tMTEP3_T03: [tMTEP3_T03Schema],
  //     tMTEP3_T04: [tMTEP3_kT04Schema],
  //     tMTEP3_T05: [tMTEP3_kT05Schema],
  //     tMTEP3_T06: [tMTEP3_T06Schema],
  //     tMTEP3_T07: [tMTEP3_T07Schema],
  //     tMTEP3_T08: [tMTEP3_T08Schema],
  //     tMTEP3_T09: [tMTEP3_T09Schema],
  //     tMTEP3_T10: [tMTEP3_kT10Schema],
  //     tMTEP3_T11: [tMTEP3_kT11Schema],
  //     tMTEP3_T12: [tMTEP3_kT12Schema],
  //     tMTEP3_T13: [tMTEP3_kT13Schema],
  //     tMTEP3_T14: [tMTEP3_kT14Schema],
  //     tMTEP3_T15: [tMTEP3_kT15Schema],
  //     tMTEP3_T16: [tMTEP3_kT16Schema],
  //     tMTEP3_T17: {
  //       komentaras: String
  //     },
  //     tMTEP3_T18: {
  //       komentaras: String
  //     }, //plane pazymeta T.10
  //     tMTEP3_S: [tMTEP3_SSchema]
  //   },
  //   kTOV4: {
  //     kTOV4_KV01: {
  //       dalykinesLT: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursaiSk: Number
  //       },
  //       didaktinesLT: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursaiSk: Number
  //       },
  //       bendrosiosLT: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursaiSk: Number
  //       },
  //       kTOV4_KV01dalykines_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       },
  //       kTOV4_KV01didaktines_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       },
  //       kTOV4_KV01bendrosios_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       }
  //     },
  //     kTOV4_KV02: {
  //       dalykinesNeLt: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursaiSk: Number
  //       },
  //       didaktinesNeLt: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursaiSk: Number
  //       },
  //       bendrosiosNeLt: {
  //         destytojuSk: Number,
  //         trukmeVal: Number,
  //         stazuotSk: Number,
  //         seminarSk: Number,
  //         konferencSk: Number,
  //         kursuoseSk: Number
  //       },
  //       kTOV4_KV02dalykines_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       },
  //       kTOV4_KV02didaktines_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       },
  //       kTOV4_KV02bendrosios_komp: {
  //         stazuotes: [stazuotes_kSchema],
  //         seminarai: [seminarai_kSchema],
  //         konferencijos: [konferencijos_kSchema],
  //         kursai: [kursai_kSchema]
  //       }
  //     },
  //     kTOV4_KV03: [kTOV4_kKV03Schema],
  //     kTOV4_KV04: {
  //       judrumoDinamika: String
  //     },
  //     kTOV4_KV05: {
  //       poveikisVeiklai: String
  //     },
  //     kTOV4_O01: {
  //       kTOV4_O01_1: [kTOV4_kO01_1Schema],
  //       kTOV4_O01_2: [kTOV4_kO01_2Schema]
  //     },
  //     kTOV4_O02: [kTOV4_O02_Schema],
  //     kTOV4_S: [kTOV4_SSchema],
  //   },
  //   kV5: {
  //     kV5_KT01: [kV5_KT01Schema],
  //     kV5_KT02: [kV5_KT02Schema],
  //     kV5_KT03: {
  //       kV5_KT03_array: [kV5_kKT03Schema],
  //       isVisoBaigSk: Number,
  //       isVisoIregUzimt: Number,
  //       isVisoIsidarbProc: Number
  //     },
  //     kV5_KT04: [kV5_kKT04Schema],
  //     kV5_KT05: {
  //       bendradarbiavSklaid: String,
  //       praktVeiklSklaid: String,
  //       dalyvavSklaid: String,
  //     },
  //     kV5_KT06: {
  //       moklsPopSklaid: String,
  //       tyrimuSklaid: String,
  //       modernKultSklaid: String,
  //       bendrLavinSklaid: String,
  //       socAtskirtSklaid: String,
  //       aplinkApsaugSklaid: String
  //     },
  //     kV5_KT07: {
  //       kompUgdymas: String
  //     },
  //     kV5_KT08: {
  //       rezFormulavimas: String
  //     },
  //     kV5_KT09: {
  //       darnVystItrauk: String
  //     },
  //     veiklSavinalize: {
  //       veiklSavinaliz_array: [veiklSavinaliz_Schema],
  //       isvadosApieVeikl: String
  //     }
  //   }
  // }
});


userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongooseHistory);

const User = mongoose.model("User", userSchema);

module.exports = User;
