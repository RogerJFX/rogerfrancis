(function menuFn(menuNode, breadcrumbsNode) {

    const MENU = [
        {main: true, label: 'Home', uri: '/'},
        {main: true, label: 'My Application', uri: '/page/application/', i18: {de: 'Bewerbung'}},
        {main: true, label: '🎸 Takes', uri: '/page/takes/', i18: {de: '🎸 Aufnahmen'}},
        {main: true, label: 'Thanks', uri: '/page/thanx/', i18: {de: 'Danke'}},
        {main: true, label: 'Future', uri: '/page/future/', i18: {de: 'Zukunft'}},
        {main: true, label: 'Contact', uri: '/page/contact/', i18: {de: 'Kontakt'}},
        {main: true, label: '🇬🇧', uri: '/page/lang/', i18: {de: '🇩🇪'}},
        {main: false, label: 'Equipment', uri: '/page/application/equipment/'},
        {main: false, label: 'Guitars', uri: '/page/application/equipment/guitars/', i18: {de: 'Gitarren'}},
        {main: false, label: 'Amps', uri: '/page/application/equipment/amps/'},
        {main: false, label: 'Pedals', uri: '/page/application/equipment/pedals/'},
        {main: false, label: 'Recording', uri: '/page/application/equipment/recording/'},
        {main: false, label: 'Archive', uri: '/page/archive/'},
        {main: false, label: 'Before release', uri: '/page/archive/r0/'},
        {main: false, label: 'Imprint', uri: '/page/imprint/', i18: {de: 'Impressum'}},
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
            } else {
                el.setAttribute('onclick', `goto('${i.uri}')`);
            }
            el.innerHTML = findLabel(i);
            menuNode.appendChild(el);
        });
    })();

    (function createBreadcrumbs(color, colorInc) {
        if(!breadcrumbsNode) return;
        let col;
        function createItem(label) {
            col = (color += colorInc) > 255 ? 255 : color;
            const el = document.createElement('SPAN');
            el.classList.add('item');
            el.setAttribute('style', `color: rgb(${col},${col},${col})`);
            el.innerHTML = label;
            return el;
        }
        const matchingItems = findMatchingMenuItems().reverse();
        matchingItems.forEach(i => {
            const el = createItem(findLabel(i));
            el.setAttribute('onclick', `goto('${i.uri}')`);
            breadcrumbsNode.appendChild(el);
        });
        if(window.getLastBreadcrumbTitle) {
            const el = createItem(window.getLastBreadcrumbTitle());
            breadcrumbsNode.appendChild(el);
            document.title = window.getLastBreadcrumbTitle();
        } else {
            document.title = findLabel(matchingItems.reverse()[0]);
        }
    })(110, 30);

    window.goto = href => !sessionStorage.getItem('lang') ? location.href = window.impHref(href) : checkI18Avail(href)
        .then(i18 => location.href = window.impHref(i18))
        .catch(_ => location.href = window.impHref(href));

    (function imprint() {
        const node = document.createElement("A");
        node.classList.add('imprint');
        node.innerHTML = findLabel(MENU.find(i => i.label === 'Imprint'));
        node.setAttribute('href', '#');
        node.onclick = _ => goto('/page/imprint/');
        document.body.appendChild(node);
    })();

    function findLabel(item) {
        const lang = sessionStorage.getItem('lang');
        if(lang && item.i18 && item.i18[lang]) {
            return item.i18[lang];
        }
        return item.label;
    }

    function checkI18Avail(href) {
        return new Promise((resolve, reject) => {
            const requestedLang = sessionStorage.getItem('lang');
            const i18Uri = href + `index-${requestedLang}.html`;
            const xhr = new XMLHttpRequest();
            xhr.onload = _ => {
                if(xhr.status % 200 < 2) {
                    resolve(i18Uri);
                } else {
                    reject();
                }
            }
            xhr.open('HEAD', i18Uri);
            xhr.send(null);
        })
    }

    function log(href, action) {
        const xhr = new XMLHttpRequest();
        const data = {
            action: action ?? 'view',
            path: (href ?? location.href).replaceAll('&', '%26'),
            ua: navigator.userAgent
        }
        xhr.open('POST', '/log/logger.php');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(`data=${JSON.stringify(data)}`);
    }

    (function xLog() {
        log();
    })();

    window.logAction = log;

})(document.getElementById('head'), document.getElementById('breadcrumbs'));