(function appenderFn() {

    function appendScript(scriptUrl) {
        const el = document.createElement('SCRIPT');
        el.setAttribute('src', `${scriptUrl}?${new Date().getTime()}`);
        document.head.appendChild(el);
    }

    function appendCss(cssUrl) {
        const el = document.createElement('LINK');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('href', `${cssUrl}?${new Date().getTime()}`);
        document.head.appendChild(el);
    }

    window.appendScript = scriptUrl => appendScript(scriptUrl);
    window.appendCSS = cssUrl => appendCss(cssUrl);
})();