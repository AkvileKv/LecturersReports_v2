// function calcTable2() {
//
//   var srautaisPlanValString = document.getElementById("srautaisPlan").value;
//   var srautaisAtlValString = document.getElementById("srautaisAtl").value;
//   var uzsienioPlanValString = document.getElementById("uzsienioPlan").value;
//   var uzsienioAtlValString = document.getElementById("uzsienioAtl").value;
//
//   //convert from string to float
//   var srautaisPlanValSk = parseFloat(srautaisPlanValString) || 0;
//   var srautaisAtlValSk = parseFloat(srautaisAtlValString) || 0;
//   var uzsienioPlanValSk = parseFloat(uzsienioPlanValString) || 0;
//   var uzsienioAtlValSk = parseFloat(uzsienioAtlValString) || 0;
//
//   var visoPlanSuma = srautaisPlanValSk + uzsienioPlanValSk;
//   var visoAtlSuma = srautaisAtlValSk + uzsienioAtlValSk;
//
//   var planuotaVal = 0;
//   var atliktaVal = 0;
//   var planuota = "plan";
//   var atlikta = "atl";
//
//   for (let zx = 1; zx <= value1 - 1; zx++) {
//     var bendras = planuota + zx;
//     var bendras2 = atlikta + zx;
//
//     var bendrPlanString = document.getElementById(bendras).value;
//     var bendrAtlString = document.getElementById(bendras2).value;
//     var bendrPlanSk = parseFloat(bendrPlanString) || 0;
//     var bendrAtlSk = parseFloat(bendrAtlString) || 0;
//     planuotaVal = planuotaVal + bendrPlanSk;
//     atliktaVal = atliktaVal + bendrAtlSk;
//   }
//   document.getElementById("planuota4").value = planuotaVal;
//   document.getElementById("atlikta4").value = atliktaVal;
//
//   if (visoPlanSuma == planuotaVal) {
//     document.getElementById("srautaisPlan").style.color = "black";
//     document.getElementById("uzsienioPlan").style.color = "black";
//   } else if (visoPlanSuma !== planuotaVal) {
//     document.getElementById("srautaisPlan").style.color = "red";
//     document.getElementById("uzsienioPlan").style.color = "red";
//   }
//
//   if (visoAtlSuma == atliktaVal) {
//     document.getElementById("srautaisAtl").style.color = "black";
//     document.getElementById("uzsienioAtl").style.color = "black";
//   } else if (visoAtlSuma !== atliktaVal) {
//     document.getElementById("srautaisAtl").style.color = "red";
//     document.getElementById("uzsienioAtl").style.color = "red";
//   }
// }
