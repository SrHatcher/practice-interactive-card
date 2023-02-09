const cardholderError = document.getElementById('cardholder-error')
const cardNumberError = document.getElementById('cardnumber-error')
const dateError = document.getElementById('dateError')
const cvcError = document.getElementById('cvcError')

function validateForm(){
    const cardHolder = document.getElementById('cardholder')
    const cardNumber = document.getElementById('cardnumber')
    const month = document.getElementById('month')
    const year = document.getElementById('year')
    const cvc = document.getElementById('cvc')

    if(cardHolder.value.trim() == ''){
        cardholderError.style.display = 'unset'
        cardHolder.classList.toggle('form__input_error--active', true)
    }else{
        cardHolder.classList.toggle('form__input_error--active', false)
        cardholderError.style.display = 'none'
    }
    
    if(cardNumber.value.trim() == ''){
        cardNumberError.innerText = "Can't be blank"
        cardNumber.classList.toggle('form__input_error--active', true)
        cardNumberError.style.display = 'unset'
    }else if(!Number(cardNumber.value.split(' ').join(''))){
        cardNumberError.innerText = "Wrong Format, numbers only"
        cardNumber.classList.toggle('form__input_error--active', true)
        cardNumberError.style.display = 'unset'
    }else{
        cardNumberError.style.display = 'none'
        cardNumber.classList.toggle('form__input_error--active', false)
    }

    let errorCount = 0
    if(month.value.trim()==''){
        dateError.innerText = "Can't be blank"
        dateError.style.display = 'unset'
        month.classList.toggle('form__input_error--active', true)
        errorCount++;
    }else if(!Number(month.value.split(' ').join(''))){
        dateError.innerText = 'Invalid value'
        dateError.style.display='unset'
        month.classList.toggle('form__input_error--active', true)
        errorCount++;
    }else if(Number(month.value.split(' ').join('')) > 12 || Number(month.value.split(' ').join('')) < 0){
        dateError.innerText = 'Invalid value'
        dateError.style.display = 'unset'
        errorCount++;
    }else{
        month.classList.toggle('form__input_error--active', false)
    }

    if(year.value.trim()==''){
        dateError.innerText = "Can't be blank"
        dateError.style.display = 'unset'
        year.classList.toggle('form__input_error--active', true)
    }else if(!Number(year.value.split(' ').join(''))){
        dateError.innerText = 'Invalid value'
        dateError.style.display = 'unset'
        year.classList.toggle('form__input_error--active', true)
    }else if(Number(year.value.split(' ').join('')) < 23 || Number(year.value.split(' ').join('')) > 30){
        dateError.innerText = 'Invalid value'
        dateError.style.display = 'unset'
        year.classList.toggle('form__input_error--active', true)
    }else{
        year.classList.toggle('form__input_error--active', false)
        if(!errorCount)
            dateError.style.display='none'
    }

    if(cvc.value.trim()==''){
        cvcError.innerText = "Can't be blank"
        cvcError.style.display = 'unset'
        cvc.classList.toggle('form__input_error--active', true)
    }else if(!Number(cvc.value.split(' ').join(''))){
        cvcError.innerText = "Invalid Value"
        cvcError.style.display = 'unset'
        cvc.classList.toggle('form__input_error--active', true)
    }else if(cvc.value.length > 3 || cvc.value.length < 3){
        cvcError.innerText = "Invalid Value"
        cvcError.style.display = 'unset'
        cvc.classList.toggle('form__input_error--active', true)
    }else{
        cvcError.style.display = 'none'
        cvc.classList.toggle('form__input_error--active', false)
    }
}



//code taken from: http://jsfiddle.net/217u7fru/506/
//I read it all and it's simply crazy :O

input_credit_card = function(input)
{
    var format_and_pos = function(char, backspace)
    {
        var start = 0;
        var end = 0;
        var pos = 0;
        var separator = " ";
        var value = input.value;

        if (char !== false)
        {
            start = input.selectionStart;
            end = input.selectionEnd;

            if (backspace && start > 0) // handle backspace onkeydown
            {
                start--;

                if (value[start] == separator)
                { start--; }
            }
            // To be able to replace the selection if there is one
            value = value.substring(0, start) + char + value.substring(end);

            pos = start + char.length; // caret position
        }

        var d = 0; // digit count
        var dd = 0; // total
        var gi = 0; // group index
        var newV = "";
        var groups = /^\D*3[47]/.test(value) ? // check for American Express
        [4, 6, 5] : [4, 4, 4, 4];

        for (var i = 0; i < value.length; i++)
        {
            if (/\D/.test(value[i]))
            {
                if (start > i)
                { pos--; }
            }
            else
            {
                if (d === groups[gi])
                {
                    newV += separator;
                    d = 0;
                    gi++;

                    if (start >= i)
                    { pos++; }
                }
                newV += value[i];
                d++;
                dd++;
            }
            if (d === groups[gi] && groups.length === gi + 1) // max length
            { break; }
        }
        input.value = newV;

        if (char !== false)
        { input.setSelectionRange(pos, pos); }
    };

    input.addEventListener('keypress', function(e)
    {
        var code = e.charCode || e.keyCode || e.which;

        // Check for tab and arrow keys (needed in Firefox)
        if (code !== 9 && (code < 37 || code > 40) &&
        // and CTRL+C / CTRL+V
        !(e.ctrlKey && (code === 99 || code === 118)))
        {
            e.preventDefault();

            var char = String.fromCharCode(code);
            
            // if the character is non-digit
            // OR
            // if the value already contains 15/16 digits and there is no selection
            // -> return false (the character is not inserted)
            
            if (/\D/.test(char) || this.selectionStart === this.selectionEnd &&
            this.value.replace(/\D/g, '').length >=
            (/^\D*3[47]/.test(this.value) ? 15 : 16)) // 15 digits if Amex
            {
                return false;
            }
            format_and_pos(char);
        }
    });
    
    // backspace doesn't fire the keypress event
    input.addEventListener('keydown', function(e)
    {
        if (e.keyCode === 8 || e.keyCode === 46) // backspace or delete
        {
            e.preventDefault();
            format_and_pos('', this.selectionStart === this.selectionEnd);
        }
    });
    
    input.addEventListener('paste', function()
    {
        // A timeout is needed to get the new value pasted
        setTimeout(function(){ format_and_pos(''); }, 50);
    });
    
    input.addEventListener('blur', function()
    {
    	// reformat onblur just in case (optional)
        format_and_pos(this, false);
    });
};

input_credit_card(document.getElementById('cardnumber'));