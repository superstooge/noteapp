This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) and setup to run in Docker.

NodeJS version 8.10.0

## Running the code
- Clone this repo
- Download and install Docker [https://www.docker.com/get-started]
- Start the Docker service
- Open a terminal window and navigate to the cloned repo work directory
- run `docker-compose up`
- Open a browser window to `http://localhost:3004`

## Dependencies
# React app
  ```
  "dependencies": {
    "acorn": "^6.0.4",
    "ajv": "^6.5.5",
    "enzyme": "^3.7.0",
    "enzyme-adapter-react-16": "^1.7.0",
    "react": "^16.5.0",
    "react-dom": "^16.5.0",
    "react-redux": "^5.0.7",
    "react-router-dom": "^4.3.1",
    "react-scripts": "2.1.1",
    "react-test-renderer": "^16.6.3",
    "redux": "^4.0.0"
  },
  "devDependencies": {
    "jest": "^23.6.0",
    "jest-cli": "^23.6.0",
    "redux-mock-store": "^1.5.3"
  }
```

# Server
```
"dependencies": {
    "body-parser": "^1.18.3",
    "cors": "^2.8.4",
    "express": "^4.16.4",
    "jsonschema": "^1.2.4",
    "mongodb": "^3.1.8"
  }
```

## Scripts
 - [npm start](#npm-start)
 - [npm test](#npm-test)
 - [npm run build](#npm-run-build)


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](#deployment) for more information.

## Supported Browsers

By default, the generated project uses the latest version of React.

You can refer [to the React documentation](https://reactjs.org/docs/react-dom.html#browser-support) for more information about supported browsers.


# noteapp
