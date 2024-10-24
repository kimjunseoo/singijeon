import http from "http";
import https from "https";
import ProgressBar from "progress";
import { getAverage, getMedian } from "./util.js";

export async function sendHttpRequests(
  url,
  method,
  port,
  duration,
  rate,
  header,
  body
) {
  const interval = 1000 / rate;
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;
  const totalRequests = Math.ceil(duration * rate);
  const progressBar = new ProgressBar("Processing... [:bar] :percent", {
    total: totalRequests,
  });

  const requestUrl = new URL(url);
  const requestBody =
    body && typeof body === "object" ? JSON.stringify(body) : body;
  const requestOptions = {
    method: method ? method.toUpperCase() : "GET",
    headers: header,
    port: port
      ? port.toString()
      : requestUrl.protocol === "https:"
      ? "443"
      : "80",
  };

  let requestSuccessCount = 0;
  let requestErrorCount = 0;
  let responseSpeed = [];
  let responseStatus = new Map();

  const client = requestUrl.protocol === "https:" ? https : http;

  const intervalId = setInterval(() => {
    if (Date.now() >= endTime) {
      clearInterval(intervalId);

      progressBar.update(1);
      console.log();
      console.log(`#-----REPORT------#`);
      console.log(`Start Date : ${new Date(startTime).toISOString()}`);
      console.log(`End Date : ${new Date(endTime).toISOString()}`);
      console.log("Request");
      console.log(` - Success : ${requestSuccessCount}`);
      console.log(` - Fail : ${requestErrorCount}`);
      console.log("Response Status");
      responseStatus.forEach((value, key) => {
        console.log(` - ${key} : ` + value);
      });
      console.log("Reponse Speed");
      console.log(` - Average : ${getAverage(responseSpeed)}ms`);
      console.log(` - Minimum : ${Math.min(...responseSpeed)}ms`);
      console.log(` - Maximum : ${Math.max(...responseSpeed)}ms`);
      console.log(` - Median  : ${getMedian(responseSpeed)}ms`);
      console.log(`#-----------------#`);

      process.exit(0);
    }

    const requestStartDate = Date.now();

    const req = client.request(requestUrl, requestOptions, (res) => {
      let data = "";

      // 응답 데이터 처리
      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        let requestEndDate = Date.now();
        responseSpeed.push(requestEndDate - requestStartDate);
        ++requestSuccessCount;

        if (!responseStatus.has(res.statusCode)) {
          responseStatus.set(res.statusCode, 1);
        } else {
          responseStatus.set(
            res.statusCode,
            responseStatus.get(res.statusCode) + 1
          );
        }

        //console.log("Response Data:", data); // 응답 데이터 출력
        progressBar.tick();
      });
    });

    req.on("error", (err) => {
      //console.log("Request Error:", err.message);
      let requestEndDate = Date.now();
      responseSpeed.push(requestEndDate - requestStartDate);
      ++requestErrorCount;
      progressBar.tick();
    });

    // 요청 body가 있는 경우 전송
    if (requestBody) {
      req.write(requestBody);
    }

    req.end();
  }, interval);
}
