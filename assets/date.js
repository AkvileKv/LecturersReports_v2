
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

