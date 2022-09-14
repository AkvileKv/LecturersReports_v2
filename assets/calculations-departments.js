// kTOV4_KV01 
// kTOV4_26
// 26 table


 /* The DOMContentLoaded event will fire as soon as the DOM hierarchy has 
 been fully constructed, the load event will do it when all the images 
 and sub-frames have finished loading. */

  //window.onload = calc26();
  document.addEventListener('DOMContentLoaded', calc26);

  function calc26() {

    var trukmeLTnum26_1 = 0;
    var trukmeNeLTnum26_1 = 0;
    var trukmLT1 = "trukmLT1_";
    var trukmNeLT1 = "trukmNeLT1_";

    var trukmeLTnum26_2 = 0;
    var trukmeNeLTnum26_2 = 0;
    var trukmLT2 = "trukmLT2_";
    var trukmNeLT2 = "trukmNeLT2_";

    var trukmeLTnum26_3 = 0;
    var trukmeNeLTnum26_3 = 0;
    var trukmLT3 = "trukmLT3_";
    var trukmNeLT3 = "trukmNeLT3_";

    var trukmeLTnum26_4 = 0;
    var trukmeNeLTnum26_4 = 0;
    var trukmLT4 = "trukmLT4_";
    var trukmNeLT4 = "trukmNeLT4_";

    // 1 table
    for (let zx = 1; zx <= document.getElementById("table261_id").value; zx++) {
      var bendrasLT_1 = trukmLT1 + zx;
      var bendrasNeLT_1 = trukmNeLT1 + zx;

      var num00 = document.getElementById(bendrasLT_1).value;
      var num01 = document.getElementById(bendrasNeLT_1).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum26_1 = trukmeLTnum26_1 + num000;
      trukmeNeLTnum26_1 = trukmeNeLTnum26_1 + num001;
      //console.log(trukmeNeLTnum26_1);
    }
    // 2 table
    for (let zx = 1; zx <= document.getElementById("table262_id").value; zx++) {
      var bendrasLT_2 = trukmLT2 + zx;
      var bendrasNeLT_2 = trukmNeLT2 + zx;

      var num00 = document.getElementById(bendrasLT_2).value;
      var num01 = document.getElementById(bendrasNeLT_2).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum26_2 = trukmeLTnum26_2 + num000;
      trukmeNeLTnum26_2 = trukmeNeLTnum26_2 + num001;
    }
    // 3 table
    for (let zx = 1; zx <= document.getElementById("table263_id").value; zx++) {
      var bendrasLT_3 = trukmLT3 + zx;
      var bendrasNeLT_3 = trukmNeLT3 + zx;

      var num00 = document.getElementById(bendrasLT_3).value;
      var num01 = document.getElementById(bendrasNeLT_3).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum26_3 = trukmeLTnum26_3 + num000;
      trukmeNeLTnum26_3 = trukmeNeLTnum26_3 + num001;
    }
    // // 4 table
    for (let zx = 1; zx <= document.getElementById("table264_id").value; zx++) {
      var bendrasLT_4 = trukmLT4 + zx;
      var bendrasNeLT_4 = trukmNeLT4 + zx;

      var num00 = document.getElementById(bendrasLT_4).value;
      var num01 = document.getElementById(bendrasNeLT_4).value;
      var num000 = parseFloat(num00) || 0;
      var num001 = parseFloat(num01) || 0;
      trukmeLTnum26_4 = trukmeLTnum26_4 + num000;
      trukmeNeLTnum26_4 = trukmeNeLTnum26_4 + num001;
    }

    var isVisoTrukmeLT24 = trukmeLTnum26_1 + trukmeLTnum26_2 + trukmeLTnum26_3 + trukmeLTnum26_4;
    var isVisotrukmeNeLT24 = trukmeNeLTnum26_1 + trukmeNeLTnum26_2 + trukmeNeLTnum26_3 + trukmeNeLTnum26_4;

    // isveda i "is viso" langeli MOKYMOSI pagal ID
    document.getElementById("isVisoTrukmeMokymValLT26").value = trukmeLTnum26_1;
    document.getElementById("isVisoTrukmeMokymValNeLT26").value = trukmeNeLTnum26_1;

    document.getElementById("isVisoTrukmeTyrimuValLT26").value = trukmeLTnum26_2;
    document.getElementById("isVisoTrukmeTyrimuValNeLT26").value = trukmeNeLTnum26_2;

    document.getElementById("isVisoTrukmeBendrValLT26").value = trukmeLTnum26_3;
    document.getElementById("isVisoTrukmeBendrValNeLT26").value = trukmeNeLTnum26_3;

    document.getElementById("isVisoTrukmeDalykValLT26").value = trukmeLTnum26_4;
    document.getElementById("isVisoTrukmeDalykValNeLT26").value = trukmeNeLTnum26_4;

    //isveda i "Is viso" langeli pagal ID
    document.getElementById("isVisoTrukmeValLT26").value = isVisoTrukmeLT24;
    document.getElementById("isVisoTrukmeValNeLT26").value = isVisotrukmeNeLT24;


    // priedas 6 lenteles
    document.getElementById("mokymosiLTtrukmeVal").value = trukmeLTnum26_1;
    document.getElementById("mokymosiNeLttrukmeVal").value = trukmeNeLTnum26_1;
    document.getElementById("mokymosiIsVisoVal").value = trukmeLTnum26_1 + trukmeNeLTnum26_1;

    document.getElementById("tyrimuLTtrukmeVal").value = trukmeLTnum26_2;
    document.getElementById("tyrimuNeLttrukmeVal").value = trukmeNeLTnum26_2;
    document.getElementById("tyrimuIsVisoVal").value = trukmeLTnum26_2 + trukmeNeLTnum26_2;

    document.getElementById("bendrosiosLTtrukmeVal").value = trukmeLTnum26_3;
    document.getElementById("bendrosiosNeLttrukmeVal").value = trukmeNeLTnum26_3;
    document.getElementById("bendrosiosIsVisoVal").value = trukmeLTnum26_3 + trukmeNeLTnum26_3;

    document.getElementById("dalykinesLTtrukmeVal").value = trukmeLTnum26_4;
    document.getElementById("dalykinesNeLttrukmeVal").value = trukmeNeLTnum26_4;
    document.getElementById("dalykinesIsVisoVal").value = trukmeLTnum26_4 + trukmeNeLTnum26_4;
  }