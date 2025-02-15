import Parse from 'parse';

const PARSE_APPLICATION_ID = 
const PARSE_JAVASCRIPT_KEY = 
const PARSE_SERVER_URL =

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_SERVER_URL;

export default Parse;
