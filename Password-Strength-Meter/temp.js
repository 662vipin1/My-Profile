const strengthMeter = document.getElementById('strength-meter')
const passwordInput = document.getElementById('password')
const reasonsContainer = document.getElementById('reasons')

passwordInput.addEventListener('input', updateStrengthMeter)
updateStrengthMeter()

function updateStrengthMeter() {
  const weaknesses = calculatePasswordStrength(passwordInput.value)

  let strength = 100
  reasonsContainer.innerHTML = ''
  weaknesses.forEach(weakness => {
    if (weakness == null) return
    strength -= weakness.deduction
    const messageElement = document.createElement('div')
    messageElement.innerText = weakness.message
    reasonsContainer.appendChild(messageElement)
  })
  strengthMeter.style.setProperty('--strength', strength)
}

function calculatePasswordStrength(password) {
  const weaknesses = []
  weaknesses.push(lengthWeakness(password))
  weaknesses.push(lowercaseWeakness(password))
  weaknesses.push(uppercaseWeakness(password))
  weaknesses.push(numberWeakness(password))
  weaknesses.push(specialCharactersWeakness(password))
  weaknesses.push(repeatCharactersWeakness(password))
  return weaknesses
}

function lengthWeakness(password){
    p = {m:'', d:''}
    if(password.length < 8){
        p.m = 'Password must be at least 8 character long.';
        p.d = 10;
        log('Password lenght is less than 8 characters.')
    }
    return p;
}

function uppercaseWeakness(password) {
  return characterTypeWeakness(password, /[A-Z]/g, 'uppercase characters')

}

function lowercaseWeakness(password) {
  return characterTypeWeakness(password, /[a-z]/g, 'lowercase characters')
}

function numberWeakness(password) {
  return characterTypeWeakness(password, /[0-9]/g, 'numbers')
}

function specialCharactersWeakness(password) {
  return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g, 'special characters')
}

function characterTypeWeakness(password, regex, type) {
  const matches = password.match(regex) || []

  if (matches.length === 0) {
    return {
      message: `Your password has no ${type}`,
      deduction: 20
    }
  }
}

function repeatCharactersWeakness(password) {
  const matches = password.match(/(.)\1/g) || []
  if (matches.length > 0) {
    return {
      message: 'Your password has repeat characters',
      deduction: matches.length * 10
    }
  }
}