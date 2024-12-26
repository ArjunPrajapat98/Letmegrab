import _ from "lodash";

const DevHost = [
  "localhost",
  "https://fakestoreapi.com",
  "www.https://fakestoreapi.com"
];

const StagHost = [
  "https://fakestoreapi.com",
  "www.https://fakestoreapi.com"
];
const LiveHost = [
  "https://fakestoreapi.com",
  "www.https://fakestoreapi.com"
];
export const allowedWidgetDomains = [
  "http://localhost:3003/",
  "http://localhost:3002",
];

const hostname = window.location.hostname;

const s3_url = ""
const s3_prefix = ""

const regex =
  /(192)\.(168)(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])){2}$/gm;

const live = {
  api_baseurl: "https://fakestoreapi.com/",
  baseurl: "https://fakestoreapi.com/",
  socketurl: "",
  s3_url: "",
  s3_prefix: "",
  environment: 'live',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
};

const dev = {
  api_baseurl: "https://fakestoreapi.com/",
  baseurl: "https://fakestoreapi.com/",
  socketurl: "",
  s3_url,
  s3_prefix,
  environment: 'dev',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
    "Authorization": "Shailendra"
  },
};

const stag = {
  api_baseurl: "https://fakestoreapi.com/",
  baseurl: "https://fakestoreapi.com/",
  socketurl: "",
  s3_url: "",
  s3_prefix: "",
  environment: 'live',
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Accept-Language": "en",
  },
};

const AppConfig = _.includes(DevHost, hostname) || hostname.match(regex)
  ? dev
  : _.includes(LiveHost, hostname)
    ? live
    : _.includes(StagHost, hostname)
      ? stag
      : dev;

export default AppConfig;