import { 
  APIGatewayEvent,
  ProxyHandler,
  ProxyCallback,
  Callback,
  ProxyResult,
  Handler, 
} from 'aws-lambda';
import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
import exeSchema from './src/exeSchema';

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

export const graphql: Handler = (event, context, cb) => { 

  const callbackFilter: Callback = (error, output) => {
    if(
      output != undefined && 
      typeof output === 'object' &&
      output.hasOwnProperty('headers') &&
      cb != undefined
    ) {
      output['headers']['Access-Control-Allow-Origin'] = '*';
      cb(error, output);
    }
  };
  const handler = graphqlLambda({ schema: exeSchema });

  return handler(event, context, callbackFilter);
};

export const graphiql = graphiqlLambda({
  endpointURL: '/dev/graphql',
});