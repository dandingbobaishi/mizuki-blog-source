import{o as Ya,a as Ua,i as Oa,s as B,b as Q,e as Ne}from"./lifecycle.DVF-MmNy.js";import{ae as Xa,aa as Ha,aS as Ka,aT as Ga,i as Ja,u as Qa,aU as Za,aV as Oe,aW as tr,q as er,aX as gt,c as rt,o as p,f as Z,a as q,p as ar,b as rr,h as o,aw as Y,g as t,aY as qe,m as k,d as vt,s as d,e as n,r as i,v as ir,t as At}from"./utils.ClPA3TVn.js";import{a as nr,s as K}from"./render._AXDLIcZ.js";import{i as I}from"./if.DRvTFj1y.js";import{e as sr,i as or}from"./each.mNd3WOOO.js";import{b as Ve}from"./this.DDSXw0ep.js";import{s as Ye}from"./event-modifiers.gvea_hMH.js";import{I as m}from"./Icon.B4eW_Ob_.js";import{m as Dt}from"./config.zxfV4Loj.js";import{I as lr}from"./zh_TW.BW8a2Ucy.js";import{i as cr}from"./translation.BtylNtmN.js";import"./props.CJeR11Si.js";const dr=()=>performance.now(),G={tick:c=>requestAnimationFrame(c),now:()=>dr(),tasks:new Set};function Xe(){const c=G.now();G.tasks.forEach(s=>{s.c(c)||(G.tasks.delete(s),s.f())}),G.tasks.size!==0&&G.tick(Xe)}function ur(c){let s;return G.tasks.size===0&&G.tick(Xe),{promise:new Promise(S=>{G.tasks.add(s={c,f:S})}),abort(){G.tasks.delete(s)}}}function zt(c,s){Oe(()=>{c.dispatchEvent(new CustomEvent(s))})}function vr(c){if(c==="float")return"cssFloat";if(c==="offset")return"cssOffset";if(c.startsWith("--"))return c;const s=c.split("-");return s.length===1?s[0]:s[0]+s.slice(1).map(S=>S[0].toUpperCase()+S.slice(1)).join("")}function Ue(c){const s={},S=c.split(";");for(const M of S){const[D,T]=M.split(":");if(!D||T===void 0)break;const v=vr(D.trim());s[v]=T.trim()}return s}const fr=c=>c;function pr(c,s,S,M){var D=(c&Za)!==0,T="both",v,_=s.inert,C=s.style.overflow,g,h;function E(){return Oe(()=>v??=S()(s,M?.()??{},{direction:T}))}var A={is_global:D,in(){s.inert=_,zt(s,"introstart"),g=re(s,E(),h,1,()=>{zt(s,"introend"),g?.abort(),g=v=void 0,s.style.overflow=C})},out(w){s.inert=!0,zt(s,"outrostart"),h=re(s,E(),g,0,()=>{zt(s,"outroend"),w?.()})},stop:()=>{g?.abort(),h?.abort()}},W=Xa;if((W.nodes.t??=[]).push(A),nr){var f=D;if(!f){for(var u=W.parent;u&&(u.f&Ha)!==0;)for(;(u=u.parent)&&(u.f&Ka)===0;);f=!u||(u.f&Ga)!==0}f&&Ja(()=>{Qa(()=>A.in())})}}function re(c,s,S,M,D){var T=M===1;if(tr(s)){var v,_=!1;return er(()=>{if(!_){var w=s({direction:T?"in":"out"});v=re(c,w,S,M,D)}}),{abort:()=>{_=!0,v?.abort()},deactivate:()=>v.deactivate(),reset:()=>v.reset(),t:()=>v.t()}}if(S?.deactivate(),!s?.duration)return D(),{abort:gt,deactivate:gt,reset:gt,t:()=>M};const{delay:C=0,css:g,tick:h,easing:E=fr}=s;var A=[];if(T&&S===void 0&&(h&&h(0,1),g)){var W=Ue(g(0,1));A.push(W,W)}var f=()=>1-M,u=c.animate(A,{duration:C,fill:"forwards"});return u.onfinish=()=>{u.cancel();var w=S?.t()??1-M;S?.abort();var F=M-w,O=s.duration*Math.abs(F),R=[];if(O>0){var x=!1;if(g)for(var L=Math.ceil(O/16.666666666666668),a=0;a<=L;a+=1){var J=w+F*E(a/L),X=Ue(g(J,1-J));R.push(X),x||=X.overflow==="hidden"}x&&(c.style.overflow="hidden"),f=()=>{var it=u.currentTime;return w+F*E(it/O)},h&&ur(()=>{if(u.playState!=="running")return!1;var it=f();return h(it,1-it),!0})}u=c.animate(R,{duration:O,fill:"forwards"}),u.onfinish=()=>{f=()=>M,h?.(M,1-M),D()}},{abort:()=>{u&&(u.cancel(),u.effect=null,u.onfinish=gt)},deactivate:()=>{D=gt},reset:()=>{M===0&&h?.(1,0)},t:()=>f()}}function mr(c){const s=c-1;return s*s*s+1}function br(c,{delay:s=0,duration:S=400,easing:M=mr,axis:D="y"}={}){const T=getComputedStyle(c),v=+T.opacity,_=D==="y"?"height":"width",C=parseFloat(T[_]),g=D==="y"?["top","bottom"]:["left","right"],h=g.map(F=>`${F[0].toUpperCase()}${F.slice(1)}`),E=parseFloat(T[`padding${h[0]}`]),A=parseFloat(T[`padding${h[1]}`]),W=parseFloat(T[`margin${h[0]}`]),f=parseFloat(T[`margin${h[1]}`]),u=parseFloat(T[`border${h[0]}Width`]),w=parseFloat(T[`border${h[1]}Width`]);return{delay:s,duration:S,easing:M,css:F=>`overflow: hidden;opacity: ${Math.min(F*20,1)*v};${_}: ${F*C}px;padding-${g[0]}: ${F*E}px;padding-${g[1]}: ${F*A}px;margin-${g[0]}: ${F*W}px;margin-${g[1]}: ${F*f}px;border-${g[0]}-width: ${F*u}px;border-${g[1]}-width: ${F*w}px;min-${_}: 0`}}var gr=vt('<div class="fixed bottom-20 right-4 z-[60] max-w-sm"><div class="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up"><!> <span class="text-sm flex-1"> </span> <button class="text-white/80 hover:text-white transition-colors"><!></button></div></div>'),hr=vt('<div class="flex space-x-0.5"><div class="w-0.5 h-3 bg-white rounded-full animate-pulse"></div> <div class="w-0.5 h-4 bg-white rounded-full animate-pulse" style="animation-delay: 150ms;"></div> <div class="w-0.5 h-2 bg-white rounded-full animate-pulse" style="animation-delay: 300ms;"></div></div>'),xr=vt('<span class="text-sm text-[var(--content-meta)]"></span>'),yr=vt('<div role="button" tabindex="0"><div class="w-6 h-6 flex items-center justify-center"><!></div> <div class="w-10 h-10 rounded-lg overflow-hidden bg-[var(--btn-regular-bg)] flex-shrink-0"><img class="w-full h-full object-cover"/></div> <div class="flex-1 min-w-0"><div> </div> <div> </div></div></div>'),_r=vt('<div class="playlist-panel float-panel fixed bottom-20 right-4 w-80 max-h-96 overflow-hidden z-50"><div class="playlist-header flex items-center justify-between p-4 border-b border-[var(--line-divider)]"><h3 class="text-lg font-semibold text-90"> </h3> <button class="btn-plain w-8 h-8 rounded-lg"><!></button></div> <div class="playlist-content overflow-y-auto max-h-80"></div></div>'),wr=vt(`<!> <div><div role="button" tabindex="0" aria-label="显示音乐播放器"><!></div> <div><div class="flex items-center gap-3"><div class="cover-container relative w-12 h-12 rounded-full overflow-hidden cursor-pointer" role="button" tabindex="0"><img alt="封面"/> <div class="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"><!></div></div> <div class="flex-1 min-w-0 cursor-pointer" role="button" tabindex="0" aria-label="展开音乐播放器"><div class="text-sm font-medium text-90 truncate"> </div> <div class="text-xs text-50 truncate"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center"><!></button></div></div></div> <div><div class="flex items-center gap-4 mb-4"><div class="cover-container relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0"><img alt="封面"/></div> <div class="flex-1 min-w-0"><div class="song-title text-lg font-bold text-90 truncate mb-1"> </div> <div class="song-artist text-sm text-50 truncate"> </div> <div class="text-xs text-30 mt-1"> </div></div> <div class="flex items-center gap-1"><button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="隐藏播放器"><!></button> <button title="播放列表"><!></button></div></div> <div class="progress-section mb-4"><div class="progress-bar flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="播放进度" aria-valuemin="0" aria-valuemax="100"><div class="h-full bg-[var(--primary)] rounded-full transition-all duration-100"></div></div></div> <div class="controls flex items-center justify-center gap-2 mb-4"><button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button> <button class="btn-plain w-10 h-10 rounded-lg"><!></button> <button><!></button></div> <div class="bottom-controls flex items-center gap-2"><button class="btn-plain w-8 h-8 rounded-lg"><!></button> <div class="flex-1 h-2 bg-[var(--btn-regular-bg)] rounded-full cursor-pointer" role="slider" tabindex="0" aria-label="音量控制" aria-valuemin="0" aria-valuemax="100"><div></div></div> <button class="btn-plain w-8 h-8 rounded-lg flex items-center justify-center" title="收起播放器"><!></button></div></div> <!></div> <style>.orb-player {
	position: relative;
	backdrop-filter: blur(10px);
	-webkit-backdrop-filter: blur(10px);
}
.orb-player::before {
	content: '';
	position: absolute;
	inset: -2px;
	background: linear-gradient(45deg, var(--primary), transparent, var(--primary));
	border-radius: 50%;
	z-index: -1;
	opacity: 0;
	transition: opacity 0.3s ease;
}
.orb-player:hover::before {
	opacity: 0.3;
	animation: rotate 2s linear infinite;
}
.orb-player .animate-pulse {
	animation: musicWave 1.5s ease-in-out infinite;
}
@keyframes rotate {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}
@keyframes musicWave {
	0%, 100% { transform: scaleY(0.5); }
	50% { transform: scaleY(1); }
}
.music-player.hidden-mode {
	width: 48px;
	height: 48px;
}
.music-player {
    max-width: 320px;
    -webkit-user-select: none;
       -moz-user-select: none;
            user-select: none;
}
.mini-player {
    width: 280px;
    position: absolute;
    bottom: 0;
    right: 0;
    /*left: 0;*/
}
.expanded-player {
    width: 320px;
    position: absolute;
    bottom: 0;
    right: 0;
}
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.5;
    }
}
.progress-section div:hover,
.bottom-controls > div:hover {
    transform: scaleY(1.2);
    transition: transform 0.2s ease;
}
@media (max-width: 768px) {
    .music-player {
        max-width: 280px;
        /*left: 8px !important;*/
        bottom: 8px !important;
        right: 8px !important;
    }
    .music-player.expanded {
        width: calc(100vw - 16px);
        max-width: none;
        /*left: 8px !important;*/
        right: 8px !important;
    }
    .playlist-panel {
        width: calc(100vw - 16px) !important;
        /*left: 8px !important;*/
        right: 8px !important;
        max-width: none;
    }
    .controls {
        gap: 8px;
    }
    .controls button {
        width: 36px;
        height: 36px;
    }
    .controls button:nth-child(3) {
        width: 44px;
        height: 44px;
    }
}
@media (max-width: 480px) {
    .music-player {
        max-width: 260px;
    }
    .song-title {
        font-size: 14px;
    }
    .song-artist {
        font-size: 12px;
    }
    .controls {
        gap: 6px;
        margin-bottom: 12px;
    }
    .controls button {
        width: 32px;
        height: 32px;
    }
    .controls button:nth-child(3) {
        width: 40px;
        height: 40px;
    }
    .playlist-item {
        padding: 8px 12px;
    }
    .playlist-item .w-10 {
        width: 32px;
        height: 32px;
    }
}
@keyframes slide-up {
    from {
        transform: translateY(100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
.animate-slide-up {
    animation: slide-up 0.3s ease-out;
}
@media (hover: none) and (pointer: coarse) {
    .music-player button,
    .playlist-item {
        min-height: 44px;
    }
    .progress-section > div,
    .bottom-controls > div:nth-child(2) {
        height: 12px;
    }
}
/* 自定义旋转动画，停止时保持当前位置 */
@keyframes spin-continuous {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
.cover-container img {
    animation: spin-continuous 3s linear infinite;
    animation-play-state: paused;
}
.cover-container img.spinning {
    animation-play-state: running;
}
/* 让主题色按钮更有视觉反馈 */
button.bg-\\[var\\(--primary\\)\\] {
    box-shadow: 0 0 0 2px var(--primary);
    border: none;
}</style>`,1);function zr(c,s){rr(s,!1);let S=Dt.meting_api,M=Dt.id,D=Dt.server,T=Dt.type,v=k(!1),_=k(!1),C=k(!1),g=k(!1),h=k(0),E=k(0),A=k(.7),W=k(!1),f=k(!1),u=k(!1),w=k(0),F=k(""),O=k(!1),R=k({title:"Sample Song",artist:"Sample Artist",cover:"/favicon/favicon.ico",url:"",duration:0}),x=k([]),L=k(0),a=k(),J=k(),X=k();async function it(){o(f,!0);const r=S.replace(":server",D).replace(":type",T).replace(":id",M).replace(":auth","").replace(":r",Date.now().toString());try{const j=await fetch(r);if(!j.ok)throw new Error("meting api error");const H=await j.json();o(x,H.map(N=>{let ft=N.name??N.title??"未知歌曲",kt=N.artist??N.author??"未知艺术家",$=N.duration??0;return $>1e4&&($=Math.floor($/1e3)),(!Number.isFinite($)||$<=0)&&($=0),{id:N.id,title:ft,artist:kt,cover:N.pic??"",url:N.url??"",duration:$}})),t(x).length>0&&ne(t(x)[0]),o(f,!1)}catch{Bt("Meting 歌单获取失败"),o(f,!1)}}function It(){!t(a)||!t(R).url||(t(v)?t(a).pause():t(a).play())}function ht(){o(_,!t(_)),t(_)&&(o(g,!1),o(C,!1))}function xt(){o(C,!t(C)),t(C)&&(o(_,!1),o(g,!1))}function ie(){o(g,!t(g))}function He(){o(u,!t(u)),t(u)&&o(w,0)}function Ke(){o(w,(t(w)+1)%3),t(w)!==0&&o(u,!1)}function Ge(){if(t(x).length<=1)return;const r=t(L)>0?t(L)-1:t(x).length-1;yt(r)}function Rt(){if(t(x).length<=1)return;let r;if(t(u))do r=Math.floor(Math.random()*t(x).length);while(r===t(L)&&t(x).length>1);else r=t(L)<t(x).length-1?t(L)+1:0;yt(r)}function yt(r){if(r<0||r>=t(x).length)return;const j=t(v);o(L,r),t(a)&&t(a).pause(),ne(t(x)[t(L)]),(j||!t(v))&&setTimeout(()=>{t(a)&&(t(a).readyState>=2?t(a).play().catch(()=>{}):t(a).addEventListener("canplay",()=>{t(a).play().catch(()=>{})},{once:!0}))},100)}function _t(r){return r.startsWith("http://")||r.startsWith("https://")||r.startsWith("/")?r:`/${r}`}function ne(r){!r||!t(a)||(o(R,{...r}),r.url?(o(f,!0),Y(a,t(a).currentTime=0),o(h,0),o(E,r.duration??0),t(a).removeEventListener("loadeddata",se),t(a).removeEventListener("error",le),t(a).removeEventListener("loadstart",ce),t(a).addEventListener("loadeddata",se,{once:!0}),t(a).addEventListener("error",le,{once:!0}),t(a).addEventListener("loadstart",ce,{once:!0}),Y(a,t(a).src=_t(r.url)),t(a).load()):o(f,!1))}let $t=!1;function se(){if(o(f,!1),t(a)?.duration&&t(a).duration>1&&(o(E,Math.floor(t(a).duration)),t(x)[t(L)]&&Y(x,t(x)[t(L)].duration=t(E)),Y(R,t(R).duration=t(E))),t(v)){const r=t(a).play();r!==void 0&&r.catch(j=>{console.warn("自动播放被拦截，等待用户交互:",j),$t=!0})}}function oe(){if($t&&t(a)&&t(v)){const r=t(a).play();r!==void 0&&r.then(()=>{$t=!1}).catch(()=>{})}}function le(r){o(f,!1),Bt(`无法播放 "${t(R).title}"，正在尝试下一首...`),t(x).length>1?setTimeout(()=>Rt(),1e3):Bt("播放列表中没有可用的歌曲")}function ce(){}function Bt(r){o(F,r),o(O,!0),setTimeout(()=>{o(O,!1)},3e3)}function Je(){o(O,!1)}function Qe(r){if(!t(a)||!t(J))return;const j=t(J).getBoundingClientRect(),N=(r.clientX-j.left)/j.width*t(E);Y(a,t(a).currentTime=N),o(h,N)}let wt=k(!1),Wt=!1,Nt=null,nt=null;function Ze(r){t(X)&&(Wt=!0,Nt=t(X).getBoundingClientRect(),de(r.clientX))}function ta(r){Wt&&(o(wt,!0),!nt&&(nt=requestAnimationFrame(()=>{de(r.clientX),nt=null})))}function ea(){Wt=!1,o(wt,!1),Nt=null,nt&&(cancelAnimationFrame(nt),nt=null)}function de(r){if(!t(a)||!t(X))return;const j=Nt||t(X).getBoundingClientRect(),H=Math.max(0,Math.min(1,(r-j.left)/j.width));o(A,H),Y(a,t(a).volume=t(A)),o(W,t(A)===0)}function ue(){t(a)&&(o(W,!t(W)),Y(a,t(a).muted=t(W)))}function ve(r){if(!Number.isFinite(r)||r<0)return"0:00";const j=Math.floor(r/60),H=Math.floor(r%60);return`${j}:${H.toString().padStart(2,"0")}`}function aa(){t(a)&&(t(a).addEventListener("play",()=>{o(v,!0)}),t(a).addEventListener("pause",()=>{o(v,!1)}),t(a).addEventListener("timeupdate",()=>{o(h,t(a).currentTime)}),t(a).addEventListener("ended",()=>{t(w)===1?(Y(a,t(a).currentTime=0),t(a).play().catch(()=>{})):t(w)===2||t(u)?Rt():o(v,!1)}),t(a).addEventListener("error",r=>{o(f,!1)}),t(a).addEventListener("stalled",()=>{}),t(a).addEventListener("waiting",()=>{}))}const fe=["click","keydown","touchstart"];Ya(()=>{o(a,new Audio),Y(a,t(a).volume=t(A)),aa(),fe.forEach(r=>{document.addEventListener(r,oe,{capture:!0})}),it()}),Ua(()=>{typeof document<"u"&&fe.forEach(r=>{document.removeEventListener(r,oe,{capture:!0})}),t(a)&&(t(a).pause(),Y(a,t(a).src=""))}),Oa();var pe=rt();p("mousemove",qe,ta),p("mouseup",qe,ea);var ra=Z(pe);{var ia=r=>{var j=wr(),H=Z(j);{var N=e=>{var b=gr(),y=n(b),P=n(y);m(P,{icon:"material-symbols:error",class:"text-xl flex-shrink-0"});var z=d(P,2),l=n(z,!0);i(z);var et=d(z,2),Pt=n(et);m(Pt,{icon:"material-symbols:close",class:"text-lg"}),i(et),i(y),i(b),At(()=>K(l,t(F))),p("click",et,Je),q(e,b)};I(H,e=>{t(O)&&e(N)})}var ft=d(H,2);let kt;var $=n(ft);let me;var na=n($);{var sa=e=>{m(e,{icon:"eos-icons:loading",class:"text-white text-lg"})},oa=e=>{var b=rt(),y=Z(b);{var P=l=>{var et=hr();q(l,et)},z=l=>{m(l,{icon:"material-symbols:music-note",class:"text-white text-lg"})};I(y,l=>{t(v)?l(P):l(z,!1)},!0)}q(e,b)};I(na,e=>{t(f)?e(sa):e(oa,!1)})}i($);var Et=d($,2);let be;var ge=n(Et),st=n(ge),qt=n(st);let he;var xe=d(qt,2),la=n(xe);{var ca=e=>{m(e,{icon:"eos-icons:loading",class:"text-white text-xl"})},da=e=>{var b=rt(),y=Z(b);{var P=l=>{m(l,{icon:"material-symbols:pause",class:"text-white text-xl"})},z=l=>{m(l,{icon:"material-symbols:play-arrow",class:"text-white text-xl"})};I(y,l=>{t(v)?l(P):l(z,!1)},!0)}q(e,b)};I(la,e=>{t(f)?e(ca):e(da,!1)})}i(xe),i(st);var pt=d(st,2),Vt=n(pt),ua=n(Vt,!0);i(Vt);var ye=d(Vt,2),va=n(ye,!0);i(ye),i(pt);var _e=d(pt,2),Lt=n(_e),fa=n(Lt);m(fa,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(Lt);var Yt=d(Lt,2),pa=n(Yt);m(pa,{icon:"material-symbols:expand-less",class:"text-lg"}),i(Yt),i(_e),i(ge),i(Et);var St=d(Et,2);let we;var Ut=n(St),Ot=n(Ut),ke=n(Ot);let Ee;i(Ot);var Xt=d(Ot,2),Ht=n(Xt),ma=n(Ht,!0);i(Ht);var Kt=d(Ht,2),ba=n(Kt,!0);i(Kt);var Le=d(Kt,2),ga=n(Le);i(Le),i(Xt);var Se=d(Xt,2),Mt=n(Se),ha=n(Mt);m(ha,{icon:"material-symbols:visibility-off",class:"text-lg"}),i(Mt);var Tt=d(Mt,2);let Me;var xa=n(Tt);m(xa,{icon:"material-symbols:queue-music",class:"text-lg"}),i(Tt),i(Se),i(Ut);var Gt=d(Ut,2),ot=n(Gt),ya=n(ot);i(ot),Ve(ot,e=>o(J,e),()=>t(J)),i(Gt);var Jt=d(Gt,2),lt=n(Jt);let Te;var _a=n(lt);m(_a,{icon:"material-symbols:shuffle",class:"text-lg"}),i(lt);var mt=d(lt,2),wa=n(mt);m(wa,{icon:"material-symbols:skip-previous",class:"text-xl"}),i(mt);var ct=d(mt,2);let Fe;var ka=n(ct);{var Ea=e=>{m(e,{icon:"eos-icons:loading",class:"text-xl"})},La=e=>{var b=rt(),y=Z(b);{var P=l=>{m(l,{icon:"material-symbols:pause",class:"text-xl"})},z=l=>{m(l,{icon:"material-symbols:play-arrow",class:"text-xl"})};I(y,l=>{t(v)?l(P):l(z,!1)},!0)}q(e,b)};I(ka,e=>{t(f)?e(Ea):e(La,!1)})}i(ct);var bt=d(ct,2),Sa=n(bt);m(Sa,{icon:"material-symbols:skip-next",class:"text-xl"}),i(bt);var Ft=d(bt,2);let je;var Ma=n(Ft);{var Ta=e=>{m(e,{icon:"material-symbols:repeat-one",class:"text-lg"})},Fa=e=>{var b=rt(),y=Z(b);{var P=l=>{m(l,{icon:"material-symbols:repeat",class:"text-lg"})},z=l=>{m(l,{icon:"material-symbols:repeat",class:"text-lg opacity-50"})};I(y,l=>{t(w)===2?l(P):l(z,!1)},!0)}q(e,b)};I(Ma,e=>{t(w)===1?e(Ta):e(Fa,!1)})}i(Ft),i(Jt);var Pe=d(Jt,2),jt=n(Pe),ja=n(jt);{var Pa=e=>{m(e,{icon:"material-symbols:volume-off",class:"text-lg"})},Ca=e=>{var b=rt(),y=Z(b);{var P=l=>{m(l,{icon:"material-symbols:volume-down",class:"text-lg"})},z=l=>{m(l,{icon:"material-symbols:volume-up",class:"text-lg"})};I(y,l=>{t(A)<.5?l(P):l(z,!1)},!0)}q(e,b)};I(ja,e=>{t(W)||t(A)===0?e(Pa):e(Ca,!1)})}i(jt);var tt=d(jt,2),Ce=n(tt);let Ae;i(tt),Ve(tt,e=>o(X,e),()=>t(X));var Qt=d(tt,2),Aa=n(Qt);m(Aa,{icon:"material-symbols:expand-more",class:"text-lg"}),i(Qt),i(Pe),i(St);var Da=d(St,2);{var za=e=>{var b=_r(),y=n(b),P=n(y),z=n(P,!0);i(P);var l=d(P,2),et=n(l);m(et,{icon:"material-symbols:close",class:"text-lg"}),i(l),i(y);var Pt=d(y,2);sr(Pt,5,()=>t(x),or,(Zt,dt,U)=>{var at=yr();let De;var te=n(at),Ia=n(te);{var Ra=V=>{m(V,{icon:"material-symbols:graphic-eq",class:"text-[var(--primary)] animate-pulse"})},$a=V=>{var Be=rt(),Na=Z(Be);{var qa=ut=>{m(ut,{icon:"material-symbols:pause",class:"text-[var(--primary)]"})},Va=ut=>{var We=xr();We.textContent=U+1,q(ut,We)};I(Na,ut=>{U===t(L)?ut(qa):ut(Va,!1)},!0)}q(V,Be)};I(Ia,V=>{U===t(L)&&t(v)?V(Ra):V($a,!1)})}i(te);var ee=d(te,2),ze=n(ee);i(ee);var Ie=d(ee,2),Ct=n(Ie);let Re;var Ba=n(Ct,!0);i(Ct);var ae=d(Ct,2);let $e;var Wa=n(ae,!0);i(ae),i(Ie),i(at),At(V=>{De=B(at,1,"playlist-item flex items-center gap-3 p-3 hover:bg-[var(--btn-plain-bg-hover)] cursor-pointer transition-colors",null,De,{"bg-[var(--btn-plain-bg)]":U===t(L),"text-[var(--primary)]":U===t(L)}),Q(at,"aria-label",`播放 ${t(dt).title??""} - ${t(dt).artist??""}`),Q(ze,"src",V),Q(ze,"alt",t(dt).title),Re=B(Ct,1,"font-medium truncate",null,Re,{"text-[var(--primary)]":U===t(L),"text-90":U!==t(L)}),K(Ba,t(dt).title),$e=B(ae,1,"text-sm text-[var(--content-meta)] truncate",null,$e,{"text-[var(--primary)]":U===t(L)}),K(Wa,t(dt).artist)},[()=>_t(t(dt).cover)]),p("click",at,()=>yt(U)),p("keydown",at,V=>{(V.key==="Enter"||V.key===" ")&&(V.preventDefault(),yt(U))}),q(Zt,at)}),i(Pt),i(b),At(Zt=>K(z,Zt),[()=>cr(lr.playlist)]),p("click",l,ie),pr(3,b,()=>br,()=>({duration:300,axis:"y"})),q(e,b)};I(Da,e=>{t(g)&&e(za)})}i(ft),ir(2),At((e,b,y,P)=>{kt=B(ft,1,"music-player fixed bottom-4 right-4 z-50 transition-all duration-300 ease-in-out",null,kt,{expanded:t(_),"hidden-mode":t(C)}),me=B($,1,"orb-player w-12 h-12 bg-[var(--primary)] rounded-full shadow-lg cursor-pointer transition-all duration-500 ease-in-out flex items-center justify-center hover:scale-110 active:scale-95",null,me,{"opacity-0":!t(C),"scale-0":!t(C),"pointer-events-none":!t(C)}),be=B(Et,1,"mini-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-3 transition-all duration-500 ease-in-out",null,be,{"opacity-0":t(_)||t(C),"scale-95":t(_)||t(C),"pointer-events-none":t(_)||t(C)}),Q(st,"aria-label",t(v)?"暂停":"播放"),Q(qt,"src",e),he=B(qt,1,"w-full h-full object-cover transition-transform duration-300",null,he,{spinning:t(v)&&!t(f),"animate-pulse":t(f)}),K(ua,t(R).title),K(va,t(R).artist),we=B(St,1,"expanded-player card-base bg-[var(--float-panel-bg)] shadow-xl rounded-2xl p-4 transition-all duration-500 ease-in-out",null,we,{"opacity-0":!t(_),"scale-95":!t(_),"pointer-events-none":!t(_)}),Q(ke,"src",b),Ee=B(ke,1,"w-full h-full object-cover transition-transform duration-300",null,Ee,{spinning:t(v)&&!t(f),"animate-pulse":t(f)}),K(ma,t(R).title),K(ba,t(R).artist),K(ga,`${y??""} / ${P??""}`),Me=B(Tt,1,"btn-plain w-8 h-8 rounded-lg flex items-center justify-center",null,Me,{"text-[var(--primary)]":t(g)}),Q(ot,"aria-valuenow",t(E)>0?t(h)/t(E)*100:0),Ne(ya,`width: ${t(E)>0?t(h)/t(E)*100:0}%`),Te=B(lt,1,"w-10 h-10 rounded-lg",null,Te,{"btn-regular":t(u),"btn-plain":!t(u)}),lt.disabled=t(x).length<=1,mt.disabled=t(x).length<=1,Fe=B(ct,1,"btn-regular w-12 h-12 rounded-full",null,Fe,{"opacity-50":t(f)}),ct.disabled=t(f),bt.disabled=t(x).length<=1,je=B(Ft,1,"w-10 h-10 rounded-lg",null,je,{"btn-regular":t(w)>0,"btn-plain":t(w)===0}),Q(tt,"aria-valuenow",t(A)*100),Ae=B(Ce,1,"h-full bg-[var(--primary)] rounded-full transition-all",null,Ae,{"duration-100":!t(wt),"duration-0":t(wt)}),Ne(Ce,`width: ${t(A)*100}%`)},[()=>_t(t(R).cover),()=>_t(t(R).cover),()=>ve(t(h)),()=>ve(t(E))]),p("click",$,xt),p("keydown",$,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),xt())}),p("click",st,It),p("keydown",st,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),It())}),p("click",pt,ht),p("keydown",pt,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),ht())}),p("click",Lt,Ye(xt)),p("click",Yt,Ye(ht)),p("click",Mt,xt),p("click",Tt,ie),p("click",ot,Qe),p("keydown",ot,e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault(),t(J).getBoundingClientRect();const y=.5*t(E);t(a)&&(Y(a,t(a).currentTime=y),o(h,y))}}),p("click",lt,He),p("click",mt,Ge),p("click",ct,It),p("click",bt,Rt),p("click",Ft,Ke),p("click",jt,ue),p("mousedown",tt,Ze),p("keydown",tt,e=>{(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),e.key==="Enter"&&ue())}),p("click",Qt,ht),q(r,j)};I(ra,r=>{r(ia)})}q(c,pe),ar()}export{zr as default};
