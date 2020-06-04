# The impact of weather conditions on new coronavirus spreading

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

This web application shows historical weather data using the [World Weather Online](https://www.worldweatheronline.com/developer/api/) service for weather data and some COVID-19 APIs to display historical virus spread data for specified locations.

The chart library [amcharts 4](https://www.amcharts.com/docs/v4/) is used for display.

The COVID-19 APIs currently used:
- [Corona API](https://about-corona.net/documentation) for data per country
- [Covid API](https://covid-api.com/api) for data per province / USA city
Unfortunately this data latter data is often incomplete and only per country data is available
for the majority of locations. TODO: use country specific APIs to get data for provinces / ciities.

The country code is determinded by the [geonames](https://www.geonames.org/export/web-services.html) webservice, then the corresponding province is guessed by simplified approximate geographical distance.

The purpose is to examine if there is a relation between weather parameters and virus spread.
There is an article about one such calculation [here](https://www.medrxiv.org/content/10.1101/2020.03.16.20037168v1.full.pdf) and I tried to reproduce this on the calculation charts - however, I do not see a match here. Moreover, it is rather odd to estimate the precise number of daily confirmed cases as a function of weather parameters only - this should very much depend on the number previously confirmed cases as well as on the measures taken to prevent the spread of the virus.

My hypothesis is that there is a much simpler relation here: the virus tends to spread more intensively in humid air, that is, when relative humidity is nearly 100%, that is,
when the temperature decreases to dew point level. This hypothesis comes from the news from
ski slopes in Austria, Italy and Switzerland, then in Ecuador during the spring,
furthermore how the virus spread led to problems in mines,
how swimmers got infected possibly in the swimming pools and some minor investigations what 
was the weather like in Wo-Chan, China in January 2020 when the pandemy started.

I think that ocean also plays a role here, but it may be in favor of the virus as well as just the opposite. In New York it helps the virus but in Greece and minor islands in the Pacific Ocean it has opposite influence. This question is open for investigation. 

## Weather data

- min-max daily temperature
- temperature
- [dew point](https://en.wikipedia.org/wiki/Dew_point)
- [relative humidity](https://en.wikipedia.org/wiki/Relative_humidity)
- cloud cover
- wind (graph by speed with direction in arrow bullet)

## Estimate data

- `dew point - temperature` and relative humidity
- approximations based on the article [Roles of meteorological conditions in COVID-19 transmission on a worldwide scale](https://www.medrxiv.org/content/10.1101/2020.03.16.20037168v1.full.pdf)

## Usage

Start the application locally with [yarn start](#yarn-start) or use the [Demo](#demo).
By default, London weather is shown for March 2020.

Zoom: use the minichart at the top to zoom into a specific date interval, then you can move this interval by dragging the segment in the minichart.

Specify shown data series: you can set which series are shown by clicking on the corresponding legend items on the right.

The calculation estimates are shown in the `Calc` tab (switch tabs in the top-left corner).
Here there are 2 charts, the top chart shows virus daily / all confirmed cases data
and the bottom chart the suggested estimates: `dew point - temperature` and relative humidity.
The approximation from the article is shown on both charts, since it is already synchornised in time. For the bottom chart estimates it is necessary to shift the charts by 1-2 weeks relatively to each other because infections are detected usually with this delay.
For this purpose: the bottom minichart scrolls both charts synchronized,
while the top minichart only the top chart. Use these to pair the estimates with virus data
shifted in time.

You can set the location and date range parameters on the parameters page 
(`Parameters` button in top-right corner or\
`<base URL>/parameters` URL in browser).

Then weather data is shown on the main page 
(`Show weather` button in top-right corner or\
`<base URL>/` URL in browser).

Both the weather and the parameter page read location parameters from query string, e.g. it is\
`?lat=47.203&lng=12.261&startDate=2020-01-16&endDate=2020-04-30` for the default London March 2020 setting. There is an optional name parameter for display.

Parameters:

- `lat`, `lng`: location latitude, longitude coordinates, 3 digit precision is used
- `startDate`, `endDate`: start and end dates, in `yyyy-MM-dd` format
- `name`: display name

## Demo

[Demo](https://norama.github.io/vv-map) is available [here](https://norama.github.io/vv-map).

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
