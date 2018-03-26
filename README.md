# Pandora API

## Examples

You can see screen-shot examples of the web app in the [screens] folder

## Server Side Requirements

Any Node Version that supports ES2017. I used:

- **Node** Version 9.5.0
- **NPM** Version 5.7.1

## Install

git clone https://github.com/ernestlv/pandora.git

npm install

## Run Server

npm start

## Open Web Application

http://localhost:3000

## Test Cases:

#### Case One

- **Artist**: Kanye West
- **Start Date**: 2017-01-01
- **End Date**: 2017-12-31
- **Show**: 10

Note: **Show** is the number of weeks to show in the chart (provided the artist has that many events per week) if not specified defaults to 25. 

Note 2: The Pie Chart is read clockwise.


#### Case Two

- **Artist**: Pearl Jam
- **Start Date**: 2016-01-01
- **End Date**: 2017-12-31

## Notes

We use these libraries in the front-end

- **D3** Version: 4.7.2 - https://cdnjs.cloudflare.com/ajax/libs/d3/4.7.2/d3.min.js
- **D3 Pie** Version: 0.2.1 - https://raw.githubusercontent.com/benkeen/d3pie/0.2.1/d3pie/d3pie.min.js
- **React** Version: 15.4.2 - https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js
- **React DOM** Version: 15.4.2 - https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.js
- **Babel** Version: 6.21.1 - https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js


[screens]: https://github.com/ernestlv/pandora/tree/master/screens