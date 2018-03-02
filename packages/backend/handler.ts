require('dotenv').config({ silent: true });
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
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import {
} from 'auth0-js';

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
          principalId: user['sub'],
          policyDocument: getPolicyDoc('Allow', event.methodArn),
          context: {
            scope: value['scope'],
            user: user
          }
        }
      )
    })
    .catch(reason => {
      cb(reason);
    })
  };

export const graphql: Handler = (event, context, cb) => { 
  if(cb == undefined) {
    throw new Error('Event needs callback')
  }
  if (!(event.headers)) {
    throw new Error('Event needs headers')
  }

  const callbackFilter: Callback = (error, output) => {
    if (
      (output != undefined) && 
      (typeof output === 'object') &&
      !!(output['headers'])
    ) {
      output['headers']['Access-Control-Allow-Origin'] = '*';
      cb(error, output);
    } else {
      throw new Error('Event needs headers')
    }
  };
  const handler = graphqlLambda({ 
    schema: exeSchema
  });

  return handler(event, context, callbackFilter);
};

export const graphiql = graphiqlLambda({
  endpointURL: '/dev/graphql',
});