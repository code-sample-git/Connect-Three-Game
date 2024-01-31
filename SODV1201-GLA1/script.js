//Create a h1 element
const h1 = document.createElement("h1");
//Add My Name Michael Ng to the h1 element
h1.innerHTML = "Michael Ng";
//Style the h1 element (align center and color gray or #A9A9A9
h1.style.textAlign = "center";
h1.style.color = "#A9A9A9";
//Add the h1 element to the body
document.body.appendChild(h1);


//Create two input elements and a button and add them to the body
const input1 = document.createElement("input");
const input2 = document.createElement("input");
const button = document.createElement("button");
button.innerHTML = "Add";
document.body.appendChild(input1);
document.body.appendChild(input2);
document.body.appendChild(button);

//Add a p element to the body
const p = document.createElement("p");
document.body.appendChild(p);

//Add listener to sum the input values and display the result on the page
button.addEventListener("click", function() {
    //Validate the input values
    if(!validate()){
        return;
    }
    const result = parseInt(input1.value) + parseInt(input2.value);
    p.innerHTML = result;
});

//Create an arrow function to vlidate the input values. If they are not numbers, display an error message
const validate = () => {
    //Remove the error message
    p.innerHTML = "";
    //Remove the red border
    input1.style.border = "";
    input2.style.border = "";

    //Check if the input values are numbers
    if (isNaN(input1.value) || isNaN(input2.value)) {
        //Set the error message
        p.innerHTML = "Please enter numbers only";
        //Set the input box with red border
        if(isNaN(input1.value)){
            input1.style.border = "1px solid red";
        }
        if(isNaN(input2.value)){
            input2.style.border = "1px solid red";
        }
        return false;
    }else{
        return true;
    }
};
