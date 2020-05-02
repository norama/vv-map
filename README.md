# Historical weather chart

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Description](#description)
- [Usage](#usage)
- [Demo](#demo)
- [Available Scripts](#available-scripts)
  - [yarn start](#yarn-start)
  - [yarn build](#yarn-run-build)
- [Learn More](#learn-more)

## Description

This web application shows historical weather data using the [World Weather Online](https://www.worldweatheronline.com/developer/api/) servie for weather data and [amcharts 4](https://www.amcharts.com/docs/v4/) for display.

Data:

- min-max daily temperature
- dew point
- relative humidity
- wind (graph by speed with direction in arrow bullet)

## Usage

Start the application locally with [yarn start](#yarn-start) or use the [Demo](#demo).
By default, London weather is shown for March 2020.

Zoom: use hte minichart at the top to zoom into a specific date interval, then you can move this interval by dragging the segment in the minichart.

Specify shown data series: you can set which series are shown by clicking on the corresponding legend items on the right.

You can set the location and date range parameters on the parameters page 
(`Parameters` button in top-right corner or `<base URL>/parameters` URL in browser).

Then weather data is shown on the main page 
(`Show weather` button in top-right corner or `<base URL>/` URL in browser).

Both the weather and the parameter page read location parameters from query string, e.g. it is\
`?lat=47.203&lng=12.261&startDate=2020-01-16&endDate=2020-04-30` for the default London March 2020 setting. There is an optional name parameter for display.

Parameters:

- `lat`, `lng`: location latitude, longitude coordinates, 3 digit precision is used
- `startDate`, `endDate`: start and end dates, in `yyyy-MM-dd` format
- `name`: display name

## Demo

[Demo]() is available [here]();.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
