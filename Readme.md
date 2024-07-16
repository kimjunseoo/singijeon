<div align="center">
  <h1>Singijeon</h1>
<p align="center">
  Easy, Simple, Fast Load Testing Tool 
</p>
</div>

## Intro

- **Singijeon** is the simplest and fastest load testing tool. It shows various analyses of the test results.

## Feature

- **A variety of ways :** You can set HTTP methods, test duration, requests per second, ports, and so on.
- **Simple to run, but powerful. :** Test with a command in a single line of cli and show various analysis data.

## How to use

### Get Singijeon

- Install Singijeon via `npm`

  ```jsx
  npm install -g singijeon
  ```

  This will install singijeon in your machine

- System requirement
  - Singijeon runs on Windows, linux, macos with most recent LTS release of Node.js / NPM.

### Run your first test

- Enter the command below in cli
  ```jsx
  singijeon https://httpbin.org --duration 2 --rate 1
  ```
  This command sends a Get request to the https://httpbin.org server once per second to port 80 for two seconds.

### How to use

- You can run this cli application through the command
  ```jsx
  singijeon;
  ```
- Argument
  - After enter ‘singijeon’ , enter the server address to which the request is sent as a factor.
- Options
  - In order to use singijeon, you must use the options appropriately.

    | abbreviated | general    | description                  | example | required |
    | ----------- | ---------- | ---------------------------- | ------- | -------- |
    | -d          | --duration | How long will it be tested   | 10      | O        |
    | -r          | --rate     | How many requests per second | 5       | O        |
    | -m          | --method   | HTTP Method                  | POST    | X        |
    | -p          | --port     | port number                  | 3000    | X        |
