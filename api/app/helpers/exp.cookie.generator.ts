export class ExpCookieGenerator {
    expiration: number
    
    constructor(expiration: number){
        this.expiration = expiration;
    }
    
    generate() {
        return new Date(new Date().getTime() + this.expiration);
    }
}
