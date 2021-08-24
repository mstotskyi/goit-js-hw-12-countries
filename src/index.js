 import countryCardTpl from './templates/template.hbs';
 import './sass/main.scss';
 import '@pnotify/core/dist/BrightTheme.css';
 import "@pnotify/core/dist/PNotify.css";
 import debounce from 'lodash.debounce';
 import GetCountryList from './fetchCountries';

 import { error } from "@pnotify/core";


const refs = {
form: document.querySelector('#form'),
input: document.querySelector('#search'),
container: document.querySelector('.root'),
};

const getCountryList = new GetCountryList ();

const handlerInput = (e) => {
    e.preventDefault();
    getCountryList.query = refs.input.value.trim();
    refs.container.innerHTML = '';
    fetchCountries();
}
//   }}
    
refs.form.addEventListener("input", debounce(handlerInput, 700));

function fetchCountries(){
    getCountryList.fetchCountries().then(arr => {renderListEl(arr)})
}

function renderListEl (arr){
    let listElement = '';
    if (arr.length > 10) {
        error({
            title: 'Слишком  много совпадений.',
            text: 'Уточните запрос.'
          });
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
        listElement = `<li class="countries-listItem">${country.name}</li>`
        refs.container.insertAdjacentHTML(`beforeend`, listElement)
         })
        }
    }
                
    function createCountryCard(country){
       return countryCardTpl(country);
     }

     