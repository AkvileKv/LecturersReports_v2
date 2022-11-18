window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("submitReportId").addEventListener('click', submitMsgSave);
    var form = document.getElementById("form-submitReport-id");
    
    //Pateikti
    function submitMsgSave() {
        if (confirm('Ar tikrai norite pateikti ataskaitą? Ataskaita bus užrakinta, daugiau nebegalėsite jos redaguoti')) {
            // Save it!
            console.log('Taip');
            form.submit();
        } else {
            // Do nothing!
            console.log('Ne');
            return false;
        }
    }
});
