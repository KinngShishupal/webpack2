import Heading from "./components/heading/heading.js";
import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";

const heading = new Heading();
heading.render()
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();

// console.log('node env', process.env.NODE_ENV)
