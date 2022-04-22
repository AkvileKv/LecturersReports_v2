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
var tMTEP3_T07T08T09Schema = new mongoose.Schema({
  nr: String,
  atlikejas: String,
  menoSrit: String,
  pavadinimas: String,
  atlikVieta: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_T10T11Schema = new mongoose.Schema({ //20,21 vedejo; 19,20 destytojo
  nr: String,
  destytojas: String,
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
  trukmeValNeLT: Number,
  destytojas: String
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
  destytojas: String,
  studKryptis: String,
  salis: String,
  institucija: String,
  dalykas: String
});
var kTOV4_O01_1Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
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
  aprasymas: String,
  destytojas: String
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
//katedros vedeju schemos
var kKPP1_1Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  progrKodas: String,
  isakNrData: String,
  studKryptAkredit: String,
  akreditLaikot: Number,
  eCTS: String
});
var kDS1Schema = new mongoose.Schema({
  nr: String,
  vardPavard: String,
  pareigos: String,
  darbovTipas: String,
  pedagogStazas: String,
  praktinStazas: String
});
var kKPP1_3Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  destytojas: String,
  imonIstaig: String
});
var mV2_M02Schema = new mongoose.Schema({
  nr: String,
  bibliografApr: String,
  tipas: String,
  mokslSrit: String,
  mokslKrypt: String
});
var mV2_M03Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  studProgr: String,
  dalykPavad: String,
  apimtisKredit: Number
});
var mV2_M04Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  studProgr: String,
  dalykPavad: String,
  apimtisKredit: Number,
  busena: String
});
var mV2_D06Schema = new mongoose.Schema({
  nr: String,
  studProgr: String,
  progrKodas: String,
  atlPatobulin: String,
  tobulinPriezast: String,
  tobulinIrod: String
});
var mV2_D01Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  komitetas: String,
  veikla: String,
  rezultatai: String
});
var mV2_D02Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  veikla: String,
  rezultatai: String,
  destytojas: String
});
var mV2_D03Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  veikla: String,
  rezultatai: String,
  destytojas: String
});
var mV2_S01Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veikla: String,
  dataVieta: String
});
var mV2_SSchema = new mongoose.Schema({
  nr: String,
  stiprybes: String,
  tobulintina: String
});
var tMTEP3_kT01Schema = new mongoose.Schema({
  nr: String,
  tyrTemat: String,
  destytojas: String,
  tyrGrup: String,
  mokslSrit: String,
  mokslKrypt: String,

});
var tMTEP3_kT04Schema = new mongoose.Schema({
  nr: String,
  konsultantas: String,
  uzsakovas: String,
  tema: String,
  data: String,
  atlygArNe: String
});
var tMTEP3_kT05Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  veiklPavad: String,
  veiklRezult: String,
  atlygArNe: String
});
var tMTEP3_162Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  pavadinimas: String,
  pastabos: String
});
var tMTEP3_kT16Schema = new mongoose.Schema({
  nr: String,
  rengejai: String,
  pavadinimas: String,
  uzsakovas: String
});
var tMTEP3_kT12Schema = new mongoose.Schema({ // 23 vedejo
  nr: String,
  destytojas: String,
  veiklPobud: String,
  dataVieta: String
});
var tMTEP3_kT13Schema = new mongoose.Schema({ //24 vedejo
  nr: String,
  destytojas: String,
  studDuom: String,
  renginioPavad: String,
  rezultatas: String,
  data: String
});
var tMTEP3_kT14Schema = new mongoose.Schema({ //24 vedejo
  nr: String,
  destytojas: String,
  renginys: String,
  veiklPobud: String,
  dataVieta: String
});
var kTOV4_27Schema = new mongoose.Schema({
  nr: String,
  renginysTema: String,
  kompGrupe: String,
  skirta: String,
  lektorius: String,
  lektTipas: String
});
var kTOV4_28Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  imonIstaig: String,
  kompGrupe: String,
  trukmeVal: Number,
  data: String
});
var kTOV4_30Schema = new mongoose.Schema({
  nr: String,
  destytojas: String,
  studKryptis: String,
  salis: String,
  institucija: String,
  dalykas: String
});
var kV5_ksp32Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  strategPartner: String
});
var kV5_bcp33Schema = new mongoose.Schema({
  nr: String,
  veikla: String,
  socPartneris: String,
  destytojas: String
});
var kV5_sabp34Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  studentuSk1: Number,
  studentuSk2: Number,
  studentuSk3: Number,
  studentuSk4: Number,
  studentuSk5: Number
});
var kV5_35Schema = new mongoose.Schema({
  nr: String,
  studKryptis: String,
  studProgr: String,
  studentuSk1: Number,
  pasPartnerSk1: Number,
  studentuSk2: Number,
  pasPartnerSk2: Number,
  studentuSk3: Number,
  pasPartnerSk3: Number,
  studentuSk4: Number,
  pasPartnerSk4: Number,
  studentuSk5: Number,
  pasPartnerSk5: Number
});
var kV5_39Schema = new mongoose.Schema({
  nr: String,
  kryptys: String,
  aprasymas: String
});
var veiklSavinalize_Schema = new mongoose.Schema({
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
    pareigos: String, //1 lentelė
    darbovietesTipas: String,
    pedagogStazas: Number,
    praktVeiklStazas: Number,
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
    tMTEP3_T02: [tMTEP3_T02Schema], //11
    tMTEP3_T03: [tMTEP3_T03Schema], //12
    tMTEP3_T04: [tMTEP3_T04Schema], //13
    tMTEP3_T05: [tMTEP3_T05Schema], //14.1
    tMTEP3_142: [tMTEP3_142Schema], //14.2
    tMTEP3_143: [tMTEP3_143Schema], //14.3
    tMTEP3_T06: [tMTEP3_T06Schema], //15
    tMTEP3_T07: [tMTEP3_T07T08T09Schema], //16
    tMTEP3_T08: [tMTEP3_T07T08T09Schema], //17
    tMTEP3_T09: [tMTEP3_T07T08T09Schema], //18
    tMTEP3_T10: [tMTEP3_T10T11Schema], //19
    tMTEP3_T11: [tMTEP3_T10T11Schema], //20
    tMTEP3_T12: [tMTEP3_T12Schema], //21
    tMTEP3_T13: [tMTEP3_T13Schema], //22
    tMTEP3_T14: [tMTEP3_T14Schema], //23
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
        isVisoValNeLT: Number,
        dalyvavoMokymosiKomp: Boolean,
        dalyvavoTyrimuKomp: Boolean,
        dalyvavoBendrKomp: Boolean,
        dalyvavoDalykKomp: Boolean
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
    katedrosV_isvados: String, //katedros vedejas pildo
    katedrosV_rekomendacijos: {
      kontaktD: String,
      neKontaktD: String,
      tMTEP_vykdymas: String,
      kompTobulinimas: String,
      kitosVeikl: String
    },
    ataskaitosPateikimoData: String,
  },
  katedrosVedejas: {
    kKPP1_1: [kKPP1_1Schema], //1 lentelė
    kDS1: [kDS1Schema], // 2
    kKPP1_3: [kKPP1_3Schema], //3
    mV2: {
      mV2_M02: [mV2_M02Schema], //4
      mV2_M03: [mV2_M03Schema], //10
      mV2_M04: [mV2_M04Schema], //5
      mV2_D01: [mV2_D01Schema], //7
      mV2_D02: [mV2_D02Schema], //8
      mV2_D03: [mV2_D03Schema], //9
      mV2_D06: [mV2_D06Schema], //6
      mV2_S01: [mV2_S01Schema], //11
      mV2_S: [mV2_SSchema]
    },
    tMTEP3: {
      tMTEP3_T01: [tMTEP3_kT01Schema], //12 lentelė
      tMTEP3_T02: [tMTEP3_T02Schema], //13
      tMTEP3_T03: [tMTEP3_T03Schema], //14
      tMTEP3_T04: [tMTEP3_kT04Schema], //15
      tMTEP3_T05: [tMTEP3_kT05Schema], //16.1
      tMTEP3_162: [tMTEP3_162Schema], //16.2
      tMTEP3_T06: [tMTEP3_T06Schema], //17
      tMTEP3_T07: [tMTEP3_T07T08T09Schema], //18
      tMTEP3_T08: [tMTEP3_T07T08T09Schema], // 19
      tMTEP3_T09: [tMTEP3_T07T08T09Schema], //20
      tMTEP3_T10: [tMTEP3_T10T11Schema], //21
      tMTEP3_T11: [tMTEP3_T10T11Schema], //22
      tMTEP3_T12: [tMTEP3_kT12Schema], //23
      tMTEP3_T13: [tMTEP3_kT13Schema], //25
      tMTEP3_T14: [tMTEP3_kT14Schema], //24
      tMTEP3_T16: [tMTEP3_kT16Schema], //16.3
      tMTEP3_S: [tMTEP3_SSchema]
    },
    kTOV4: {
      kTOV4_KV01: {
        kTOV4_26: { // 26 lentelė
          mokymosi: {
            destytojuSk: Number,
            trukmeValLT: Number,
            trukmeValNeLT: Number,
            isVisoVal: Number
          },
          tyrimu: {
            destytojuSk: Number,
            trukmeValLT: Number,
            trukmeValNeLT: Number,
            isVisoVal: Number
          },
          bendrosios: {
            destytojuSk: Number,
            trukmeValLT: Number,
            trukmeValNeLT: Number,
            isVisoVal: Number
          },
          dalykines: {
            destytojuSk: Number,
            trukmeValLT: Number,
            trukmeValNeLT: Number,
            isVisoVal: Number
          },
          isVisoValLT: Number,
          isVisoValNeLT: Number,
          isVisoValBendr: Number
        },
        kompetencijos: { //26 lentelės priedas
          mokymosi: [kompetencijuSchema],
          tyrimu: [kompetencijuSchema],
          bendrosios: [kompetencijuSchema],
          dalykines: [kompetencijuSchema],
          mokymosiIsVisoValLT: Number,
          mokymosiIsVisoValNeLT: Number,
          tyrimuIsVisoValLT: Number,
          tyrimuIsVisoValNeLT: Number,
          bendrosiosIsVisoValLT: Number,
          bendrosiosIsVisoValNeLT: Number,
          dalykinesIsVisoValLT: Number,
          dalykinesIsVisoValNeLT: Number,
          isVisoValLT: Number,
          isVisoValNeLT: Number
        }
      },
      kTOV4_27: [kTOV4_27Schema], //27 lentelė
      kTOV4_28: [kTOV4_28Schema], //28 lentelė
      kTOV4_KV03: [kTOV4_KV03Schema], //29 lentelė
      kTOV4_30: [kTOV4_30Schema], //30 lentelė
      kTOV4_O01: {
        kTOV4_O01_1: [kTOV4_O01_1Schema], //31.1
        kTOV4_O01_2: [kTOV4_O01_2Schema] //31.2
      },
      kTOV4_S: [kTOV4_SSchema],
    },
    kV5: {
      kV5_32: [kV5_ksp32Schema], //32
      kV5_33: [kV5_bcp33Schema], //33
      kV5_34: [kV5_sabp34Schema], //34
      kV5_35: [kV5_35Schema], //35
      kV5_KT01: [kV5_KT01Schema], //37
      kV5_KT02: [kV5_KT02Schema], //36
      kV5_38: [kV5_34Schema], //38
      kV5_39: [kV5_39Schema], //39
      kV5_40: { //40
        socAtskMaz: [kV5_32Schema],
        aplinkosaugInic: [kV5_32Schema],
        lietValstybPuosel: [kV5_32Schema],
        lietEtnokPuos: [kV5_32Schema],
        savanorystIniciatyv: [kV5_32Schema]
      },
      kV5_41: [kV5_33Schema], //41 lentelė
      veiklSavinalize: {
        veiklSavinalize_array: [veiklSavinalize_Schema],
        isvadosApieVeikl: String
      }
    }
  }
});

var options = {diffOnly: true};

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(mongooseHistory, options);

const User = mongoose.model("User", userSchema);

module.exports = User;
