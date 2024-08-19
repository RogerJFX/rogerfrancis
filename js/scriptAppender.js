(function appenderFn() {

    function appendScript(scriptUrl) {
        const el = document.createElement('SCRIPT');
        if (window.rfAppVersion) {
            el.setAttribute('src', `${scriptUrl}?${window.rfAppVersion}`);
        } else {
            el.setAttribute('src', `${scriptUrl}?${new Date().getTime()}`);
        }
        document.head.appendChild(el);
    }

    function appendCss(cssUrl) {
        const el = document.createElement('LINK');
        el.setAttribute('rel', 'stylesheet');
        if (window.rfAppVersion) {
            el.setAttribute('href', `${cssUrl}?${window.rfAppVersion}`);
        } else {
            el.setAttribute('href', `${cssUrl}?${new Date().getTime()}`);
        }
        document.head.appendChild(el);
    }

    window.appendScript = scriptUrl => appendScript(scriptUrl);
    window.appendCSS = cssUrl => appendCss(cssUrl);
})();