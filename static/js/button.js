// Check of een antwoord de juiste argument heeft
function checkAnswer(answer) {
    const resultDiv = document.getElementById('result');
    const resultCon = document.getElementsByClassName('resultContainer')[0];
    const main = document.getElementsByClassName('main')[0];
    
    let counter = localStorage.getItem('counter') ? parseInt(localStorage.getItem('counter')) : 0;

    if (answer === 'correct') {
        main.style.display = "none";
        resultCon.style.display = "flex";
        counter += 1;
        localStorage.setItem('counter', counter);
        resultDiv.textContent = 'Correct!';
        resultDiv.style.color = 'green';
    } else {
        main.style.display = "none";
        resultCon.style.display = "flex";
        resultDiv.textContent = 'Helaas, dit was niet het juiste antwoord.';
        resultDiv.style.color = 'red';
    }
}