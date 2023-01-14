import { checkEnvironmentVariable } from "./util";

const API_ENDPOINT = import.meta.env.API_ENDPOINT;

checkEnvironmentVariable(API_ENDPOINT);

export {API_ENDPOINT}