# What is this project and how it works
This repository contains an app created with React. When you click on  'Add Address' button, fill the fields and click on confirm. A message on the right top corner will appear to tell you if the location you just typed can receive Net Poles' services. Also, a red area will appear on the map with this same location.

## To run
You'll need to run `yarn` after cloning the repository to install all the dependencies. Also, make sure to add a `Google Geocode API Key` in `src/constants.js` in the `GEOCODE_KEY` variable. Then you can just run `yarn start`.

# Choosed technologies
## `React Leaflet`: 
To use Google Maps API to generate a map, you'll need a `Google Maps API Key`, which is different then the `Google Geocode API Key`, so you would have to pay for two different Google services. In order to reduce price, we are using `React Leaflet`, which allows us to create many figures and events and show us a map;

## `Google Geocode`: 
Used to transform a string containing a place's address into coordinates of this place;

## `react-geocode`: 
This is goint to be used in order to simplify interactions with Google Geocode's API.

## `Typescript`: 
We are using Typescript because it can make the code scalable and also helps to avoid bugs as well as keep the code clean;

## `Atomic Design`: 
Atomic design is a project pattern. The idea is to organize better the components and improve scalability.
