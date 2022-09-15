// kD1_K01
// 2 table
//window.onload = calcTable2(); //iš edit
  function calcTable2() { //onchange event'as iškviečia

    var srautaisPlanValString = document.getElementById("srautaisPlan").value;
    var srautaisAtlValString = document.getElementById("srautaisAtl").value;
    var uzsienioPlanValString = document.getElementById("uzsienioPlan").value;
    var uzsienioAtlValString = document.getElementById("uzsienioAtl").value;

    //convert from string to float
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
    var srautaisAtlValSk = parseFloat(srautaisAtlValString) || 0;
    var uzsienioPlanValSk = parseFloat(uzsienioPlanValString) || 0;
    var uzsienioAtlValSk = parseFloat(uzsienioAtlValString) || 0;

    var visoPlanSuma = srautaisPlanValSk + uzsienioPlanValSk;
    var visoAtlSuma = srautaisAtlValSk + uzsienioAtlValSk;

    var planuotaVal = 0;
    var atliktaVal = 0;
    var planuota = "plan";
    var atlikta = "atl";

    for (let zx = 1; zx <= value1 - 1; zx++) {
      var bendras = planuota + zx;
      var bendras2 = atlikta + zx;

      var bendrPlanString = document.getElementById(bendras).value;
      var bendrAtlString = document.getElementById(bendras2).value;
      var bendrPlanSk = parseFloat(bendrPlanString) || 0;
      var bendrAtlSk = parseFloat(bendrAtlString) || 0;
      planuotaVal = planuotaVal + bendrPlanSk;
      atliktaVal = atliktaVal + bendrAtlSk;
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

    var num1 = document.getElementById("num1").value;
    var num2 = document.getElementById("num2").value;
    var num3 = document.getElementById("num3").value;
    var num4 = document.getElementById("num4").value;
    var num5 = document.getElementById("num5").value;
    var num6 = document.getElementById("num6").value;
    var num7 = document.getElementById("num7").value;
    var num8 = document.getElementById("num8").value;
    var num9 = document.getElementById("num9").value;
    var num10 = document.getElementById("num10").value;

    var num01 = parseFloat(num1) || 0;
    var num02 = parseFloat(num2) || 0;
    var num03 = parseFloat(num3) || 0;
    var num04 = parseFloat(num4) || 0;
    var num05 = parseFloat(num5) || 0;
    var num06 = parseFloat(num6) || 0;
    var num07 = parseFloat(num7) || 0;
    var num08 = parseFloat(num8) || 0;
    var num09 = parseFloat(num9) || 0;
    var num010 = parseFloat(num10) || 0;

    var planuotanum = num01 + num02 + num03 + num04 + num05;
    var atliktanum = num06 + num07 + num08 + num09 + num010;

    document.getElementById("planuota").value = planuotanum;
    document.getElementById("atlikta").value = atliktanum;
  }

//tMTEP3
  function calcTabletMTEP3() {

    var num11 = document.getElementById("num11").value;
    var num12 = document.getElementById("num12").value;
    var num13 = document.getElementById("num13").value;
    var num14 = document.getElementById("num14").value;
    var num15 = document.getElementById("num15").value;
    var num16 = document.getElementById("num16").value;
    var num17 = document.getElementById("num17").value;
    var num18 = document.getElementById("num18").value;
    var num19 = document.getElementById("num19").value;
    var num20 = document.getElementById("num20").value;

    var num011 = parseFloat(num11) || 0;
    var num012 = parseFloat(num12) || 0;
    var num013 = parseFloat(num13) || 0;
    var num014 = parseFloat(num14) || 0;
    var num015 = parseFloat(num15) || 0;
    var num016 = parseFloat(num16) || 0;
    var num017 = parseFloat(num17) || 0;
    var num018 = parseFloat(num18) || 0;
    var num019 = parseFloat(num19) || 0;
    var num020 = parseFloat(num20) || 0;

    var planuotanum2 = num011 + num012 + num013 + num014 + num015;
    var atliktanum2 = num016 + num017 + num018 + num019 + num020;

    document.getElementById("planuota2").value = planuotanum2;
    document.getElementById("atlikta2").value = atliktanum2;
  }

//kTOV4
  function calcTablekTOV4() {

    var num21 = document.getElementById("num21").value;
    var num22 = document.getElementById("num22").value;
    var num23 = document.getElementById("num23").value;
    var num24 = document.getElementById("num24").value;

    var num021 = parseFloat(num21) || 0;
    var num022 = parseFloat(num22) || 0;
    var num023 = parseFloat(num23) || 0;
    var num024 = parseFloat(num24) || 0;

    var planuotanum3 = num021 + num022;
    var atliktanum3 = num023 + num024;

    document.getElementById("planuota3").value = planuotanum3;
    document.getElementById("atlikta3").value = atliktanum3;
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
    for (let zx = 1; zx <= value59 - 1; zx++) {
      var bendrasLT_1 = trukmLT1 + zx;
      var bendrasNeLT_1 = trukmNeLT1 + zx;

      var num00 = document.getElementById(bendrasLT_1).value;
      var num01 = document.getElementById(bendrasNeLT_1).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum24_1 = trukmeLTnum24_1 + num000;
      trukmeNeLTnum24_1 = trukmeNeLTnum24_1 + num001;
    }
    // 2 table
    for (let zx = 1; zx <= value60 - 1; zx++) {
      var bendrasLT_2 = trukmLT2 + zx;
      var bendrasNeLT_2 = trukmNeLT2 + zx;

      var num00 = document.getElementById(bendrasLT_2).value;
      var num01 = document.getElementById(bendrasNeLT_2).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum24_2 = trukmeLTnum24_2 + num000;
      trukmeNeLTnum24_2 = trukmeNeLTnum24_2 + num001;
    }
    // 3 table
    for (let zx = 1; zx <= value61 - 1; zx++) {
      var bendrasLT_3 = trukmLT3 + zx;
      var bendrasNeLT_3 = trukmNeLT3 + zx;

      var num00 = document.getElementById(bendrasLT_3).value;
      var num01 = document.getElementById(bendrasNeLT_3).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum24_3 = trukmeLTnum24_3 + num000;
      trukmeNeLTnum24_3 = trukmeNeLTnum24_3 + num001;
    }
    // 4 table
    for (let zx = 1; zx <= value62 - 1; zx++) {
      var bendrasLT_4 = trukmLT4 + zx;
      var bendrasNeLT_4 = trukmNeLT4 + zx;

      var num00 = document.getElementById(bendrasLT_4).value;
      var num01 = document.getElementById(bendrasNeLT_4).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum24_4 = trukmeLTnum24_4 + num000;
      trukmeNeLTnum24_4 = trukmeNeLTnum24_4 + num001;
    }

    var isVisoTrukmeLT24 = trukmeLTnum24_1 + trukmeLTnum24_2 + trukmeLTnum24_3 + trukmeLTnum24_4;
    var isVisotrukmeNeLT24 = trukmeNeLTnum24_1 + trukmeNeLTnum24_2 + trukmeNeLTnum24_3 + trukmeNeLTnum24_4;

    document.getElementById("isVisoTrukmeValLT24").value = isVisoTrukmeLT24; //isveda i is viso langeli pagal ID
    document.getElementById("isVisoTrukmeValNeLT24").value = isVisotrukmeNeLT24;
  }

