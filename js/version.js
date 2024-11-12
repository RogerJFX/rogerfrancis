(function verFn(_v) {
    window.rfAppVersion = _v;
    const l = location;
    const v = new URL(l.href).searchParams.get('v');
    if(_v !== v) {
        l.href = cV(l.href);
    }
    window.goto = href => l.href = cV(href);
    function cV(href) {
        const u = new URL(href, l.href);
        u.searchParams.set('v', _v);
        return u.href;
    }
})('0.7.0');
