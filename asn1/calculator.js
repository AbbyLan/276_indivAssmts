window.onload = function(){ 
    let inputNodelist = document.querySelectorAll('input');
    let allInputs = Array.prototype.slice.call(inputNodelist);
    // console.log("length: " + allInputs.length);

    let pNodelist = document.querySelectorAll('p');
    let pArr = Array.prototype.slice.call(pNodelist);
    // console.log("length: " + pArr.length);

    let rowsNodelist = document.querySelectorAll('tr');
    let rows = Array.prototype.slice.call(rowsNodelist);
    // console.log("row number: " + rows.length);

    let gradeNumerators = [];
    let gradeDenominators = []
    let weightValues = [];
    let percentages = [];
    // let percentValues = [];
    // let gradeDenominator = [document.getElementById('gradeDenominator')];
    // let percent = [document.getElementById('percentValue')];

    let addOneRow = document.getElementById('addActivity');
    let weightCalc = document.getElementById('weighted');
    let meanCalc = document.getElementById('mean');
    let output = document.getElementById('outputDisplay');
    let table = document.getElementById('gradeTable');

    allInputs.forEach(element => {
        let id = element.closest('[id]').id;
        // console.log("id: " + id);

        if (id == 'gradeNumerator'){
            gradeNumerators.push(element);
        }

        if (id == 'gradeDenominator'){
            gradeDenominators.push(element);
        }

        if (id == 'weightValue'){
            weightValues.push(element);
        }
    });

    pArr.forEach(element => {
        let id = element.closest('[id]').id;

        if (id == 'percentValue'){
            percentages.push(element);
        }
    });

    // console.log("numerators length: " + gradeNumerators.length);
    // console.log("denominators length: " + gradeDenominators.length);
    // console.log("percentages length: " + percentages.length);
    
    gradeDenominators.forEach(function(denominator, index){
        denominator.addEventListener('input', function(){
            let numerator = gradeNumerators[index].value;
            if(numerator!=''){
                percentages[index].innerHTML = numerator + " / " + this.value;
                let percent = numerator/this.value;
                // percentValues.push(percent);
                console.log("percent in row " + index + ": " + percent);
            }
            else {
                percentages[index].innerHTML = "0 / " + this.value;
            }
        });
    });

    gradeNumerators.forEach(function(numerator, index) {
        // console.log(numerator, index);
        numerator.addEventListener('input', function(){
            let denominator = gradeDenominators[index].value;
            if(denominator!=''){
                percentages[index].innerHTML = this.value + " / " + denominator;
                let percent = this.value/denominator;
                // percentValues.push(percent);
                console.log("percent in row " + index + ": " + percent);
            }
            else {
                percentages[index].innerHTML = this.value + " / 0";
            }
        });
    });

    addOneRow.addEventListener('click', function(){
        // console.log("To do: add one more row functionality");
        let row = table.insertRow(rows.length);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        cell1.innerHTML = "NEW CELL1";
        cell2.innerHTML = "NEW CELL2";
        cell3.innerHTML = "NEW CELL3";
        cell4.innerHTML = "NEW CELL4";
        cell5.innerHTML = "NEW CELL5";
    });
    
    weightCalc.addEventListener('click', function(){
        console.log("calculate weight!");
    });

    meanCalc.addEventListener('click', function(){
        // console.log("percent values: " + percentages.length);
        let sum = 0;
        gradeNumerators.forEach(function(numerator, index) {
            let denominator = gradeDenominators[index].value;
            let percent = numerator.value/denominator;
            sum += percent;
            console.log("sum now: " + sum);
        });
        let mean = sum/percentages.length;
        mean = Math.round((mean + Number.EPSILON) * 10000) / 10000
        console.log("Mean: " + mean);
        output.innerHTML = mean;
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