(function versionFn(_v) {
    window.rfAppVersion = _v;
    const l = location;
    const v = new URL(l.href).searchParams.get('v');
    if(_v !== v) {
        l.href = `${l.protocol}//${l.host}${l.pathname}?v=${_v}`;
    }
    window.goto = url => l.href = `${url}?v=${_v}`;
})('0.6.2');