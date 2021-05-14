export class Authorization {
    public default: string;
    [authkey: string]: any

    constructor(options?) {

    }

    setDefaultAuthorization(authorization: string) {
        this.default = authorization;
    }

    getDefaultAuthorization() {
        return this.default;
    }

    setCustomAuthorization(authkey: string, authorization: string) {
        this[authkey] = authorization;
    }

    getCustomAuthorization(authkey: string) {
        return this[authkey];
    }

}