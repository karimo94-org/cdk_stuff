import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambdaNodeJs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as apigw from 'aws-cdk-lib/aws-apigateway';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStuffStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
      super(scope, id, props);

      // The code that defines your stack goes here

      // example resource
      // const queue = new sqs.Queue(this, 'CdkStuffQueue', {
      //   visibilityTimeout: cdk.Duration.seconds(300)
      // });
      const lambdaFn = new lambdaNodeJs.NodejsFunction(this, 'lambda-fn', {
          functionName: 'dev-my-test-lambda',
          runtime: lambda.Runtime.NODEJS_22_X,
          handler: 'handler',
          entry: './lambdas/index.mjs',
          timeout: cdk.Duration.seconds(30),
          memorySize: 512,
          depsLockFilePath: './package-lock.json',
          bundling: {
              minify: true,
              nodeModules: ['proxy-agent', 'form-data']
          }
      });

      const apiSecret = secretsmanager.Secret.fromSecretNameV2(this, 'cloud-secret','cloud-secret-keys');
      apiSecret.grantRead(lambdaFn);

      const apiLogGroup = new logs.LogGroup(this, `dev-apigw-log-group`, {
          logGroupName: `dev-log-group`
      });
      apiLogGroup.grantWrite(new ServicePrincipal('apigateway.amazonaws.com'));


      //define api gateway resource
      const yourApiGw = new apigw.RestApi(this, `dev-api-gateway`, {
          restApiName: `dev-api-gw`,
          cloudWatchRole: true,
          deployOptions: {
              stageName: 'dev',
              loggingLevel: apigw.MethodLoggingLevel.INFO,
              accessLogDestination: new apigw.LogGroupLogDestination(apiLogGroup),
              accessLogFormat: apigw.AccessLogFormat.jsonWithStandardFields(),
              dataTraceEnabled: true
          }
      });

      //endpoint resource
      const endpointResource = yourApiGw.root.addResource('tester');
      endpointResource.addMethod('POST', new LambdaIntegration(lambdaFn));

      //you can setup or lookup your hosted zone, certificate, domain name routing, and route53 records optionally
  }
}
