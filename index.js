#!/usr/bin/env node

import { input, select, Separator } from "@inquirer/prompts";
import { sendHttpRequests } from "./lib/core.js";

const procotol = await select({
  message: "Select api protocols",
  choices: [
    {
      name: "REST API",
      value: "rest",
      description: "Send HTTP requests using REST API.",
    },
    new Separator(),
    {
      name: "GraphQL",
      value: "graphql",
      description: "Send HTTP requests using GraphQL",
      disabled: true,
    },
    {
      name: "gRPC",
      value: "grpc",
      description: "Send HTTP requests using gRPC",
      disabled: true,
    },
  ],
});

if (procotol == "rest") {
  const url = await input({
    message:
      "Enter the endpoint url to send the request (ex. https://singijeon.com)",
    required: true,
  });
  const duration = await input({
    message: "How long will it be tested",
    required: true,
  });
  const rate = await input({
    message: "How many requests per second",
    required: true,
  });
  const method = await select({
    message: "What method will you use to request it",
    choices: [
      {
        name: "GET",
        value: "get",
      },
      {
        name: "POST",
        value: "post",
      },
      {
        name: "PATCH",
        value: "patch",
      },
      {
        name: "PUT",
        value: "put",
      },
      {
        name: "DELETE",
        value: "delete",
      },
    ],
  });
  const port = await input({
    message:
      "What port on the endpoint (default => on http -> 80 https -> 443 )",
  });

  await sendHttpRequests(url, method, port, duration, rate);
}

/* program
  .arguments("<url>")
  .requiredOption("-d, --duration <duration>", "How long will it be tested")
  .requiredOption("-r --rate <rate>", "How many requests per second")
  .option("-m --method <method>", "HTTP Method / default is GET ")
  .option(
    "-p --port <port>",
    "port number / default => on http -> 80 https -> 443"
  )
  .action((url) => {
    console.log("Start Request...");
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
 */
