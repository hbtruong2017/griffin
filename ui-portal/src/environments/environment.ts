// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const SERVER_URL = 'http://localhost:8080/api/';
const TBANK_API_URL = "https://tbankonline.com/SMUtBank_API/Gateway?Header=" 

export const environment = {
  production: false,

  REQUEST_OTP_URL: TBANK_API_URL,
  LOGIN_CUSTOMER_URL: TBANK_API_URL,
  GET_CUSTOMER_DETAILS: TBANK_API_URL,

  GET_EMPLOYEE_DETAILS: SERVER_URL + 'employees/',
  CLOCK_IN_URl_POST: SERVER_URL + 'timesheet',
  CLOCK_OUT_URl_POST: SERVER_URL + 'timesheet/',
  GET_TIMESHEET_URL: SERVER_URL + 'timesheet/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
