import { CustomAuthorizerEvent } from 'aws-lambda';

const getToken = (params: CustomAuthorizerEvent) => {

    if (!params.type || params.type !== 'TOKEN') {
        throw new Error("Expected 'event.type' parameter to have value TOKEN");
    }

    var tokenString = params.authorizationToken;
    if (!tokenString) {
        throw new Error("Expected 'event.authorizationToken' parameter to be set");
    }

    var match = tokenString.match(/^Bearer (.*)$/);
    if (!match || match.length < 2) {
        throw new Error("Invalid Authorization token - '" + tokenString + "' does not match 'Bearer .*'");
    }
    return match[1];
}

export default getToken;