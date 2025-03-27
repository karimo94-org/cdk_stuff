#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkStuffStack } from '../lib/cdk_stuff-stack';
import { config } from '../config';
import { merge } from 'lodash';
const app = new cdk.App();
const contextEnvironment:string = app.node.tryGetContext('environment');
const appConfig = merge(
  config.app,
  config[contextEnvironment]
);
appConfig['env'] = config.env;
new CdkStuffStack(app, 'CdkStuffStack', {
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
   env: { account: '088198150793', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
//arn:aws:iam::088198150793:role/karimo94-oidc-role