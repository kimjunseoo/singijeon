#!/usr/bin/env node

import { confirm, editor, input, select, Separator } from "@inquirer/prompts";
import fileSelector from "inquirer-file-selector";
import { sendHttpRequests } from "./lib/core.js";
import fs from "fs";

const procotol = await select({
  message: "Select api protocols",
  choices: [
    {
      name: "REST API",
      value: "rest",
      description: "Send HTTP requests using REST API.",
      disabled: false,
    },
    {
      name: "GraphQL",
      value: "graphql",
      description: "Send HTTP requests using GraphQL",
      disabled: false,
    },
    new Separator(),
    {
      name: "gRPC",
      value: "grpc",
      description: "Send HTTP requests using gRPC",
      disabled: true,
    },
  ],
});

if (procotol == "rest") {
  const filePath = await fileSelector({
    message: "Select a file:",
    match: (file) => file.name.endsWith(".json"),
  });

  const dataFile = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(dataFile);

  if (!data.url) {
    throw new Error(`url is required in the test file(json)`);
  } else if (!data.duration) {
    throw new Error(`duration is required in the test file(json)`);
  } else if (!data.rate) {
    throw new Error(`rate is required in the test file(json)`);
  } else if (!data.method) {
    throw new Error(`method is required in the test file(json)`);
  }

  await sendHttpRequests(
    data.url,
    data.method,
    data.port,
    data.duration,
    data.rate,
    data.header,
    data.body
  );
}

if (procotol == "graphql") {
  const filePath = await fileSelector({
    message: "Select a file:",
    match: (file) => file.name.endsWith(".json"),
  });

  const dataFile = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(dataFile);
}
