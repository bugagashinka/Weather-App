export default class Component {
    constructor(host, props={}) {
        this.host = host;
        this.props = props;
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
                    const divElement = document.createElement('div');
                    divElement.innerHTML = item;
                    return divElement;
                } else {
                    if (typeof item.tag === 'function') {
                        const container = document.createElement('div');
                        new item.tag(container, item.props);
                        return container;
                    }
                    return item;
                }
            })
            .forEach(element => {
                this.host.appendChild(element);
            });
        }
    }

    render() {
        return 'Base component "render" implementation';
    }
}