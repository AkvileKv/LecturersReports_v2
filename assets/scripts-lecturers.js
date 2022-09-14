// kD1_K01
// 2 table

  function addTable2() {

    var value1 = 3;
    var div = 1;
    var asd = "add_to_me01";
    
    var bendr = asd + div;
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
    // Kiekviename eilutės pridėjimo scripte aprašyta eilutė, kuri nusiunčia skaičių į hidden:
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