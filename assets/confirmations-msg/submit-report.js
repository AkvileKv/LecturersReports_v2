document.getElementById("submitRep").addEventListener('click', submitMsgSave);
//Pateikti
function submitMsgSave() {
    return confirm('Ar tikrai norite pateikti ataskaitą? Ataskaita bus užrakinta, daugiau nebegalėsite jos redaguoti');
}