(function versionFn(_version) {
	const url = new URL(location.href);
	const version = url.searchParams.get('v');
	if(!version || version !== _version) {
		location.href = `${location.protocol}//${location.host}${location.pathname}?v=${_version}`;
	}
	window.goto = url => location.href = `${url}?v=${_version}`;
})('0.0.2');
