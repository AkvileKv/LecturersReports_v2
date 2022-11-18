window.addEventListener("DOMContentLoaded", function () {
    
    document.getElementById("patvirtintiId").addEventListener('click', confirmMsg);
    var form = document.getElementById("form-id");

    //Patvirtinti
    function confirmMsg() {
        //return window.confirm('Ar tikrai norite patvirtinti?');
        if (confirm('Ar tikrai norite patvirtinti?')) {
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