export class ExpTokenGenerator {
    expiration: number;

    constructor(expiration: number){
        this.expiration = expiration;
    }
    
    generate() {
        return new Number(Date.now() + this.expiration);
    }
}

