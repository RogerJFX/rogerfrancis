(function menuFn(menuNode) {

    const MENU = [
        {label: 'Home', uri: '/index'},
        {label: 'My Application', uri: '/page/application/index'},
        {label: 'Future', uri: '/page/future/index'},
    ];

    (function createMenu() {
        const pwd = location.pathname;
        MENU.forEach(i => {
            const el = document.createElement('SPAN');
            el.classList.add('item');
            if (pwd.startsWith(i.uri)) {
                el.classList.add('pwd');
            }
            el.setAttribute('onclick', `goto('${i.uri}.html')`);
            el.innerHTML = i.label;
            menuNode.appendChild(el);
        });
    })();

})(document.getElementById('head'));