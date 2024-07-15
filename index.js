#!/usr/bin/env node

import { Command } from "commander";
import http from "http";
import https from "https";
import ProgressBar from "progress";

const program = new Command();

function getAverage(arr) {
  const sum = arr.reduce((acc, val) => acc + val, 0);
  const average = sum / arr.length;
  return average.toFixed(2);
}

function getMedian(arr) {
  const sortedArr = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sortedArr.length / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[mid - 1] + sortedArr[mid]) / 2;
  } else {
    return sortedArr[mid];
  }
}

async function sendHttpRequests(url, method, port, duration, rate) {
  const interval = 1000 / rate;
  const startTime = Date.now();
  const endTime = startTime + duration * 1000;
  const totalRequests = Math.ceil(duration * rate);
  const progressBar = new ProgressBar("Processing... [:bar] :percent", {
    total: totalRequests,
  });

  const requestUrl = new URL(url);
  const requestOptions = {
    method: method ? method.toUpperCase() : "GET",
    port: port
      ? port.toString()
      : requestUrl.protocol === "https:"
      ? "443"
      : "80",
  };
  console.log(requestOptions);
  let requestSuccessCount = 0; //요청 성공 횟수
  let requestErrorCount = 0; //요청 실패 횟수
  let responseSpeed = []; //응답 속도
  let responseStatus = new Map();

  var client = http;
  client = requestUrl.protocol == "https:" ? https : client;
  console.log(requestUrl.protocol);
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
      console.log(` - Average : ${getAverage(responseSpeed)}` + "ms");
      console.log(` - Minimum : ${Math.min(...responseSpeed)}` + "ms");
      console.log(` - Maximum : ${Math.max(...responseSpeed)}` + "ms");
      console.log(` - Median  : ${getMedian(responseSpeed)}` + "ms");
      console.log(`#-----------------#`);

      process.exit(0);
    }

    let reqeustStartDate = Date.now();

    const req = client.request(url, requestOptions, (res) => {
      // 요청 성공 처리

      let requestEndDate = Date.now();
      responseSpeed.push(requestEndDate - reqeustStartDate);
      ++requestSuccessCount;

      if (!responseStatus.has(res.statusCode)) {
        responseStatus.set(res.statusCode, 1);
      } else {
        responseStatus.set(
          res.statusCode,
          responseStatus.get(res.statusCode) + 1
        );
      }

      progressBar.tick();
    });

    req.on("error", (err) => {
      console.log(err);
      let requestEndDate = Date.now();
      responseSpeed.push(requestEndDate - reqeustStartDate);

      ++requestErrorCount;

      progressBar.tick();
    });

    req.end();
  }, interval);
}

program
  .arguments("<url>")
  .requiredOption("-d, --duration <duration>", "How long will it be tested")
  .requiredOption("-r --rate <rate>", "How many requests per second")
  .option("-m --method <method>", "HTTP Method / default is GET ")
  .option(
    "-p --port <port>",
    "port number / default => on http -> 80 https -> 443"
  )
  .action((url) => {
    console.log("요청을 시작합니다...");
    sendHttpRequests(
      url,
      program.opts().method,
      program.opts().port,
      program.opts().duration,
      program.opts().rate
    );
    return;
  });

program.parse(process.argv);
