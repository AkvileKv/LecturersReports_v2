// kD1_K01
// 2 table
//window.onload = calcTable2(); //iš edit
  function calcTable2() { //onchange event'as iškviečia
    //convert from string to float
    var srautaisPlanValSk = parseFloat(document.getElementById("srautaisPlan").value) || 0;
    var srautaisAtlValSk = parseFloat(document.getElementById("srautaisAtl").value) || 0;
    var uzsienioPlanValSk = parseFloat(document.getElementById("uzsienioPlan").value) || 0;
    var uzsienioAtlValSk = parseFloat(document.getElementById("uzsienioAtl").value) || 0;

    var visoPlanSuma = srautaisPlanValSk + uzsienioPlanValSk;
    var visoAtlSuma = srautaisAtlValSk + uzsienioAtlValSk;

    var planuotaVal = 0;
    var atliktaVal = 0;
    var planuota = "plan";
    var atlikta = "atl";

    for (let zx = 1; zx <= document.getElementById("table2_id").value; zx++) {
      var bendras = planuota + zx;
      var bendras2 = atlikta + zx;
      var bendrPlanSk = parseFloat(document.getElementById(bendras).value) || 0;
      var bendrAtlSk = parseFloat(document.getElementById(bendras2).value) || 0;

      planuotaVal += bendrPlanSk;
      atliktaVal += bendrAtlSk;
    }
    document.getElementById("planuota4").value = planuotaVal;
    document.getElementById("atlikta4").value = atliktaVal;

    if (visoPlanSuma == planuotaVal) {
      document.getElementById("srautaisPlan").style.color = "black";
      document.getElementById("uzsienioPlan").style.color = "black";
    } else if (visoPlanSuma !== planuotaVal) {
      document.getElementById("srautaisPlan").style.color = "red";
      document.getElementById("uzsienioPlan").style.color = "red";
    }

    if (visoAtlSuma == atliktaVal) {
      document.getElementById("srautaisAtl").style.color = "black";
      document.getElementById("uzsienioAtl").style.color = "black";
    } else if (visoAtlSuma !== atliktaVal) {
      document.getElementById("srautaisAtl").style.color = "red";
      document.getElementById("uzsienioAtl").style.color = "red";
    }
  }

// nD2
  function calc() {

    let num01 = parseFloat(document.getElementById("num1").value) || 0;
    let num02 = parseFloat( document.getElementById("num2").value) || 0;
    let num03 = parseFloat(document.getElementById("num3").value) || 0;
    let num04 = parseFloat(document.getElementById("num4").value) || 0;
    let num05 = parseFloat(document.getElementById("num5").value) || 0;
    let num06 = parseFloat(document.getElementById("num6").value) || 0;
    let num07 = parseFloat(document.getElementById("num7").value) || 0;
    let num08 = parseFloat(document.getElementById("num8").value) || 0;
    let num09 = parseFloat(document.getElementById("num9").value) || 0;
    let num010 = parseFloat(document.getElementById("num10").value) || 0;

    document.getElementById("planuota").value = num01 + num02 + num03 + num04 + num05;
    document.getElementById("atlikta").value = num06 + num07 + num08 + num09 + num010;
  }

//tMTEP3
  function calcTabletMTEP3() {

    let num011 = parseFloat(document.getElementById("num11").value) || 0;
    let num012 = parseFloat(document.getElementById("num12").value) || 0;
    let num013 = parseFloat(document.getElementById("num13").value) || 0;
    let num014 = parseFloat(document.getElementById("num14").value) || 0;
    let num015 = parseFloat(document.getElementById("num15").value) || 0;
    let num016 = parseFloat(document.getElementById("num16").value) || 0;
    let num017 = parseFloat(document.getElementById("num17").value) || 0;
    let num018 = parseFloat(document.getElementById("num18").value) || 0;
    let num019 = parseFloat(document.getElementById("num19").value) || 0;
    let num020 = parseFloat(document.getElementById("num20").value) || 0;

    document.getElementById("planuota2").value = num011 + num012 + num013 + num014 + num015;
    document.getElementById("atlikta2").value = num016 + num017 + num018 + num019 + num020;
  }

//kTOV4
  function calcTablekTOV4() {

    let num021 = parseFloat(document.getElementById("num21").value) || 0;
    let num022 = parseFloat(document.getElementById("num22").value) || 0;
    let num023 = parseFloat(document.getElementById("num23").value) || 0;
    let num024 = parseFloat(document.getElementById("num24").value) || 0;

    document.getElementById("planuota3").value = num021 + num022;
    document.getElementById("atlikta3").value = num023 + num024;
  }

//  kTOV4_KV01
//24 table
  function calc24() {

    var trukmeLTnum24_1 = 0;
    var trukmeNeLTnum24_1 = 0;
    var trukmLT1 = "trukmLT1_";
    var trukmNeLT1 = "trukmNeLT1_";

    var trukmeLTnum24_2 = 0;
    var trukmeNeLTnum24_2 = 0;
    var trukmLT2 = "trukmLT2_";
    var trukmNeLT2 = "trukmNeLT2_";

    var trukmeLTnum24_3 = 0;
    var trukmeNeLTnum24_3 = 0;
    var trukmLT3 = "trukmLT3_";
    var trukmNeLT3 = "trukmNeLT3_";

    var trukmeLTnum24_4 = 0;
    var trukmeNeLTnum24_4 = 0;
    var trukmLT4 = "trukmLT4_";
    var trukmNeLT4 = "trukmNeLT4_";

    // 1 table
    for (let zx = 1; zx <= document.getElementById("table241_id").value; zx++) {
      let bendrasLT_1 = trukmLT1 + zx;
      let bendrasNeLT_1 = trukmNeLT1 + zx;
      let num000 = parseFloat(document.getElementById(bendrasLT_1).value) || 0;
      let num001 = parseFloat(document.getElementById(bendrasNeLT_1).value) || 0;

      trukmeLTnum24_1 +=  num000;
      trukmeNeLTnum24_1 += num001;
    }
    // 2 table
    for (let zx = 1; zx <= document.getElementById("table242_id").value; zx++) {
      let bendrasLT_2 = trukmLT2 + zx;
      let bendrasNeLT_2 = trukmNeLT2 + zx;
      let num000 = parseFloat(document.getElementById(bendrasLT_2).value) || 0;
      let num001 = parseFloat(document.getElementById(bendrasNeLT_2).value) || 0;

      trukmeLTnum24_2 += num000;
      trukmeNeLTnum24_2 += num001;
    }
    // 3 table
    for (let zx = 1; zx <= document.getElementById("table243_id").value; zx++) {
      let bendrasLT_3 = trukmLT3 + zx;
      let bendrasNeLT_3 = trukmNeLT3 + zx;
      let num000 = parseFloat(document.getElementById(bendrasLT_3).value) || 0;
      let num001 = parseFloat(document.getElementById(bendrasNeLT_3).value) || 0;

      trukmeLTnum24_3 +=  num000;
      trukmeNeLTnum24_3 += num001;
    }
    // 4 table
    for (let zx = 1; zx <= document.getElementById("table244_id").value; zx++) {
      let bendrasLT_4 = trukmLT4 + zx;
      let bendrasNeLT_4 = trukmNeLT4 + zx;
      let num000 = parseFloat(document.getElementById(bendrasLT_4).value) || 0;
      let num001 = parseFloat(document.getElementById(bendrasNeLT_4).value) || 0;
      
      trukmeLTnum24_4 += num000;
      trukmeNeLTnum24_4 += num001;
    }

    let isVisoTrukmeLT24 = trukmeLTnum24_1 + trukmeLTnum24_2 + trukmeLTnum24_3 + trukmeLTnum24_4;
    let isVisotrukmeNeLT24 = trukmeNeLTnum24_1 + trukmeNeLTnum24_2 + trukmeNeLTnum24_3 + trukmeNeLTnum24_4;

    document.getElementById("isVisoTrukmeValLT24").value = isVisoTrukmeLT24; //isveda i is viso langeli pagal ID
    document.getElementById("isVisoTrukmeValNeLT24").value = isVisotrukmeNeLT24;
  }

