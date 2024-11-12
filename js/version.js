(function verFn(_v){
window.rfAppVersion=_v;
const l=location;
if(_v!==new URL(l.href).searchParams.get('v')){l.href=c(l.href);}
window.goto=x=>l.href=c(x);
function c(x){const u=new URL(x,l.href);u.searchParams.set('v',_v);return u.href;}
})('0.7.3');
