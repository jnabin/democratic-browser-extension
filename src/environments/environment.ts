// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The users of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  api_url:'https://crmapi.democratik.org',
  site_url:'https://localhost:4200',
  // api_url:'http://localhost:8081',
  democratik_api_url:'http://demokraticv2cache.loc',
  front_end_url:'https://portail.democratik.org',
  // front_end_url:'http://localhost:53268',
  secret_key:'predictive',
	AwsUserPoolId: 'ca-central-1_D8siwQ5fF',
  AwsIdentifyPoolId:'ca-central-1:9302861c-9209-40e5-ab93-2f07ff8b8b70', 
	AwsClientId: '4c9j2jju8bv6hatf0a8n2idp3b', 
  AwsRegion:'ca-central-1',
  stripeClientId:"ca_O5O3gZ03qzEXZ0fJNwZFjQzttyIBJlNY",
  stripePk:"pk_test_51NJDA1BlhtBlrWQOYhXa6uFydTcSpYEW9uDfF4lmqj8z7E9t3Z5r8RNG9VxNJT0MlbNWeWSdnLwcDXwPLwH0PvQy008rKpRUT4"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
