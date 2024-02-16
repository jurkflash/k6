import http from "k6/http";
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    maxRedirects: 0,
    vus: 10,
    duration: '1m',
    noConnectionReuse: false
  };

export default () => {
    let response = http.get("https://localhost:5001/youtube");

    sleep(1);
};
