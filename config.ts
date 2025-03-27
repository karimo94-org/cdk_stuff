export const config: any = {
    env: {
        account: process.env.AWS_ACCOUNT,
        region: process.env.AWS_REGION
    },
    dev: {
        environment: 'dev',
        region: 'us-east-1',
        account:'',
        domainName:''
    }
};