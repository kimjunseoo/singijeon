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
  singijeon;
  ```

### How to use

- You can run this cli application through the command
  ```jsx
  singijeon;
  ```
- Steps

  1. Choose HTTP Protocol
  2. Depending on the HTTP Protocol, enter or select the information to proceed with the test.

  - If you have selected REST API, you need to input/select the information below.
    - Endpoint URL
    - duration
    - rate
    - method
    - port
