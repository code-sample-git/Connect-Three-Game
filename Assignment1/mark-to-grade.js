/** 
* @name: Assignement1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Michael Ng.
*/
function MarkToGrade() {
    const markInput = document.getElementById('mark-input-box');
    const validationMessage = document.getElementById('validation-message');
    const resultDisplay = document.getElementById('result');

    validationMessage.textContent = ''; // Clear previous messages
    resultDisplay.textContent = '';

    try {
        const mark = parseInt(markInput.value);
        if (isNaN(mark)) throw 'Please enter a numeric value.';
        if (mark < 0 || mark > 100) throw 'Marks must be between 0 and 100.';

        let grade;
        if (mark > 90) grade = 'A';
        else if (mark > 80) grade = 'B';
        else if (mark > 70) grade = 'C';
        else if (mark > 50) grade = 'D';
        else grade = 'F';

        resultDisplay.textContent = `Grade: ${grade}`;
    } catch (error) {
        validationMessage.textContent = error;
    }
}
