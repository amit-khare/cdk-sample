import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';

export class CdkSampleStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create a Cognito User Pool
		const userPool = new cognito.UserPool(this, 'MyUserPool', {
			selfSignUpEnabled: true,
			signInAliases: { email: true },
			passwordPolicy: {
				minLength: 8,
				requireLowercase: true,
				requireUppercase: true,
				requireDigits: true,
				requireSymbols: true,
			},
		});

		// Create a Lambda function to be integrated with API Gateway
		const handler = new lambda.Function(this, 'MyLambdaFunction', {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: 'index.handler',
			code: lambda.Code.fromInline(`
        exports.handler = async (event) => {
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Hello from Lambda!' }),
          };
        };
      `),
		});

		// Create an API Gateway and configure Cognito authentication for it
		const api = new apigateway.RestApi(this, 'MyApi', {
			defaultCorsPreflightOptions: {
				allowOrigins: apigateway.Cors.ALL_ORIGINS,
			},
			defaultMethodOptions: {
				authorizer: new apigateway.CognitoUserPoolsAuthorizer(this, 'MyCognitoAuthorizer', {
					cognitoUserPools: [userPool],
				}),
			},
		});

		// Create a Lambda integration for the API Gateway
		const lambdaIntegration = new apigateway.LambdaIntegration(handler);

		// Create a resource and associate the Lambda integration with a method
		const resource = api.root.addResource('hello');
		resource.addMethod('GET', lambdaIntegration);
	}
}
