
// document.addEventListener('DOMContentLoaded', function(){
//     const currentYear = document.querySelector('#currentYear');

//     function date() {
//        currentYear.innerHTML = new Date().getFullYear();
//     };

//     date();
// });

        //Same as:

document.addEventListener('DOMContentLoaded', date); 

    function date() {
        document.getElementById('currentYear').innerHTML = new Date().getFullYear();
    };

        //Same as:

// document.addEventListener('DOMContentLoaded', function(){

//     function date() {
//         document.getElementById('currentYear').innerHTML = new Date().getFullYear();
//     };

//     date();
// });

document.addEventListener('DOMContentLoaded', currentDate);
 
function currentDate(){
    document.getElementById("currentDate2").placeholder = new Date().toISOString().slice(0, 10);
    document.getElementById("currentDate3").placeholder = new Date().toISOString().slice(0, 10);
    document.getElementById("currentDate4").value = new Date().toISOString().slice(0, 10);
};

