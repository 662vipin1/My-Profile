log = console.log;
function checkLength(password){
    p = {m:'', d:''}
    if(password.length < 8){
        p.m = 'Password must be at least 8 character long.';
        p.d = 10;
        log('Password lenght is less than 8 characters.')
    }
    return p;
}
function containsUppercase(password){
    checkPattern(password, /[A-Z]/g, 'uppercase');
    //
}
function containsLowercase(password){
    checkPattern(password, /[a-z]/g, 'uppercase');
    //
}
function containsNumber(password){
    checkPattern(password, /[0-9]/g, 'uppercase');
    //
}
function containsSpecialCharacter(password){
    checkPattern(password, /[^0-9a-zA-Z\s]/g, 'uppercase');
    //
}
function checkPattern(password, regexp, charType){
    let contain = password.match(regexp);
}