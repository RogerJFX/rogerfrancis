$rfcom = window.$rfcom || {};
(function appenderFn(self) {

    const eventRegistry = [];

    function appendScript(scriptUrl) {
        const el = document.createElement('SCRIPT');
        el.setAttribute('src', `${scriptUrl}?${window.rfAppVersion ?? new Date().getTime()}`);
        document.head.appendChild(el);
    }

    function appendCss(cssUrl) {
        const el = document.createElement('LINK');
        el.setAttribute('rel', 'stylesheet');
        el.setAttribute('href', `${cssUrl}?${window.rfAppVersion ?? new Date().getTime()}`);
        document.head.appendChild(el);
    }

    function fireEvent(name) {
        const existingEvent = eventRegistry.find(e => e.name === name);
        if(existingEvent) {
            existingEvent.listeners.forEach(f => f());
        }
    }

    function addEventListener(name, fn) {
        const existingEvent = eventRegistry.find(e => e.name === name);
        if(existingEvent) {
            existingEvent.listeners.push(fn);
        } else {
            eventRegistry.push({name: name, listeners: [fn]})
        }
    }

    window.appendScript = scriptUrl => appendScript(scriptUrl);
    window.appendCSS = cssUrl => appendCss(cssUrl);

    self.fireEvent = fireEvent;
    self.addEventListener = addEventListener;

})($rfcom.appender = $rfcom.appender || {});