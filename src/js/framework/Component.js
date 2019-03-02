export default class Component {
    constructor(host) {
        this.host = host;
        this._render();
    }

    _render() {
        this.host.innerHTML = "";
        const content = this.render();
        
        if (typeof content === 'string') {
            this.host.innerHTML = content;
        } else {
            console.log("Content as array = ", content);
            content.map(item => {
                if (typeof item === 'string') {
                    console.log('Handle string item ', item);
                    const divElement = document.createElement('div');
                    divElement.innerHTML = item;
                    return divElement;
                } else {
                    console.log('Handle item as component');
                    return item;
                }
            })
            .forEach(element => {
                console.log('---------iterate ', element);
                this.host.appendChild(element);
                console.log(this.host);
            });
        }
    }

    render() {
        return 'Base component "render" implementation';
    }
}