import { PolicyDocument } from 'aws-lambda';


const getPolicyDocument = (
    effect: string, 
    resource: string
): PolicyDocument => ({
    Version: '2012-10-17',
    Statement: [
        {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: resource
        }
    ]
})

export default getPolicyDocument;