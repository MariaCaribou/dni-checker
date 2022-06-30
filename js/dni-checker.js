const dniValueMap = new Map([
    [0, 'T'],
    [1, 'R'],
    [2, 'W'],
    [3, 'A'],
    [4, 'G'],
    [5, 'M'],
    [6, 'Y'],
    [7, 'F'],
    [8, 'P'],
    [9, 'D'],
    [10, 'X'],
    [11, 'B'],
    [12, 'N'],
    [13, 'J'],
    [14, 'Z'],
    [15, 'S'],
    [16, 'Q'],
    [17, 'V'],
    [18, 'H'],
    [19, 'L'],
    [20, 'C'],
    [21, 'K'],
    [22, 'E'],
]);

const dniNumberInput = document.getElementById('dni-number');
const dniLetterInput = document.getElementById('dni-letter');
const outcomeMessageElement = document.getElementById('message');
const fullDniElement = document.getElementById('full-dni');

const numberInputIsEmptyAlertMessage = 'Debe rellenar el campo NÚMERO';
const numberInputIsNaNAlertMessage = 'El apartado NÚMERO solo debe contener números';
const letterInputIsEmptyAlertMessage = 'Debe rellenar el campo LETRA';
const letterInputIsNotLetterAlertMessage = 'El apartado LETRA solo debe contener una letra';

const successOutcomeMessage = ' ES CORRECTA';
const errorOutcomeMessage = ' ES ERRÓNEA';

const successOutcomeMessageCSSClass = 'success-message';
const errorOutcomeMessageCSSClass = 'error-message';

function checkDni()
{
    let areThereNumberErrors = checkNumberErrors(dniNumberInput.value);
    let areThereLetterErrors = checkLetterErrors(dniLetterInput.value);

    // Failsafe
    if (areThereNumberErrors || areThereLetterErrors)
    {
        return false;
    }

    calculateFullDni();

    return false;
}

function checkNumberErrors(number)
{
    let result = false;
    if (number.length == 0)
    {
        alert(numberInputIsEmptyAlertMessage);
        result = true;
    }
    
    if (isNaN(number))
    {
        alert(numberInputIsNaNAlertMessage);
        result = true;
    }
    
    return result;
}

function checkLetterErrors(letter)
{
    let result = false;
    if (letter.length == 0)
    {
        alert(letterInputIsEmptyAlertMessage);
        result = true;
    }

    if (!isNaN(letter))
    {
        alert(letterInputIsNotLetterAlertMessage);
        result = true;
    }
    
    return result;
}

function calculateFullDni()
{
    let dniLetter = getMatchingLetter(calculateRemainder(dniNumberInput.value));
    let doesDniLetterMatchMap = dniLetterInput.value.toLowerCase() == dniLetter.toLowerCase();
    fullDniElement.innerHTML = dniNumberInput.value + dniLetter;
    
    if (doesDniLetterMatchMap)
    {
        outcomeMessageElement.innerHTML = dniLetter + successOutcomeMessage;
        applySuccessMessageCSS();
    }
    else
    {
        outcomeMessageElement.innerHTML = dniLetterInput.value + errorOutcomeMessage;
        applyErrorMessageCSS();
    }
}

function calculateRemainder(number)
{
    let sum = 0;
    for(let i = 0; i < number.length; i++)
    {
        sum += number[i];
    }
    return sum % 23;   
}

function getMatchingLetter(remainder)
{
    let dniLetters = Object.fromEntries(dniValueMap.entries());
    return dniLetters[remainder];
}

function applySuccessMessageCSS()
{
    outcomeMessageElement.classList.remove(errorOutcomeMessageCSSClass);
    outcomeMessageElement.classList.add(successOutcomeMessageCSSClass);
}

function applyErrorMessageCSS()
{
    outcomeMessageElement.classList.remove(successOutcomeMessageCSSClass);
    outcomeMessageElement.classList.add(errorOutcomeMessageCSSClass);
}