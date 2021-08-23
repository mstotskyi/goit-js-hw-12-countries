 import countryCardTpl from './templates/template.hbs';
 import './sass/main.scss';
 import debounce from 'lodash.debounce';
 import GetCountryList from './fetchCountries';

const refs = {
form: document.querySelector('#form'),
input: document.querySelector('#search'),
container: document.querySelector('.root'),
};

const getCountryList = new GetCountryList ();

const handlerInput = (e) => {
    e.preventDefault();
    refs.container.innerHTML = '';
     getCountryList.query = refs.input.value.trim();
    if (getCountryList.query === ''){
        return
    } else {
       fetchCountries();
  }}
    
refs.form.addEventListener("input", debounce(handlerInput, 700));

function fetchCountries(){
    getCountryList.fetchCountries().then(arr => {renderListEl(arr)})
}

function renderListEl (arr){
    let listElement = '';
    if (arr.length > 10) {
        alert (`Слишкоммного совпадений. Уточните свой запрос`)
        return
    }

    if (arr.length === 1) {
        arr.forEach(country => {
        const countryCard = createCountryCard(country);
        refs.container.insertAdjacentHTML(`beforeend`, countryCard)
        
        } )
            return
    } 
    
    if (arr.length > 2 && arr.length <= 10) {arr.forEach(country => {
        listElement = `<li>${country.name}</li>`
        refs.container.insertAdjacentHTML(`beforeend`, listElement)
         })
        }
    }
                
    function createCountryCard(country){
       return countryCardTpl(country);
     }