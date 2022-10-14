# Project Name

> A simple draggable react slider component with typescript support. 

## Getting Started

These instructions will show you how to use the slider.

## Installation

To install and set up the library, run:

```sh
$ npm install react-plain-slider
```

## Example

`App.tsx`

```js
import "./App.css";

import { Slider, Slide } from "react-plain-slider";

const App = () => {
  return (
    <div className="app">
      <Slider width="95%" height="300px">
        <Slide className="awesome-slide">
          <div>1</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>2</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>3</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>4</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>5</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>6</div>
        </Slide>
        <Slide className="awesome-slide">
          <div>7</div>
        </Slide>
      </Slider>
    </div>
  );
};

export default App;
```

`App.css`

```css
.app {
  background: #f5efe6;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.app .awesome-slide {
  background: #aebdca;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
}

.app .awesome-slide > div {
  background: #7895b2;
  width: 75%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4rem;
  font-weight: bold;
  border-radius: 15px;
  color: #aebdca;
}
```

## Options

### Slider

| Option         | Type   | Is required | Description            |
| -------------- | ------ | ----------- | ---------------------- |
| width          | string | True        | 'px' or '%' values     |
| ---            | ---    | ---         | ---                    |
| height         | string | True        | 'px' or '%' values     |
| ---            | ---    | ---         | ---                    |
| className      | string | False       | classname of outer div |
| ---            | ---    | ---         | ---                    |
| innerClassName | string | False       | classname of inner div |

### Slide

| Option    | Type   | Is required | Description        |
| --------- | ------ | ----------- | ------------------ |
| className | string | False       | classname of slide |

## Built With

- React
- Typescript

## Authors

- [Kulizon](https://github.com/Kulizon)
