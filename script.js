const nameInput = document.querySelector('#input')
const enterBtn = document.querySelector('#button')
const nameText = document.querySelector('.name')
const countryNames = document.querySelectorAll('.country-name')
const countryLines = document.querySelectorAll('.country-line')
const translator = new Intl.DisplayNames(['en'], { type: 'region' })

function getData(name){
    fetch('https://api.nationalize.io/?name=' + name)
    .then((response) => response.json())
    .then((data) => {
        for(i = 0; i < 5; i++){
            countryNames[i].innerHTML = `${translator.of(data.country[i].country_id)} ${Math.round(data.country[i].probability * 1000) / 10}%`
            countryLines[i].style.width = `${data.country[i].probability * 632}px`
        }
    })
}

enterBtn.addEventListener('click', (event) => {
    event.preventDefault()
    nameText.innerHTML = nameInput.value
    getData(nameInput.value)
})

window.onload = function(){
    getData(nameText.innerHTML)
}