# Pandora API

## Examples

You can see screen-shot examples of the web app in the [screens] folder

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

Note: **Show** is the number of slices to show in the chart (provided the artist has that many events) if not specified defaults to 25. 

Note 2: Each slice in the chart represents the number of events in a week in the result set.

#### Case Two

- **Artist**: Pearl Jam
- **Start Date**: 2016-01-01
- **End Date**: 2017-12-31

## Notes

We use these libraries in the front-end

- [D3] Version: 4.7.2 - http//cdnjs.cloudflare.com/ajax/libs/d3/4.7.2/d3.min.js
- [D3 Pie] Version: 0.2.1 - https://raw.githubusercontent.com/benkeen/d3pie/0.2.1/d3pie/d3pie.min.js
- [React] Version: 15.4.2 - https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.js
- React DOM Version: 15.4.2 - https://cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.js
- [Babel] Version: 6.21.1 - https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js


[screens]: https://github.com/ernestlv/pandora/tree/master/screens