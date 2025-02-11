import Parse from 'parse';

const PARSE_APPLICATION_ID = 'Mvti7phsJfrngsOWwqzzohEPFoFO451RDNBX51rA';
const PARSE_JAVASCRIPT_KEY = '17Tl1kMWMHhuXyc29JERiUl3lUvOVG7vPxd0NcLB';
const PARSE_SERVER_URL = 'https://parseapi.back4app.com/';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

export default Parse;