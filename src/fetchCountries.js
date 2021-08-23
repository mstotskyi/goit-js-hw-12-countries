export default class GetCountryList{

    constructor () {

        this.searchQuery ='';

    }

fetchCountries() {
    return fetch (`https://restcountries.eu/rest/v2/name/${this.searchQuery}`)
    .then(response => response.json())
    .then(countries => {
        return countries;})
    .catch(err=> console.log(err))
}

get query() {
    return this.searchQuery;
}
set query(newQuery) {
    this.searchQuery = newQuery;
}
}