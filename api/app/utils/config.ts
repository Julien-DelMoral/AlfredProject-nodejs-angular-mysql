// imports
import { ExpCookieGenerator } from '../helpers';
import { ExpTokenGenerator } from '../helpers';
var TokenGenerator = require( "uuid-token-generator" );

// constantes
const inTenHours = 10 * 60 * 60 * 1000;
const inFifteenMinutes = 15 * 60 * 1000;
const inThirtySecondes = 30 * 1000;

export default {
    tokenGenerator: new TokenGenerator(256, TokenGenerator.BASE62),
    expCookie: new ExpCookieGenerator(inTenHours),
    expToken: new ExpTokenGenerator(inTenHours),
    expTokenMail: new ExpTokenGenerator(inFifteenMinutes)
}  