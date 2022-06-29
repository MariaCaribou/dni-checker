const dniValues = new Map([
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

function checkDni()
{
    let dniNumberInput = document.getElementById('dni-number');
    let areThereNumberErrors = checkNumberErrors(dniNumberInput.value);
    
    let dniLetterInput = document.getElementById('letter');
    let areThereLetterErrors = checkLetterErrors(dniLetterInput.value);
    if (areThereNumberErrors || areThereLetterErrors)
    {
        dniNumberInput.value = '';
        dniLetterInput.value = '';
        return false;
    }

    let dniLetter = calculateLetter(calculateRemainder(dniNumberInput.value));
    let messageElement = document.getElementById('message');

    if (dniLetterInput.value.toLowerCase() == dniLetter.toLowerCase())
    {
        messageElement.innerHTML = dniLetter + ' ES CORRECTA';
        messageElement.classList.remove('error-message');
        messageElement.classList.add('success-message');
    }
    else
    {
        messageElement.innerHTML = dniLetterInput.value + ' ES ERRÓNEA';
        messageElement.classList.remove('success-message');
        messageElement.classList.add('error-message');
    }

    let fullDniElement = document.getElementById('full-dni');
    fullDniElement.innerHTML = dniNumberInput.value + dniLetter;
    return false;
}

function checkNumberErrors(number)
{
    let result = false;
    if (number.length == '')
    {
        alert('Debe rellenar el campo NÚMERO');
        result = true;
    }
    
    if (isNaN(number))
    {
        alert('El apartado NÚMERO solo debe contener números');
        result = true;
    }
    
    return result;
}

function checkLetterErrors(letter)
{
    let result = false;
    if (letter.length == '')
    {
        alert('Debe rellenar el campo LETRA');
        result = true;
    }

    if (!isNaN(letter))
    {
        alert('El apartado LETRA solo debe contener una letra');
        result = true;
    }
    
    return result;
}

function calculateRemainder(number)
{
    let sum = 0;
    for(let i = 0; i < number.length; i++)
    {
        sum = sum + number[i];
    }
    return sum % 23;   
}

function calculateLetter(remainder)
{
    let letrasDNI = Object.fromEntries(dniValues.entries());
    return letrasDNI[remainder];
}