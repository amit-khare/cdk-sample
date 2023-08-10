// import * as cdk from 'aws-cdk-lib';
// import { Template } from 'aws-cdk-lib/assertions';
// import * as CdkSample from '../lib/cdk-sample-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk-sample-stack.ts
test('AWS Cognito Authentication', () => {
	// Replace 'YOUR_API_GATEWAY_ENDPOINT' with the actual URL of your API Gateway endpoint.
	const apiEndpoint = 'https://hrq1mhy9nj.execute-api.us-east-1.amazonaws.com/prod/hello';

	// Replace 'YOUR_COGNITO_ID_TOKEN' with the Cognito ID token obtained after user authentication.
	const cognitoIdToken = '40npdr8u9k5ge4n2fljjp9gsmg';

	// Make a GET request to the API Gateway endpoint with the Cognito ID token in the Authorization header.
	fetch(apiEndpoint, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cognitoIdToken}`,
		},
	})
		.then((response) => response.json())
		.then((data) => console.log(data))
		.catch((error) => console.error('Error:', error));
});
