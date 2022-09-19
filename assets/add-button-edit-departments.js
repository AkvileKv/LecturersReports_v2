// for tables: 1, 3, 6, 30, mV2_S, 32, 34, TMTEP_S, 35, kTOV4_S, 39, veiklSavinalize 
//CREATE
// mV2_D04 
// 1 table 
var iterNr1 = 2;
var div1 = 1;

function addButtonTable01() {
  var bendr1 = "add_to_me1" + div1;
  div1++;
  document.getElementById(bendr1).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="mV2_D04nr` + iterNr1 + `" placeholder="" autocomplete="off" value="` + iterNr1 + `" readonly="readonly">
        </div>
        <div class="col-md-4 mb-3">
            <label for="">Studijų kryptis</label>
          <select name="mV2_D04studKryptis` + iterNr1 + `" class="form-select form-control">
            <option value=""></option>
            <optgroup label="Matematikos mokslai">
              <option class="others" value="Matematika">Matematika</option>
              <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
              <option class="others" value="Statistika">Statistika</option>
            </optgroup>
            <optgroup label="Informatikos mokslai">
              <option class="others" value="Informatika">Informatika</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
            </optgroup>
            <optgroup label="Fiziniai mokslai">
              <option class="others" value="Chemija">Chemija</option>
              <option class="others" value="Fizika">Fizika</option>
              <option class="others" value="Geologija">Geologija</option>
              <option class="others" value="Aplinkotyra">Aplinkotyra</option>
              <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
            </optgroup>
            <optgroup label="Gyvybės mokslai">
              <option class="others" value="Biologija">Biologija</option>
              <option class="others" value="Genetika">Genetika</option>
              <option class="others" value="Mikrobiologija">Mikrobiologija</option>
              <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
              <option class="others" value="Biofizika">Biofizika</option>
              <option class="others" value="Biochemija">Biochemija</option>
              <option class="others" value="Ekologija">Ekologija</option>
            </optgroup>
            <optgroup label="Inžinerijos mokslai">
              <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
              <option class="others" value="Bioinžinerija">Bioinžinerija</option>
              <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
              <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
              <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
              <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
              <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
              <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
              <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
              <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
              <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
              <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
            </optgroup>
            <optgroup label="Technologijų mokslai">
              <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
              <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
              <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
              <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
              <option class="others" value="Biotechnologijos">Biotechnologijos</option>
              <option class="others" value="Maisto technologijos">Maisto technologijos</option>
              <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
            </optgroup>
            <optgroup label="Sveikatos mokslai">
              <option class="others" value="Medicina">Medicina</option>
              <option class="others" value="Odontologija">Odontologija</option>
              <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
              <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
              <option class="others" value="Farmacija">Farmacija</option>
              <option class="others" value="Reabilitacija">Reabilitacija</option>
              <option class="others" value="Mityba">Mityba</option>
              <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
              <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
              <option class="others" value="Kosmetologija">Kosmetologija</option>
            </optgroup>
            <optgroup label="Veterinarijos mokslai">
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Žemės ūkio mokslai">
              <option class="others" value="Žemės ūkis">Žemės ūkis</option>
              <option class="others" value="Agronomija">Agronomija</option>
              <option class="others" value="Miškininkystė">Miškininkystė</option>
              <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
              <option class="others" value="Žuvininkystė">Žuvininkystė</option>
              <option class="others" value="Maisto studijos">Maisto studijos</option>
            </optgroup>
            <optgroup label="Socialiniai mokslai">
              <option class="others" value="Ekonomika">Ekonomika</option>
              <option class="others" value="Politikos mokslai">Politikos mokslai</option>
              <option class="others" value="Sociologija">Sociologija</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Antropologija">Antropologija</option>
              <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
              <option class="others" value="Psichologija">Psichologija</option>
              <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
              <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
              <option class="others" value="Komunikacija">Komunikacija</option>
              <option class="others" value="Leidyba">Leidyba</option>
              <option class="others" value="Žurnalistika">Žurnalistika</option>
            </optgroup>
            <optgroup label="Teisė">
              <option class="others" value="Teisė">Teisė</option>
            </optgroup>
            <optgroup label="Verslo ir viešoji vadyba">
              <option class="others" value="Verslas">Verslas</option>
              <option class="others" value="Vadyba">Vadyba</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Rinkodara">Rinkodara</option>
              <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
              <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
              <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
            </optgroup>
            <optgroup label="Ugdymo mokslai">
              <option class="others" value="Pedagogika">Pedagogika</option>
              <option class="others" value="Edukologija">Edukologija</option>
              <option class="others" value="Andragogika">Andragogika</option>
            </optgroup>
            <optgroup label="Humanitariniai mokslai">
              <option class="others" value="Lingvistika">Lingvistika</option>
              <option class="others" value="Literatūrologija">Literatūrologija</option>
              <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
              <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
              <option class="others" value="Vertimas">Vertimas</option>
              <option class="others" value="Regiono studijos">Regiono studijos</option>
              <option class="others" value="Kalbos studijos">Kalbos studijos</option>
              <option class="others" value="Istorija">Istorija</option>
              <option class="others" value="Archeologija">Archeologija</option>
              <option class="others" value="Filosofija">Filosofija</option>
              <option class="others" value="Teologija">Teologija</option>
              <option class="others" value="Paveldo studijos">Paveldo studijos</option>
              <option class="others" value="Religijos studijos">Religijos studijos</option>
              <option class="others" value="Kultūros studijos">Kultūros studijos</option>
              <option class="others" value="Menotyra">Menotyra</option>
            </optgroup>
            <optgroup label="Menai">
              <option class="others" value="Dailė">Dailė</option>
              <option class="others" value="Dizainas">Dizainas</option>
              <option class="others" value="Muzika">Muzika</option>
              <option class="others" value="Teatras">Teatras</option>
              <option class="others" value="Kinas">Kinas</option>
              <option class="others" value="Šokis">Šokis</option>
              <option class="others" value="Medijų menas">Medijų menas</option>
              <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
              <option class="others" value="Architektūra">Architektūra</option>
              <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
            </optgroup>
            <optgroup label="Sportas">
              <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
              <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <label for="">Studijų programa</label>
          <select name="mV2_D04studProgr` + iterNr1 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-3 mb-3">
          <label for="">Valstybinis programos kodas</label>
          <textarea rows="1" type="text" class="form-control text" name="mV2_D04progrKodas` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-1 mb-3">

        </div>
        <div class="col-md-4 mb-3">
          <label for=""><br>SKVC direktoriaus įsakymo Nr., data</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D04isakNrData` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-3 mb-3">
          <label for="">Studijų kryptis akredituota iki/ planuojama vertinti
          </label>
          <textarea rows="1" type="text" class="form-control" name="mV2_D04studKryptAkredit` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-2 mb-3">
          <label for="">Akreditavimo laikotarpis (3 ar 7 metai)
          </label>
          <select name="mV2_D04akreditLaikot` + iterNr1 + `" class="form-select form-control">
            <option value=""></option>
            <option class="others" value="3 metai">3 metai</option>
            <option class="others" value="7 metai">7 metai</option>
          </select>
        </div>
        <div class="col-md-2 mb-3">
          <label for=""><br>ECTS</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D04eCTS` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me1` + div1 + `">
            `;
  document.getElementById("table1_id").value = iterNr1;
  iterNr1++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 3 table 

var iterNr2 = 2;
var div2 = 1;

function addButtonTable03() {
  var bendr2 = "add_to_me2" + div2;
  div2++;
  document.getElementById(bendr2).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="lent3_nr` + iterNr2 + `" placeholder="" autocomplete="off" value="` + iterNr2 + `" readonly="readonly">
        </div>
        <div class="col-md-3 mb-3">
            <label for="">Studijų kryptis</label>
            <select name="lent3_studKryptis` + iterNr2 + `"class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
        </div>
        <div class="col-md-4 mb-3">
<label for="">Studijų programa</label>
            <select name="lent3_studProgr` + iterNr2 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-4 mb-3">
  <label for="">Dėstytojas-praktikas*</label>
          <textarea rows="1" type="text" class="form-control" name="lent3_destytojas` + iterNr2 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-1 mb-3">
        </div>
        <div class="col-md-11 mb-3">
          <label for="">Įmonė, įstaiga, organizacija</label>
          <textarea type="text" rows="1" class="form-control" name="lent3_imonIstaig` + iterNr2 + `"placeholder="" autocomplete="off"></textarea>
        </div>

      </div>
              <div id="add_to_me2` + div2 + `">
            `;
  document.getElementById("table3_id").value = iterNr2;
  iterNr2++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 6 table 

var iterNr3 = 2;
var div3 = 1;

function addButtonTable06() {
  var bendr3 = "add_to_me3" + div3;
  div3++;
  document.getElementById(bendr3).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="mV2_D06nr` + iterNr3 + `" placeholder="" autocomplete="off" value="` + iterNr3 + `" readonly="readonly">
        </div>
        <div class="col-md-3 mb-3">
          <label for="">Studijų programa</label>
          <select name="mV2_D06studProgr` + iterNr3 + `"class="form-select form-control">
          <option value=""></option>
          <optgroup label="Elektronikos ir informatikos fakultetas">
            <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
            <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
            <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
            <option class="others" value="Programų sistemos">Programų sistemos</option>
            <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Ekonomikos fakultetas">
            <option class="others" value="Apskaita">Apskaita</option>
            <option class="others" value="Bankininkystė">Bankininkystė</option>
            <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
            <option class="others" value="Finansai">Finansai</option>
            <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
            <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
            <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Verslo vadybos fakultetas">
            <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
            <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
            <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
            <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
            <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
            <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
            <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
            <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
            <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
            <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Sveikatos priežiūros fakultetas">
            <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
            <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
            <option class="others" value="Dietetika">Dietetika</option>
            <option class="others" value="Ergoterapija">Ergoterapija</option>
            <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
            <option class="others" value="Kineziterapija">Kineziterapija</option>
            <option class="others" value="Radiologija">Radiologija</option>
          </optgroup>
          <optgroup label="Agrotechnologijų fakultetas">
            <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
            <option class="others" value="Cheminė analizė">Cheminė analizė</option>
            <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
            <option class="others" value="Maisto technologija">Maisto technologija</option>
            <option class="others" value="Veterinarija">Veterinarija</option>
          </optgroup>
          <optgroup label="Pedagogikos fakultetas">
            <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
            <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
            <option class="others" value="Socialinis darbas">Socialinis darbas</option>
            <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
          </optgroup>
          <optgroup label="Menų ir kūrybinių technologijų fakultetas">
            <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
            <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
            <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
            <option class="others" value="Mados dizainas">Mados dizainas</option>
            <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
            <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
            <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
            <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
          </optgroup>
        </select>
        </div>
        <div class="col-md-3 mb-3">
          <label for="">Valstybinis programos kodas</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D06progrKodas` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <label for="">Atlikti patobulinimai</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D06atlPatobulin` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-1 mb-3">
        </div>
        <div class="col-md-6 mb-3">
          <label for="">Patobulinimą inicijavusios priežastys</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D06tobulinPriezast` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <label for="">Patobulinimus pagrindžiantys įrodymai*</label>
          <textarea rows="1" type="text" class="form-control " name="mV2_D06tobulinIrod` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me3` + div3 + `">
            `;
  document.getElementById("table6_id").value = iterNr3;
  iterNr3++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 30 table 

var iterNr4 = 2;
var div4 = 1;

function addButtonTable30() {
  var bendr4 = "add_to_me4" + div4;
  div4++;
  document.getElementById(bendr4).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label><br></label>
            <input type="number" class="form-control  text-center" name="lent30_nr` + iterNr4 + `"readonly="readonly" value="` + iterNr4 + `" autocomplete="off">
            </div>
        <div class="col-md-4 mb-3">
        <label>Dėstytojas (pavardė, vardas)</label>
          <textarea rows="1" type="text" class="form-control " name="lent30_destytojas` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-3 mb-3">
            <label>Studijų kryptis</label>
          <select name="lent30_studKryptis` + iterNr4 + `"  class="form-select form-control">
            <option value=""></option>
            <optgroup label="Matematikos mokslai">
              <option class="others" value="Matematika">Matematika</option>
              <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
              <option class="others" value="Statistika">Statistika</option>
            </optgroup>
            <optgroup label="Informatikos mokslai">
              <option class="others" value="Informatika">Informatika</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
            </optgroup>
            <optgroup label="Fiziniai mokslai">
              <option class="others" value="Chemija">Chemija</option>
              <option class="others" value="Fizika">Fizika</option>
              <option class="others" value="Geologija">Geologija</option>
              <option class="others" value="Aplinkotyra">Aplinkotyra</option>
              <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
            </optgroup>
            <optgroup label="Gyvybės mokslai">
              <option class="others" value="Biologija">Biologija</option>
              <option class="others" value="Genetika">Genetika</option>
              <option class="others" value="Mikrobiologija">Mikrobiologija</option>
              <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
              <option class="others" value="Biofizika">Biofizika</option>
              <option class="others" value="Biochemija">Biochemija</option>
              <option class="others" value="Ekologija">Ekologija</option>
            </optgroup>
            <optgroup label="Inžinerijos mokslai">
              <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
              <option class="others" value="Bioinžinerija">Bioinžinerija</option>
              <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
              <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
              <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
              <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
              <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
              <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
              <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
              <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
              <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
              <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
            </optgroup>
            <optgroup label="Technologijų mokslai">
              <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
              <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
              <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
              <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
              <option class="others" value="Biotechnologijos">Biotechnologijos</option>
              <option class="others" value="Maisto technologijos">Maisto technologijos</option>
              <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
            </optgroup>
            <optgroup label="Sveikatos mokslai">
              <option class="others" value="Medicina">Medicina</option>
              <option class="others" value="Odontologija">Odontologija</option>
              <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
              <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
              <option class="others" value="Farmacija">Farmacija</option>
              <option class="others" value="Reabilitacija">Reabilitacija</option>
              <option class="others" value="Mityba">Mityba</option>
              <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
              <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
              <option class="others" value="Kosmetologija">Kosmetologija</option>
            </optgroup>
            <optgroup label="Veterinarijos mokslai">
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Žemės ūkio mokslai">
              <option class="others" value="Žemės ūkis">Žemės ūkis</option>
              <option class="others" value="Agronomija">Agronomija</option>
              <option class="others" value="Miškininkystė">Miškininkystė</option>
              <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
              <option class="others" value="Žuvininkystė">Žuvininkystė</option>
              <option class="others" value="Maisto studijos">Maisto studijos</option>
            </optgroup>
            <optgroup label="Socialiniai mokslai">
              <option class="others" value="Ekonomika">Ekonomika</option>
              <option class="others" value="Politikos mokslai">Politikos mokslai</option>
              <option class="others" value="Sociologija">Sociologija</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Antropologija">Antropologija</option>
              <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
              <option class="others" value="Psichologija">Psichologija</option>
              <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
              <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
              <option class="others" value="Komunikacija">Komunikacija</option>
              <option class="others" value="Leidyba">Leidyba</option>
              <option class="others" value="Žurnalistika">Žurnalistika</option>
            </optgroup>
            <optgroup label="Teisė">
              <option class="others" value="Teisė">Teisė</option>
            </optgroup>
            <optgroup label="Verslo ir viešoji vadyba">
              <option class="others" value="Verslas">Verslas</option>
              <option class="others" value="Vadyba">Vadyba</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Rinkodara">Rinkodara</option>
              <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
              <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
              <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
            </optgroup>
            <optgroup label="Ugdymo mokslai">
              <option class="others" value="Pedagogika">Pedagogika</option>
              <option class="others" value="Edukologija">Edukologija</option>
              <option class="others" value="Andragogika">Andragogika</option>
            </optgroup>
            <optgroup label="Humanitariniai mokslai">
              <option class="others" value="Lingvistika">Lingvistika</option>
              <option class="others" value="Literatūrologija">Literatūrologija</option>
              <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
              <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
              <option class="others" value="Vertimas">Vertimas</option>
              <option class="others" value="Regiono studijos">Regiono studijos</option>
              <option class="others" value="Kalbos studijos">Kalbos studijos</option>
              <option class="others" value="Istorija">Istorija</option>
              <option class="others" value="Archeologija">Archeologija</option>
              <option class="others" value="Filosofija">Filosofija</option>
              <option class="others" value="Teologija">Teologija</option>
              <option class="others" value="Paveldo studijos">Paveldo studijos</option>
              <option class="others" value="Religijos studijos">Religijos studijos</option>
              <option class="others" value="Kultūros studijos">Kultūros studijos</option>
              <option class="others" value="Menotyra">Menotyra</option>
            </optgroup>
            <optgroup label="Menai">
              <option class="others" value="Dailė">Dailė</option>
              <option class="others" value="Dizainas">Dizainas</option>
              <option class="others" value="Muzika">Muzika</option>
              <option class="others" value="Teatras">Teatras</option>
              <option class="others" value="Kinas">Kinas</option>
              <option class="others" value="Šokis">Šokis</option>
              <option class="others" value="Medijų menas">Medijų menas</option>
              <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
              <option class="others" value="Architektūra">Architektūra</option>
              <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
            </optgroup>
            <optgroup label="Sportas">
              <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
              <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-4 mb-3">
          <label>Šalis</label>
          <textarea rows="1" type="text" class="form-control" name="lent30_salis` + iterNr4 + `" autocomplete="off"></textarea>
        </div>
        <div class="col-md-1 mb-3">
        </div>
        <div class="col-md-4 mb-3">
            <label>Institucija</label>
          <textarea rows="1" type="text" class="form-control " name="lent30_institucija` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-7 mb-3">
            <label>Dalykas / tema / projektas</label>
          <textarea rows="1" type="text" class="form-control " name="lent30_dalykas` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>

              <div id="add_to_me4` + div4 + `">
            `;
  document.getElementById("table30_id").value = iterNr4;
  iterNr4++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// mV2_S 

var iterNr5 = 3;
var div5 = 1;

function mv2s() {
  var bendr5 = "add_to_me5" + div5;
  div5++;
  document.getElementById(bendr5).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="mV2_Snr` + iterNr5 + `" placeholder="" autocomplete="off" value="` + iterNr5 + `" readonly="readonly">
        </div>
        <div class="col-md-6 mb-3">
          <textarea rows="1" type="text" class="form-control " name="mV2_Sstiprybes` + iterNr5 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control " name="mV2_Stobulintina` + iterNr5 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>

              <div id="add_to_me5` + div5 + `">
            `;
  document.getElementById("tablemV2_S_id").value = iterNr5;
  iterNr5++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 32 table 

var iterNr6 = 2;
var div6 = 1;

function addButtonTable32() {
  var bendr6 = "add_to_me6" + div6;
  div6++;
  document.getElementById(bendr6).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="lent32_nr` + iterNr6 + `" value="` + iterNr6 + `" placeholder="" autocomplete="off" readonly="readonly">
        </div>
        <div class="col-md-3 mb-3">
          <select name="lent32_studKryptis` + iterNr6 + `" class="form-select form-control">
            <option value=""></option>
            <optgroup label="Matematikos mokslai">
              <option class="others" value="Matematika">Matematika</option>
              <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
              <option class="others" value="Statistika">Statistika</option>
            </optgroup>
            <optgroup label="Informatikos mokslai">
              <option class="others" value="Informatika">Informatika</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
            </optgroup>
            <optgroup label="Fiziniai mokslai">
              <option class="others" value="Chemija">Chemija</option>
              <option class="others" value="Fizika">Fizika</option>
              <option class="others" value="Geologija">Geologija</option>
              <option class="others" value="Aplinkotyra">Aplinkotyra</option>
              <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
            </optgroup>
            <optgroup label="Gyvybės mokslai">
              <option class="others" value="Biologija">Biologija</option>
              <option class="others" value="Genetika">Genetika</option>
              <option class="others" value="Mikrobiologija">Mikrobiologija</option>
              <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
              <option class="others" value="Biofizika">Biofizika</option>
              <option class="others" value="Biochemija">Biochemija</option>
              <option class="others" value="Ekologija">Ekologija</option>
            </optgroup>
            <optgroup label="Inžinerijos mokslai">
              <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
              <option class="others" value="Bioinžinerija">Bioinžinerija</option>
              <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
              <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
              <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
              <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
              <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
              <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
              <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
              <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
              <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
              <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
            </optgroup>
            <optgroup label="Technologijų mokslai">
              <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
              <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
              <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
              <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
              <option class="others" value="Biotechnologijos">Biotechnologijos</option>
              <option class="others" value="Maisto technologijos">Maisto technologijos</option>
              <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
            </optgroup>
            <optgroup label="Sveikatos mokslai">
              <option class="others" value="Medicina">Medicina</option>
              <option class="others" value="Odontologija">Odontologija</option>
              <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
              <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
              <option class="others" value="Farmacija">Farmacija</option>
              <option class="others" value="Reabilitacija">Reabilitacija</option>
              <option class="others" value="Mityba">Mityba</option>
              <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
              <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
              <option class="others" value="Kosmetologija">Kosmetologija</option>
            </optgroup>
            <optgroup label="Veterinarijos mokslai">
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Žemės ūkio mokslai">
              <option class="others" value="Žemės ūkis">Žemės ūkis</option>
              <option class="others" value="Agronomija">Agronomija</option>
              <option class="others" value="Miškininkystė">Miškininkystė</option>
              <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
              <option class="others" value="Žuvininkystė">Žuvininkystė</option>
              <option class="others" value="Maisto studijos">Maisto studijos</option>
            </optgroup>
            <optgroup label="Socialiniai mokslai">
              <option class="others" value="Ekonomika">Ekonomika</option>
              <option class="others" value="Politikos mokslai">Politikos mokslai</option>
              <option class="others" value="Sociologija">Sociologija</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Antropologija">Antropologija</option>
              <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
              <option class="others" value="Psichologija">Psichologija</option>
              <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
              <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
              <option class="others" value="Komunikacija">Komunikacija</option>
              <option class="others" value="Leidyba">Leidyba</option>
              <option class="others" value="Žurnalistika">Žurnalistika</option>
            </optgroup>
            <optgroup label="Teisė">
              <option class="others" value="Teisė">Teisė</option>
            </optgroup>
            <optgroup label="Verslo ir viešoji vadyba">
              <option class="others" value="Verslas">Verslas</option>
              <option class="others" value="Vadyba">Vadyba</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Rinkodara">Rinkodara</option>
              <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
              <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
              <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
            </optgroup>
            <optgroup label="Ugdymo mokslai">
              <option class="others" value="Pedagogika">Pedagogika</option>
              <option class="others" value="Edukologija">Edukologija</option>
              <option class="others" value="Andragogika">Andragogika</option>
            </optgroup>
            <optgroup label="Humanitariniai mokslai">
              <option class="others" value="Lingvistika">Lingvistika</option>
              <option class="others" value="Literatūrologija">Literatūrologija</option>
              <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
              <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
              <option class="others" value="Vertimas">Vertimas</option>
              <option class="others" value="Regiono studijos">Regiono studijos</option>
              <option class="others" value="Kalbos studijos">Kalbos studijos</option>
              <option class="others" value="Istorija">Istorija</option>
              <option class="others" value="Archeologija">Archeologija</option>
              <option class="others" value="Filosofija">Filosofija</option>
              <option class="others" value="Teologija">Teologija</option>
              <option class="others" value="Paveldo studijos">Paveldo studijos</option>
              <option class="others" value="Religijos studijos">Religijos studijos</option>
              <option class="others" value="Kultūros studijos">Kultūros studijos</option>
              <option class="others" value="Menotyra">Menotyra</option>
            </optgroup>
            <optgroup label="Menai">
              <option class="others" value="Dailė">Dailė</option>
              <option class="others" value="Dizainas">Dizainas</option>
              <option class="others" value="Muzika">Muzika</option>
              <option class="others" value="Teatras">Teatras</option>
              <option class="others" value="Kinas">Kinas</option>
              <option class="others" value="Šokis">Šokis</option>
              <option class="others" value="Medijų menas">Medijų menas</option>
              <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
              <option class="others" value="Architektūra">Architektūra</option>
              <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
            </optgroup>
            <optgroup label="Sportas">
              <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
              <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-3 mb-3">
        <select name="lent32_studProgr` + iterNr6 + `"class="form-select form-control">
          <option value=""></option>
          <optgroup label="Elektronikos ir informatikos fakultetas">
            <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
            <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
            <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
            <option class="others" value="Programų sistemos">Programų sistemos</option>
            <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Ekonomikos fakultetas">
            <option class="others" value="Apskaita">Apskaita</option>
            <option class="others" value="Bankininkystė">Bankininkystė</option>
            <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
            <option class="others" value="Finansai">Finansai</option>
            <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
            <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
            <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Verslo vadybos fakultetas">
            <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
            <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
            <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
            <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
            <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
            <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
            <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
            <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
            <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
            <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
          </optgroup>
          <optgroup label="Sveikatos priežiūros fakultetas">
            <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
            <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
            <option class="others" value="Dietetika">Dietetika</option>
            <option class="others" value="Ergoterapija">Ergoterapija</option>
            <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
            <option class="others" value="Kineziterapija">Kineziterapija</option>
            <option class="others" value="Radiologija">Radiologija</option>
          </optgroup>
          <optgroup label="Agrotechnologijų fakultetas">
            <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
            <option class="others" value="Cheminė analizė">Cheminė analizė</option>
            <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
            <option class="others" value="Maisto technologija">Maisto technologija</option>
            <option class="others" value="Veterinarija">Veterinarija</option>
          </optgroup>
          <optgroup label="Pedagogikos fakultetas">
            <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
            <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
            <option class="others" value="Socialinis darbas">Socialinis darbas</option>
            <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
          </optgroup>
          <optgroup label="Menų ir kūrybinių technologijų fakultetas">
            <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
            <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
            <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
            <option class="others" value="Mados dizainas">Mados dizainas</option>
            <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
            <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
            <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
            <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
          </optgroup>
        </select>
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control " name="lent32_strategPartner` + iterNr6 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me6` + div6 + `">
            `;
  document.getElementById("table32_id").value = iterNr6;
  iterNr6++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 34 table 

var iterNr7 = 2;
var div7 = 1;

function addButtonTable34() {
  var bendr7 = "add_to_me7" + div7;
  div7++;
  document.getElementById(bendr7).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="lent34_nr` + iterNr7 + `" value="` + iterNr7 + `" placeholder="" autocomplete="off" readonly="readonly">
        </div>
        <div class="col-md-1 mb-3">
          </div>
        <div class="col-md-5 mb-3">
      <label for="">Studijų kryptis</label>
            <select name="lent34_studKryptis` + iterNr7 + `" class="form-select form-control">
            <option value=""></option>
            <optgroup label="Matematikos mokslai">
              <option class="others" value="Matematika">Matematika</option>
              <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
              <option class="others" value="Statistika">Statistika</option>
            </optgroup>
            <optgroup label="Informatikos mokslai">
              <option class="others" value="Informatika">Informatika</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
            </optgroup>
            <optgroup label="Fiziniai mokslai">
              <option class="others" value="Chemija">Chemija</option>
              <option class="others" value="Fizika">Fizika</option>
              <option class="others" value="Geologija">Geologija</option>
              <option class="others" value="Aplinkotyra">Aplinkotyra</option>
              <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
            </optgroup>
            <optgroup label="Gyvybės mokslai">
              <option class="others" value="Biologija">Biologija</option>
              <option class="others" value="Genetika">Genetika</option>
              <option class="others" value="Mikrobiologija">Mikrobiologija</option>
              <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
              <option class="others" value="Biofizika">Biofizika</option>
              <option class="others" value="Biochemija">Biochemija</option>
              <option class="others" value="Ekologija">Ekologija</option>
            </optgroup>
            <optgroup label="Inžinerijos mokslai">
              <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
              <option class="others" value="Bioinžinerija">Bioinžinerija</option>
              <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
              <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
              <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
              <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
              <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
              <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
              <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
              <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
              <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
              <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
            </optgroup>
            <optgroup label="Technologijų mokslai">
              <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
              <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
              <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
              <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
              <option class="others" value="Biotechnologijos">Biotechnologijos</option>
              <option class="others" value="Maisto technologijos">Maisto technologijos</option>
              <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
            </optgroup>
            <optgroup label="Sveikatos mokslai">
              <option class="others" value="Medicina">Medicina</option>
              <option class="others" value="Odontologija">Odontologija</option>
              <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
              <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
              <option class="others" value="Farmacija">Farmacija</option>
              <option class="others" value="Reabilitacija">Reabilitacija</option>
              <option class="others" value="Mityba">Mityba</option>
              <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
              <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
              <option class="others" value="Kosmetologija">Kosmetologija</option>
            </optgroup>
            <optgroup label="Veterinarijos mokslai">
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Žemės ūkio mokslai">
              <option class="others" value="Žemės ūkis">Žemės ūkis</option>
              <option class="others" value="Agronomija">Agronomija</option>
              <option class="others" value="Miškininkystė">Miškininkystė</option>
              <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
              <option class="others" value="Žuvininkystė">Žuvininkystė</option>
              <option class="others" value="Maisto studijos">Maisto studijos</option>
            </optgroup>
            <optgroup label="Socialiniai mokslai">
              <option class="others" value="Ekonomika">Ekonomika</option>
              <option class="others" value="Politikos mokslai">Politikos mokslai</option>
              <option class="others" value="Sociologija">Sociologija</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Antropologija">Antropologija</option>
              <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
              <option class="others" value="Psichologija">Psichologija</option>
              <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
              <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
              <option class="others" value="Komunikacija">Komunikacija</option>
              <option class="others" value="Leidyba">Leidyba</option>
              <option class="others" value="Žurnalistika">Žurnalistika</option>
            </optgroup>
            <optgroup label="Teisė">
              <option class="others" value="Teisė">Teisė</option>
            </optgroup>
            <optgroup label="Verslo ir viešoji vadyba">
              <option class="others" value="Verslas">Verslas</option>
              <option class="others" value="Vadyba">Vadyba</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Rinkodara">Rinkodara</option>
              <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
              <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
              <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
            </optgroup>
            <optgroup label="Ugdymo mokslai">
              <option class="others" value="Pedagogika">Pedagogika</option>
              <option class="others" value="Edukologija">Edukologija</option>
              <option class="others" value="Andragogika">Andragogika</option>
            </optgroup>
            <optgroup label="Humanitariniai mokslai">
              <option class="others" value="Lingvistika">Lingvistika</option>
              <option class="others" value="Literatūrologija">Literatūrologija</option>
              <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
              <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
              <option class="others" value="Vertimas">Vertimas</option>
              <option class="others" value="Regiono studijos">Regiono studijos</option>
              <option class="others" value="Kalbos studijos">Kalbos studijos</option>
              <option class="others" value="Istorija">Istorija</option>
              <option class="others" value="Archeologija">Archeologija</option>
              <option class="others" value="Filosofija">Filosofija</option>
              <option class="others" value="Teologija">Teologija</option>
              <option class="others" value="Paveldo studijos">Paveldo studijos</option>
              <option class="others" value="Religijos studijos">Religijos studijos</option>
              <option class="others" value="Kultūros studijos">Kultūros studijos</option>
              <option class="others" value="Menotyra">Menotyra</option>
            </optgroup>
            <optgroup label="Menai">
              <option class="others" value="Dailė">Dailė</option>
              <option class="others" value="Dizainas">Dizainas</option>
              <option class="others" value="Muzika">Muzika</option>
              <option class="others" value="Teatras">Teatras</option>
              <option class="others" value="Kinas">Kinas</option>
              <option class="others" value="Šokis">Šokis</option>
              <option class="others" value="Medijų menas">Medijų menas</option>
              <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
              <option class="others" value="Architektūra">Architektūra</option>
              <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
            </optgroup>
            <optgroup label="Sportas">
              <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
              <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-5 mb-3">
          <label for="">Studijų programa</label>
          <select name="lent34_studProgr` + iterNr7 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-2 mb-3">
          </div>
        <div class="col-md-2 mb-3">
          <label for="">2017 - 2018 m. m.</label>
          <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk1_` + iterNr7 + `"
          value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
        <div class="col-md-2 mb-3">
          <label for="">2018 - 2019 m. m.</label>
          <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk2_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
        <div class="col-md-2 mb-3">
          <label for="">2019 - 2020 m. m.</label>
          <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk3_` + iterNr7 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
        <div class="col-md-2 mb-3">
          <label for="">2020 - 2021 m. m.</label>
          <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk4_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
        <div class="col-md-2 mb-3">
          <label for="">2021 - 2022 m. m.</label>
          <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk5_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
      </div>
              <div id="add_to_me7` + div7 + `">
            `;
  document.getElementById("table34_id").value = iterNr7;
  iterNr7++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// TMTEP_S 

var iterNr8 = 3;
var div8 = 1;

function tmteps() {
  var bendr8 = "add_to_me8" + div8;
  div8++;
  document.getElementById(bendr8).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="tMTEP3_Snr` + iterNr8 + `" placeholder="" autocomplete="off" value="` + iterNr8 + `" readonly="readonly">
        </div>
        <div class="col-md-6 mb-3">
          <textarea rows="1" type="text" class="form-control " name="tMTEP3_Sstiprybes` + iterNr8 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control " name="tMTEP3_Stobulintina` + iterNr8 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me8` + div8 + `">
            `;
  document.getElementById("tabletMTEP3_S_id").value = iterNr8;
  iterNr8++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}

// kTOV4_S 

var iterNr10 = 3;
var div10 = 1;

function kTOV4_S() {
  var bendr10 = "add_to_me10" + div10;
  div10++;
  document.getElementById(bendr10).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="kTOV4_Snr` + iterNr10 + `" placeholder="" autocomplete="off" value="` + iterNr10 + `" readonly="readonly">
        </div>
        <div class="col-md-6 mb-3">
          <textarea rows="1" type="text" class="form-control " name="kTOV4_Sstiprybes` + iterNr10 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control " name="kTOV4_Stobulintina` + iterNr10 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me10` + div10 + `">
            `;
  document.getElementById("tablekTOV4_S_id").value = iterNr10;
  iterNr10++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 35 table 

var iterNr9 = 2;
var div9 = 1;

function addButtonTable35() {
  var bendr9 = "add_to_me9" + div9;
  div9++;
  document.getElementById(bendr9).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="lent35_nr` + iterNr9 + `" value="` + iterNr9 + `" placeholder="" autocomplete="off" readonly="readonly">
        </div>
        <div class="col-md-1 mb-3">
        </div>
        <div class="col-md-5 mb-3">
            <label for="">Studijų kryptis</label>
          <select name="lent35_studKryptis` + iterNr9 + `" class="form-select form-control">
            <option value=""></option>
            <optgroup label="Matematikos mokslai">
              <option class="others" value="Matematika">Matematika</option>
              <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
              <option class="others" value="Statistika">Statistika</option>
            </optgroup>
            <optgroup label="Informatikos mokslai">
              <option class="others" value="Informatika">Informatika</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
            </optgroup>
            <optgroup label="Fiziniai mokslai">
              <option class="others" value="Chemija">Chemija</option>
              <option class="others" value="Fizika">Fizika</option>
              <option class="others" value="Geologija">Geologija</option>
              <option class="others" value="Aplinkotyra">Aplinkotyra</option>
              <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
            </optgroup>
            <optgroup label="Gyvybės mokslai">
              <option class="others" value="Biologija">Biologija</option>
              <option class="others" value="Genetika">Genetika</option>
              <option class="others" value="Mikrobiologija">Mikrobiologija</option>
              <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
              <option class="others" value="Biofizika">Biofizika</option>
              <option class="others" value="Biochemija">Biochemija</option>
              <option class="others" value="Ekologija">Ekologija</option>
            </optgroup>
            <optgroup label="Inžinerijos mokslai">
              <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
              <option class="others" value="Bioinžinerija">Bioinžinerija</option>
              <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
              <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
              <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
              <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
              <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
              <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
              <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
              <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
              <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
              <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
            </optgroup>
            <optgroup label="Technologijų mokslai">
              <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
              <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
              <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
              <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
              <option class="others" value="Biotechnologijos">Biotechnologijos</option>
              <option class="others" value="Maisto technologijos">Maisto technologijos</option>
              <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
            </optgroup>
            <optgroup label="Sveikatos mokslai">
              <option class="others" value="Medicina">Medicina</option>
              <option class="others" value="Odontologija">Odontologija</option>
              <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
              <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
              <option class="others" value="Farmacija">Farmacija</option>
              <option class="others" value="Reabilitacija">Reabilitacija</option>
              <option class="others" value="Mityba">Mityba</option>
              <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
              <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
              <option class="others" value="Kosmetologija">Kosmetologija</option>
            </optgroup>
            <optgroup label="Veterinarijos mokslai">
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Žemės ūkio mokslai">
              <option class="others" value="Žemės ūkis">Žemės ūkis</option>
              <option class="others" value="Agronomija">Agronomija</option>
              <option class="others" value="Miškininkystė">Miškininkystė</option>
              <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
              <option class="others" value="Žuvininkystė">Žuvininkystė</option>
              <option class="others" value="Maisto studijos">Maisto studijos</option>
            </optgroup>
            <optgroup label="Socialiniai mokslai">
              <option class="others" value="Ekonomika">Ekonomika</option>
              <option class="others" value="Politikos mokslai">Politikos mokslai</option>
              <option class="others" value="Sociologija">Sociologija</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Antropologija">Antropologija</option>
              <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
              <option class="others" value="Psichologija">Psichologija</option>
              <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
              <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
              <option class="others" value="Komunikacija">Komunikacija</option>
              <option class="others" value="Leidyba">Leidyba</option>
              <option class="others" value="Žurnalistika">Žurnalistika</option>
            </optgroup>
            <optgroup label="Teisė">
              <option class="others" value="Teisė">Teisė</option>
            </optgroup>
            <optgroup label="Verslo ir viešoji vadyba">
              <option class="others" value="Verslas">Verslas</option>
              <option class="others" value="Vadyba">Vadyba</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Rinkodara">Rinkodara</option>
              <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
              <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
              <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
            </optgroup>
            <optgroup label="Ugdymo mokslai">
              <option class="others" value="Pedagogika">Pedagogika</option>
              <option class="others" value="Edukologija">Edukologija</option>
              <option class="others" value="Andragogika">Andragogika</option>
            </optgroup>
            <optgroup label="Humanitariniai mokslai">
              <option class="others" value="Lingvistika">Lingvistika</option>
              <option class="others" value="Literatūrologija">Literatūrologija</option>
              <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
              <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
              <option class="others" value="Vertimas">Vertimas</option>
              <option class="others" value="Regiono studijos">Regiono studijos</option>
              <option class="others" value="Kalbos studijos">Kalbos studijos</option>
              <option class="others" value="Istorija">Istorija</option>
              <option class="others" value="Archeologija">Archeologija</option>
              <option class="others" value="Filosofija">Filosofija</option>
              <option class="others" value="Teologija">Teologija</option>
              <option class="others" value="Paveldo studijos">Paveldo studijos</option>
              <option class="others" value="Religijos studijos">Religijos studijos</option>
              <option class="others" value="Kultūros studijos">Kultūros studijos</option>
              <option class="others" value="Menotyra">Menotyra</option>
            </optgroup>
            <optgroup label="Menai">
              <option class="others" value="Dailė">Dailė</option>
              <option class="others" value="Dizainas">Dizainas</option>
              <option class="others" value="Muzika">Muzika</option>
              <option class="others" value="Teatras">Teatras</option>
              <option class="others" value="Kinas">Kinas</option>
              <option class="others" value="Šokis">Šokis</option>
              <option class="others" value="Medijų menas">Medijų menas</option>
              <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
              <option class="others" value="Architektūra">Architektūra</option>
              <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
            </optgroup>
            <optgroup label="Sportas">
              <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
              <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-5 mb-3">
        <label for="">Studijų programa</label>
          <select name="lent35_studProgr` + iterNr9 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
        </div>
        <div class="col-md-2 mb-3">

        </div>
        <div class="col-md-2 mb-3">
        <label for=""><br>2017 - 2018 m. m. Bendras</label>
        <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr1_` + iterNr9 + `"value=""
        autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}"></div>
        <div class="col-md-2 mb-3">
          <label for="">2017 - 2018 m. m. Iš jų strateginių partnerių</label>
          <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk1_` + iterNr9 + `"value=""
          autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
        <div class="col-md-2 mb-3">
            <label for=""><br>2018 - 2019 m. m. Bendras</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr2_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
        <div class="col-md-2 mb-3">
          <label for="">2018 - 2019 m. m. Iš jų strateginių partnerių</label>
          <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk2_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
      </div>
        <div class="col-md-2 mb-3">
          <label for=""><br>2019 - 2020 m. m. Bendras</label>
          <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr3_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">

          </div>
          <div class="col-md-2 mb-3">
            <label for="">2019 - 2020 m. m. Iš jų strateginių partnerių</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk3_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for=""><br>2020 - 2021 m. m. Bendras</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr4_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2020 - 2021 m. m. Iš jų strateginių partnerių</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk4_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for=""><br>2021 - 2022 m. m. Bendras</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr5_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2021 - 2022 m. m. Iš jų strateginių partnerių</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk5_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
      </div>
              <div id="add_to_me9` + div9 + `">
            `;
  document.getElementById("table35_id").value = iterNr9;
  iterNr9++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// 39 table 

var iterNr11 = 2;
var div11 = 1;

function addButtonTable39() {
  var bendr11 = "add_to_me11" + div11;
  div11++;
  document.getElementById(bendr11).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="lent39_nr` + iterNr11 + `" value="` + iterNr11 + `" autocomplete="off" readonly="readonly">
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control" name="lent39_kryptys` + iterNr11 + `" autocomplete="off"></textarea>
        </div>
        <div class="col-md-6 mb-3">
          <textarea rows="1" type="text" class="form-control" name="lent39_aprasymas` + iterNr11 + `" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me11` + div11 + `">
            `;
  document.getElementById("table39_id").value = iterNr11;
  iterNr11++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// veiklSavinalize 

var iterNr13 = 3;
var div13 = 1;

function veiklSavianalize() {
  var bendr13 = "add_to_me13" + div13;
  div13++;
  document.getElementById(bendr13).innerHTML +=
    `
    <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="veiklSavianalizNr` + iterNr13 + `" placeholder="" autocomplete="off" value="` + iterNr13 + `" readonly="readonly">
        </div>
        <div class="col-md-6 mb-3">
          <textarea rows="1" type="text" class="form-control " name="veiklSavianalizStiprybes` + iterNr13 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-5 mb-3">
          <textarea rows="1" type="text" class="form-control " name="veiklSavianalizTobulintina` + iterNr13 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me13` + div13 + `">
            `;
  document.getElementById("tableVeiklS_id").value = iterNr13;
  iterNr13++;
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
}


// AUTO SIZE for textarea 

var tx = document.getElementsByTagName('textarea');
for (var i = 0; i < tx.length; i++) {
  tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
  tx[i].addEventListener("input", OnInput, false);
}

function OnInput(e) {
  this.style.height = 'auto';
  this.style.height = (this.scrollHeight) + 'px';
}

// ---ALL SCRIPTS--- 

// for tables: 1, 3, 6, 30, mV2_S, 32, 34, TMTEP_S, 35, kTOV4_S, 39, veiklSavinalize   
// mV2_D04 
// 1 table 

  var iterNr1 = document.getElementById("table1_id").value;
  iterNr1++;
  var div1 = 1;

  function addButtonTable01() {
    var bendr1 = "add_to_me1" + div1;
    div1++;
    document.getElementById(bendr1).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="mV2_D04nr` + iterNr1 + `" placeholder="" autocomplete="off" value="` + iterNr1 + `" readonly="readonly">
          </div>
          <div class="col-md-4 mb-3">
              <label for="">Studijų kryptis</label>
            <select name="mV2_D04studKryptis` + iterNr1 + `" class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="">Studijų programa</label>
          <select name="mV2_D04studProgr` + iterNr1 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-3 mb-3">
            <label for="">Valstybinis programos kodas</label>
            <textarea rows="1" type="text" class="form-control text" name="mV2_D04progrKodas` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-1 mb-3">

          </div>
          <div class="col-md-4 mb-3">
            <label for=""><br>SKVC direktoriaus įsakymo Nr., data</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D04isakNrData` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-3 mb-3">
            <label for="">Studijų kryptis akredituota iki/ planuojama vertinti
            </label>
            <textarea rows="1" type="text" class="form-control" name="mV2_D04studKryptAkredit` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-2 mb-3">
            <label for="">Akreditavimo laikotarpis (3 ar 7 metai)
            </label>
            <select name="mV2_D04akreditLaikot` + iterNr1 + `" class="form-select form-control">
              <option value=""></option>
              <option class="others" value="3 metai">3 metai</option>
              <option class="others" value="7 metai">7 metai</option>
            </select>
          </div>
          <div class="col-md-2 mb-3">
            <label for=""><br>ECTS</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D04eCTS` + iterNr1 + `"placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_me1` + div1 + `">
              `;
    document.getElementById("table1_id").value = iterNr1;
    iterNr1++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 3 table 

  var iterNr2 = document.getElementById("table3_id").value;
  iterNr2++;
  var div2 = 1;

  function addButtonTable03() {
    var bendr2 = "add_to_me3" + div2;
    div2++;
    document.getElementById(bendr2).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="lent3_nr1` + iterNr2 + `" placeholder="" autocomplete="off" value="` + iterNr2 + `" readonly="readonly">
          </div>
          <div class="col-md-3 mb-3">
              <label for="">Studijų kryptis</label>
              <select name="lent3_studKryptis` + iterNr2 + `"class="form-select form-control">
                <option value=""></option>
                <optgroup label="Matematikos mokslai">
                  <option class="others" value="Matematika">Matematika</option>
                  <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                  <option class="others" value="Statistika">Statistika</option>
                </optgroup>
                <optgroup label="Informatikos mokslai">
                  <option class="others" value="Informatika">Informatika</option>
                  <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                  <option class="others" value="Programų sistemos">Programų sistemos</option>
                  <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
                </optgroup>
                <optgroup label="Fiziniai mokslai">
                  <option class="others" value="Chemija">Chemija</option>
                  <option class="others" value="Fizika">Fizika</option>
                  <option class="others" value="Geologija">Geologija</option>
                  <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                  <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
                </optgroup>
                <optgroup label="Gyvybės mokslai">
                  <option class="others" value="Biologija">Biologija</option>
                  <option class="others" value="Genetika">Genetika</option>
                  <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                  <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                  <option class="others" value="Biofizika">Biofizika</option>
                  <option class="others" value="Biochemija">Biochemija</option>
                  <option class="others" value="Ekologija">Ekologija</option>
                </optgroup>
                <optgroup label="Inžinerijos mokslai">
                  <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                  <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                  <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                  <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                  <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                  <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                  <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                  <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                  <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                  <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                  <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                  <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                  <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                  <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
                </optgroup>
                <optgroup label="Technologijų mokslai">
                  <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                  <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                  <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                  <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                  <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                  <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                  <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
                </optgroup>
                <optgroup label="Sveikatos mokslai">
                  <option class="others" value="Medicina">Medicina</option>
                  <option class="others" value="Odontologija">Odontologija</option>
                  <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                  <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                  <option class="others" value="Farmacija">Farmacija</option>
                  <option class="others" value="Reabilitacija">Reabilitacija</option>
                  <option class="others" value="Mityba">Mityba</option>
                  <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                  <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                  <option class="others" value="Kosmetologija">Kosmetologija</option>
                </optgroup>
                <optgroup label="Veterinarijos mokslai">
                  <option class="others" value="Veterinarija">Veterinarija</option>
                </optgroup>
                <optgroup label="Žemės ūkio mokslai">
                  <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                  <option class="others" value="Agronomija">Agronomija</option>
                  <option class="others" value="Miškininkystė">Miškininkystė</option>
                  <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                  <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                  <option class="others" value="Maisto studijos">Maisto studijos</option>
                </optgroup>
                <optgroup label="Socialiniai mokslai">
                  <option class="others" value="Ekonomika">Ekonomika</option>
                  <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                  <option class="others" value="Sociologija">Sociologija</option>
                  <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                  <option class="others" value="Antropologija">Antropologija</option>
                  <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                  <option class="others" value="Psichologija">Psichologija</option>
                  <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                  <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                  <option class="others" value="Komunikacija">Komunikacija</option>
                  <option class="others" value="Leidyba">Leidyba</option>
                  <option class="others" value="Žurnalistika">Žurnalistika</option>
                </optgroup>
                <optgroup label="Teisė">
                  <option class="others" value="Teisė">Teisė</option>
                </optgroup>
                <optgroup label="Verslo ir viešoji vadyba">
                  <option class="others" value="Verslas">Verslas</option>
                  <option class="others" value="Vadyba">Vadyba</option>
                  <option class="others" value="Finansai">Finansai</option>
                  <option class="others" value="Apskaita">Apskaita</option>
                  <option class="others" value="Rinkodara">Rinkodara</option>
                  <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                  <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                  <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
                </optgroup>
                <optgroup label="Ugdymo mokslai">
                  <option class="others" value="Pedagogika">Pedagogika</option>
                  <option class="others" value="Edukologija">Edukologija</option>
                  <option class="others" value="Andragogika">Andragogika</option>
                </optgroup>
                <optgroup label="Humanitariniai mokslai">
                  <option class="others" value="Lingvistika">Lingvistika</option>
                  <option class="others" value="Literatūrologija">Literatūrologija</option>
                  <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                  <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                  <option class="others" value="Vertimas">Vertimas</option>
                  <option class="others" value="Regiono studijos">Regiono studijos</option>
                  <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                  <option class="others" value="Istorija">Istorija</option>
                  <option class="others" value="Archeologija">Archeologija</option>
                  <option class="others" value="Filosofija">Filosofija</option>
                  <option class="others" value="Teologija">Teologija</option>
                  <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                  <option class="others" value="Religijos studijos">Religijos studijos</option>
                  <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                  <option class="others" value="Menotyra">Menotyra</option>
                </optgroup>
                <optgroup label="Menai">
                  <option class="others" value="Dailė">Dailė</option>
                  <option class="others" value="Dizainas">Dizainas</option>
                  <option class="others" value="Muzika">Muzika</option>
                  <option class="others" value="Teatras">Teatras</option>
                  <option class="others" value="Kinas">Kinas</option>
                  <option class="others" value="Šokis">Šokis</option>
                  <option class="others" value="Medijų menas">Medijų menas</option>
                  <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                  <option class="others" value="Architektūra">Architektūra</option>
                  <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
                </optgroup>
                <optgroup label="Sportas">
                  <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                  <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
                </optgroup>
              </select>
          </div>
          <div class="col-md-4 mb-3">
            <label for="">Studijų programa</label>
            <select name="lent3_studProgr` + iterNr2 +`"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-4 mb-3">
    <label for="">Dėstytojas-praktikas*</label>
            <textarea rows="1" type="text" class="form-control" name="lent3_destytojas` + iterNr2 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-1 mb-3">
          </div>
          <div class="col-md-11 mb-3">
            <label for="">Įmonė, įstaiga, organizacija</label>
            <textarea type="text" rows="1" class="form-control" name="lent3_imonIstaig` + iterNr2 + `"placeholder="" autocomplete="off"></textarea>
          </div>

        </div>
                <div id="add_to_me3` + div2 + `">
              `;
    document.getElementById("table3_id").value = iterNr2;
    iterNr2++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 6 table 

  var iterNr3 = document.getElementById("table6_id").value;
  iterNr3++;
  var div3 = 1;

  function addButtonTable06() {
    var bendr3 = "add_to_me6" + div3;
    div3++;
    document.getElementById(bendr3).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="mV2_D06nr` + iterNr3 + `" placeholder="" autocomplete="off" value="` + iterNr3 + `" readonly="readonly">
          </div>
          <div class="col-md-3 mb-3">
            <label for="">Studijų programa</label>
            <select name="mV2_D06studProgr` + iterNr3 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-3 mb-3">
            <label for="">Valstybinis programos kodas</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D06progrKodas` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <label for="">Atlikti patobulinimai</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D06atlPatobulin` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-1 mb-3">
          </div>
          <div class="col-md-6 mb-3">
            <label for="">Patobulinimą iniciajavusios priežastys</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D06tobulinPriezast` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <label for="">Patobulinimus pagrindžiantys įrodymai*</label>
            <textarea rows="1" type="text" class="form-control " name="mV2_D06tobulinIrod` + iterNr3 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_me6` + div3 + `">
              `;
    document.getElementById("table6_id").value = iterNr3;
    iterNr3++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 30 table 

  var iterNr4 = document.getElementById("table30_id").value;
  iterNr4++;
  var div4 = 1;

  function addButtonTable30() {
    var bendr4 = "add_to_me30" + div4;
    div4++;
    document.getElementById(bendr4).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label><br></label>
              <input type="number" class="form-control  text-center" name="lent30_nr` + iterNr4 + `"readonly="readonly" value="` + iterNr4 + `" autocomplete="off">
              </div>
          <div class="col-md-4 mb-3">
          <label>Dėstytojas (pavardė, vardas)</label>
            <textarea rows="1" type="text" class="form-control " name="lent30_destytojas` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-3 mb-3">
              <label>Studijų kryptis</label>
            <select name="lent30_studKryptis` + iterNr4 + `"  class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
          </div>
          <div class="col-md-4 mb-3">
            <label>Šalis</label>
            <textarea rows="1" type="text" class="form-control" name="lent30_salis` + iterNr4 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-1 mb-3">
          </div>
          <div class="col-md-4 mb-3">
              <label>Institucija</label>
            <textarea rows="1" type="text" class="form-control " name="lent30_institucija` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-7 mb-3">
              <label>Dalykas / tema / projektas</label>
            <textarea rows="1" type="text" class="form-control " name="lent30_dalykas` + iterNr4 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>

                <div id="add_to_me30` + div4 + `">
              `;
    document.getElementById("table30_id").value = iterNr4;
    iterNr4++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// mV2_S 

  var iterNr5 = document.getElementById("tablemV2_S_id").value;
  iterNr5++;
  var div5 = 1;

  function mv2s() {
    var bendr5 = "add_to_meTablemV2_S" + div5;
    div5++;
    document.getElementById(bendr5).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="mV2_Snr` + iterNr5 + `" placeholder="" autocomplete="off" value="` + iterNr5 + `" readonly="readonly">
          </div>
          <div class="col-md-6 mb-3">
            <textarea rows="1" type="text" class="form-control" name="mV2_Sstiprybes` + iterNr5 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control" name="mV2_Stobulintina` + iterNr5 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>

                <div id="add_to_meTablemV2_S` + div5 + `">
              `;
    document.getElementById("tablemV2_S_id").value = iterNr5;
    iterNr5++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 32 table 

  var iterNr6 = document.getElementById("table32_id").value;
  iterNr6++;
  var div6 = 1;

  function addButtonTable32() {
    var bendr6 = "add_to_me32" + div6;
    div6++;
    document.getElementById(bendr6).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="lent32_nr` + iterNr6 + `" value="` + iterNr6 + `" placeholder="" autocomplete="off" readonly="readonly">
          </div>
          <div class="col-md-3 mb-3">
            <select name="lent32_studKryptis` + iterNr6 + `" class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
          </div>
          <div class="col-md-3 mb-3">
            <select name="lent32_studProgr` + iterNr6 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control " name="lent32_strategPartner` + iterNr6 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_me32` + div6 + `">
              `;
    document.getElementById("table32_id").value = iterNr6;
    iterNr6++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 34 table 

  var iterNr7 = document.getElementById("table34_id").value;
  iterNr7++;
  var div7 = 1;

  function addButtonTable34() {
    var bendr7 = "add_to_me34" + div7;
    div7++;
    document.getElementById(bendr7).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="lent34_nr` + iterNr7 + `" value="` + iterNr7 + `" placeholder="" autocomplete="off" readonly="readonly">
          </div>
          <div class="col-md-1 mb-3">
            </div>
          <div class="col-md-5 mb-3">
        <label for="">Studijų kryptis</label>
              <select name="lent34_studKryptis` + iterNr7 + `" class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
          </div>
          <div class="col-md-5 mb-3">
            <label for="">Studijų programa</label>
            <select name="lent34_studProgr` + iterNr7 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-2 mb-3">
            </div>
          <div class="col-md-2 mb-3">
            <label for="">2017 - 2018 m. m.</label>
            <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk1_` + iterNr7 + `"
            value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2018 - 2019 m. m.</label>
            <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk2_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2019 - 2020 m. m.</label>
            <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk3_` + iterNr7 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2020 - 2021 m. m.</label>
            <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk4_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">2021 - 2022 m. m.</label>
            <input type="number" class="form-control  text-center" min="0" name="lent34_studentuSk5_` + iterNr7 + `"value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
        </div>
                <div id="add_to_me34` + div7 + `">
              `;
    document.getElementById("table34_id").value = iterNr7;
    iterNr7++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// TMTEP_S 

  var iterNr8 = document.getElementById("tabletMTEP3_S_id").value;
  iterNr8++;
  var div8 = 1;

  function tmteps() {
    var bendr8 = "add_to_meTabletMTEP3_S" + div8;
    div8++;
    document.getElementById(bendr8).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="tMTEP3_Snr` + iterNr8 + `" placeholder="" autocomplete="off" value="` + iterNr8 + `" readonly="readonly">
          </div>
          <div class="col-md-6 mb-3">
            <textarea rows="1" type="text" class="form-control " name="tMTEP3_Sstiprybes` + iterNr8 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control " name="tMTEP3_Stobulintina` + iterNr8 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_meTabletMTEP3_S` + div8 + `">
              `;
    document.getElementById("tabletMTEP3_S_id").value = iterNr8;
    iterNr8++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }

// kTOV4_S 

  var iterNr10 = document.getElementById("tablekTOV4_S_id").value;
  iterNr10++;
  var div10 = 1;

  function kTOV4_S() {
    var bendr10 = "add_to_meTablekTOV4_S" + div10;
    div10++;
    document.getElementById(bendr10).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="kTOV4_Snr` + iterNr10 + `" placeholder="" autocomplete="off" value="` + iterNr10 + `" readonly="readonly">
          </div>
          <div class="col-md-6 mb-3">
            <textarea rows="1" type="text" class="form-control " name="kTOV4_Sstiprybes` + iterNr10 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control " name="kTOV4_Stobulintina` + iterNr10 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_meTablekTOV4_S` + div10 + `">
              `;
    document.getElementById("tablekTOV4_S_id").value = iterNr10;
    iterNr10++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 35 table 

  var iterNr9 = document.getElementById("table35_id").value;
  iterNr9++;
  var div9 = 1;

  function addButtonTable35() {
    var bendr9 = "add_to_me35" + div9;
    div9++;
    document.getElementById(bendr9).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="lent35_nr` + iterNr9 + `" value="` + iterNr9 + `" placeholder="" autocomplete="off" readonly="readonly">
          </div>
          <div class="col-md-1 mb-3">
          </div>
          <div class="col-md-5 mb-3">
              <label for="">Studijų kryptis</label>
            <select name="lent35_studKryptis` + iterNr9 + `" class="form-select form-control">
              <option value=""></option>
              <optgroup label="Matematikos mokslai">
                <option class="others" value="Matematika">Matematika</option>
                <option class="others" value="Taikomoji matematika">Taikomoji matematika</option>
                <option class="others" value="Statistika">Statistika</option>
              </optgroup>
              <optgroup label="Informatikos mokslai">
                <option class="others" value="Informatika">Informatika</option>
                <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
                <option class="others" value="Programų sistemos">Programų sistemos</option>
                <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
              </optgroup>
              <optgroup label="Fiziniai mokslai">
                <option class="others" value="Chemija">Chemija</option>
                <option class="others" value="Fizika">Fizika</option>
                <option class="others" value="Geologija">Geologija</option>
                <option class="others" value="Aplinkotyra">Aplinkotyra</option>
                <option class="others" value="Gamtinė geografija">Gamtinė geografija</option>
              </optgroup>
              <optgroup label="Gyvybės mokslai">
                <option class="others" value="Biologija">Biologija</option>
                <option class="others" value="Genetika">Genetika</option>
                <option class="others" value="Mikrobiologija">Mikrobiologija</option>
                <option class="others" value="Molekulinė biologija">Molekulinė biologija</option>
                <option class="others" value="Biofizika">Biofizika</option>
                <option class="others" value="Biochemija">Biochemija</option>
                <option class="others" value="Ekologija">Ekologija</option>
              </optgroup>
              <optgroup label="Inžinerijos mokslai">
                <option class="others" value="Saugos inžinerija">Saugos inžinerija</option>
                <option class="others" value="Bioinžinerija">Bioinžinerija</option>
                <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                <option class="others" value="Jūrų inžinerija">Jūrų inžinerija</option>
                <option class="others" value="Elektros inžinerija">Elektros inžinerija</option>
                <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
                <option class="others" value="Gamybos inžinerija">Gamybos inžinerija</option>
                <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                <option class="others" value="Energijos inžinerija">Energijos inžinerija</option>
                <option class="others" value="Aeronautikos inžinerija">Aeronautikos inžinerija</option>
              </optgroup>
              <optgroup label="Technologijų mokslai">
                <option class="others" value="Gamtos išteklių technologijos">Gamtos išteklių technologijos</option>
                <option class="others" value="Polimerų ir tekstilės technologijos">Polimerų ir tekstilės technologijos</option>
                <option class="others" value="Medžiagų technologijos">Medžiagų technologijos</option>
                <option class="others" value="Jūrų technologijos">Jūrų technologijos</option>
                <option class="others" value="Biotechnologijos">Biotechnologijos</option>
                <option class="others" value="Maisto technologijos">Maisto technologijos</option>
                <option class="others" value="Viešasis maitinimas">Viešasis maitinimas</option>
              </optgroup>
              <optgroup label="Sveikatos mokslai">
                <option class="others" value="Medicina">Medicina</option>
                <option class="others" value="Odontologija">Odontologija</option>
                <option class="others" value="Burnos priežiūra">Burnos priežiūra</option>
                <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                <option class="others" value="Farmacija">Farmacija</option>
                <option class="others" value="Reabilitacija">Reabilitacija</option>
                <option class="others" value="Mityba">Mityba</option>
                <option class="others" value="Slauga ir akušerija">Slauga ir akušerija</option>
                <option class="others" value="Medicinos technologijos">Medicinos technologijos</option>
                <option class="others" value="Kosmetologija">Kosmetologija</option>
              </optgroup>
              <optgroup label="Veterinarijos mokslai">
                <option class="others" value="Veterinarija">Veterinarija</option>
              </optgroup>
              <optgroup label="Žemės ūkio mokslai">
                <option class="others" value="Žemės ūkis">Žemės ūkis</option>
                <option class="others" value="Agronomija">Agronomija</option>
                <option class="others" value="Miškininkystė">Miškininkystė</option>
                <option class="others" value="Gyvulininkystė">Gyvulininkystė</option>
                <option class="others" value="Žuvininkystė">Žuvininkystė</option>
                <option class="others" value="Maisto studijos">Maisto studijos</option>
              </optgroup>
              <optgroup label="Socialiniai mokslai">
                <option class="others" value="Ekonomika">Ekonomika</option>
                <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                <option class="others" value="Sociologija">Sociologija</option>
                <option class="others" value="Socialinis darbas">Socialinis darbas</option>
                <option class="others" value="Antropologija">Antropologija</option>
                <option class="others" value="Visuomeninė geografija">Visuomeninė geografija</option>
                <option class="others" value="Psichologija">Psichologija</option>
                <option class="others" value="Visuomenės saugumas">Visuomenės saugumas</option>
                <option class="others" value="Informacijos paslaugos">Informacijos paslaugos</option>
                <option class="others" value="Komunikacija">Komunikacija</option>
                <option class="others" value="Leidyba">Leidyba</option>
                <option class="others" value="Žurnalistika">Žurnalistika</option>
              </optgroup>
              <optgroup label="Teisė">
                <option class="others" value="Teisė">Teisė</option>
              </optgroup>
              <optgroup label="Verslo ir viešoji vadyba">
                <option class="others" value="Verslas">Verslas</option>
                <option class="others" value="Vadyba">Vadyba</option>
                <option class="others" value="Finansai">Finansai</option>
                <option class="others" value="Apskaita">Apskaita</option>
                <option class="others" value="Rinkodara">Rinkodara</option>
                <option class="others" value="Žmonių išteklių vadyba">Žmonių išteklių vadyba</option>
                <option class="others" value="Viešasis administravimas">Viešasis administravimas</option>
                <option class="others" value="Turizmas ir poilsis">Turizmas ir poilsis</option>
              </optgroup>
              <optgroup label="Ugdymo mokslai">
                <option class="others" value="Pedagogika">Pedagogika</option>
                <option class="others" value="Edukologija">Edukologija</option>
                <option class="others" value="Andragogika">Andragogika</option>
              </optgroup>
              <optgroup label="Humanitariniai mokslai">
                <option class="others" value="Lingvistika">Lingvistika</option>
                <option class="others" value="Literatūrologija">Literatūrologija</option>
                <option class="others" value="Klasikinės studijos">Klasikinės studijos</option>
                <option class="others" value="Filologija pagal kalbą">Filologija pagal kalbą</option>
                <option class="others" value="Vertimas">Vertimas</option>
                <option class="others" value="Regiono studijos">Regiono studijos</option>
                <option class="others" value="Kalbos studijos">Kalbos studijos</option>
                <option class="others" value="Istorija">Istorija</option>
                <option class="others" value="Archeologija">Archeologija</option>
                <option class="others" value="Filosofija">Filosofija</option>
                <option class="others" value="Teologija">Teologija</option>
                <option class="others" value="Paveldo studijos">Paveldo studijos</option>
                <option class="others" value="Religijos studijos">Religijos studijos</option>
                <option class="others" value="Kultūros studijos">Kultūros studijos</option>
                <option class="others" value="Menotyra">Menotyra</option>
              </optgroup>
              <optgroup label="Menai">
                <option class="others" value="Dailė">Dailė</option>
                <option class="others" value="Dizainas">Dizainas</option>
                <option class="others" value="Muzika">Muzika</option>
                <option class="others" value="Teatras">Teatras</option>
                <option class="others" value="Kinas">Kinas</option>
                <option class="others" value="Šokis">Šokis</option>
                <option class="others" value="Medijų menas">Medijų menas</option>
                <option class="others" value="Meno objektų restauravimas">Meno objektų restauravimas</option>
                <option class="others" value="Architektūra">Architektūra</option>
                <option class="others" value="Kraštovaizdžio architektūra">Kraštovaizdžio architektūra</option>
              </optgroup>
              <optgroup label="Sportas">
                <option class="others" value="Pasiekimų sportas">Pasiekimų sportas</option>
                <option class="others" value="Laisvalaikio sportas">Laisvalaikio sportas</option>
              </optgroup>
            </select>
          </div>
          <div class="col-md-5 mb-3">
          <label for="">Studijų programa</label>
          <select name="lent35_studProgr` + iterNr9 + `"class="form-select form-control">
            <option value=""></option>
            <optgroup label="Elektronikos ir informatikos fakultetas">
              <option class="others" value="Elektronikos inžinerija">Elektronikos inžinerija</option>
              <option class="others" value="Informacijos sistemos">Informacijos sistemos</option>
              <option class="others" value="Kompiuterių inžinerija">Kompiuterių inžinerija</option>
              <option class="others" value="Programų sistemos">Programų sistemos</option>
              <option class="others" value="Programų sistemos (studijos anglų kalba)">Programų sistemos (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Ekonomikos fakultetas">
              <option class="others" value="Apskaita">Apskaita</option>
              <option class="others" value="Bankininkystė">Bankininkystė</option>
              <option class="others" value="Bankininkystė (studijos anglų kalba)">Bankininkystė (studijos anglų kalba)</option>
              <option class="others" value="Finansai">Finansai</option>
              <option class="others" value="Investicijos ir draudimas">Investicijos ir draudimas</option>
              <option class="others" value="Verslo ekonomika">Verslo ekonomika</option>
              <option class="others" value="Verslo ekonomika (studijos anglų kalba)">Verslo ekonomika (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Verslo vadybos fakultetas">
              <option class="others" value="Organizacijų vadyba">Organizacijų vadyba</option>
              <option class="others" value="Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)">Kūrybiškumas ir verslo inovacijos (studijos anglų kalba)</option>
              <option class="others" value="Reklamos vadyba">Reklamos vadyba</option>
              <option class="others" value="Ryšiai su visuomene">Ryšiai su visuomene</option>
              <option class="others" value="Tarptautinis verslas">Tarptautinis verslas</option>
              <option class="others" value="Tarptautinis verslas (studijos anglų kalba)">Tarptautinis verslas (studijos anglų kalba)</option>
              <option class="others" value="Turizmo vadyba">Turizmo vadyba</option>
              <option class="others" value="Turizmo vadyba (studijos anglų kalba)">Turizmo vadyba (studijos anglų kalba)</option>
              <option class="others" value="Viešbučių ir restoranų verslas">Viešbučių ir restoranų verslas</option>
              <option class="others" value="Viešbučių ir restoranų verslas (studijos anglų kalba)">Viešbučių ir restoranų verslas (studijos anglų kalba)</option>
            </optgroup>
            <optgroup label="Sveikatos priežiūros fakultetas">
              <option class="others" value="Bendrosios praktikos slauga">Bendrosios praktikos slauga</option>
              <option class="others" value="Biomedicininė diagnostika">Biomedicininė diagnostika</option>
              <option class="others" value="Dietetika">Dietetika</option>
              <option class="others" value="Ergoterapija">Ergoterapija</option>
              <option class="others" value="Higieninė ir dekoratyvinė kosmetologija">Higieninė ir dekoratyvinė kosmetologija</option>
              <option class="others" value="Kineziterapija">Kineziterapija</option>
              <option class="others" value="Radiologija">Radiologija</option>
            </optgroup>
            <optgroup label="Agrotechnologijų fakultetas">
              <option class="others" value="Agroverslo technologijos">Agroverslo technologijos</option>
              <option class="others" value="Cheminė analizė">Cheminė analizė</option>
              <option class="others" value="Kraštovaizdžio dizainas">Kraštovaizdžio dizainas</option>
              <option class="others" value="Maisto technologija">Maisto technologija</option>
              <option class="others" value="Veterinarija">Veterinarija</option>
            </optgroup>
            <optgroup label="Pedagogikos fakultetas">
              <option class="others" value="Lietuvių gestų kalbos vertimas">Lietuvių gestų kalbos vertimas</option>
              <option class="others" value="Pradinio ugdymo pedagogika">Pradinio ugdymo pedagogika</option>
              <option class="others" value="Socialinis darbas">Socialinis darbas</option>
              <option class="others" value="Vaikystės pedagogika">Vaikystės pedagogika</option>
            </optgroup>
            <optgroup label="Menų ir kūrybinių technologijų fakultetas">
              <option class="others" value="Įvaizdžio dizainas">Įvaizdžio dizainas</option>
              <option class="others" value="Kultūrinės veiklos vadyba">Kultūrinės veiklos vadyba</option>
              <option class="others" value="Kultūrinės veiklos vadyba (studijos anglų kalba)">Kultūrinės veiklos vadyba (studijos anglų kalba)</option>
              <option class="others" value="Mados dizainas">Mados dizainas</option>
              <option class="others" value="Mados technologijos ir verslas">Mados technologijos ir verslas</option>
              <option class="others" value="Muzikinis teatras">Muzikinis teatras</option>
              <option class="others" value="Populiarioji muzika">Populiarioji muzika</option>
              <option class="others" value="Šokio pedagogika">Šokio pedagogika</option>
            </optgroup>
          </select>
          </div>
          <div class="col-md-2 mb-3">

          </div>
          <div class="col-md-2 mb-3">
          <label for=""><br>2017 - 2018 m. m. Bendras</label>
          <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr1_` + iterNr9 + `"value=""
          autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}"></div>
          <div class="col-md-2 mb-3">
            <label for="">2017 - 2018 m. m. Iš jų strateginių partnerių</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk1_` + iterNr9 + `"value=""
            autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
              <label for=""><br>2018 - 2019 m. m. Bendras</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr2_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
          <div class="col-md-2 mb-3">
            <label for="">2018 - 2019 m. m. Iš jų strateginių partnerių</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk2_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
        </div>
          <div class="col-md-2 mb-3">
            <label for=""><br>2019 - 2020 m. m. Bendras</label>
            <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr3_` + iterNr9 + `" value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
            <div class="col-md-2 mb-3">

            </div>
            <div class="col-md-2 mb-3">
              <label for="">2019 - 2020 m. m. Iš jų strateginių partnerių</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk3_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
            <div class="col-md-2 mb-3">
              <label for=""><br>2020 - 2021 m. m. Bendras</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr4_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
            <div class="col-md-2 mb-3">
              <label for="">2020 - 2021 m. m. Iš jų strateginių partnerių</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk4_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
            <div class="col-md-2 mb-3">
              <label for=""><br>2021 - 2022 m. m. Bendras</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSkBendr5_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
            <div class="col-md-2 mb-3">
              <label for="">2021 - 2022 m. m. Iš jų strateginių partnerių</label>
              <input type="number" class="form-control  text-center" min="0" name="lent35_studentuSk5_` + iterNr9 + `"  value="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
            </div>
        </div>
                <div id="add_to_me35` + div9 + `">
              `;
    document.getElementById("table35_id").value = iterNr9;
    iterNr9++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// 39 table 

  var iterNr11 = document.getElementById("table39_id").value;
  iterNr11++;
  var div11 = 1;

  function addButtonTable39() {
    var bendr11 = "add_to_me39" + div11;
    div11++;
    document.getElementById(bendr11).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="lent39_nr` + iterNr11 + `" value="` + iterNr11 + `" autocomplete="off" readonly="readonly">
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control" name="lent39_kryptys` + iterNr11 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-6 mb-3">
            <textarea rows="1" type="text" class="form-control" name="lent39_aprasymas` + iterNr11 + `" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_me39` + div11 + `">
              `;
    document.getElementById("table39_id").value = iterNr11;
    iterNr11++;
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// veiklSavinalize 

  var iterNr13 = document.getElementById("tableVeiklS_id").value;
  iterNr13++;
  var div13 = 1;

  function veiklSavianalize() {
    var bendr13 = "add_to_meTableVeiklS" + div13;
    div13++;
    document.getElementById(bendr13).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="veiklSavianalizNr` + iterNr13 + `" placeholder="" autocomplete="off" value="` + iterNr13 + `" readonly="readonly">
          </div>
          <div class="col-md-6 mb-3">
            <textarea rows="1" type="text" class="form-control " name="veiklSavianalizStiprybes` + iterNr13 + `" placeholder="" autocomplete="off"></textarea>
          </div>
          <div class="col-md-5 mb-3">
            <textarea rows="1" type="text" class="form-control " name="veiklSavianalizTobulintina` + iterNr13 + `" placeholder="" autocomplete="off"></textarea>
          </div>
        </div>
                <div id="add_to_meTableVeiklS` + div13 + `">
              `;
    document.getElementById("tableVeiklS_id").value = iterNr13;
    iterNr13++;
    // AUTO SIZE for textarea (new fields)
    var tx = document.getElementsByTagName('textarea');
    for (var i = 0; i < tx.length; i++) {
      tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    }
  }


// AUTO SIZE for textarea (output fields)
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }
