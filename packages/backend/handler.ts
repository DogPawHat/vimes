require('isomorphic-fetch');

import { 
  APIGatewayEvent,
  ProxyHandler,
  ProxyCallback,
  Callback,
  ProxyResult,
  Handler,
  CustomAuthorizerHandler
} from 'aws-lambda';
import {
  graphqlLambda,
  graphiqlLambda,
  LambdaGraphQLOptionsFunction
} from 'apollo-server-lambda';
import {
} from 'auth0-js';

import { decode } from 'jsonwebtoken';
import exeSchema from './src/api';
import checkJwt from './src/auth/checkJwt';
import getPolicyDoc from './src/auth/getPolicyDoc';
import getAuth0Viewer from './src/auth/getAuth0Viewer';
import getToken from './src/auth/getToken'

export const hello: ProxyHandler = (event, context, cb) => {
  try {

    if( !cb ) throw new Error('Lambda Callback not defined');

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!',
        input: event,
      }),
    };
    cb(null, response);
  } catch (e) {
    context.fail(e);
  }
}

export const auth: CustomAuthorizerHandler = (event, context, cb) => {
    if(cb == undefined) {
      throw new Error('Event needs callback')
    }

    const token = getToken(event);

    checkJwt(token)
      .then(async value => {
        const user = await getAuth0Viewer(token);
        cb(null, {
          principalId: value['sub'],
          policyDocument: getPolicyDoc('Allow', event.methodArn),
          context: {
            scope: value['scope']
          }
        }
      )
    })
    .catch(reason => {
      cb(reason);
    })
  };
  
export const graphql: Handler = (event, context, cb) => { 


  const callbackFilter: Callback = (error, output) => {
    if (error != null) {
      throw error;
    };

    if (cb == undefined) {
      throw new Error('Event needs callback')
    };

    if (
      (output == undefined) && 
      (typeof output !== 'object')
    ) {
      throw new Error('Output not what was expected')
    };

    console.log(output['statusCode']);
    console.log(output['headers']);
    console.log(output['body']);
    if(event.headers.origin === 'http://localhost:3000') {
      output['headers']['Access-Control-Allow-Origin'] = 'http://localhost:3000';
      output['headers']['Access-Control-Allow-Credentials'] = 'true';
    }
    cb(error, output);
  };

  const handler = graphqlLambda((event, context) => {
    console.log(event.requestContext.authorizer);
    return {
      schema: exeSchema,
      context: {
        viewer: {
          user_id: event.requestContext.authorizer.principalId,
          scope: event.requestContext.authorizer.scope
        }
      }
    }
  });




  return handler(event, context, callbackFilter);
};

export const graphiql = graphiqlLambda({
  endpointURL: '/dev/graphql',
});