import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';
import { Construct } from 'constructs';
export class ApiGatewayLambdaExampleStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		// Create a Lambda function
		const lambdaFunction = new lambda.Function(this, 'MyLambdaFunction', {
			runtime: lambda.Runtime.NODEJS_18_X,
			handler: 'index.handler',
			code: lambda.Code.fromAsset(path.join(__dirname, 'lambda')),
		});

		// Create an API Gateway
		const api = new apigateway.RestApi(this, 'MyApi', {
			restApiName: 'My API Gateway',
		});

		// Create a Lambda integration for the API Gateway
		const lambdaIntegration = new apigateway.LambdaIntegration(lambdaFunction);

		// Create a resource and associate the Lambda integration with a method
		const resource = api.root.addResource('myresource');
		resource.addMethod('POST', lambdaIntegration);

		// Output the API Gateway endpoint URL
		new cdk.CfnOutput(this, 'ApiEndpoint', {
			value: api.url,
		});
	}
}
