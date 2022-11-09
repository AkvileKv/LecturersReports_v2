//kD1_K01 
//2 table 
  var value1 = document.getElementById("table2_id").value;
  value1++;
  var div = 1;

  document.getElementById("addTable2Script").addEventListener('click', addTable2);

  function addTable2() {
    let bendr = "add_to_me01" + div;
    div++;
    document.getElementById(bendr).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center " rows="1" name="nr` + value1 + `" placeholder="" autocomplete="off" value="` + value1 + `" readonly="readonly">
          </div>
          <div class="col-md-5 mb-3">
            <textarea type="text" class="form-control textarea" rows="1" name="dalykas` + value1 + `" placeholder="" autocomplete="off" ></textarea>
          </div>
          <div class="col-md-1 mb-3">
            <textarea type="text" class="form-control textarea" rows="1" name="grupe` + value1 + `" placeholder="" autocomplete="off" ></textarea>
          </div>
          <div class="col-md-1 mb-3">
            <select name="semestras` + value1 + `" class="form-select form-control">
              <option value=""></option>
              <option class="others" value="1">I</option>
              <option class="others" value="2">II</option>
              <option class="others" value="3">III</option>
              <option class="others" value="4">IV</option>
              <option class="others" value="5">V</option>
              <option class="others" value="6">VI</option>
              <option class="others" value="7">VII</option>
            </select>
          </div>
          <div class="col-md-2 mb-3">
            <input type="number" min="0" id="plan` + value1 + `"  onchange="calcTable2()" class="form-control text-center textarea" name="planuotosVal` + value1 + `" placeholder="(val. sk.)" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
          <div class="col-md-2 mb-3">
            <input type="number" min="0" id="atl` + value1 + `"  onchange="calcTable2()" class="form-control text-center textarea" name="atliktosVal` + value1 + `" placeholder="(val. sk.)" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}">
          </div>
        </div>
        <div id="add_to_me01` + div + `">
        `;
        // console.log("edit value1: "+ value1);
    document.getElementById("table2_id").value = value1;
    value1++;
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
  
//   nD2_M02 
// 3 table 
  var value4 = document.getElementById("table3_id").value;
  value4++;
  var div4 = 1;

  document.getElementById("m02Script").addEventListener('click', m02);
  function m02() {
    let bendr4 = "add_to_me04" + div4;
    div4++;
    document.getElementById(bendr4).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                    <label for=""><br><br></label>
                    <input type="text" class="form-control text-center" name="nD2_M02nr` + value4 + `" placeholder="" autocomplete="off" value="` + value4 + `" readonly="readonly">
                  </div>
                  <div class="col-md-11 mb-3">
                    <label for=""><b>Pilnas bibliografinis aprašas:</b> Pavardė, V., (Metai).
                      <i>Pavadinimas.</i> Leidykla/spaustuvė. Tiražas, p. skaičius, ISBN <br>
                      El. leidinys:
                      Pavardė, V., (Metai). <i>Pavadinimas.</i> Leidykla/spaustuvė. Prieigos nuoroda
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="bibliografApr` + value4 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-1 mb-3">
                    </div>
                  <div class="col-md-3 mb-3">
                    <label for="">Tipas*</label>
                    <select name="tipas` + value4 + `" class="form-select form-control">
                      <option value=""></option>
                      <option class="others" value="Vadovėliai">V</option>
                      <option class="others" value="Mokomosios knygos">MK</option>
                      <option class="others" value="Kiti metodiniai leidiniai">ML</option>
                      <option class="others" value="Konferencijų medžiaga">KM</option>
                      <option class="others" value="Kita">Kt</option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="">Mokslo sritis**</label>
                    <select name="mokslSrit` + value4 + `" class="form-select form-control">
                      <option value=""></option>
                      <option class="others" value="Humanitariniai mokslai">H</option>
                      <option class="others" value="Socialiniai mokslai">S</option>
                      <option class="others" value="Gamtos mokslai">N</option>
                      <option class="others" value="Žemės ūkio mokslai">A</option>
                      <option class="others" value="Medicinos ir sveikatos mokslai">M</option>
                      <option class="others" value="Technologijos mokslai">T</option>
                    </select>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="">Mokslo kryptis***</label>
                    <select name="mokslKrypt` + value4 + `"  class="form-select form-control">
                      <option value=""></option>
                      <optgroup label="Gamtos mokslai N">
                      <option class="others" value="Matematika">Matematika</option>
                      <option class="others" value="Fizika">Fizika</option>
                      <option class="others" value="Chemija">Chemija</option>
                      <option class="others" value="Biochemija">Biochemija</option>
                      <option class="others" value="Geologija">Geologija</option>
                      <option class="others" value="Fizinė geografija">Fizinė geografija</option>
                      <option class="others" value="Paleontologija">Paleontologija</option>
                      <option class="others" value="Astronomija">Astronomija</option>
                      <option class="others" value="Informatika">Informatika</option>
                      <option class="others" value="Biologija">Biologija</option>
                      <option class="others" value="Biofizika">Biofizika</option>
                      <option class="others" value="Ekologija ir aplinkotyra">Ekologija ir aplinkotyra</option>
                      <option class="others" value="Botanika">Botanika</option>
                      <option class="others" value="Zoologija">Zoologija</option>
                      </optgroup>
                        <optgroup label="Technologijos mokslai T">
                          <option class="others" value="Elektros ir elektronikos inžinerija">Elektros ir elektronikos inžinerija</option>
                          <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                          <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                          <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                          <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                          <option class="others" value="Energetika ir termoinžinerija">Energetika ir termoinžinerija</option>
                          <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
                          <option class="others" value="Medžiagų inžinerija">Medžiagų inžinerija</option>
                          <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                          <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                        </optgroup>
                        <optgroup label="Medicinos ir sveikatos mokslai M">
                          <option class="others" value="Medicina">Medicina</option>
                          <option class="others" value="Odontologija">Odontologija</option>
                          <option class="others" value="Farmacija">Farmacija</option>
                          <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                          <option class="others" value="Slauga">Slauga</option>
                        </optgroup>
                        <optgroup label="Žemės ūkio mokslai A">
                          <option class="others" value="Agronomija">Agronomija</option>
                          <option class="others" value="Veterinarija">Veterinarija</option>
                          <option class="others" value="Gyvūnų mokslai">Gyvūnų mokslai</option>
                          <option class="others" value="Miškotyra">Miškotyra</option>
                        </optgroup>
                        <optgroup label="Socialiniai mokslai S">
                          <option class="others" value="Teisė">Teisė</option>
                          <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                          <option class="others" value="Vadyba">Vadyba</option>
                          <option class="others" value="Ekonomika">Ekonomika</option>
                          <option class="others" value="Sociologija">Sociologija</option>
                          <option class="others" value="Psichologija">Psichologija</option>
                          <option class="others" value="Edukologija">Edukologija</option>
                          <option class="others" value="Komunikacija ir informacija">Komunikacija ir informacija</option>
                        </optgroup>
                        <optgroup label="Humanitariniai mokslai H">
                          <option class="others" value="Filosofija">Filosofija</option>
                          <option class="others" value="Teologija">Teologija</option>
                          <option class="others" value="Menotyra">Menotyra</option>
                          <option class="others" value="Filologija">Filologija</option>
                          <option class="others" value="Istorija ir archeologija">Istorija ir archeologija</option>
                          <option class="others" value="Etnologija">Etnologija</option>
                        </optgroup>
                    </select>
                  </div>
                  </div>
                <div id="add_to_me04` + div4 + `">
              `;
    document.getElementById("table3_id").value = value4;
    value4++;
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

// nD2_M04 
// 4 table. 
  var value6 = document.getElementById("table4_id").value;
  value6++;
  var div6 = 1;

  document.getElementById("m04Script").addEventListener('click', m04);
  function m04() {
    let bendr6 = "add_to_me06" + div6;
    div6++;
    document.getElementById(bendr6).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="nD2_M04nr` + value6 + `" placeholder="" autocomplete="off" value="` + value6 + `" readonly="readonly">
                </div>
                <div class="col-md-3 mb-3">
                  <select name="nD2_M04studProgr` + value6 + `"class="form-select form-control">
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
                  <textarea type="text" rows="1" class="form-control " name="nD2_M04dalykPavad` + value6 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" class="form-control text-center" name="nD2_M04apimtisKredit` + value6 + `" placeholder="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}" min="0">
                </div>
                <div class="col-md-2 mb-3">
                  <select name="nD2_M04busena` + value6 + `" class="form-select form-control">
                    <option value=""></option>
                    <option class="others" value="Parengtas atestacijai">P</option>
                    <option class="others" value="Atestuotas">A</option>
                    <option class="others" value="Atestuotas su sąlyga">AS</option>
                    <option class="others" value="Neatestuotas">NA</option>
                  </select>
                </div>
              </div>
              <div id="add_to_me06` + div6 + `">
              `;
    document.getElementById("table4_id").value = value6;
    value6++;
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

// nD2_D01 
// 5 table.  
  var value7 = document.getElementById("table5_id").value;
  value7++;
  var div7 = 1;
  
  document.getElementById("d01Script").addEventListener('click', d01);

  function d01() {
    let bendr7 = "add_to_me07" + div7;
    div7++;
    document.getElementById(bendr7).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="nD2_D01nr` + value7 + `" placeholder="" autocomplete="off" value="` + value7 + `" readonly="readonly">
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_D01komitetas` + value7 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_D01veikla` + value7 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_D01rezultatai` + value7 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
              <div id="add_to_me07` + div7 + `">
              `;
    document.getElementById("table5_id").value = value7;
    value7++;
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

// nD2_D02 
// 6 table  
  var value8 = document.getElementById("table6_id").value;
  value8++;
  var div8 = 1;

  document.getElementById("d02Script").addEventListener('click', d02);
  function d02() {
    let bendr8 = "add_to_me08" + div8;
    div8++;
    document.getElementById(bendr8).innerHTML +=
      `
      <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="nD2_D02nr` + value8 + `" placeholder="" autocomplete="off" value="` + value8 + `" readonly="readonly">
        </div>
        <div class="col-md-3 mb-3">
          <select name="nD2_D02studKrypt` + value8 + `" class="form-select form-control">
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
          <textarea type="text" rows="1" class="form-control" name="nD2_D02veikla` + value8 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-4 mb-3">
          <textarea type="text" rows="1" class="form-control " name="nD2_D02rezultatai` + value8 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me08` + div8 + `">
              `;
    document.getElementById("table6_id").value = value8;
    value8++;
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

// nD2_D03 
// 7 table  
  var value9 = document.getElementById("table7_id").value;
  value9++;
  var div9 = 1;

  document.getElementById("d03Script").addEventListener('click', d03);
  function d03() {
    let bendr9 = "add_to_me09" + div9;
    div9++;
    document.getElementById(bendr9).innerHTML +=
      `
      <div class="form-row">
        <div class="col-md-1 mb-3">
          <input type="text" class="form-control text-center" name="nD2_D03nr` + value9 + `" placeholder="" autocomplete="off" value="` + value9 + `" readonly="readonly">
        </div>
        <div class="col-md-3 mb-3">
          <select name="nD2_D03studKryptis` + value9 + `" class="form-select form-control">
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
        <div class="col-md-2 mb-3">
          <select name="nD2_D03studProgr` + value9 + `"class="form-select form-control">
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
          <textarea type="text" rows="1" class="form-control" name="nD2_D03veikla` + value9 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-3 mb-3">
          <textarea type="text" rows="1" class="form-control " name="nD2_D03rezultatai` + value9 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
              <div id="add_to_me09` + div9 + `">
              `;
    document.getElementById("table7_id").value = value9;
    value9++;
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

// nD2_M03 
// 8 table 
  var value5 = document.getElementById("table8_id").value;
  value5++;
  var div5 = 1;

  document.getElementById("m03Script").addEventListener('click', m03);
  function m03() {
    let bendr5 = "add_to_me05" + div5;
    div5++;
    document.getElementById(bendr5).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text"  class="form-control text-center" name="nD2_M03nr` + value5 + `" placeholder="" autocomplete="off" value="` + value5 + `" readonly="readonly">
                </div>
                <div class="col-md-4 mb-3">
                  <select name="nD2_M03studProgr` + value5 + `"class="form-select form-control">
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
                  <textarea type="text" rows="1" class="form-control " name="nD2_M03dalykPavad` + value5 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" class="form-control text-center" name="nD2_M03apimtisKredit` + value5 + `" placeholder="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}" min="0">
                </div>
              </div>
              <div id="add_to_me05` + div5 + `">
              `;
    document.getElementById("table8_id").value = value5;
    value5++;
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

// nD2_S01 
// 9 table  
  var value10 = document.getElementById("table9_id").value;
  value10++;
  var div10 = 1;

  document.getElementById("s01Script").addEventListener('click', s01);
  function s01() {
    let bendr10 = "add_to_me10" + div10;
    div10++;
    document.getElementById(bendr10).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="nD2_S01nr` + value10 + `" placeholder="" autocomplete="off" value="` + value10 + `" readonly="readonly">
                </div>
                <div class="col-md-8 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_S01veikla` + value10 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_S01dataVieta` + value10 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
              <div id="add_to_me10` + div10 + `">
              `;
    document.getElementById("table9_id").value = value10;
    value10++;
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

// nD2_S 
  var value11 = document.getElementById("tablenD2_S_id").value;
  value11++;
  var div11 = 1;

  document.getElementById("s01_2Script").addEventListener('click', s01_2);
  function s01_2() {
    let bendr11 = "add_to_me11" + div11;
    div11++;
    document.getElementById(bendr11).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="nD2_Snr` + value11 + `" placeholder="" autocomplete="off" value="` + value11 + `" readonly="readonly">
                </div>
                <div class="col-md-6 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_Sstiprybes` + value11 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-5 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="nD2_Stobulintina` + value11 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
              <div id="add_to_me11` + div11 + `">
              `;
    document.getElementById("tablenD2_S_id").value = value11;
    value11++;
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

// tMTEP3_T01 
// 10 table
  var value12 = document.getElementById("table10_id").value;
  value12++;
  var div12 = 1;

  document.getElementById("t01Script").addEventListener('click', t01);
  function t01() {
    let bendr12 = "add_to_me12" + div12;
    div12++;
    document.getElementById(bendr12).innerHTML +=
      `

      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <label for=""><br></label>
                  <input type="text" class="form-control text-center" name="tMTEP3_T01nr` + value12 + `" placeholder="" autocomplete="off" value="` + value12 + `" readonly="readonly">
                </div>
                <div class="col-md-11 mb-3">
                  <label for="">Tyrimo tematika, metodai ir apimtis*</label>
                  <textarea type="text" rows="1" class="form-control " name="tyrTemat` + value12 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="form-row">
                </div>
                <div class="col-md-1 mb-3">

                </div>
                <div class="col-md-3 mb-3">
                  <label for="">Tyrimų grupė**</label>
                  <select name="tyrGrup` + value12 + `" class="form-select form-control">
                    <option value=""></option>
                    <option class="others" value="Studijų kokybės bei kompetencijų užtikrinimo tyrimai">T01</option>
                    <option class="others" value="Verslo aplinkos ir darbo rinkos analizės tyrimai">T02</option>
                    <option class="others" value="Technologijos mokslų srities tyrimai">T03</option>
                    <option class="others" value="Specializuotos tematikos taikomieji moksliniai tyrimai">T04</option>
                    <option class="others" value="Inovacijos">T05</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label for="">Mokslo sritis***</label>
                  <select name="tMTEP3_T01mokslSrit` + value12 + `" class="form-select form-control">
                    <option value=""></option>
                    <option class="others" value="Humanitariniai mokslai">H</option>
                    <option class="others" value="Socialiniai mokslai">S</option>
                    <option class="others" value="Gamtos mokslai">N</option>
                    <option class="others" value="Žemės ūkio mokslai">A</option>
                    <option class="others" value="Medicinos ir sveikatos mokslai">M</option>
                    <option class="others" value="Technologijos mokslai">T</option>
                  </select>
                </div>
                <div class="col-md-5 mb-3">
                  <label for="">Mokslo kryptis****</label>
                  <select name="tMTEP3_T01mokslKrypt` + value12 + `"class="form-select form-control">
                    <option value=""></option>
                    <optgroup label="Gamtos mokslai N">
                    <option class="others" value="Matematika">Matematika</option>
                    <option class="others" value="Fizika">Fizika</option>
                    <option class="others" value="Chemija">Chemija</option>
                    <option class="others" value="Biochemija">Biochemija</option>
                    <option class="others" value="Geologija">Geologija</option>
                    <option class="others" value="Fizinė geografija">Fizinė geografija</option>
                    <option class="others" value="Paleontologija">Paleontologija</option>
                    <option class="others" value="Astronomija">Astronomija</option>
                    <option class="others" value="Informatika">Informatika</option>
                    <option class="others" value="Biologija">Biologija</option>
                    <option class="others" value="Biofizika">Biofizika</option>
                    <option class="others" value="Ekologija ir aplinkotyra">Ekologija ir aplinkotyra</option>
                    <option class="others" value="Botanika">Botanika</option>
                    <option class="others" value="Zoologija">Zoologija</option>
                    </optgroup>
                      <optgroup label="Technologijos mokslai T">
                        <option class="others" value="Elektros ir elektronikos inžinerija">Elektros ir elektronikos inžinerija</option>
                        <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
                        <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
                        <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
                        <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
                        <option class="others" value="Energetika ir termoinžinerija">Energetika ir termoinžinerija</option>
                        <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
                        <option class="others" value="Medžiagų inžinerija">Medžiagų inžinerija</option>
                        <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
                        <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
                      </optgroup>
                      <optgroup label="Medicinos ir sveikatos mokslai M">
                        <option class="others" value="Medicina">Medicina</option>
                        <option class="others" value="Odontologija">Odontologija</option>
                        <option class="others" value="Farmacija">Farmacija</option>
                        <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
                        <option class="others" value="Slauga">Slauga</option>
                      </optgroup>
                      <optgroup label="Žemės ūkio mokslai A">
                        <option class="others" value="Agronomija">Agronomija</option>
                        <option class="others" value="Veterinarija">Veterinarija</option>
                        <option class="others" value="Gyvūnų mokslai">Gyvūnų mokslai</option>
                        <option class="others" value="Miškotyra">Miškotyra</option>
                      </optgroup>
                      <optgroup label="Socialiniai mokslai S">
                        <option class="others" value="Teisė">Teisė</option>
                        <option class="others" value="Politikos mokslai">Politikos mokslai</option>
                        <option class="others" value="Vadyba">Vadyba</option>
                        <option class="others" value="Ekonomika">Ekonomika</option>
                        <option class="others" value="Sociologija">Sociologija</option>
                        <option class="others" value="Psichologija">Psichologija</option>
                        <option class="others" value="Edukologija">Edukologija</option>
                        <option class="others" value="Komunikacija ir informacija">Komunikacija ir informacija</option>
                      </optgroup>
                      <optgroup label="Humanitariniai mokslai H">
                        <option class="others" value="Filosofija">Filosofija</option>
                        <option class="others" value="Teologija">Teologija</option>
                        <option class="others" value="Menotyra">Menotyra</option>
                        <option class="others" value="Filologija">Filologija</option>
                        <option class="others" value="Istorija ir archeologija">Istorija ir archeologija</option>
                        <option class="others" value="Etnologija">Etnologija</option>
                      </optgroup>
                  </select>
                </div>
              </div>
              <div id="add_to_me12` + div12 + `">
              `;
    document.getElementById("table10_id").value = value12;
    value12++;
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

// TMTEP3_T02 
// 11 table 

  var value13 = document.getElementById("table11_id").value;
  value13++;
  var div13 = 1;

  document.getElementById("t02Script").addEventListener('click', t02);
  function t02() {
    let bendr13 = "add_to_me13" + div13;
    div13++;
    document.getElementById(bendr13).innerHTML +=
      `
      <div class="form-row">
  <div class="col-md-1 mb-3">
    <label for=""><br></label>
    <input type="text" class="form-control text-center" name="tMTEP3_T02nr` + value13 + `" placeholder="" autocomplete="off" value="` + value13 + `" readonly="readonly">
  </div>
  <div class="col-md-11 mb-3">
    <label><b>Pilnas bibliografinis aprašas</b>:
      Pavardė, V. (Metai). Straipsnio antraštė. <i>Žurnalo antraštė</i>, Nr., p. <i>nuo-iki...</i> , ISSN.
    </label>
    <textarea type="text"  rows="1" class="form-control " name="tMTEP3_T02bibliografApr` + value13 + `" placeholder="" autocomplete="off"></textarea>
  </div>
  </div>
  <div class="form-row">
    <div class="col-md-1 mb-3">
    </div>
  <div class="col-md-2 mb-3">
    <label for="">Publikacijos tipas
    </label>
    <select name="tMTEP3_T02tipas` + value13 + `" class="form-select form-control">
      <option value=""></option>
      <option class="others" value="01">01</option>
      <option class="others" value="02">02</option>
      <option class="others" value="03">03</option>
      <option class="others" value="04">04</option>
      <option class="others" value="05">05</option>
      <option class="others" value="06">06</option>
      <option class="others" value="07">07</option>
      <option class="others" value="08">08</option>
    </select>
  </div>
  <div class="col-md-2 mb-3">
    <label for="">Mokslo sritis*</label>
    <select name="tMTEP3_T02mokslSrit` + value13 + `" class="form-select form-control">
      <option value=""></option>
      <option class="others" value="Humanitariniai mokslai">H</option>
      <option class="others" value="Socialiniai mokslai">S</option>
      <option class="others" value="Gamtos mokslai">N</option>
      <option class="others" value="Žemės ūkio mokslai">A</option>
      <option class="others" value="Medicinos ir sveikatos mokslai">M</option>
      <option class="others" value="Technologijos mokslai">T</option>
    </select>
  </div>
  <div class="col-md-4 mb-3">

    <label for="">Mokslo kryptis**</label>
    <select name="tMTEP3_T02mokslKrypt` + value13 + `" class="form-select form-control">
      <option value=""></option>
      <optgroup label="Gamtos mokslai N">
      <option class="others" value="Matematika">Matematika</option>
      <option class="others" value="Fizika">Fizika</option>
      <option class="others" value="Chemija">Chemija</option>
      <option class="others" value="Biochemija">Biochemija</option>
      <option class="others" value="Geologija">Geologija</option>
      <option class="others" value="Fizinė geografija">Fizinė geografija</option>
      <option class="others" value="Paleontologija">Paleontologija</option>
      <option class="others" value="Astronomija">Astronomija</option>
      <option class="others" value="Informatika">Informatika</option>
      <option class="others" value="Biologija">Biologija</option>
      <option class="others" value="Biofizika">Biofizika</option>
      <option class="others" value="Ekologija ir aplinkotyra">Ekologija ir aplinkotyra</option>
      <option class="others" value="Botanika">Botanika</option>
      <option class="others" value="Zoologija">Zoologija</option>
      </optgroup>
        <optgroup label="Technologijos mokslai T">
          <option class="others" value="Elektros ir elektronikos inžinerija">Elektros ir elektronikos inžinerija</option>
          <option class="others" value="Statybos inžinerija">Statybos inžinerija</option>
          <option class="others" value="Transporto inžinerija">Transporto inžinerija</option>
          <option class="others" value="Aplinkos inžinerija">Aplinkos inžinerija</option>
          <option class="others" value="Chemijos inžinerija">Chemijos inžinerija</option>
          <option class="others" value="Energetika ir termoinžinerija">Energetika ir termoinžinerija</option>
          <option class="others" value="Informatikos inžinerija">Informatikos inžinerija</option>
          <option class="others" value="Medžiagų inžinerija">Medžiagų inžinerija</option>
          <option class="others" value="Mechanikos inžinerija">Mechanikos inžinerija</option>
          <option class="others" value="Matavimų inžinerija">Matavimų inžinerija</option>
        </optgroup>
        <optgroup label="Medicinos ir sveikatos mokslai M">
          <option class="others" value="Medicina">Medicina</option>
          <option class="others" value="Odontologija">Odontologija</option>
          <option class="others" value="Farmacija">Farmacija</option>
          <option class="others" value="Visuomenės sveikata">Visuomenės sveikata</option>
          <option class="others" value="Slauga">Slauga</option>
        </optgroup>
        <optgroup label="Žemės ūkio mokslai A">
          <option class="others" value="Agronomija">Agronomija</option>
          <option class="others" value="Veterinarija">Veterinarija</option>
          <option class="others" value="Gyvūnų mokslai">Gyvūnų mokslai</option>
          <option class="others" value="Miškotyra">Miškotyra</option>
        </optgroup>
        <optgroup label="Socialiniai mokslai S">
          <option class="others" value="Teisė">Teisė</option>
          <option class="others" value="Politikos mokslai">Politikos mokslai</option>
          <option class="others" value="Vadyba">Vadyba</option>
          <option class="others" value="Ekonomika">Ekonomika</option>
          <option class="others" value="Sociologija">Sociologija</option>
          <option class="others" value="Psichologija">Psichologija</option>
          <option class="others" value="Edukologija">Edukologija</option>
          <option class="others" value="Komunikacija ir informacija">Komunikacija ir informacija</option>
        </optgroup>
        <optgroup label="Humanitariniai mokslai H">
          <option class="others" value="Filosofija">Filosofija</option>
          <option class="others" value="Teologija">Teologija</option>
          <option class="others" value="Menotyra">Menotyra</option>
          <option class="others" value="Filologija">Filologija</option>
          <option class="others" value="Istorija ir archeologija">Istorija ir archeologija</option>
          <option class="others" value="Etnologija">Etnologija</option>
        </optgroup>
    </select>
  </div>
  <div class="col-md-3 mb-3">
    <label for="">Duomenų bazė</label>
    <textarea type="text"  rows="1" class="form-control " name="tMTEP3_T02duomBaze` + value13 + `" placeholder="" autocomplete="off"></textarea>
  </div>
</div>
                <div id="add_to_me13` + div13 + `">
              `;
    document.getElementById("table11_id").value = value13;
    value13++;
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

// TMTEP3_T03 
// 12 table 

  var value14 = document.getElementById("table12_id").value;
  value14++;
  var div14 = 1;

  document.getElementById("t03Script").addEventListener('click', t03);
  function t03() {
    let bendr14 = "add_to_me14" + div14;
    div14++;
    document.getElementById(bendr14).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="tMTEP3_T03nr` + value14 + `" placeholder="" autocomplete="off" value="` + value14 + `" readonly="readonly">
                </div>
                <div class="col-md-9 mb-3">
                  <textarea type="text" rows="1" class="form-control" name="tMTEP3_T03pilnasBiblApr` + value14 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <textarea type="text" rows="1" class="form-control" name="tMTEP3_T03rengTipas` + value14 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
              <div id="add_to_me14` + div14 + `">
              `;
    document.getElementById("table12_id").value = value14;
    value14++;
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

// TMTEP3_T04 
// 13 table.  

  var value15 = document.getElementById("table13_id").value;
  value15++;
  var div15 = 1;

  document.getElementById("t04Script").addEventListener('click', t04);
  function t04() {
    let bendr15 = "add_to_me15" + div15;
    div15++;
    document.getElementById(bendr15).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="tMTEP3_T04nr` + value15 + `" placeholder="" autocomplete="off" value="` + value15 + `" readonly="readonly">
                </div>
                <div class="col-md-4 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T04uzsakovas` + value15 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T04tema` + value15 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T04data` + value15 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                    <select name="tMTEP3_T04atlygArNe` + value15 + `" class="form-select form-control" required>
                      <option value="nepasirinkta"></option>
                      <option class="others" value="Atlygintinai">Atlygintinai</option>
                      <option class="others" value="Neatlygintinai">Neatlygintinai</option>
                    </select>
                </div>
                </div>
                <div id="add_to_me15` + div15 + `">
              `;
    document.getElementById("table13_id").value = value15;
    value15++;
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

// TMTEP3_T05 
// 14.1 table  

  var value16 = document.getElementById("table141_id").value;
  value16++;
  var div16 = 1;

  document.getElementById("t05Script").addEventListener('click', t05);
  function t05() {
    let bendr16 = "add_to_me16" + div16;
    div16++;
    document.getElementById(bendr16).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control  text-center" name="tMTEP3_T05nr` + value16 + `" placeholder="" autocomplete="off" value="` + value16 + `" readonly="readonly">
                </div>
                <div class="col-md-4 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T05veiklPavad` + value16 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-5 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T05veiklRezult` + value16 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <select name="tMTEP3_T05atlygArNe` + value16 + `" class="form-select form-control">
                    <option value=""></option>
                    <option class="others" <%if (user.atlygArNe === "Atlygintinai") { %> selected <% } %> value="Atlygintinai">Atlygintinai</option>
                    <option class="others" <%if (user.atlygArNe === "Neatlygintinai") { %> selected <% } %> value="Neatlygintinai">Neatlygintinai</option>
                  </select>
                </div>
              </div>
                <div id="add_to_me16` + div16 + `">
              `;
    document.getElementById("table141_id").value = value16;
    value16++;
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

// 14.2 table 

  var value57 = document.getElementById("table142_id").value;
  value57++;
  var div57 = 1;
  var asd57 = "add_to_meN01";

  document.getElementById("n142Script").addEventListener('click', n142);
  function n142() {
    let bendr57 = "add_to_meN01" + div57;
    div57++;
    document.getElementById(bendr57).innerHTML +=
      `
      <div class="form-row">
            <div class="col-md-1 mb-3">
              <input type="text" class="form-control text-center" name="tMTEP3_142nr` + value57 + `" placeholder="" autocomplete="off" value="` + value57 + `" readonly="readonly">
            </div>
            <div class="col-md-7 mb-3">
              <textarea type="text" rows="1" class="form-control " name="tMTEP3_142pavadinimas` + value57 + `" placeholder="" autocomplete="off"></textarea>
            </div>
            <div class="col-md-4 mb-3">
              <textarea type="text" rows="1" class="form-control " name="tMTEP3_142pastabos` + value57 + `" placeholder="" autocomplete="off"></textarea>
            </div>
          </div>
                <div id="add_to_meN01` + div57 + `">
                  </div>
              `;
    document.getElementById("table142_id").value = value57;
    value57++;
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

// 14.3 table 

  var value58 = document.getElementById("table143_id").value;
  value58++;
  var div58 = 1;

  document.getElementById("n143Script").addEventListener('click', n143);
  function n143() {
    let bendr58 = "add_to_meN02" + div58;
    div58++;
    document.getElementById(bendr58).innerHTML +=
      `
      <div class="form-row">
              <div class="col-md-1 mb-3">
                <input type="text" class="form-control text-center" name="tMTEP3_143nr` + value58 + `" placeholder="" autocomplete="off" value="` + value58 + `" readonly="readonly">
              </div>
              <div class="col-md-7 mb-3">
                <textarea type="text" rows="1" class="form-control " name="tMTEP3_143pavadinimas` + value58 + `" placeholder="" autocomplete="off"></textarea>
              </div>
              <div class="col-md-4 mb-3">
                <textarea type="text" rows="1" class="form-control " name="tMTEP3_143uzsakovas` + value58 + `" placeholder="" autocomplete="off"></textarea>
              </div>
            </div>
                <div id="add_to_meN02` + div58 + `">
                  </div>
              `;
    document.getElementById("table143_id").value = value58;
    value58++;
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

// TMTEP3_T06 
// 15 table.  

  var value17 = document.getElementById("table15_id").value;
  value17++;
  var div17 = 1;

  document.getElementById("t06Script").addEventListener('click', t06);
  function t06() {
    let bendr17 = "add_to_me17" + div17;
    div17++;
    document.getElementById(bendr17).innerHTML +=
      `
      <div class="form-row">
    <div class="col-md-1 mb-3">
      <label for=""><br></label>
      <input type="text" class="form-control text-center" name="tMTEP3_T06nr` + value17 + `" placeholder="" autocomplete="off" value="` + value17 + `" readonly="readonly">
    </div>
    <div class="col-md-6 mb-3">
      <label for="">Autorius/bendraautorius (Pavardė, vardas) </label>
      <textarea type="text" rows="1" class="form-control " name="tMTEP3_T06autorius` + value17 + `" placeholder="" autocomplete="off"></textarea>
    </div>
    <div class="col-md-5 mb-3">
      <label for="">Meno sritis*, pavadinimas</label>
      <textarea type="text" rows="1" class="form-control " name="tMTEP3_T06menoSrit` + value17 + `" placeholder="" autocomplete="off"></textarea>
    </div>
  </div>
  <div class="form-row">
    <div class="col-md-1 mb-3">
    </div>
    <div class="col-md-2 mb-3">
      <label for="">Pobūdis</label>
      <select name="tMTEP3_T06pobudis` + value17 + `" class="form-select form-control">
        <option value=""></option>
        <option class="others" value="Premjera">Premjera</option>
        <option class="others" value="Pakartojimas">Pakartojimas</option>
      </select>
    </div>
    <div class="col-md-4 mb-3">
      <label for="">Realizavimo vieta, vieši įvertinimai</label>
      <textarea type="text" rows="1" class="form-control " name="tMTEP3_T06realizVieta` + value17 + `" placeholder="" autocomplete="off"></textarea>
    </div>
    <div class="col-md-3 mb-3">
      <label for="">Data</label>
      <textarea type="text" rows="1" class="form-control " name="tMTEP3_T06data` + value17 + `" placeholder="" autocomplete="off"></textarea>
    </div>
    <div class="col-md-2 mb-3">
      <label for="">Atlygintinai/ Neatlygintinai</label>
      <select name="tMTEP3_T06atlygArNe` + value17 + `" class="form-select form-control" required>
        <option value="nepasirinkta"></option>
        <option class="others" value="Atlygintinai">Atlygintinai</option>
        <option class="others" value="Neatlygintinai">Neatlygintinai</option>
      </select>
        </div>
  </div>
                <div id="add_to_me17` + div17 + `">
              `;
    document.getElementById("table15_id").value = value17;
    value17++;
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

// TMTEP3_T07 
// 16 table.  

  var value18 = document.getElementById("table16_id").value;
  value18++;
  var div18 = 1;

  document.getElementById("t07Script").addEventListener('click', t07);
  function t07() {
    let bendr18 = "add_to_me18" + div18;
    div18++;
    document.getElementById(bendr18).innerHTML +=
      `
                <div class="form-row">
                <div class="col-md-1 mb-3">
                  <label for=""><br></label>
                  <input type="text" class="form-control text-center" name="tMTEP3_T07nr` + value18 + `" placeholder="" autocomplete="off" value="` + value18 + `" readonly="readonly">
                </div>
                <div class="col-md-5 mb-3">
                  <label for="">Meno sritis*, renginys </label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T07menoSrit` + value18 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="">Pavadinimas </label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T07pavadinimas` + value18 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                </div>
                <div class="form-row">
                  <div class="col-md-1 mb-3">
                  </div>
                <div class="col-md-5 mb-3">
                  <label for=""> Atlikimo vieta, vieši įvertinimai</label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T07atlikVieta` + value18 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="">Data</label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T07data` + value18 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <label for="">Atlygintinai/ Neatlygintina</label>
                  <select name="tMTEP3_T07atlygArNe` + value18 + `" class="form-select form-control" required>
                    <option value="nepasirinkta"></option>
                    <option class="others" value="Atlygintinai">Atlygintinai</option>
                    <option class="others" value="Neatlygintinai">Neatlygintinai</option>
                  </select>
                  </div>
              </div>
              <div id="add_to_me18` + div18 + `">
              `;
    document.getElementById("table16_id").value = value18;
    value18++;
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

// TMTEP3_T08 
// 17 table.  

  var value19 = document.getElementById("table17_id").value;
  value19++;
  var div19 = 1;

  document.getElementById("t08Script").addEventListener('click', t08);
  function t08() {
    let bendr19 = "add_to_me19" + div19;
    div19++;
    document.getElementById(bendr19).innerHTML +=
      `
      <div class="form-row">
        <div class="col-md-1 mb-3">
          <label for=""><br></label>
          <input type="text" class="form-control text-center" name="tMTEP3_T08nr` + value19 + `" placeholder="" autocomplete="off" value="` + value19 + `" readonly="readonly">
        </div>
        <div class="col-md-5 mb-3">
          <label for="">Meno sritis*, renginys </label>
          <textarea type="text" rows="1" class="form-control " name="tMTEP3_T08menoSrit` + value19 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-6 mb-3">
          <label for="">Pavadinimas </label>
          <textarea type="text" rows="1" class="form-control " name="tMTEP3_T08pavadinimas` + value19 + `" placeholder="" autocomplete="off"></textarea>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-1 mb-3">
        </div>
        <div class="col-md-5 mb-3">
          <label for="">Atlikimo vieta, vieši įvertinimai</label>
          <textarea type="text" rows="1" class="form-control " name="tMTEP3_T08atlikVieta` + value19 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-4 mb-3">
          <label for="">Data</label>
          <textarea type="text" rows="1" class="form-control " name="tMTEP3_T08data` + value19 + `" placeholder="" autocomplete="off"></textarea>
        </div>
        <div class="col-md-2 mb-3">
          <label for="">Atlygintinai/ Neatlygintina</label>
          <select name="tMTEP3_T08atlygArNe` + value19 + `" class="form-select form-control" required>
            <option value="nepasirinkta"></option>
            <option class="others" value="Atlygintinai">Atlygintinai</option>
            <option class="others" value="Neatlygintinai">Neatlygintinai</option>
          </select>
          </div>
      </div>
      <div id="add_to_me19` + div19 + `">
              `;
    document.getElementById("table17_id").value = value19;
    value19++;
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

// TMTEP3_T09 
// 18 table.  

  var value20 = document.getElementById("table18_id").value;
  value20++;
  var div20 = 1;

  document.getElementById("t09Script").addEventListener('click', t09);
  function t09() {
    let bendr20 = "add_to_me20" + div20;
    div20++;
    document.getElementById(bendr20).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <label for=""><br></label>
                  <input type="text" class="form-control text-center" name="tMTEP3_T09nr` + value20 + `" placeholder="" autocomplete="off" value="` + value20 + `" readonly="readonly">
                </div>
                <div class="col-md-5 mb-3">
                  <label for="">Meno sritis*, renginys </label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T09menoSrit` + value20 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-6 mb-3">
                  <label for="">Pavadinimas </label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T09pavadinimas` + value20 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                </div>
                <div class="form-row">
                  <div class="col-md-1 mb-3">
                  </div>
                <div class="col-md-5 mb-3">
                  <label for=""> Atlikimo vieta, vieši įvertinimai</label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T09atlikVieta` + value20 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">
                  <label for="">Data</label>
                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T09data` + value20 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <label for="">Atlygintinai/ Neatlygintina</label>
                  <select name="tMTEP3_T09atlygArNe` + value20 + `" class="form-select form-control" required>
                    <option value="nepasirinkta"></option>
                    <option class="others" value="Atlygintinai">Atlygintinai</option>
                    <option class="others" value="Neatlygintinai">Neatlygintinai</option>
                  </select>
                  </div>
              </div>
              <div id="add_to_me20` + div20 + `">
              `;
    document.getElementById("table18_id").value = value20;
    value20++;
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

// TMTEP3_T10 
// 19 table.  

  var value21 = document.getElementById("table19_id").value;
  value21++;
  var div21 = 1;

  document.getElementById("t10Script").addEventListener('click', t10);
  function t10() {
    let bendr21 = "add_to_me21" + div21;
    div21++;
    document.getElementById(bendr21).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                    <label for=""><br></label>
                    <input type="text" class="form-control text-center" name="tMTEP3_T10nr` + value21 + `" placeholder="" autocomplete="off" value="` + value21 + `" readonly="readonly">
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="">Veiklos pobūdis
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T10veiklPobud` + value21 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="">Veiklos tikslas
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T10veiklTiksl` + value21 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-1 mb-3">
                    </div>
                  <div class="col-md-3 mb-3">
                    <label for="">Data, vieta
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T10dataVieta` + value21 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="">Dalyvių skaičius
                    </label>
                    <input type="number" class="form-control text-center" name="tMTEP3_T10dalyvSk` + value21 + `" placeholder="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}" min="0">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="">Kiti komentarai</label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T10ktKomentarai` + value21 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="">Atlygintinai/ Neatlygintina</label>
                    <select name="tMTEP3_T10atlygArNe` + value21 + `" class="form-select form-control" required>
                      <option value="nepasirinkta"></option>
                      <option class="others" value="Atlygintinai">Atlygintinai</option>
                      <option class="others" value="Neatlygintinai">Neatlygintinai</option>
                    </select>
                  </div>
                  </div>
                <div id="add_to_me21` + div21 + `">
              `;
    document.getElementById("table19_id").value = value21;
    value21++;
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

// TMTEP3_T11 
// 20 table.  

  var value22 = document.getElementById("table20_id").value;
  value22++;
  var div22 = 1;

  document.getElementById("t11Script").addEventListener('click', t11);
  function t11() {
    let bendr22 = "add_to_me22" + div22;
    div22++;
    document.getElementById(bendr22).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                  <label for=""><br></label>
                    <input type="text" class="form-control text-center" name="tMTEP3_T11nr` + value22 + `" placeholder="" autocomplete="off" value="` + value22 + `" readonly="readonly">
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="">Veiklos pobūdis
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T11veiklPobud` + value22 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="">Veiklos tikslas
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T11veiklTiksl` + value22 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-1 mb-3">
                    </div>
                  <div class="col-md-3 mb-3">
                    <label for="">Data, vieta
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T11dataVieta` + value22 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="">Dalyvių skaičius
                    </label>
                    <input type="number" class="form-control text-center" name="tMTEP3_T11dalyvSk` + value22 + `" placeholder="" autocomplete="off" onkeyup="if(this.value<0){this.value= this.value * -1}" min="0">
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="">Kiti komentarai  </label>
                    <textarea type="text" rows="1" class="form-control " name="tMTEP3_T11ktKomentarai` + value22 + `" placeholder="" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-2 mb-3">
                    <label for="">Atlygintinai/ Neatlygintina</label>
                    <select name="tMTEP3_T11atlygArNe` + value22 + `" class="form-select form-control" required>
                      <option value="nepasirinkta"></option>
                      <option class="others" value="Atlygintinai">Atlygintinai</option>
                      <option class="others" value="Neatlygintinai">Neatlygintinai</option>
                    </select>
                      </div>
                  </div>
                <div id="add_to_me22` + div22 + `">
              `;
    document.getElementById("table20_id").value = value22;
    value22++;
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

// TMTEP3_T12 
// 21 table.  

  var value23 = document.getElementById("table21_id").value;
  value23++;
  var div23 = 1;

  document.getElementById("t12Script").addEventListener('click', t12);
  function t12() {
    let bendr23 = "add_to_me23" + div23;
    div23++;
    document.getElementById(bendr23).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="tMTEP3_T12nr` + value23 + `" placeholder="" autocomplete="off" value="` + value23 + `" readonly="readonly">
                </div>
                <div class="col-md-8 mb-3">

                  <textarea type="text" rows="1" class="form-control" name="tMTEP3_T12veiklPobud` + value23 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T12dataVieta` + value23 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                </div>
                <div id="add_to_me23` + div23 + `">
              `;
    document.getElementById("table21_id").value = value23;
    value23++;
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

// TMTEP3_T13 
// 22 table.  

  var value24 = document.getElementById("table22_id").value;
  value24++;
  var div24 = 1;

  document.getElementById("t13Script").addEventListener('click', t13);
  function t13() {
    let bendr24 = "add_to_me24" + div24;
    div24++;
    document.getElementById(bendr24).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">

                  <input type="text" class="form-control text-center" name="tMTEP3_T13nr` + value24 + `" placeholder="" autocomplete="off" value="` + value24 + `" readonly="readonly">
                </div>
                <div class="col-md-3 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T13studDuom` + value24 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T13renginioPavad` + value24 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T13rezultatas` + value24 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T13data` + value24 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
                </div>
                <div id="add_to_me24` + div24 + `">
              `;
    document.getElementById("table22_id").value = value24;
    value24++;
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

// TMTEP3_T14 
// 23 table.  

  var value25 = document.getElementById("table23_id").value;
  value25++;
  var div25 = 1;

  document.getElementById("t14Script").addEventListener('click', t14);
  function t14() {
    let bendr25 = "add_to_me25" + div25;
    div25++;
    document.getElementById(bendr25).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">

                  <input type="text" class="form-control text-center" name="tMTEP3_T14nr` + value25 + `" placeholder="" autocomplete="off" value="` + value25 + `" readonly="readonly">
                </div>
                <div class="col-md-4 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T14renginys` + value25 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T14veiklPobud` + value25 + `" placeholder="" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">

                  <textarea type="text" rows="1" class="form-control " name="tMTEP3_T14dataVieta` + value25 + `" placeholder="" autocomplete="off"></textarea>
                </div>
              </div>
                </div>
                <div id="add_to_me25` + div25 + `">
              `;
    document.getElementById("table23_id").value = value25;
    value25++;
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

// TMTEP3_S 

  var value26 = document.getElementById("tableTMTEP3_S_id").value;
  value26++;
  var div26 = 1;

  document.getElementById("t15Script").addEventListener('click', t15);
  function t15() {
    let bendr26 = "add_to_me26" + div26;
    div26++;
    document.getElementById(bendr26).innerHTML +=
      `
      <div class="form-row">
      <div class="col-md-1 mb-3">
        <input type="text" class="form-control text-center" name="tMTEP3_Snr` + value26 + `" placeholder="" autocomplete="off" value="` + value26 + `" readonly="readonly">
      </div>
      <div class="col-md-6 mb-3">
        <textarea type="text" rows="1" class="form-control " name="tMTEP3_Sstiprybes` + value26 + `" placeholder="" autocomplete="off"></textarea>
      </div>
      <div class="col-md-5 mb-3">
        <textarea type="text" rows="1" class="form-control " name="tMTEP3_Stobulintina` + value26 + `" placeholder="" autocomplete="off"></textarea>
      </div>
      </div>
      <div id="add_to_me26` + div26 + `">
              `;
    document.getElementById("tableTMTEP3_S_id").value = value26;
    value26++;
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

// KV01
// 24 table 1
// Mokymo(si) komp 

  var value59 = document.getElementById("table241_id").value;
  value59++;
  var div59 = 1;

  document.getElementById("mokymoScript").addEventListener('click', mokymo);
  function mokymo() {
    let bendr59 = "add_to_meN03" + div59;
    div59++;
    document.getElementById(bendr59).innerHTML +=
      `
      <div class="form-row">
      <div class="col-md-2 mb-3">
          </div>
          <div class="col-md-3 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kTOV4_mokymopavad` + value59 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-3 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kTOV4_mokymopazymNr` + value59 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-2 mb-3">
            <input type="number" rows="1" id="trukmLT1_` + value59 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_mokymotrukmeValLT` + value59 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
          </div>
          <div class="col-md-2 mb-3">
            <input type="number" rows="1" id="trukmNeLT1_` + value59 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_mokymotrukmeValNeLT` + value59 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
          </div>
          </div>
                <div id="add_to_meN03` + div59 + `">
                  </div>
              `;
    document.getElementById("table241_id").value = value59;
    value59++;
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

// 24 table 2
// Tyrimų_komp 

  var value60 = document.getElementById("table242_id").value;
  value60++;
  var div60 = 1;

  document.getElementById("tyrimuScript").addEventListener('click', tyrimu);
  function tyrimu() {
    let bendr60 = "add_to_meN04" + div60;
    div60++;
    document.getElementById(bendr60).innerHTML +=
      `
    <div class="form-row">
                <div class="col-md-2 mb-3">
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_tyrimupavad` + value60 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_tyrimupazymNr` + value60 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" rows="1" id="trukmLT2_` + value60 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_tyrimutrukmeValLT` + value60 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" rows="1" id="trukmNeLT2_` + value60 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_tyrimutrukmeValNeLT` + value60 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                </div>
              </div>
              <div id="add_to_meN04` + div60 + `">
                </div>
            `;
    document.getElementById("table242_id").value = value60;
    value60++;
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

// 24 table 3
// Bendrosios_komp 

  var value61 = document.getElementById("table243_id").value;
  value61++;
  var div61 = 1;
 
  document.getElementById("bendrosiosScript").addEventListener('click', bendrosios);
  function bendrosios() {
    let bendr61 = "add_to_meN05" + div61;
    div61++;
    document.getElementById(bendr61).innerHTML +=
      `
                <div class="form-row">
                 <div class="col-md-2 mb-3">
                 </div>
                 <div class="col-md-3 mb-3">
                   <textarea type="text" rows="1" class="form-control " name="kTOV4_bendrosiospavad` + value61 + `" autocomplete="off"></textarea>
                 </div>
                 <div class="col-md-3 mb-3">
                   <textarea type="text" rows="1" class="form-control " name="kTOV4_bendrosiospazymNr` + value61 + `" autocomplete="off"></textarea>
                 </div>
                 <div class="col-md-2 mb-3">
                   <input type="number" rows="1" id="trukmLT3_` + value61 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_bendrosiostrukmeValLT` + value61 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                 </div>
                 <div class="col-md-2 mb-3">
                   <input type="number" rows="1" id="trukmNeLT3_` + value61 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_bendrosiostrukmeValNeLT` + value61 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                </div>
               </div>
              <div id="add_to_meN05` + div61 + `">
                </div>
            `;
    document.getElementById("table243_id").value = value61;
    value61++;
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

// 24 table 4
// Dalykinės_komp 

  var value62 = document.getElementById("table244_id").value;
  value62++;
  var div62 = 1;

  document.getElementById("dalykinesScript").addEventListener('click', dalykines);
  function dalykines() {
    let bendr62 = "add_to_meN06" + div62;
    div62++;
    document.getElementById(bendr62).innerHTML +=
      `
    <div class="form-row">
                <div class="col-md-2 mb-3">
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_dalykpavad` + value62 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_dalykpazymNr` + value62 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" rows="1" id="trukmLT4_` + value62 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_dalyktrukmeValLT` + value62 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                </div>
                <div class="col-md-2 mb-3">
                  <input type="number" rows="1" id="trukmNeLT4_` + value62 + `" onchange="calc24()" class="form-control text-center" name="kTOV4_dalyktrukmeValNeLT` + value62 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
                </div>
              </div>
              <div id="add_to_meN06` + div62 + `">
                </div>
            `;
    document.getElementById("table244_id").value = value62;
    value62++;
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

// 25 table 

  var value63 = document.getElementById("table25_id").value; // pagal id
  value63++;
  var div63 = 1;

  document.getElementById("kTOV4_25Script").addEventListener('click', kTOV4_25);
  function kTOV4_25() {
    let bendr63 = "add_to_meN07" + div63;
    div63++;
    document.getElementById(bendr63).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="kTOV4_25nr` + value63 + `" placeholder="" autocomplete="off" value="` + value63 + `" readonly="readonly">
          </div>
          <div class="col-md-7 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kTOV4_25renginysTema` + value63 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-2 mb-3">
            <select name="kTOV4_25kompGrupe` + value63 + `"class="form-select form-control">
              <option value=""></option>
              <option class="others" value="Mokymo (si)">Mokymo (si)</option>
              <option class="others" value="Tyrimų">Tyrimų</option>
              <option class="others" value="Bendrosios">Bendrosios</option>
              <option class="others" value="Dalykinės">Dalykinės</option>
            </select>
          </div>
          <div class="col-md-2 mb-3">
            <select name="kTOV4_25skirta` + value63 + `" class="form-select form-control">
              <option value=""></option>
              <option class="others" value="Akademinis personalas">AP</option>
              <option class="others" value="neakademinis personalas">NP</option>
              <option class="others" value="Visas personalas">VP</option>
            </select>
          </div>
        </div>
                <div id="add_to_meN07` + div63 + `">
                  </div>
              `;
    document.getElementById("table25_id").value = value63;
    value63++;
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

//kTOV4_26
// 26 table 

  var value64 = document.getElementById("table26_id").value;
  value64++;
  var div64 = 1;

  document.getElementById("kTOV4_26Script").addEventListener('click', kTOV4_26);
  function kTOV4_26() {
    let bendr64 = "add_to_meN08" + div64;
    div64++;
    document.getElementById(bendr64).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <input type="text" class="form-control text-center" name="kTOV4_26nr` + value64 + `" placeholder="" autocomplete="off" value="` + value64 + `" readonly="readonly">
          </div>
          <div class="col-md-5 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kTOV4_26imonIstaig` + value64 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-2 mb-3">
            <select name="kTOV4_26kompGrupe` + value64 + `" class="form-select form-control">
              <option value=""></option>
              <option class="others" value="Mokymo (si)">Mokymo (si)</option>
              <option class="others" value="Tyrimų">Tyrimų</option>
              <option class="others" value="Bendrosios">Bendrosios</option>
              <option class="others" value="Dalykinės">Dalykinės</option>
            </select>
          </div>
          <div class="col-md-2 mb-3">
            <input type="number" class="form-control text-center" name="kTOV4_26trukmeVal` + value64 + `" min="0" onkeyup="if(this.value<0){this.value= this.value * -1}" autocomplete="off">
          </div>
          <div class="col-md-2 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kTOV4_26data` + value64 + `" autocomplete="off"></textarea>
          </div>
          </div>
                <div id="add_to_meN08` + div64 + `">
                  </div>
              `;
    document.getElementById("table26_id").value = value64;
    value64++;
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

//kTOV4_KV03
// 27 table 

  var value27 = document.getElementById("table27_id").value;
  value27++;
  var div27 = 1;

  document.getElementById("kv03Script").addEventListener('click', kv03);
  function kv03() {
    let bendr27 = "add_to_me27" + div27;
    div27++;
    document.getElementById(bendr27).innerHTML +=
      `
      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="kTOV4_KV03nr` + value27 + `" autocomplete="off" value="` + value27 + `" readonly="readonly">
                </div>
                <div class="col-md-3 mb-3">
                  <select name="kTOV4_KV03studKryptis` + value27 + `" class="form-select form-control">
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
                <div class="col-md-2 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_KV03salis` + value27 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_KV03institucija` + value27 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-3 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_KV03dalykas` + value27 + `" autocomplete="off"></textarea>
                </div>
                </div>
                <div id="add_to_me27` + div27 + `">
              `;
    document.getElementById("table27_id").value = value27;
    value27++;
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

// kTOV4_O01_1 
// 28.1. table  

  var value28 = document.getElementById("table281_id").value;
  value28++;
  var div28 = 1;

  document.getElementById("o01Script").addEventListener('click', o01);
  function o01() {
    let bendr28 = "add_to_me28" + div28;
    div28++;
    document.getElementById(bendr28).innerHTML +=
      `

      <div class="form-row">
                <div class="col-md-1 mb-3">
                  <input type="text" class="form-control text-center" name="kTOV4_O01_1nr` + value28 + `" autocomplete="off" value="` + value28 + `" readonly="readonly">
                </div>
                <div class="col-md-7 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_1veiklPobud` + value28 + `" autocomplete="off"></textarea>
                </div>
                <div class="col-md-4 mb-3">
                  <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_1isakNrData` + value28 + `" autocomplete="off"></textarea>
                </div>
                </div>
                <div id="add_to_me28` + div28 + `">
              `;
    document.getElementById("table281_id").value = value28;
    value28++;
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

// kTOV4_O01_2 
// 28.2.table  

  var value29 = document.getElementById("table282_id").value;
  value29++;
  var div29 = 1;

  document.getElementById("o01_2Script").addEventListener('click', o01_2);
  function o01_2() {
    let bendr29 = "add_to_me29" + div29;
    div29++;
    document.getElementById(bendr29).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                    <label for=""><br></label>
                    <input type="text" class="form-control text-center" name="kTOV4_O01_2nr` + value29 + `" autocomplete="off" value="` + value29 + `" readonly="readonly">
                  </div>
                  <div class="col-md-3 mb-3">
                    <label for="">Dėstytojas (pavardė, vardas)
                    </label>
                    <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_2destytojas` + value29 + `" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-8 mb-3">
                    <label for="">Veiklos pobūdis</label>
                    <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_2veiklPobud` + value29 + `" autocomplete="off"></textarea>
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-1 mb-3">
                    </div>
                  <div class="col-md-3 mb-3">
                    <label for="">Data, vieta</label>
                    <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_2dataVieta` + value29 + `" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-8 mb-3">
                    <label for="">Kiti komentarai</label>
                    <textarea type="text" rows="1" class="form-control " name="kTOV4_O01_2ktKomentarai` + value29 + `" autocomplete="off"></textarea>
                  </div>
                  </div>
                <div id="add_to_me29` + div29 + `">
              `;
    document.getElementById("table282_id").value = value29;
    value29++;
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

//kTOV4_29
// 29 table  

  var value65 = document.getElementById("table29_id").value;
  value65++;
  var div65 = 1;

  document.getElementById("kTOV4_29Script").addEventListener('click', kTOV4_29);
  function kTOV4_29() {
    let bendr65 = "add_to_meN09" + div65;
    div65++;
    document.getElementById(bendr65).innerHTML +=
      `
      <div class="form-row">
            <div class="col-md-1 mb-3">
              <input type="text" class="form-control text-center" name="kTOV4_29nr` + value65 + `" placeholder="" autocomplete="off" value="` + value65 + `" readonly="readonly">
            </div>
            <div class="col-md-6 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kTOV4_29veikla` + value65 + `" placeholder="" autocomplete="off"></textarea>
            </div>
            <div class="col-md-5 mb-3">
              <select name="kTOV4_29socPartneris` + value65 + `" class="form-select form-control">
                <option value=""></option>
                <option class="others" value="Mokslo ir švietimo institucijos">ŠV</option>
                <option class="others" value="Regioninės valdymo struktūros, socialinių partnerių organizacijos">SP</option>
                <option class="others" value="Darbdaviai">D</option>
              </select>
            </div>
          </div>
                <div id="add_to_meN09` + div65 + `">
                  </div>
              `;
    document.getElementById("table29_id").value = value65;
    value65++;
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

  var value30 = document.getElementById("tablekTOV4_S_id").value;
  value30++;
  var div30 = 1;

  document.getElementById("o01_3Script").addEventListener('click', o01_3);
  function o01_3() {
    let bendr30 = "add_to_me30" + div30;
    div30++;
    document.getElementById(bendr30).innerHTML +=
      `
      <div class="form-row">
            <div class="col-md-1 mb-3">
              <input type="text" class="form-control text-center" name="kTOV4_Snr` + value30 + `" placeholder="" autocomplete="off" value="` + value30 + `" readonly="readonly">
            </div>
            <div class="col-md-6 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kTOV4_Sstiprybes` + value30 + `" placeholder="" autocomplete="off"></textarea>
            </div>
            <div class="col-md-5 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kTOV4_Stobulintina` + value30 + `" placeholder="" autocomplete="off"></textarea>
            </div>
      </div>
      <div id="add_to_me30` + div30 + `">
              `;
    document.getElementById("tablekTOV4_S_id").value = value30;
    value30++;
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

// kV5_KT02 
// 30 table 

  var value32 = document.getElementById("table30_id").value;
  value32++;
  var div32 = 1;

  document.getElementById("kt02Script").addEventListener('click', kt02);
  function kt02() {
    let bendr32 = "add_to_me32" + div32;
    div32++;
    document.getElementById(bendr32).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                    <input type="text" class="form-control text-center" name="kV5_KT02nr` + value32 + `" autocomplete="off" value="` + value32 + `" readonly="readonly">
                  </div>
                  <div class="col-md-3 mb-3">
                    <select name="kV5_KT02studKryptis` + value32 + `"  class="form-select form-control">
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
                    <textarea type="text" rows="1" class="form-control " name="kV5_KT02diplomantas` + value32 + `" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-3 mb-3">
                    <select name="kV5_KT02studProgr` + value32 + `"class="form-select form-control">
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
                    <select name="kV5_KT02darboTema` + value32 + `" class="form-select form-control">
                      <option value=""></option>
                      <option class="others" value="Verslumo tematika">V</option>
                      <option class="others" value="Socialinės atsakomybės, darnios plėtros tematika">SA/DP</option>
                    </select>
                  </div>
                </div>
                <div id="add_to_me32` + div32 + `">
              `;
    document.getElementById("table30_id").value = value32;
    value32++;
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

// kV5_KT01 
// 31 table 

  var value31 = document.getElementById("table31_id").value;
  value31++;
  var div31 = 1;

  document.getElementById("kt01Script").addEventListener('click', kt01);
  function kt01() {
    let bendr31 = "add_to_me31" + div31;
    div31++;
    document.getElementById(bendr31).innerHTML +=
      `
      <div class="form-row">
                  <div class="col-md-1 mb-3">
                    <label for=""><br></label>
                    <input type="text" class="form-control text-center" name="kV5_KT01nr` + value31 + `" autocomplete="off" value="` + value31 + `" readonly="readonly">
                  </div>

                  <div class="col-md-4 mb-3">
                    <label for="">Studijų kryptis</label>
                    <select name="kV5_KT01studKryptis` + value31 + `" class="form-select form-control">
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
                    <select name="kV5_KT01studProgr` + value31 + `"class="form-select form-control">
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
              <label for="">Studentas (pavardė, vardas)</label>
                    <textarea type="text" rows="1" class="form-control " name="kV5_KT01diplomantas` + value31 + `" autocomplete="off"></textarea>
                  </div>
                  </div>
                  <div class="form-row">
                    <div class="col-md-1 mb-3">
                    </div>
                  <div class="col-md-6 mb-3">
                    <label for="">Darbo tema</label>
                    <textarea type="text" rows="1" class="form-control " name="kV5_KT01darboTema` + value31 + `" autocomplete="off"></textarea>
                  </div>
                  <div class="col-md-5 mb-3">
                    <label for="">Užsakovas</label>
                    <textarea type="text" rows="1" class="form-control " name="kV5_KT01uzsakovas` + value31 + `" autocomplete="off"></textarea>
                  </div>
                  </div>
                <div id="add_to_me31` + div31 + `">
              `;
    document.getElementById("table31_id").value = value31;
    value31++;
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

// 32 table 1

  var value66 = document.getElementById("table321_id").value;
  value66++;
  var div66 = 1;

  document.getElementById("kTOV4_32socScript").addEventListener('click', kTOV4_32soc);
  function kTOV4_32soc() {
    let bendr66 = "add_to_meN10" + div66;
    div66++;
    document.getElementById(bendr66).innerHTML +=
      `
      <div class="form-row">
      <div class="col-md-3 mb-3">
          </div>
          <div class="col-md-9 mb-3">
            <textarea type="text" rows="1" class="form-control " name="kV5_32socaprasymas` + value66 + `" autocomplete="off"></textarea>
          </div>
          </div>
                <div id="add_to_meN10` + div66 + `">
                  </div>
              `;
    document.getElementById("table321_id").value = value66;
    value66++;
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

// 32 table 2

  var value67 = document.getElementById("table322_id").value;
  value67++;
  var div67 = 1;

  document.getElementById("kTOV4_32aplScript").addEventListener('click', kTOV4_32apl);
  function kTOV4_32apl() {
    let bendr67 = "add_to_meN11" + div67;
    div67++;
    document.getElementById(bendr67).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-3 mb-3">
            </div>
            <div class="col-md-9 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kV5_32aplinkaprasymas` + value67 + `" autocomplete="off"></textarea>
            </div>
          </div>
                <div id="add_to_meN11` + div67 + `">
                  </div>
              `;
    document.getElementById("table322_id").value = value67;
    value67++;
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

// 32 table 3

  var value68 = document.getElementById("table323_id").value;
  value68++;
  var div68 = 1;

  document.getElementById("kTOV4_32valsScript").addEventListener('click', kTOV4_32vals);
  function kTOV4_32vals() {
    let bendr68 = "add_to_meN12" + div68;
    div68++;
    document.getElementById(bendr68).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-3 mb-3">
            </div>
            <div class="col-md-9 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kV5_32valstybaprasymas` + value68 + `" autocomplete="off"></textarea>
            </div>
          </div>
                <div id="add_to_meN12` + div68 + `">
                  </div>
              `;
    document.getElementById("table323_id").value = value68;
    value68++;
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

// 32 table 4

  var value69 = document.getElementById("table324_id").value;
  value69++;
  var div69 = 1;

  document.getElementById("kTOV4_32etnoScript").addEventListener('click', kTOV4_32etno);
  function kTOV4_32etno() {
    let bendr69 = "add_to_meN13" + div69;
    div69++;
    document.getElementById(bendr69).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-3 mb-3">
            </div>
            <div class="col-md-9 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kV5_32etnoaprasymas` + value69 + `" autocomplete="off"></textarea>
            </div>
          </div>
                <div id="add_to_meN13` + div69 + `">
                  </div>
              `;
    document.getElementById("table324_id").value = value69;
    value69++;
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

// 32 table 5

  var value70 = document.getElementById("table325_id").value;
  value70++;
  var div70 = 1;

  document.getElementById("kTOV4_32savScript").addEventListener('click', kTOV4_32sav);
  function kTOV4_32sav() {
    let bendr70 = "add_to_meN14" + div70;
    div70++;
    document.getElementById(bendr70).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-3 mb-3">
            </div>
            <div class="col-md-9 mb-3">
              <textarea type="text" rows="1" class="form-control " name="kV5_32savaprasymas` + value70 + `" autocomplete="off"></textarea>
            </div>
          </div>
                <div id="add_to_meN14` + div70 + `">
                  </div>
              `;
    document.getElementById("table325_id").value = value70;
    value70++;
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

// kV5_33 
// 33 table 

  var value71 = document.getElementById("table33_id").value;
  value71++;
  var div71 = 1;

  document.getElementById("kV5_33Script").addEventListener('click', kV5_33);
  function kV5_33() {
    let bendr71 = "add_to_meN15" + div71;
    div71++;
    document.getElementById(bendr71).innerHTML +=
      `
      <div class="form-row">
          <div class="col-md-1 mb-3">
            <label for=""><br></label>
            <input type="text" class="form-control text-center" name="kV5_33nr` + value71 + `" autocomplete="off" value="` + value71 + `" readonly="readonly">
          </div>
          <div class="col-md-4 mb-3">
                        <label for="">Veikla</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33veikla` + value71 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-4 mb-3">
                        <label for="">Veiklos partneris</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33veiklPartner` + value71 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-3 mb-3">
                        <label for="">Organizacija, kurioje vykdyta veikla</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33organizac` + value71 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-1 mb-3">
          </div>
          <div class="col-md-2 mb-3">
            <label for="">Veikla orientuota į socialinės atskirties mažinimą</label>
            <select name="kV5_33veiklOrientavim` + value71 + `"class="form-select form-control">
              <option value=""></option>
              <option class="others" value="Taip">Taip</option>
              <option class="others" value="Ne">Ne</option>
            </select>
          </div>
          <div class="col-md-4 mb-3">
                        <label for=""><br><br>Dalyviai (VK personalas, studentai)</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33dalyviai` + value71 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-2 mb-3">
                        <label for=""><br><br>Laikas</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33laikas` + value71 + `" autocomplete="off"></textarea>
          </div>
          <div class="col-md-3 mb-3">
                        <label for=""><br><br>Vieta</label>
            <textarea type="text" rows="1" class="form-control " name="kV5_33vieta` + value71 + `" autocomplete="off"></textarea>
          </div>
          </div>
                <div id="add_to_meN15` + div71 + `">
                    </div>
              `;
    document.getElementById("table33_id").value = value71;
    value71++;
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

// kV5_34 
// 34 table 

  var value72 = document.getElementById("table34_id").value;
  value72++;
  var div72 = 1;

  document.getElementById("kV5_34Script").addEventListener('click', kV5_34); 
  function kV5_34() {
    let bendr72 = "add_to_meN16" + div72;
    div72++;
    document.getElementById(bendr72).innerHTML +=
      `
      <div class="form-row">
            <div class="col-md-1 mb-3">
              <label for=""><br></label>
              <input type="text" class="form-control text-center" name="kV5_34nr` + value72 + `" autocomplete="off" value="` + value72 + `" readonly="readonly">
            </div>
            <div class="col-md-4 mb-3">
                          <label for="">Projektų/programų/ mainų pavadinimas</label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34pavadinimas` + value72 + `" autocomplete="off"></textarea>
            </div>
            <div class="col-md-4 mb-3">
                          <label for="">Projekto vykdytojas, partneriai</label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34vykdytPartner` + value72 + `" autocomplete="off"></textarea>
            </div>
            <div class="col-md-3 mb-3">
                          <label for="">Dalyviai
                            (dėstytojai ir studentai)
                           </label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34dalyviai` + value72 + `" autocomplete="off"></textarea>
            </div>
            <div class="col-md-1 mb-3">
            </div>
            <div class="col-md-4 mb-3">
                          <label for="">Finansavimo šaltinis</label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34finansavim` + value72 + `" autocomplete="off"></textarea>
            </div>
            <div class="col-md-4 mb-3">
                          <label for="">Rezultatai</label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34rezultatai` + value72 + `" autocomplete="off"></textarea>
            </div>
            <div class="col-md-3 mb-3">
                          <label for="">Šalis, data</label>
              <textarea type="text" rows="1" class="form-control " name="kV5_34salisData` + value72 + `" autocomplete="off"></textarea>
            </div>
            </div>
                <div id="add_to_meN16` + div72 + `">
                  </div>
              `;
    document.getElementById("table34_id").value = value72;
    value72++;
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

 //textarea size
  var tx = document.getElementsByTagName('textarea');
  for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
  }

  function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
  }

