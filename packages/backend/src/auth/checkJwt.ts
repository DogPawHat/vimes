import jwks from 'jwks-rsa';
import { verify, decode } from 'jsonwebtoken';
import { promisify } from 'bluebird';

const checkJwt = async (token: string) => {
    const decoded = decode(token, { complete: true });

    const uri = process.env.JWKS_URI;

    if(uri == undefined) {
        throw new Error('Please define JWKS_URI');
    };

    const client: jwks.JwksClient = jwks({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 10,
        strictSsl: true,
        jwksUri: uri
    }); 

    if(decoded == undefined) {
        throw new Error('Problem decoding JWT');
    };

    if(typeof decoded === 'string') {
        throw new Error(decoded);
    };

    const kid: string = decoded['header']['kid'];

    const _getKey = promisify(client.getSigningKey);

    const key = await _getKey(kid).then(k => (
        k.publicKey || k.rsaPublicKey
    ));
    
    if (!(key)) {
        throw new Error('Could not find key');
    }

    return verify(
        token,
        key, 
        { 
            audience: process.env.AUDIENCE,
            issuer: process.env.TOKEN_ISSUER
        }
    );
}

export default checkJwt;