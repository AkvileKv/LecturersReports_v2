app.post("/dep-update-2024-2025", (req, res) => {

  User.findById(req.user.id, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        foundUser.katedrosVedejas.kKPP1_1 = new Array(); // 1
        foundUser.katedrosVedejas.kDS1 = new Array(); // 2
        foundUser.katedrosVedejas.kKPP1_3 = new Array(); // 3
        foundUser.katedrosVedejas.mV2.mV2_M02 = new Array(); // 4
        foundUser.katedrosVedejas.mV2.mV2_M04 = new Array(); // 5
        foundUser.katedrosVedejas.mV2.mV2_D06 = new Array(); // 6
        foundUser.katedrosVedejas.mV2.mV2_D01 = new Array(); // 7
        foundUser.katedrosVedejas.mV2.mV2_D02 = new Array(); // 8
        foundUser.katedrosVedejas.mV2.mV2_D03 = new Array(); // 9
        foundUser.katedrosVedejas.mV2.mV2_M03 = new Array(); // 10
        foundUser.katedrosVedejas.mV2.mV2_S01 = new Array(); // 11
        foundUser.katedrosVedejas.mV2.mV2_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T01 = new Array(); // 12
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T02 = new Array(); // 13
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T03 = new Array(); // 14
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T04 = new Array(); // 15
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T05 = new Array(); // 16.1
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_162 = new Array(); // 16.2
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T16 = new Array(); // 16.3
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T06 = new Array(); // 17
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T07 = new Array(); // 18
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T08 = new Array(); // 19
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T09 = new Array(); // 20
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T10 = new Array(); // 21
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T11 = new Array(); // 22
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T12 = new Array(); // 23
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T14 = new Array(); // 24
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_T13 = new Array(); // 25
        foundUser.katedrosVedejas.tMTEP3.tMTEP3_S = new Array(); // Savianalizė

        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios = new Array();
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines = new Array();

        foundUser.katedrosVedejas.kTOV4.kTOV4_27 = new Array(); // 27
        foundUser.katedrosVedejas.kTOV4.kTOV4_28 = new Array(); // 28
        foundUser.katedrosVedejas.kTOV4.kTOV4_KV03 = new Array(); // 29
        foundUser.katedrosVedejas.kTOV4.kTOV4_30 = new Array(); // 30
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1 = new Array(); // 31.1
        foundUser.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2 = new Array(); // 31.2
        foundUser.katedrosVedejas.kTOV4.kTOV4_S = new Array(); // Savianalizė
        foundUser.katedrosVedejas.kV5.kV5_32 = new Array(); // 32
        foundUser.katedrosVedejas.kV5.kV5_33 = new Array(); // 33
        foundUser.katedrosVedejas.kV5.kV5_34 = new Array(); // 34
        foundUser.katedrosVedejas.kV5.kV5_35 = new Array(); // 35
        foundUser.katedrosVedejas.kV5.kV5_KT02 = new Array(); // 36
        foundUser.katedrosVedejas.kV5.kV5_KT01 = new Array(); // 37
        foundUser.katedrosVedejas.kV5.kV5_38 = new Array(); // 38
        foundUser.katedrosVedejas.kV5.kV5_39 = new Array(); // 39
        foundUser.katedrosVedejas.kV5.kV5_40.socAtskMaz = new Array(); // 40.1
        foundUser.katedrosVedejas.kV5.kV5_40.aplinkosaugInic = new Array(); // 40.2
        foundUser.katedrosVedejas.kV5.kV5_40.lietValstybPuosel = new Array(); // 40.3
        foundUser.katedrosVedejas.kV5.kV5_40.lietEtnokPuos = new Array(); // 40.4
        foundUser.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv = new Array(); // 40.5
        foundUser.katedrosVedejas.kV5.kV5_41 = new Array(); // 41
        foundUser.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array = new Array(); // Savianalizė

        // 1 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table1_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kKPP1_1.push({
            nr: i,
            studKryptis: eval("req.body.mV2_D04studKryptis" + i),
            studProgr: eval("req.body.mV2_D04studProgr" + i),
            progrKodas: eval("req.body.mV2_D04progrKodas" + i),
            isakNrData: eval("req.body.mV2_D04isakNrData" + i),
            studKryptAkredit: eval("req.body.mV2_D04studKryptAkredit" + i),
            akreditLaikot: eval("req.body.mV2_D04akreditLaikot" + i),
            eCTS: eval("req.body.mV2_D04eCTS" + i)
          })
        } // 2 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table2_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kDS1.push({
            nr: i,
            vardPavard: eval("req.body.lent2_pavVard" + i),
            pareigos: eval("req.body.lent2_pareigos" + i),
            darbovTipas: eval("req.body.lent2_darbovTipas" + i),
            pedagogStazas: eval("req.body.lent2_pedagogStazas" + i),
            praktinStazas: eval("req.body.lent2_praktinStazas" + i)
          })
        } // 3 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table3_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kKPP1_3.push({
            nr: i,
            studKryptis: eval("req.body.lent3_studKryptis" + i),
            studProgr: eval("req.body.lent3_studProgr" + i),
            destytojas: eval("req.body.lent3_destytojas" + i),
            imonIstaig: eval("req.body.lent3_imonIstaig" + i)
          })
        } // 4 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table4_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_M02.push({
            nr: i,
            bibliografApr: eval("req.body.lent4_bibliografApr" + i),
            tipas: eval("req.body.lent4_tipas" + i),
            mokslSrit: eval("req.body.lent4_mokslSrit" + i),
            mokslKrypt: eval("req.body.lent4_mokslKrypt" + i)
          })
        } // 5 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table5_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_M04.push({
            nr: i,
            destytojas: eval("req.body.mV2_M04destytojas" + i),
            studProgr: eval("req.body.mV2_M04studProgr" + i),
            dalykPavad: eval("req.body.mV2_M04dalykPavad" + i),
            apimtisKredit: eval("req.body.mV2_M04apimtisKredit" + i),
            busena: eval("req.body.mV2_M04busena" + i)
          })
        } // 6 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table6_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_D06.push({
            nr: i,
            studProgr: eval("req.body.mV2_D06studProgr" + i),
            progrKodas: eval("req.body.mV2_D06progrKodas" + i),
            atlPatobulin: eval("req.body.mV2_D06atlPatobulin" + i),
            tobulinPriezast: eval("req.body.mV2_D06tobulinPriezast" + i),
            tobulinIrod: eval("req.body.mV2_D06tobulinIrod" + i)
          })
        } // 7 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table7_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_D01.push({
            nr: i,
            destytojas: eval("req.body.mV2_D01destytojas" + i),
            komitetas: eval("req.body.mV2_D01komitetas" + i),
            veikla: eval("req.body.mV2_D01veikla" + i),
            rezultatai: eval("req.body.mV2_D01rezultatai" + i)
          })
        } // 8 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table8_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_D02.push({
            nr: i,
            destytojas: eval("req.body.mV2_D02destytojas" + i),
            studKryptis: eval("req.body.mV2_D02studKrypt" + i),
            veikla: eval("req.body.mV2_D02veikla" + i),
            rezultatai: eval("req.body.mV2_D02rezultatai" + i)
          })
        } // 9 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table9_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_D03.push({
            nr: i,
            destytojas: eval("req.body.mV2_D03destytojas" + i),
            studKryptis: eval("req.body.mV2_D03studKryptis" + i),
            studProgr: eval("req.body.mV2_D03studProgr" + i),
            veikla: eval("req.body.mV2_D03veikla" + i),
            rezultatai: eval("req.body.mV2_D03rezultatai" + i)
          })
        } // 10 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table10_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_M03.push({
            nr: i,
            destytojas: eval("req.body.mV2_M03destytojas" + i),
            studProgr: eval("req.body.mV2_M03studProgr" + i),
            dalykPavad: eval("req.body.mV2_M03dalykPavad" + i),
            apimtisKredit: eval("req.body.mV2_M03apimtisKredit" + i)

          })
        } // 11 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table11_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_S01.push({
            nr: i,
            destytojas: eval("req.body.mV2_S01destytojas" + i),
            veikla: eval("req.body.mV2_S01veikla" + i),
            dataVieta: eval("req.body.mV2_S01dataVieta" + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablemV2_S_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.mV2.mV2_S.push({
            nr: i,
            stiprybes: eval("req.body.mV2_Sstiprybes" + i),
            tobulintina: eval("req.body.mV2_Stobulintina" + i)
          })
        } // 12 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table12_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T01.push({
            nr: i,
            tyrTemat: eval("req.body.tMTEP3_T01tyrTemat" + i),
            destytojas: eval("req.body.tMTEP3_T01destytojas" + i),
            tyrGrup: eval("req.body.tMTEP3_T01tyrGrup" + i),
            mokslSrit: eval("req.body.tMTEP3_T01mokslSrit" + i),
            mokslKrypt: eval("req.body.tMTEP3_T01mokslKrypt" + i)
          })
        } // 13 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table13_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T02.push({
            nr: i,
            bibliografApr: eval("req.body.tMTEP3_T02bibliografApr" + i),
            tipas: eval("req.body.tMTEP3_T02tipas" + i),
            mokslSrit: eval("req.body.tMTEP3_T02mokslSrit" + i),
            mokslKrypt: eval("req.body.tMTEP3_T02mokslKrypt" + i),
            duomBaze: eval("req.body.tMTEP3_T02duomBaze" + i)
          })
        } // 14 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table14_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T03.push({
            nr: i,
            pilnasBiblApr: eval("req.body.tMTEP3_T03pilnasBiblApr" + i),
            rengTipas: eval("req.body.tMTEP3_T03rengTipas" + i)
          })
        } // 15 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table15_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T04.push({
            nr: i,
            konsultantas: eval("req.body.tMTEP3_T04konsultantas" + i),
            uzsakovas: eval("req.body.tMTEP3_T04uzsakovas" + i),
            tema: eval("req.body.tMTEP3_T04tema" + i),
            data: eval("req.body.tMTEP3_T04data" + i),
            atlygArNe: eval("req.body.tMTEP3_T04atlygArNe" + i)
          })
        } // 16 lentelė 1 update-dep
        for (let i = 1; i <= parseInt(req.body.table161_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T05.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T05destytojas" + i),
            veiklPavad: eval("req.body.tMTEP3_T05veiklPavad" + i),
            veiklRezult: eval("req.body.tMTEP3_T05veiklRezult" + i),
            atlygArNe: eval("req.body.tMTEP3_T05atlygArNe" + i)
          })
        } // 16 lentelė 2 update-dep
        for (let i = 1; i <= parseInt(req.body.table162_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_162.push({
            nr: i,
            destytojas: eval("req.body.lent162_destytojas" + i),
            pavadinimas: eval("req.body.lent162_pavadinimas" + i),
            pastabos: eval("req.body.lent162_pastabos" + i)
          })
        } // 16 lentelė 3 update-dep
        for (let i = 1; i <= parseInt(req.body.table163_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T16.push({
            nr: i,
            rengejai: eval("req.body.tMTEP3_T16autorius" + i),
            pavadinimas: eval("req.body.tMTEP3_T16pavadinimas" + i),
            uzsakovas: eval("req.body.tMTEP3_T16uzsakovas" + i)
          })
        } // 17 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table17_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T06.push({
            nr: i,
            autorius: eval("req.body.tMTEP3_T06autorius" + i),
            menoSrit: eval("req.body.tMTEP3_T06menoSrit" + i),
            pobudis: eval("req.body.tMTEP3_T06pobudis" + i),
            realizVieta: eval("req.body.tMTEP3_T06realizVieta" + i),
            data: eval("req.body.tMTEP3_T06data" + i),
            atlygArNe: eval("req.body.tMTEP3_T06atlygArNe" + i)
          })
        } // 18 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table18_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T07.push({
            nr: i,
            atlikejas: eval("req.body.tMTEP3_T07atlikejas" + i),
            menoSrit: eval("req.body.tMTEP3_T07menoSrit" + i),
            pavadinimas: eval("req.body.tMTEP3_T07pavadinimas" + i),
            atlikVieta: eval("req.body.tMTEP3_T07atlikVieta" + i),
            data: eval("req.body.tMTEP3_T07data" + i),
            atlygArNe: eval("req.body.tMTEP3_T07atlygArNe" + i)
          })
        } // 19 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table19_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T08.push({
            nr: i,
            atlikejas: eval("req.body.tMTEP3_T08atlikejas" + i),
            menoSrit: eval("req.body.tMTEP3_T08menoSrit" + i),
            pavadinimas: eval("req.body.tMTEP3_T08pavadinimas" + i),
            atlikVieta: eval("req.body.tMTEP3_T08atlikVieta" + i),
            data: eval("req.body.tMTEP3_T08data" + i),
            atlygArNe: eval("req.body.tMTEP3_T08atlygArNe" + i)
          })
        } // 20 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table20_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T09.push({
            nr: i,
            atlikejas: eval("req.body.tMTEP3_T09atlikejas" + i),
            menoSrit: eval("req.body.tMTEP3_T09menoSrit" + i),
            pavadinimas: eval("req.body.tMTEP3_T09pavadinimas" + i),
            atlikVieta: eval("req.body.tMTEP3_T09atlikVieta" + i),
            data: eval("req.body.tMTEP3_T09data" + i),
            atlygArNe: eval("req.body.tMTEP3_T09atlygArNe" + i)
          })
        } // 21 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table21_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T10.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T10destytojas" + i),
            veiklPobud: eval("req.body.tMTEP3_T10veiklPobud" + i),
            veiklTiksl: eval("req.body.tMTEP3_T10veiklTiksl" + i),
            dataVieta: eval("req.body.tMTEP3_T10dataVieta" + i),
            dalyvSk: eval("req.body.tMTEP3_T10dalyvSk" + i),
            ktKomentarai: eval("req.body.tMTEP3_T10ktKomentarai" + i),
            atlygArNe: eval("req.body.tMTEP3_T10atlygArNe" + i)
          })
        } // 22 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table22_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T11.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T11destytojas" + i),
            veiklPobud: eval("req.body.tMTEP3_T11veiklPobud" + i),
            veiklTiksl: eval("req.body.tMTEP3_T11veiklTiksl" + i),
            dataVieta: eval("req.body.tMTEP3_T11dataVieta" + i),
            dalyvSk: eval("req.body.tMTEP3_T11dalyvSk" + i),
            ktKomentarai: eval("req.body.tMTEP3_T11ktKomentarai" + i),
            atlygArNe: eval("req.body.tMTEP3_T11atlygArNe" + i)
          })
        } // 23 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table23_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T12.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T12destytojas" + i),
            veiklPobud: eval("req.body.tMTEP3_T12veiklPobud" + i),
            dataVieta: eval("req.body.tMTEP3_T12dataVieta" + i)
          })
        } // 24 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table24_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T14.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T14destytojas" + i),
            renginys: eval("req.body.tMTEP3_T14renginys" + i),
            veiklPobud: eval("req.body.tMTEP3_T14veiklPobud" + i),
            dataVieta: eval("req.body.tMTEP3_T14dataVieta" + i)
          })
        } // 25 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table25_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_T13.push({
            nr: i,
            destytojas: eval("req.body.tMTEP3_T13destytojas" + i),
            studDuom: eval("req.body.tMTEP3_T13studDuom" + i),
            renginioPavad: eval("req.body.tMTEP3_T13renginioPavad" + i),
            rezultatas: eval("req.body.tMTEP3_T13rezultatas" + i),
            data: eval("req.body.tMTEP3_T13data" + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tMTEP3_S_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.tMTEP3.tMTEP3_S.push({
            nr: i,
            stiprybes: eval("req.body.tMTEP3_Sstiprybes" + i),
            tobulintina: eval("req.body.tMTEP3_Stobulintina" + i)
          })
        }
        // 26 lentelė update-dep priedas
        // mokymosi
        for (let i = 1; i <= parseInt(req.body.table261_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosi.push({
            pavadinimas: eval("req.body.kTOV4_KV01mokymosiKomppavad" + i),
            pazymNr: eval("req.body.kTOV4_KV01mokymosiKomppazymNr" + i),
            trukmeValLT: eval("req.body.kTOV4_KV01mokymosiKomptrukmeValLT" + i),
            trukmeValNeLT: eval("req.body.kTOV4_KV01mokymosiKomptrukmeValNeLT" + i),
            destytojas: eval("req.body.kTOV4_KV01mokymosiKompdalyvis" + i)
          })
        }
        foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValLT = req.body.kTOV4_trukmeMokymValLT1,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.mokymosiIsVisoValNeLT = req.body.kTOV4_trukmeMokymValNeLT1
        // tyrimu
        for (let i = 1; i <= parseInt(req.body.table262_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimu.push({
            pavadinimas: eval("req.body.kTOV4_KV01tyrimuKomppavad" + i),
            pazymNr: eval("req.body.kTOV4_KV01tyrimuKomppazymNr" + i),
            trukmeValLT: eval("req.body.kTOV4_KV01tyrimuKomptrukmeValLT" + i),
            trukmeValNeLT: eval("req.body.kTOV4_KV01tyrimuKomptrukmeValNeLT" + i),
            destytojas: eval("req.body.kTOV4_KV01tyrimuKompdalyvis" + i)
          })
        }
        foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValLT = req.body.kTOV4_trukmeTyrimValLT2,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.tyrimuIsVisoValNeLT = req.body.kTOV4_trukmeTyrimValNeLT2
        //bendrosios
        for (let i = 1; i <= parseInt(req.body.table263_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosios.push({
            pavadinimas: eval("req.body.kTOV4_KV01bendrKomppavad" + i),
            pazymNr: eval("req.body.kTOV4_KV01bendrKomppazymNr" + i),
            trukmeValLT: eval("req.body.kTOV4_KV01bendrKomptrukmeValLT" + i),
            trukmeValNeLT: eval("req.body.kTOV4_KV01bendrKomptrukmeValNeLT" + i),
            destytojas: eval("req.body.kTOV4_KV01bendrKompdalyvis" + i)
          })
        }
        foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValLT = req.body.kTOV4_trukmeBendrValLT3,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.bendrosiosIsVisoValNeLT = req.body.kTOV4_trukmeBendrValNeLT3
        //dalykines
        for (let i = 1; i <= parseInt(req.body.table264_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykines.push({
            pavadinimas: eval("req.body.kTOV4_KV01dalykKomppavad" + i),
            pazymNr: eval("req.body.kTOV4_KV01dalykKomppazymNr" + i),
            trukmeValLT: eval("req.body.kTOV4_KV01dalykKompTrukmeValLT" + i),
            trukmeValNeLT: eval("req.body.kTOV4_KV01dalykKompTrukmeValNeLT" + i),
            destytojas: eval("req.body.kTOV4_KV01dalykKompdalyvis" + i)
          })
        }
        foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValLT = req.body.kTOV4_trukmeDalykValLT4,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.dalykinesIsVisoValNeLT = req.body.kTOV4_trukmeDalykValNeLT4

        foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValLT = req.body.kTOV4_trukmeValLTbendr,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kompetencijos.isVisoValNeLT = req.body.kTOV4_trukmeValNeLTbendr,
          //26 lent
          //mokymosi
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.destytojuSk = req.body.mokymosiLTdestytojuSk,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValLT = req.body.mokymosiLTtrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.trukmeValNeLT = req.body.mokymosiNeLttrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.mokymosi.isVisoVal = req.body.mokymosiIsVisoVal,
          //tyrimu
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.destytojuSk = req.body.tyrimuLTdestytojuSk,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValLT = req.body.tyrimuLTtrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.trukmeValNeLT = req.body.tyrimuNeLttrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.tyrimu.isVisoVal = req.body.tyrimuIsVisoVal,
          //bendrosios
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.destytojuSk = req.body.bendrosiosLTdestytojuSk,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValLT = req.body.bendrosiosLTtrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.trukmeValNeLT = req.body.bendrosiosNeLttrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.bendrosios.isVisoVal = req.body.bendrosiosIsVisoVal,
          //dalykines
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.destytojuSk = req.body.dalykinesLTdestytojuSk,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValLT = req.body.dalykinesLTtrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.trukmeValNeLT = req.body.dalykinesNeLttrukmeVal,
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV01.kTOV4_26.dalykines.isVisoVal = req.body.dalykinesIsVisoVal
        // 27 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table27_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_27.push({
            nr: i,
            renginysTema: eval("req.body.lent27_renginysTema" + i),
            kompGrupe: eval("req.body.lent27_kompGrupe" + i),
            skirta: eval("req.body.lent27_skirta" + i),
            lektorius: eval("req.body.lent27_lektorius" + i),
            lektTipas: eval("req.body.lent27_lektTipas" + i)
          })
        } // 28 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table28_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_28.push({
            nr: i,
            destytojas: eval("req.body.lent28_destytojas" + i),
            imonIstaig: eval("req.body.lent28_imonIstaig" + i),
            kompGrupe: eval("req.body.lent28_kompGrupe" + i),
            trukmeVal: eval("req.body.lent28_trukmeVal" + i),
            data: eval("req.body.lent28_data" + i)
          })
        } // 29 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table29_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_KV03.push({
            nr: i,
            destytojas: eval("req.body.kTOV4_KV03destytojas" + i),
            studKryptis: eval("req.body.kTOV4_KV03studKryptis" + i),
            salis: eval("req.body.kTOV4_KV03salis" + i),
            institucija: eval("req.body.kTOV4_KV03institucija" + i),
            dalykas: eval("req.body.kTOV4_KV03dalykas" + i)
          })
        } // 30 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table30_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_30.push({
            nr: i,
            destytojas: eval("req.body.lent30_destytojas" + i),
            studKryptis: eval("req.body.lent30_studKryptis" + i),
            salis: eval("req.body.lent30_salis" + i),
            institucija: eval("req.body.lent30_institucija" + i),
            dalykas: eval("req.body.lent30_dalykas" + i)
            //BAIGTA
          })
        } // 31 lentelė update-dep 1
        for (let i = 1; i <= parseInt(req.body.table311_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_1.push({
            nr: i,
            destytojas: eval("req.body.kTOV4_O01_1destytojas" + i),
            veiklPobud: eval("req.body.kTOV4_O01_1veiklPobud" + i),
            isakNrData: eval("req.body.kTOV4_O01_1isakNrData" + i)
          })
        } // 31 lentelė update-dep 2
        for (let i = 1; i <= parseInt(req.body.table312_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_O01.kTOV4_O01_2.push({
            nr: i,
            destytojas: eval("req.body.kTOV4_O01_2destytojas" + i),
            veiklPobud: eval("req.body.kTOV4_O01_2veiklPobud" + i),
            dataVieta: eval("req.body.kTOV4_O01_2dataVieta" + i),
            ktKomentarai: eval("req.body.kTOV4_O01_2ktKomentarai" + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tablekTOV4_S_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kTOV4.kTOV4_S.push({
            nr: i,
            stiprybes: eval("req.body.kTOV4_Sstiprybes" + i),
            tobulintina: eval("req.body.kTOV4_Stobulintina" + i)
          })
        } // 32 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table32_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_32.push({
            nr: i,
            studKryptis: eval("req.body.lent32_studKryptis" + i),
            studProgr: eval("req.body.lent32_studProgr" + i),
            strategPartner: eval("req.body.lent32_strategPartner" + i)
          })
        } // 33 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table33_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_33.push({
            nr: i,
            veikla: eval("req.body.lent33_veikla" + i),
            socPartneris: eval("req.body.lent33_socPartneris" + i),
            destytojas: eval("req.body.lent33_destytojas" + i)
          })
        } // 34 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table34_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_34.push({
            nr: i,
            studKryptis: eval("req.body.lent34_studKryptis" + i),
            studProgr: eval("req.body.lent34_studProgr" + i),
            studentuSk1: eval("req.body.lent34_studentuSk1_" + i),
            studentuSk2: eval("req.body.lent34_studentuSk2_" + i),
            studentuSk3: eval("req.body.lent34_studentuSk3_" + i),
            studentuSk4: eval("req.body.lent34_studentuSk4_" + i),
            studentuSk5: eval("req.body.lent34_studentuSk5_" + i)
          })
        } // 35 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table35_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_35.push({
            nr: i,
            studKryptis: eval("req.body.lent35_studKryptis" + i),
            studProgr: eval("req.body.lent35_studProgr" + i),
            studentuSk1: eval("req.body.lent35_studentuSkBendr1_" + i),
            pasPartnerSk1: eval("req.body.lent35_studentuSk1_" + i),
            studentuSk2: eval("req.body.lent35_studentuSkBendr2_" + i),
            pasPartnerSk2: eval("req.body.lent35_studentuSk2_" + i),
            studentuSk3: eval("req.body.lent35_studentuSkBendr3_" + i),
            pasPartnerSk3: eval("req.body.lent35_studentuSk3_" + i),
            studentuSk4: eval("req.body.lent35_studentuSkBendr4_" + i),
            pasPartnerSk4: eval("req.body.lent35_studentuSk4_" + i),
            studentuSk5: eval("req.body.lent35_studentuSkBendr5_" + i),
            pasPartnerSk5: eval("req.body.lent35_studentuSk5_" + i)
          })
        } // 36 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table36_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_KT02.push({
            nr: i,
            studKryptis: eval("req.body.kV5_KT02studKryptis" + i),
            studProgr: eval("req.body.kV5_KT02studProgr" + i),
            diplomantas: eval("req.body.kV5_KT02diplomantas" + i),
            darboTema: eval("req.body.kV5_KT02darboTema" + i)
          })
        } // 37 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table37_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_KT01.push({
            nr: i,
            studKryptis: eval("req.body.kV5_KT01studKryptis" + i),
            studProgr: eval("req.body.kV5_KT01studProgr" + i),
            diplomantas: eval("req.body.kV5_KT01diplomantas" + i),
            darboTema: eval("req.body.kV5_KT01darboTema" + i),
            uzsakovas: eval("req.body.kV5_KT01uzsakovas" + i)
          })
        } // 38 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table38_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_38.push({
            nr: i,
            pavadinimas: eval("req.body.lent38_pavadinimas" + i),
            vykdytPartner: eval("req.body.lent38_vykdytPartner" + i),
            dalyviai: eval("req.body.lent38_dalyviai" + i),
            finansavim: eval("req.body.lent38_finansavim" + i),
            rezultatai: eval("req.body.lent38_rezultatai" + i),
            salisData: eval("req.body.lent38_salisData" + i)
          })
        } // 39 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table39_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_39.push({
            nr: i,
            kryptys: eval("req.body.lent39_kryptys" + i),
            aprasymas: eval("req.body.lent39_aprasymas" + i)
          })
        } // 40 lentelė update-dep 1
        for (let i = 1; i <= parseInt(req.body.table401_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_40.socAtskMaz.push({
            aprasymas: eval("req.body.lent40_socaprasymas" + i),
            destytojas: eval("req.body.lent40_socdestytojas" + i)
          })
        } // 40 lentelė update-dep 2
        for (let i = 1; i <= parseInt(req.body.table402_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_40.aplinkosaugInic.push({
            aprasymas: eval("req.body.lent40_aplinkaprasymas" + i),
            destytojas: eval("req.body.lent40_aplinkdestytojas" + i)
          })
        } // 40 lentelė update-dep 3
        for (let i = 1; i <= parseInt(req.body.table403_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_40.lietValstybPuosel.push({
            aprasymas: eval("req.body.lent40_valstybaprasymas" + i),
            destytojas: eval("req.body.lent40_valstybdestytojas" + i)
          })
        } // 40 lentelė update-dep 4
        for (let i = 1; i <= parseInt(req.body.table404_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_40.lietEtnokPuos.push({
            aprasymas: eval("req.body.lent40_etnoaprasymas" + i),
            destytojas: eval("req.body.lent40_savdestytojas" + i)
          })
        } // 40 lentelė update-dep 5
        for (let i = 1; i <= parseInt(req.body.table405_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_40.savanorystIniciatyv.push({
            aprasymas: eval("req.body.lent40_savaprasymas" + i),
            destytojas: eval("req.body.lent40_savdestytojas" + i)
          })
        } // 41 lentelė update-dep
        for (let i = 1; i <= parseInt(req.body.table41_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.kV5_41.push({
            nr: i,
            veikla: eval("req.body.lent41_veikla" + i),
            veiklPartner: eval("req.body.lent41_veiklPartner" + i),
            organizac: eval("req.body.lent41_organizac" + i),
            veiklOrientavim: eval("req.body.lent41_veiklOrientavim" + i),
            dalyviai: eval("req.body.lent41_dalyviai" + i),
            laikas: eval("req.body.lent41_laikas" + i),
            vieta: eval("req.body.lent41_vieta" + i)
          })
        }
        for (let i = 1; i <= parseInt(req.body.tableVeiklS_name); i++) {
          foundUser.mm2024_2025.katedrosVedejas.kV5.veiklSavinalize.veiklSavinalize_array.push({
            stiprybes: eval("req.body.veiklSavianalizStiprybes" + i),
            tobulintina: eval("req.body.veiklSavianalizTobulintina" + i)
          })
        }
        foundUser.mm2024_2025.katedrosVedejas.kV5.veiklSavinalize.isvadosApieVeikl = req.body.isvadosApieVeikl,

          foundUser.busenaVedejo24_25 = req.body.ataskaitos_busena,
          foundUser.updated_for = req.user.username

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        foundUser.mm2024_2025.katedrosVedejas.ivykiuDatos.atnaujinimas = dateTime

        foundUser.save(function(err) {
          if (!err) {
            console.log("Succesfully updated 2025-2026");
            res.redirect("/2024-2025/user-window");
          }
        });
      } else {
        console.log("User does'f found");
      }
    }
  });
});
