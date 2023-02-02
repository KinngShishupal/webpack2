import "./heading.css"
class Heading {
    buttonCssClass ='hello-world-button' 
    render(){
        const h1 = document.createElement('h1');
        h1.classList.add('heading')
        const body  = document.querySelector('body');
        h1.innerHTML = 'Webpack Is Awesome';
        body.appendChild(h1)
}
}

export default Heading