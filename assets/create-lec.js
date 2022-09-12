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
//export {calcTablekTOV4};
