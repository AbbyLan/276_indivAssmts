window.onload = function(){ 
    let inputNodelist = document.querySelectorAll('input');
    let allInputs = Array.prototype.slice.call(inputNodelist);
    // console.log("length: " + allInputs.length);

    let pNodelist = document.querySelectorAll('p');
    let pArr = Array.prototype.slice.call(pNodelist);
    // console.log("length: " + pArr.length);

    let gradeNumerators = [];
    let gradeDenominators = []
    let percentValues = [];
    // let gradeDenominator = [document.getElementById('gradeDenominator')];
    // let percent = [document.getElementById('percentValue')];

    allInputs.forEach(element => {
        let id = element.closest('[id]').id;
        // console.log("id: " + id);

        if (id == 'gradeNumerator'){
            gradeNumerators.push(element);
        }

        if (id == 'gradeDenominator'){
            gradeDenominators.push(element);
        }
    });

    pArr.forEach(element => {
        let id = element.closest('[id]').id;

        if (id == 'percentValue'){
            percentValues.push(element);
        }
    });

    // console.log("numerators length: " + gradeNumerators.length);
    // console.log("denominators length: " + gradeDenominators.length);
    // console.log("percentValues length: " + percentValues.length);

    gradeNumerators.forEach(function(numerator, index) {
        console.log(numerator, index);
        numerator.addEventListener("input", function(){
            if(gradeDenominators[index].value!=''){
                percentValues[index].innerHTML = this.value + " / " + gradeDenominators[index].value;
            }
            else {
                percentValues[index].innerHTML = this.value + " / 0";
            }
        });
    });

    gradeDenominators.forEach(function(denominator, index){
        denominator.addEventListener("input", function(){
            if(gradeNumerators[index].value!=''){
                percentValues[index].innerHTML = gradeNumerators[index].value + " / " + this.value;
            }
            else {
                percentValues[index].innerHTML = "0 / " + gradeNumerators[index].value;
            }
        });
    });
    
    // Traditional way to invoke onclick() version 1
    // gradeNumerator.onclick = function() {displayPercent()};

    // Traditional way to invoke onclick() version 2
    // gradeNumerator.addEventListener("click", myFunction);

    // Traditional way to invoke onclick() version 3
    // gradeNumerator.addEventListener("input", function(){
    //     if(gradeDenominator.value!=''){
    //         percent.innerHTML = this.value + " / " + gradeDenominator.value;
    //     }
    //     else {
    //         percent.innerHTML = this.value + " / 0";
    //     }
    // });

    // gradeNumerator.forEach(function(numerator, index) {
    //     console.log(numerator, index, gradeNumerator.length);
    //     numerator.addEventListener("input", function(){
    //         if(gradeDenominator[index].value!=''){
    //             percent[index].innerHTML = this.value + " / " + gradeDenominator[index].value;
    //         }
    //         else {
    //             percent[index].innerHTML = this.value + " / 0";
    //         }
    //     });
    // });

    // gradeDenominator.addEventListener("input", function(){
    //     if(gradeNumerator.value!=''){
    //         percent.innerHTML = gradeNumerator.value + " / " + this.value;
    //     }
    //     else {
    //         percent.innerHTML = "0 / " + gradeNumerator.value;
    //     }
    // });

    // ES 6 arrow method invoke onclick() version 1
    // gradeNumerator.addEventListener("input", () => displayPercent());
    // function displayPercent(){
    //     alert("The value of the input field was changed.");
    //     percent.innerHTML = "percent";
    // }
};