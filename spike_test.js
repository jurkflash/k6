/*
  Spike test is a variation of a stress test, but it does not gradually increase the load, 
  instead it spikes to extreme load over a very short window of time

  Run a stress test to:
  - Determine how your system will perform under a sudden surge of traffic
  - Determine if your system will recover once the traffic has subsided

  Success is based on expectations. Systems will generally react in 1 of 4 ways
  - Excellent: system performance is not degraded during the surge of traffic. 
    Response time is similar during low traffic and high traffic
  - Good: Response time is slower, but the system does not produce any errors. 
    All requests are handled
  - Poor: System produces errors during the surge of traffic, but recovers to normal after the traffic subsides
  - Bad: System crashes, and does not recover after the traffic has subsided
*/

import http from "k6/http";
import { sleep } from 'k6';

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
      { duration: '10s', target: 100 }, // below normal load
      { duration: '10s', target: 2500 },
      { duration: '10s', target: 5500 }, // spike to 1400 users
      { duration: '10s', target: 5500 }, // spike to 1400 users
      { duration: '10s', target: 400 }, // stay at 1400 for 3 minutes
      { duration: '10s', target: 100 }, // scale down. Recovery stage.
      { duration: '10s', target: 100 },
      { duration: '10s', target: 0 },
    ],
  };

const API_BASE_URL = 'https://localhost:5001';

export default () => {

    http.batch([
      ['GET', `https://virexvisitor.virbizevent.com/app/api/site/setting/1/value`],
    ]);

    sleep(0.5);
};