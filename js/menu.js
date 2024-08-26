(function menuFn(menuNode, breadcrumbsNode) {

    const MENU = [
        {main: true, label: 'Home', uri: '/'},
        {main: true, label: 'My Application', uri: '/page/application/'},
        {main: true, label: '🎸 Takes', uri: '/page/takes/'},
        {main: true, label: 'Thanks', uri: '/page/thanx/'},
        {main: true, label: 'Future', uri: '/page/future/'},
        {main: false, label: 'Equipment', uri: '/page/application/equipment/'},
        {main: false, label: 'Guitars', uri: '/page/application/equipment/guitars/'},
        {main: false, label: 'Amps', uri: '/page/application/equipment/amps/'},
        {main: false, label: 'Pedals', uri: '/page/application/equipment/pedals/'},
        {main: false, label: 'Recording', uri: '/page/application/equipment/recording/'},
    ];

    function findMatchingMenuItems(onlyMain) {
        const pwd = location.pathname;
        return MENU.filter(i => (!onlyMain || i.main) && pwd.startsWith(i.uri)).sort((a, b) => b.uri.length - a.uri.length);
    }

    (function createMainMenu() {
        if(!menuNode) return;
        const pwd = findMatchingMenuItems(true)[0].uri;
        MENU.filter(i => i.main).forEach(i => {
            const el = document.createElement('SPAN');
            el.classList.add('item');
            if (i.uri === pwd) {
                el.classList.add('pwd');
            }
            el.setAttribute('onclick', `goto('${i.uri}')`);
            el.innerHTML = i.label;
            menuNode.appendChild(el);
        });
    })();

    (function createBreadcrumbs(color, colorInc) {
        if(!breadcrumbsNode) return;
        const matchingItems = findMatchingMenuItems().reverse();
        matchingItems.forEach(i => {
            const col = (color += colorInc) > 255 ? 255 : color;
            const el = document.createElement('SPAN');
            el.classList.add('item');
            el.setAttribute('onclick', `goto('${i.uri}')`);
            el.setAttribute('style', `color: rgb(${col},${col},${col})`)
            el.innerHTML = i.label;
            breadcrumbsNode.appendChild(el);
        });
        document.title = matchingItems.reverse()[0].label;
    })(110, 30);

})(document.getElementById('head'), document.getElementById('breadcrumbs'));