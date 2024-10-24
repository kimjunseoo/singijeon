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
- **Simple to run, but powerful. :** Test with simple json and a command in a single line of cli. It will be show various analysis data.

## How to use

### Get Singijeon

- Install Singijeon via `npm`

  ```
  npm install -g singijeon
  ```

  This will install singijeon in your machine

- System requirement
  - Singijeon runs on Windows, linux, macos with most recent LTS release of Node.js / NPM.

### How to use

- 1. Prepare a json file with the information you want to use for the test.
     Based on the type you want to test, make a json file according to the items below

  - REST API
    |Key|Value Type|Description|Example|Required|
    |------|---|---|---|---|
    |method|string|all of http method(get,post,put,patch,delete etc)|"POST"|True|
    |url|string|endpoint url to send request|"https://jsonplaceholder.typicode.com/posts"|True|
    |port|number|port number (443/80 is default on https/http)|443|False|
    |duration|number|How long will it be tested|10|True|
    |rate|number|How many requests per second|3|True|
    |header|object|HTTP Header| {"Content-type": "application/json; charset=UTF-8"}|False|
    |body|object|HTTP Body|{"title": "foo","body": "bar","userId": 1}|False|

    - example

    ```
    //data.json

      {
        "method": "POST",
        "url": "https://jsonplaceholder.typicode.com/posts",
        "port": 443,
        "duration": 3,
        "rate": 1,
        "header": {
          "Content-type": "application/json; charset=UTF-8"
        },
        "body": {
          "title": "foo",
          "body": "bar",
          "userId": 1
        }
      }
    ```

  - GraphQL
    |Key|Value Type|Description|Example|Required|
    |------|---|---|---|---|
    |method|string|http method(get or post)|"POST"|True|
    |url|string|endpoint url to send request|"https://swapi-graphql.netlify.app/.netlify/functions/index"|True|
    |port|number|port number (443/80 is default on https/http)|443|False|
    |duration|number|How long will it be tested|10|True|
    |rate|number|How many requests per second|3|True|
    |header|object|HTTP Header| {"Content-type": "application/json; charset=UTF-8"}|False|
    |body|object|GraphQL query converted to Json format. Recommend using https://datafetcher.com/graphql-json-body-converter|{"query": "{ allFilms { films { title } }}"}|False|

    - example

    ```
    //data.json

      {
        "method": "POST",
        "url": "https://swapi-graphql.netlify.app/.netlify/functions/index",
        "port": 443,
        "duration": 3,
        "rate": 1,
        "header": {
            "Content-type": "application/json;charset=UTF-8"
        },
        "body": {
            "query": "{ allFilms { films { title } }}"
        }
      }

    ```

- 2. Enter the command below in cli
     ```
     singijeon
     ```

- 3. Select the api protocols you want to test

- 4. Select the json file created in the first step.

  // If you don't know how to write a json file for test, you can refer to the example in the examples directory in this repository.
