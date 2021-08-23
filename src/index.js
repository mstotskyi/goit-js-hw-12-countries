 import countryCardTpl from './templates/template.hbs';
import './sass/main.scss';

import debounce from 'lodash.debounce'

const refs = {
form: document.querySelector('#form'),
input: document.querySelector('#search'),
container: document.querySelector('.root'),
};

let searchQuery = '';


const handlerInput = (e) => {
    e.preventDefault();
    refs.container.innerHTML = '';
    searchQuery = refs.input.value;
    if (searchQuery === ''){
        return
    } else {fetch (`https://restcountries.eu/rest/v2/name/${searchQuery}`)
    .then(response => response.json())
    .then(countries => renderListEl(countries))
    .catch(err=> alert (`Введите корректный запрос`))
}}
    
refs.form.addEventListener("input", debounce(handlerInput, 500));

function renderListEl (arr){
    let listElement = '';
    if (arr.length > 10) {
        alert (`Слишкоммного совпадений. Уточните свой запрос`)
        return
    }

    if (arr.length <= 1) {
        arr.forEach(country => {
            console.log(country);
        const countryCard = createCountryCard(country);
        refs.container.insertAdjacentHTML(`beforeend`, countryCard)

        function createCountryCard(country){
            return countryCardTpl(country);
        }
                } )
                return

    } else {arr.forEach(country => {
        listElement = `<li>${country.name}</li>`
        refs.container.insertAdjacentHTML(`beforeend`, listElement)
                } )
               }
                
    }
    
   