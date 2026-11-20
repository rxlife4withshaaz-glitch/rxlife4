(function(){
  var $=function(i){return document.getElementById(i)};
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var IG='https://www.instagram.com/rxlife4/';

  /* ---------- helpers ---------- */
  function goTo(id){
    var el=$(id);if(!el)return;
    el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    try{el.focus({preventScroll:true})}catch(e){}
  }
  function legacyCopy(t,sel){
    var ta=sel||document.createElement('textarea');
    if(!sel){ta.value=t;ta.setAttribute('readonly','');ta.style.cssText='position:fixed;left:0;top:0;opacity:0';document.body.appendChild(ta)}
    ta.focus();ta.select();try{ta.setSelectionRange(0,t.length)}catch(e){}
    var ok=false;try{ok=document.execCommand('copy')}catch(e){}
    if(!sel)document.body.removeChild(ta);
    return ok;
  }
  function copyText(t,sel){
    return new Promise(function(res){
      if(navigator.clipboard&&navigator.clipboard.writeText){
        navigator.clipboard.writeText(t).then(function(){res(true)},function(){res(legacyCopy(t,sel))});
      }else res(legacyCopy(t,sel));
    });
  }

  /* ---------- nav ---------- */
  var menu=$('menu'),mb=$('menubtn');
  function setMenu(open){menu.classList.toggle('open',open);mb.setAttribute('aria-expanded',open?'true':'false');$('menulbl').textContent=open?'Close':'Menu'}
  mb.onclick=function(){setMenu(!menu.classList.contains('open'))};
  var navLinks=[].slice.call(menu.querySelectorAll('a'));
  var spyMap={home:'home',notes:'notes',ephedrine:'notes',unit2:'notes',unit3:'notes',syllabus:'syllabus',reels:'reels',gpat:'gpat',careers:'careers',request:'',about:'about'};
  function setActive(k){navLinks.forEach(function(a){if(a.getAttribute('href')==='#'+k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
  setActive('home');
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-nav]');
    if(!a)return;
    var id=a.getAttribute('href').slice(1);if(!$(id))return;
    e.preventDefault();setMenu(false);goTo(id);
    if(spyMap[id]!==undefined)setActive(spyMap[id]);
  });

  /* unit 3 jump links */
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-open]');
    if(!a)return;
    var d=$(a.getAttribute('href').slice(1));if(!d)return;
    e.preventDefault();d.open=true;
    d.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion:reduce)').matches?'auto':'smooth',block:'start'});
    var s=d.querySelector('summary');if(s)s.focus({preventScroll:true});
  });
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&menu.classList.contains('open')){setMenu(false);mb.focus()}});
  function spy(){
    var cur='home';
    Object.keys(spyMap).forEach(function(id){var el=$(id);if(el&&el.getBoundingClientRect().top<=140)cur=id});
    setActive(spyMap[cur]);
  }
  window.addEventListener('scroll',spy,{passive:true});

  /* ---------- notes library ---------- */
  var SEMS=[{"r":"I","s":[{"c":"BP101T","n":"Human Anatomy and Physiology I"},{"c":"BP102T","n":"Pharmaceutical Analysis I"},{"c":"BP103T","n":"Pharmaceutics I"},{"c":"BP104T","n":"Pharmaceutical Inorganic Chemistry"},{"c":"BP105T","n":"Communication skills"},{"c":"BP106RBT","n":"Remedial Biology"},{"c":"BP106RMT","n":"Remedial Mathematics"}]},{"r":"II","s":[{"c":"BP201T","n":"Human Anatomy and Physiology II"},{"c":"BP202T","n":"Pharmaceutical Organic Chemistry I"},{"c":"BP203T","n":"Biochemistry"},{"c":"BP204T","n":"Pathophysiology"},{"c":"BP205T","n":"Computer Applications in Pharmacy"},{"c":"BP206T","n":"Environmental sciences"}]},{"r":"III","s":[{"c":"BP301T","n":"Pharmaceutical Organic Chemistry II"},{"c":"BP302T","n":"Physical Pharmaceutics I"},{"c":"BP303T","n":"Pharmaceutical Microbiology"},{"c":"BP304T","n":"Pharmaceutical Engineering"}]},{"r":"IV","s":[{"c":"BP401T","n":"Pharmaceutical Organic Chemistry III"},{"c":"BP402T","n":"Medicinal Chemistry I"},{"c":"BP403T","n":"Physical Pharmaceutics II"},{"c":"BP404T","n":"Pharmacology I"},{"c":"BP405T","n":"Pharmacognosy and Phytochemistry I"}]},{"r":"V","s":[{"c":"BP501T","n":"Medicinal Chemistry II"},{"c":"BP502T","n":"Industrial Pharmacy I"},{"c":"BP503T","n":"Pharmacology II"},{"c":"BP504T","n":"Pharmacognosy and Phytochemistry II"},{"c":"BP505T","n":"Pharmaceutical Jurisprudence"}]},{"r":"VI","s":[{"c":"BP601T","n":"Medicinal Chemistry III"},{"c":"BP602T","n":"Pharmacology III"},{"c":"BP603T","n":"Herbal Drug Technology"},{"c":"BP604T","n":"Biopharmaceutics and Pharmacokinetics"},{"c":"BP605T","n":"Pharmaceutical Biotechnology"},{"c":"BP606T","n":"Quality Assurance"}]},{"r":"VII","s":[{"c":"BP701T","n":"Instrumental Methods of Analysis"},{"c":"BP702T","n":"Industrial Pharmacy II"},{"c":"BP703T","n":"Pharmacy Practice"},{"c":"BP704T","n":"Novel Drug Delivery System"}]},{"r":"VIII","s":[{"c":"BP801T","n":"Biostatistics and Research Methodology"},{"c":"BP802T","n":"Social and Preventive Pharmacy"},{"c":"BP803ET","n":"Pharma Marketing Management"},{"c":"BP804ET","n":"Pharmaceutical Regulatory Science"},{"c":"BP805ET","n":"Pharmacovigilance"},{"c":"BP806ET","n":"Quality Control and Standardization of Herbals"},{"c":"BP807ET","n":"Computer Aided Drug Design"},{"c":"BP808ET","n":"Cell and Molecular Biology"},{"c":"BP809ET","n":"Cosmetic Science"},{"c":"BP810ET","n":"Experimental Pharmacology"},{"c":"BP811ET","n":"Advanced Instrumentation Techniques"},{"c":"BP812ET","n":"Dietary Supplements and Nutraceuticals"}]}];
  var SUBJECTS=[];SEMS.forEach(function(g){g.s.forEach(function(x){x.r=g.r;SUBJECTS.push(x)})});
  function subName(c){return SUBJECTS.filter(function(x){return x.c===c})[0]||null}
  var TYPES=['Slides','Reel','Short notes','MCQs'];
  var items=[].slice.call(document.querySelectorAll('#results .res')).map(function(el){
    var sj=subName(el.dataset.subject)||{n:el.dataset.subject,r:''};
    return {el:el,subject:el.dataset.subject,types:el.dataset.types.split(','),text:(el.querySelector('h3').textContent+' '+el.dataset.subject+' '+sj.n+' semester '+sj.r+' '+el.dataset.types.replace(/,/g,' ')+' '+el.dataset.kw).toLowerCase()};
  });
  var q=$('q'),fs=$('fsub'),ft=$('ftype');
  function cnt(f){return items.filter(f).length}
  fs.innerHTML='<option value="">All subjects</option>'+SEMS.map(function(g){return '<optgroup label="Semester '+g.r+'">'+g.s.map(function(s){var k=cnt(function(i){return i.subject===s.c});return '<option value="'+s.c+'">'+s.c+' '+s.n+(k?' ('+k+')':'')+'</option>'}).join('')+'</optgroup>'}).join('');
  ft.innerHTML='<option value="">All types</option>'+TYPES.map(function(t){return '<option value="'+t+'">'+t+' ('+cnt(function(i){return i.types.indexOf(t)>-1})+')</option>'}).join('');
  $('road').innerHTML=SEMS.map(function(g){
    var k=g.s.filter(function(x){return cnt(function(i){return i.subject===x.c})>0}).length;
    var st=k?'<span class="st st-a"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>'+k+(k===1?' subject has notes':' subjects have notes')+'</span>':'<span class="st st-p"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg>Notes coming soon</span>';
    return '<li><button type="button" class="rcard" data-sem="'+g.r+'"><b>Semester '+g.r+'</b>'+st+'<span class="n">'+g.s.length+' subjects listed</span></button></li>';
  }).join('');
  function filt(){
    var term=q.value.trim().toLowerCase(),words=term?term.split(/\s+/):[],sv=fs.value,tv=ft.value,shown=0;
    items.forEach(function(i){
      var ok=(!sv||i.subject===sv)&&(!tv||i.types.indexOf(tv)>-1)&&words.every(function(w){return i.text.indexOf(w)>-1});
      i.el.hidden=!ok;if(ok)shown++;
    });
    var active=!!(term||sv||tv);
    $('clear').hidden=!active;
    $('count').textContent='Showing '+shown+' of '+items.length+' published resource'+(items.length===1?'':'s');
    var em=$('empty');em.hidden=shown>0;
    if(!shown){
      var sub=subName(sv);
      if(term){$('emptyh').textContent='No published note matches "'+q.value.trim()+'"';$('emptyp').textContent='Try another keyword like atropine, receptor or glaucoma, or clear the filters. If you want this topic, suggest it.'}
      else if(sub){$('emptyh').textContent='Notes coming soon: '+sub.n+' ('+sub.c+')';$('emptyp').textContent='No notes are published for this subject yet. If you want a topic from it first, suggest it.'}
      else{$('emptyh').textContent='Nothing published for '+tv;$('emptyp').textContent='This resource type is not published yet.'}
    }
  }
  function clearAll(){q.value='';fs.value='';ft.value='';filt();q.focus()}
  q.addEventListener('input',filt);fs.addEventListener('change',filt);ft.addEventListener('change',filt);
  $('clear').onclick=clearAll;$('clear2').onclick=clearAll;
  function openSem(r){
    var d=$('sem-'+r);if(!d)return;
    d.open=true;setActive('syllabus');
    d.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    try{d.querySelector('summary').focus({preventScroll:true})}catch(e){}
  }
  $('road').addEventListener('click',function(e){
    var b=e.target.closest('button[data-sem]');if(!b)return;
    openSem(b.dataset.sem);
  });
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-sem]');
    if(a){e.preventDefault();e.stopPropagation();openSem(a.dataset.sem);return}
    var b=e.target.closest&&e.target.closest('button[data-notes]');if(!b)return;
    fs.value=b.dataset.notes;filt();$('notes').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});setActive('notes');fs.focus({preventScroll:true});
  },true);
  filt();

  /* ---------- slide viewer ---------- */
  var TITLES=['Ephedrine: mixed-acting drug (cover)','What is Ephedrine?','Why Ephedrine works by mouth','Direct + indirect action','Direct vs indirect action','Why repeated doses work less','How the body handles it','Effects on each organ','Where it is used','Side effects and cautions','Contraindications and interactions','Exam recall in six lines'];
  var thumbs=[].slice.call(document.querySelectorAll('#thumbs button')),n=thumbs.length,cur=0,vimg=$('vimg');
  function show(i,focusThumb){
    cur=(i+n)%n;
    vimg.src=thumbs[cur].querySelector('img').src;
    vimg.alt='Ephedrine slide '+(cur+1)+' of '+n+': '+TITLES[cur];
    $('vcount').textContent='Slide '+(cur+1)+' of '+n;
    $('vtitle').textContent=TITLES[cur];
    thumbs.forEach(function(b,k){if(k===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
    var t=thumbs[cur].parentNode,st=$('thumbs');
    st.scrollLeft=t.offsetLeft-st.clientWidth/2+t.clientWidth/2;
  }
  thumbs.forEach(function(b,k){b.onclick=function(){show(k)}});
  $('vprev').onclick=function(){show(cur-1)};$('vnext').onclick=function(){show(cur+1)};
  $('viewer').addEventListener('keydown',function(e){
    if(e.target.tagName==='INPUT')return;
    if(e.key==='ArrowLeft'){show(cur-1);e.preventDefault()}
    if(e.key==='ArrowRight'){show(cur+1);e.preventDefault()}
  });
  var sx=null,vs=document.querySelector('.vstage');
  vs.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
  vs.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40)show(cur+(d<0?1:-1));sx=null});
  show(0);
  $('viewslides').onclick=function(){show(0);$('viewer').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});$('viewer').focus({preventScroll:true});setActive('notes')};

  /* ---------- reels player ---------- */
  var REELS={
    eph:{t:'Ephedrine: Double Action',topic:'Pharmacology I',src:'assets/video/reel-ephedrine.mp4',poster:''},
    car:{t:'7 High-Paying Careers After Pharmacy',topic:'Careers',src:'assets/video/reel-careers.mp4',poster:''}
  };
  var pv=$('pv'),pl=$('player'),lastBtn=null;
  function openReel(k,btn){
    var r=REELS[k];lastBtn=btn||null;
    pv.pause();pv.poster=document.querySelector('.thumb[data-reel="'+k+'"] img').src;
    pv.src=r.src;pv.setAttribute('aria-label','Reel: '+r.t);
    $('ptitle').textContent=r.t;$('ptopic').textContent=r.topic;
    pl.hidden=false;
    $('reels').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    setActive('reels');
    var p=pv.play();if(p&&p.catch)p.catch(function(){});
    $('pclose').focus({preventScroll:true});
  }
  function closeReel(){pv.pause();pv.removeAttribute('src');pv.load();pl.hidden=true;if(lastBtn)lastBtn.focus()}
  document.querySelectorAll('[data-reel]').forEach(function(b){b.onclick=function(){openReel(b.dataset.reel,b)}});
  $('pclose').onclick=closeReel;

  /* ---------- topic request ---------- */
  var rt=$('rtopic'),rs=$('rsub'),rp=$('rprev');
  function compose(){
    var t=rt.value.trim(),s=rs.value.trim();
    return 'Hi RxLife4! Please explain this topic next: '+(t||'[your topic]')+'.'+(s?' Subject/semester: '+s+'.':'')+' (sent from the RxLife4 website)';
  }
  function upd(){rp.value=compose();$('rok').textContent='';$('rok').className='fmsg'}
  rt.addEventListener('input',function(){upd();$('rerr').textContent=''});rs.addEventListener('input',upd);upd();
  $('rcopy').onclick=function(){
    if(!rt.value.trim()){$('rerr').textContent='Write the topic first, then copy.';rt.focus();return}
    $('rerr').textContent='';
    copyText(rp.value,rp).then(function(ok){
      var m=$('rok');
      if(ok){m.className='fmsg';m.textContent='Copied. Now tap Open Instagram DM and paste it in the chat.'}
      else{rp.focus();rp.select();m.className='fmsg bad';m.textContent='Automatic copy was blocked here. The message is selected: use Copy from your phone or keyboard menu, then open Instagram DM.'}
    });
  };

  /* ---------- share ---------- */
  function shareUrl(){return /^https?:/.test(location.protocol)?location.href.split('#')[0]:IG}
  function say(btn,msg){var s=btn.parentNode.querySelector('.status');if(s){s.textContent='';setTimeout(function(){s.textContent=msg},30)}}
  document.querySelectorAll('[data-share]').forEach(function(b){
    b.onclick=function(){
      var note=b.dataset.share==='note';
      var data={title:note?'Ephedrine: Double Action | RxLife4':'RxLife4 | Your Pharmacy Learning Space',text:note?'Ephedrine ke do raaste: direct aur indirect. Dono milkar mixed-acting. RxLife4 par dekho.':'B.Pharm notes, reels and career guidance on RxLife4.',url:shareUrl()};
      function fallback(){
        copyText(data.url).then(function(ok){say(b,ok?(data.url===IG?'Link copied (RxLife4 Instagram).':'Link copied. Paste it anywhere to share.'):'Could not copy automatically. Link: '+data.url)});
      }
      if(navigator.share){navigator.share(data).then(function(){say(b,'Shared.')},function(e){if(e&&e.name==='AbortError')return;fallback()})}
      else fallback();
    };
  });
})();
