$rfcom = window.$rfcom || {};
(function X(self) {
    function playThisCrap(url) {
        const audio = new Audio(url);
        audio.loop = true;
        audio.play()
            .then(_ => _)
            .catch(_ => appendManPlayNode(_ => {
                playThisCrap(url);
                removeManPlayNode();
            }));
    }
    function playFirst() {
        const audios = document.getElementsByTagName('audio');
        document.addEventListener('play', e => {
            [...audios].filter(a => a !== e.target).forEach(a => a.pause());
        }, true);
        [...audios][0].play();
    }
    function appendManPlayNode(fn) {
        const link = document.createElement('A');
        link.classList.add('promoted');
        link.innerHTML = 'Play track';
        link.onclick = fn;
        document.getElementById('manualPlay').appendChild(link);
        document.getElementById('manualPlay').classList.add('activated');
    }

    function removeManPlayNode() {
        const a = document.getElementById('manualPlay');
        const b = document.querySelector('#manualPlay > a')
        a.innerHTML = '';
        a.classList.add('deleteMe');
        a.addEventListener('transitionend', () => b.remove());
    }
    self.playThisCrap = playThisCrap;
    self.playFirst = playFirst;
    $rfcom.appender.fireEvent('autoPlayerLoaded');

})($rfcom.player = $rfcom.player || {});
