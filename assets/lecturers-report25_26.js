var express = require('express');
const User = require('../models/user');

module.exports = {
  clearLecReport: function(foundUser) {

  },
  updateLecReport: function(foundUser, req) {
    // 1 lentelė create-2025-2026
    foundUser.mm2025_2026.destytojas.darbovietesTipas = req.body.darbovTipas,
      foundUser.mm2025_2026.destytojas.pareigos = req.body.pareigos,
      foundUser.mm2025_2026.destytojas.pedagogStazas = req.body.pedagogStazas,
      foundUser.mm2025_2026.destytojas.praktVeiklStazas = req.body.praktinStazas
    // 2 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
      foundUser.mm2025_2026.destytojas.kD1_K01.kD1_K01_array.push({
        nr: i,
        dalykas: eval("req.body.dalykas" + i),
        grupe: eval("req.body.grupe" + i),
        semestras: eval("req.body.semestras" + i),
        planuotosVal: eval("req.body.planuotosVal" + i),
        atliktosVal: eval("req.body.atliktosVal" + i)
      })
    }
    foundUser.mm2025_2026.destytojas.kD1_K01.isVisoValPlan = req.body.kD1_K01isVisoValPlan,
      foundUser.mm2025_2026.destytojas.kD1_K01.isVisoValAtl = req.body.kD1_K01isVisoValAtl,
      foundUser.mm2025_2026.destytojas.kD1_K01.isJuSrautaisValPlan = req.body.isJuSrautaisValPlan,
      foundUser.mm2025_2026.destytojas.kD1_K01.isJuSrautaisValAtl = req.body.isJuSrautaisValAtl,
      foundUser.mm2025_2026.destytojas.kD1_K01.isJuUzsienioValPlan = req.body.isJuUzsienioValPlan,
      foundUser.mm2025_2026.destytojas.kD1_K01.isJuUzsienioValAtl = req.body.isJuUzsienioValAtl,
      foundUser.mm2025_2026.destytojas.kD1_K01.priezastys = req.body.kD1_K01priezastys,

      foundUser.mm2025_2026.destytojas.nD2.nekSuStud_planVal = req.body.nekSuStud_planVal,
      foundUser.mm2025_2026.destytojas.nD2.nekSuStud_atlVal = req.body.nekSuStud_atlVal,
      foundUser.mm2025_2026.destytojas.nD2.pasirengDest_planVal = req.body.pasirengDest_planVal,
      foundUser.mm2025_2026.destytojas.nD2.pasirengDest_atlVal = req.body.pasirengDest_atlVal,
      foundUser.mm2025_2026.destytojas.nD2.metod_planVal = req.body.metod_planVal,
      foundUser.mm2025_2026.destytojas.nD2.metod_atlVal = req.body.metod_atlVal,
      foundUser.mm2025_2026.destytojas.nD2.dalyvSPKUV_planVal = req.body.dalyvSPKUV_planVal,
      foundUser.mm2025_2026.destytojas.nD2.dalyvSPKUV_atlVal = req.body.dalyvSPKUV_atlVal,
      foundUser.mm2025_2026.destytojas.nD2.studPop_planVal = req.body.studPop_planVal,
      foundUser.mm2025_2026.destytojas.nD2.studPop_atlVal = req.body.studPop_atlVal,
      foundUser.mm2025_2026.destytojas.nD2.isVisoValPlan = req.body.nD2isVisoValPlan,
      foundUser.mm2025_2026.destytojas.nD2.isVisoValAtl = req.body.nD2isVisoValAtl,
      foundUser.mm2025_2026.destytojas.nD2.priezastys = req.body.nD2priezastys
    // 3 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_M02.push({
        nr: i, // pakeisti i si kintamaji
        bibliografApr: eval("req.body.bibliografApr" + i),
        tipas: eval("req.body.tipas" + i),
        mokslSrit: eval("req.body.mokslSrit" + i),
        mokslKrypt: eval("req.body.mokslKrypt" + i)
      })
    } // 4 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_M04.push({
        nr: i,
        studProgr: eval("req.body.nD2_M04studProgr" + i),
        dalykPavad: eval("req.body.nD2_M04dalykPavad" + i),
        busena: eval("req.body.nD2_M04busena" + i),
        apimtisKredit: eval("req.body.nD2_M04apimtisKredit" + i)
      })
    } // 5 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_D01.push({
        nr: i,
        komitetas: eval("req.body.nD2_D01komitetas" + i),
        veikla: eval("req.body.nD2_D01veikla" + i),
        rezultatai: eval("req.body.nD2_D01rezultatai" + i)
      })
    } // 6 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_D02.push({
        nr: i,
        studKryptis: eval("req.body.nD2_D02studKrypt" + i),
        veikla: eval("req.body.nD2_D02veikla" + i),
        rezultatai: eval("req.body.nD2_D02rezultatai" + i)
      })
    } // 7 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_D03.push({
        nr: i,
        studKryptis: eval("req.body.nD2_D03studKryptis" + i),
        studProgr: eval("req.body.nD2_D03studProgr" + i),
        veikla: eval("req.body.nD2_D03veikla" + i),
        rezultatai: eval("req.body.nD2_D03rezultatai" + i)
      })
    } // 8 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_M03.push({
        nr: i,
        studProgr: eval("req.body.nD2_M03studProgr" + i),
        dalykPavad: eval("req.body.nD2_M03dalykPavad" + i),
        apimtisKredit: eval("req.body.nD2_M03apimtisKredit" + i)
      })
    } // 9 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_S01.push({
        nr: i,
        veikla: eval("req.body.nD2_S01veikla" + i),
        dataVieta: eval("req.body.nD2_S01dataVieta" + i)
      })
    } // savianalize create-2025-2026
    for (let i = 1; i <= parseInt(req.body.tablenD2_S_name); i++) {
      foundUser.mm2025_2026.destytojas.nD2_S.push({
        nr: i,
        stiprybes: eval("req.body.nD2_Sstiprybes" + i),
        tobulintina: eval("req.body.nD2_Stobulintina" + i)
      })
    }
    foundUser.mm2025_2026.destytojas.tMTEP3.tMTEPveiklRez_planVal = req.body.tMTEPveiklRez_planVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.tMTEPveiklRez_atlVal = req.body.tMTEPveiklRez_atlVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.menoVeikl_planVal = req.body.menoVeikl_planVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.menoVeikl_atlVal = req.body.menoVeikl_atlVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.tMTEPmenoVeiklPop_planVal = req.body.tMTEPmenoVeiklPop_planVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.tMTEPmenoVeiklPop_atlVal = req.body.tMTEPmenoVeiklPop_atlVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.studReng_planVal = req.body.studReng_planVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.studReng_atlVal = req.body.studReng_atlVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.kitaVeikl_planVal = req.body.kitaVeikl_planVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.kitaVeikl_atlVal = req.body.kitaVeikl_atlVal,
      foundUser.mm2025_2026.destytojas.tMTEP3.isVisoValPlan = req.body.tMTEP3isVisoValPlan,
      foundUser.mm2025_2026.destytojas.tMTEP3.isVisoValAtl = req.body.tMTEP3isVisoValAtl,
      foundUser.mm2025_2026.destytojas.tMTEP3.priezastys = req.body.tMTEP3priezastys
    // 10 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T01.push({
        nr: i,
        tyrTemat: eval("req.body.tyrTemat" + i),
        tyrGrup: eval("req.body.tyrGrup" + i),
        mokslSrit: eval("req.body.tMTEP3_T01mokslSrit" + i),
        mokslKrypt: eval("req.body.tMTEP3_T01mokslKrypt" + i)
      })
    } // 11 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T02.push({
        nr: i,
        bibliografApr: eval("req.body.tMTEP3_T02bibliografApr" + i),
        tipas: eval("req.body.tMTEP3_T02tipas" + i),
        mokslSrit: eval("req.body.tMTEP3_T02mokslSrit" + i),
        mokslKrypt: eval("req.body.tMTEP3_T02mokslKrypt" + i),
        duomBaze: eval("req.body.tMTEP3_T02duomBaze" + i)
      })
    } // 12 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T03.push({
        nr: i,
        pilnasBiblApr: eval("req.body.tMTEP3_T03pilnasBiblApr" + i),
        rengTipas: eval("req.body.tMTEP3_T03rengTipas" + i)
      })
    } // 13 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T04.push({
        nr: i,
        uzsakovas: eval("req.body.tMTEP3_T04uzsakovas" + i),
        tema: eval("req.body.tMTEP3_T04tema" + i),
        data: eval("req.body.tMTEP3_T04data" + i),
        atlygArNe: eval("req.body.tMTEP3_T04atlygArNe" + i)
      })
    } // 14.1 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table141_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T05.push({
        nr: i,
        veiklPavad: eval("req.body.tMTEP3_T05veiklPavad" + i),
        veiklRezult: eval("req.body.tMTEP3_T05veiklRezult" + i),
        atlygArNe: eval("req.body.tMTEP3_T05atlygArNe" + i)
      })
    } // 14.2 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table142_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_142.push({
        nr: i,
        pavadinimas: eval("req.body.tMTEP3_142pavadinimas" + i),
        pastabos: eval("req.body.tMTEP3_142pastabos" + i)
      })
    } // 14.3 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table143_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_143.push({
        nr: i,
        pavadinimas: eval("req.body.tMTEP3_143pavadinimas" + i),
        uzsakovas: eval("req.body.tMTEP3_143uzsakovas" + i)
      })
    } // 15 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T06.push({
        nr: i,
        autorius: eval("req.body.tMTEP3_T06autorius" + i),
        menoSrit: eval("req.body.tMTEP3_T06menoSrit" + i),
        pobudis: eval("req.body.tMTEP3_T06pobudis" + i),
        realizVieta: eval("req.body.tMTEP3_T06realizVieta" + i),
        data: eval("req.body.tMTEP3_T06data" + i),
        atlygArNe: eval("req.body.tMTEP3_T06atlygArNe" + i)
      })
    } // 16 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table16_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T07.push({
        nr: i,
        menoSrit: eval("req.body.tMTEP3_T07menoSrit" + i),
        pavadinimas: eval("req.body.tMTEP3_T07pavadinimas" + i),
        atlikVieta: eval("req.body.tMTEP3_T07atlikVieta" + i),
        data: eval("req.body.tMTEP3_T07data" + i),
        atlygArNe: eval("req.body.tMTEP3_T07atlygArNe" + i)
      })
    } // 17 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T08.push({
        nr: i,
        menoSrit: eval("req.body.tMTEP3_T08menoSrit" + i),
        pavadinimas: eval("req.body.tMTEP3_T08pavadinimas" + i),
        atlikVieta: eval("req.body.tMTEP3_T08atlikVieta" + i),
        data: eval("req.body.tMTEP3_T08data" + i),
        atlygArNe: eval("req.body.tMTEP3_T08atlygArNe" + i)
      })
    } // 18 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T09.push({
        nr: i,
        menoSrit: eval("req.body.tMTEP3_T09menoSrit" + i),
        pavadinimas: eval("req.body.tMTEP3_T09pavadinimas" + i),
        atlikVieta: eval("req.body.tMTEP3_T09atlikVieta" + i),
        data: eval("req.body.tMTEP3_T09data" + i),
        atlygArNe: eval("req.body.tMTEP3_T09atlygArNe" + i)
      })
    } // 19 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T10.push({
        nr: i,
        veiklPobud: eval("req.body.tMTEP3_T10veiklPobud" + i),
        veiklTiksl: eval("req.body.tMTEP3_T10veiklTiksl" + i),
        dataVieta: eval("req.body.tMTEP3_T10dataVieta" + i),
        dalyvSk: eval("req.body.tMTEP3_T10dalyvSk" + i),
        ktKomentarai: eval("req.body.tMTEP3_T10ktKomentarai" + i),
        atlygArNe: eval("req.body.tMTEP3_T10atlygArNe" + i)
      })
    } // 20 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T11.push({
        nr: i,
        veiklPobud: eval("req.body.tMTEP3_T11veiklPobud" + i),
        veiklTiksl: eval("req.body.tMTEP3_T11veiklTiksl" + i),
        dataVieta: eval("req.body.tMTEP3_T11dataVieta" + i),
        dalyvSk: eval("req.body.tMTEP3_T11dalyvSk" + i),
        ktKomentarai: eval("req.body.tMTEP3_T11ktKomentarai" + i),
        atlygArNe: eval("req.body.tMTEP3_T11atlygArNe" + i)
      })
    } // 21 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T12.push({
        nr: i,
        veiklPobud: eval("req.body.tMTEP3_T12veiklPobud" + i),
        dataVieta: eval("req.body.tMTEP3_T12dataVieta" + i)
      })
    } // 22 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T13.push({
        nr: i,
        studDuom: eval("req.body.tMTEP3_T13studDuom" + i),
        renginioPavad: eval("req.body.tMTEP3_T13renginioPavad" + i),
        rezultatas: eval("req.body.tMTEP3_T13rezultatas" + i),
        data: eval("req.body.tMTEP3_T13data" + i)
      })
    } // 23 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_T14.push({
        nr: i,
        renginys: eval("req.body.tMTEP3_T14renginys" + i),
        veiklPobud: eval("req.body.tMTEP3_T14veiklPobud" + i),
        dataVieta: eval("req.body.tMTEP3_T14dataVieta" + i)
      })
    } // savianalize
    for (let i = 1; i <= parseInt(req.body.tableTMTEP3_S_name); i++) {
      foundUser.mm2025_2026.destytojas.tMTEP3_S.push({
        nr: i,
        stiprybes: eval("req.body.tMTEP3_Sstiprybes" + i),
        tobulintina: eval("req.body.tMTEP3_Stobulintina" + i)
      })
    }
    foundUser.mm2025_2026.destytojas.kTOV4.kompTobulinimas_planVal = req.body.kTOV4kompTobulinimas_planVal,
      foundUser.mm2025_2026.destytojas.kTOV4.kompTobulinimas_atlVal = req.body.kTOV4kompTobulinimas_atlVal,
      foundUser.mm2025_2026.destytojas.kTOV4.organizacVeikl_planVal = req.body.kTOV4organizacVeikl_planVal,
      foundUser.mm2025_2026.destytojas.kTOV4.organizacVeikl_atlVal = req.body.kTOV4organizacVeikl_atlVal,
      foundUser.mm2025_2026.destytojas.kTOV4.isVisoValPlan = req.body.kTOV4isVisoValPlan,
      foundUser.mm2025_2026.destytojas.kTOV4.isVisoValAtl = req.body.kTOV4isVisoValAtl,
      foundUser.mm2025_2026.destytojas.kTOV4.priezastys = req.body.kTOV4priezastys
    // 24 lentelė create-2025-2026
    //mokymosi
    for (let i = 1; i <= parseInt(req.body.table241_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.mokymosi.push({
        pavadinimas: eval("req.body.kTOV4_mokymopavad" + i),
        pazymNr: eval("req.body.kTOV4_mokymopazymNr" + i),
        trukmeValLT: eval("req.body.kTOV4_mokymotrukmeValLT" + i),
        trukmeValNeLT: eval("req.body.kTOV4_mokymotrukmeValNeLT" + i)
      })
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.dalyvavoMokymosiKomp = true
    } // tyrimu
    for (let i = 1; i <= parseInt(req.body.table242_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.tyrimu.push({
        pavadinimas: eval("req.body.kTOV4_tyrimupavad" + i),
        pazymNr: eval("req.body.kTOV4_tyrimupazymNr" + i),
        trukmeValLT: eval("req.body.kTOV4_tyrimutrukmeValLT" + i),
        trukmeValNeLT: eval("req.body.kTOV4_tyrimutrukmeValNeLT" + i)
      })
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.dalyvavoTyrimuKomp = true
    } //bendrosios
    for (let i = 1; i <= parseInt(req.body.table243_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.bendrosios.push({
        pavadinimas: eval("req.body.kTOV4_bendrosiospavad" + i),
        pazymNr: eval("req.body.kTOV4_bendrosiospazymNr" + i),
        trukmeValLT: eval("req.body.kTOV4_bendrosiostrukmeValLT" + i),
        trukmeValNeLT: eval("req.body.kTOV4_bendrosiostrukmeValNeLT" + i)
      })
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.dalyvavoBendrKomp = true
    } //dalykines
    for (let i = 1; i <= parseInt(req.body.table244_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.dalykines.push({
        pavadinimas: eval("req.body.kTOV4_dalykpavad" + i),
        pazymNr: eval("req.body.kTOV4_dalykpazymNr" + i),
        trukmeValLT: eval("req.body.kTOV4_dalyktrukmeValLT" + i),
        trukmeValNeLT: eval("req.body.kTOV4_dalyktrukmeValNeLT" + i)
      })
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.dalyvavoDalykKomp = true
    }
    foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLT,
      foundUser.mm2025_2026.destytojas.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLT
    // 25 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_25.push({
        nr: i,
        renginysTema: eval("req.body.kTOV4_25renginysTema" + i),
        kompGrupe: eval("req.body.kTOV4_25kompGrupe" + i),
        skirta: eval("req.body.kTOV4_25skirta" + i)
      })
    } // 26 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table26_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_26.push({
        nr: i,
        imonIstaig: eval("req.body.kTOV4_26imonIstaig" + i),
        kompGrupe: eval("req.body.kTOV4_26kompGrupe" + i),
        trukmeVal: eval("req.body.kTOV4_26trukmeVal" + i),
        data: eval("req.body.kTOV4_26data" + i)
      })
    } // 27 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_KV03.push({
        nr: i,
        studKryptis: eval("req.body.kTOV4_KV03studKryptis" + i),
        salis: eval("req.body.kTOV4_KV03salis" + i),
        institucija: eval("req.body.kTOV4_KV03institucija" + i),
        dalykas: eval("req.body.kTOV4_KV03dalykas" + i)
      })
    } // 28.1 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table281_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_O01.kTOV4_O01_1.push({
        nr: i,
        veiklPobud: eval("req.body.kTOV4_O01_1veiklPobud" + i),
        isakNrData: eval("req.body.kTOV4_O01_1isakNrData" + i)
      })
    } // 28.2 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table282_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_O01.kTOV4_O01_2.push({
        nr: i,
        destytojas: eval("req.body.kTOV4_O01_2destytojas" + i),
        veiklPobud: eval("req.body.kTOV4_O01_2veiklPobud" + i),
        dataVieta: eval("req.body.kTOV4_O01_2dataVieta" + i),
        ktKomentarai: eval("req.body.kTOV4_O01_2ktKomentarai" + i)
      })
    } // 29 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_29.push({
        nr: i,
        veikla: eval("req.body.kTOV4_29veikla" + i),
        socPartneris: eval("req.body.kTOV4_29socPartneris" + i)
      })
    } // savianalize
    for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
      foundUser.mm2025_2026.destytojas.kTOV4_S.push({
        nr: i,
        stiprybes: eval("req.body.kTOV4_Sstiprybes" + i),
        tobulintina: eval("req.body.kTOV4_Stobulintina" + i)
      })
    } // 30 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_KT02.push({
        nr: i,
        studKryptis: eval("req.body.kV5_KT02studKryptis" + i),
        diplomantas: eval("req.body.kV5_KT02diplomantas" + i),
        studProgr: eval("req.body.kV5_KT02studProgr" + i),
        darboTema: eval("req.body.kV5_KT02darboTema" + i)
      })
    } // 31 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table31_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_KT01.push({
        nr: i,
        studKryptis: eval("req.body.kV5_KT01studKryptis" + i),
        diplomantas: eval("req.body.kV5_KT01diplomantas" + i),
        studProgr: eval("req.body.kV5_KT01studProgr" + i),
        darboTema: eval("req.body.kV5_KT01darboTema" + i),
        uzsakovas: eval("req.body.kV5_KT01uzsakovas" + i)
      })
    }
    // 32 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table321_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_32.socAtskMaz.push({
        aprasymas: eval("req.body.kV5_32socaprasymas" + i)
      })
    }
    for (let i = 1; i <= parseInt(req.body.table322_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_32.aplinkosaugInic.push({
        aprasymas: eval("req.body.kV5_32aplinkaprasymas" + i)
      })
    }
    for (let i = 1; i <= parseInt(req.body.table323_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_32.lietValstybPuosel.push({
        aprasymas: eval("req.body.kV5_32valstybaprasymas" + i)
      })
    }
    for (let i = 1; i <= parseInt(req.body.table324_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_32.lietEtnokPuos.push({
        aprasymas: eval("req.body.kV5_32etnoaprasymas" + i)
      })
    }
    for (let i = 1; i <= parseInt(req.body.table325_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_32.savanorystIniciatyv.push({
        aprasymas: eval("req.body.kV5_32savaprasymas" + i)
      })
    } // 33 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_33.push({
        nr: i,
        veikla: eval("req.body.kV5_33veikla" + i),
        veiklPartner: eval("req.body.kV5_33veiklPartner" + i),
        organizac: eval("req.body.kV5_33organizac" + i),
        veiklOrientavim: eval("req.body.kV5_33veiklOrientavim" + i),
        dalyviai: eval("req.body.kV5_33dalyviai" + i),
        laikas: eval("req.body.kV5_33laikas" + i),
        vieta: eval("req.body.kV5_33vieta" + i)
      })
    } // 34 lentelė create-2025-2026
    for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
      foundUser.mm2025_2026.destytojas.kV5_34.push({
        nr: i,
        pavadinimas: eval("req.body.kV5_34pavadinimas" + i),
        vykdytPartner: eval("req.body.kV5_34vykdytPartner" + i),
        dalyviai: eval("req.body.kV5_34dalyviai" + i),
        finansavim: eval("req.body.kV5_34finansavim" + i),
        rezultatai: eval("req.body.kV5_34rezultatai" + i),
        salisData: eval("req.body.kV5_34salisData" + i)
      })
    }
      foundUser.mm2025_2026.destytojas.kV5_kitaInfo = req.body.kV5_kitaInfo,
      foundUser.updated_for = req.user.username,
      foundUser.busena25_26 = req.body.ataskaitos_busena
  },
  checkAndUpdateLecReport: function(foundUser, req) {

  },
  headOfDepAddToLecReport: function(foundUser, req) {

  }

}
