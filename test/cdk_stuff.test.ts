import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import * as CdkStuff from '../lib/cdk_stuff-stack';

// example test. To run these tests, uncomment this file along with the
// example resource in lib/cdk_stuff-stack.ts
test('SQS Queue Created', () => {
//   const app = new cdk.App();
//     // WHEN
//   const stack = new CdkStuff.CdkStuffStack(app, 'MyTestStack');
//     // THEN
//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
});
//these are individual unit tests
test('Lambda Fn Created', () => {
    const app = new cdk.App();
    const stack = new CdkStuff.CdkStuffStack(app, 'MyTestStack');
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::Function', {
        FunctionName: 'dev-my-test-lambda'
    })
});

test('API Gateway Created', () => {

});
//using describe means you have a test suite
describe('another-test', () => {
    it('check api gateway created has a GET/POST method', () => {
        const app = new cdk.App();
        const stack = new CdkStuff.CdkStuffStack(app, 'MyTestStack');
        const template = Template.fromStack(stack);
        template.hasResourceProperties('AWS::ApiGateway::Method', {
            HttpMethod: 'POST'
        });
    })
})
