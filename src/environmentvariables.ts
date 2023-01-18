import { checkEnvironmentVariable } from "./util";

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

checkEnvironmentVariable({VITE_API_ENDPOINT});

export {VITE_API_ENDPOINT}