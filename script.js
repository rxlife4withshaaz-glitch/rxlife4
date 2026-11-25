/* ---------- homepage featured-drug card ----------
   To add a drug, add one line to FEATURED_DRUGS (cat, name, tags = 2-3 pills, note, optional href).
   "Exam ready" and "Save this for your exams" pills are added automatically. Greek letters: \u03b1 = alpha, \u03b2 = beta. */
var FEATURED_DRUGS=[
  {cat:'MIXED-ACTING DRUG',name:'Ephedrine',tags:['Direct action','Indirect action'],note:'Ephedrine: Double Action'},
  {cat:'DIRECT-ACTING CATECHOLAMINE',name:'Adrenaline',tags:['\u03b1 and \u03b2 agonist','Emergency drug'],note:'Adrenaline: Alpha + Beta Agonist'},
  {cat:'SELECTIVE \u03b22 AGONIST',name:'Salbutamol',tags:['Bronchodilator','Asthma'],note:'Salbutamol: Selective \u03b22 Agonist'},
  {cat:'MUSCARINIC ANTAGONIST',name:'Atropine',tags:['Anticholinergic','Antidote'],note:'Atropine: Muscarinic Blocker'},
  {cat:'NON-SELECTIVE \u03b2-BLOCKER',name:'Propranolol',tags:['\u03b21 + \u03b22 block','Hypertension'],note:'Propranolol: Non-selective \u03b2-blocker'}
];
(function(){
  var card=document.getElementById('featcard');
  if(!card||!FEATURED_DRUGS.length)return;
  var link=card.querySelector('.fc-link'),cap=document.getElementById('fc-cap'),body=document.getElementById('fc-body'),
      pills=document.getElementById('fc-pills'),note=document.getElementById('fc-note'),dotsBox=document.getElementById('fc-dots');
  if(!link||!cap||!body||!pills||!note||!dotsBox)return;
  var INTERVAL=5000,FADE=350,cur=0,timer=null,swap=null,hovered=false,
      still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches; /* reduced motion: no animation, no auto-rotate (dots still work) */
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;e.textContent=txt;return e}
  function paint(i){
    var d=FEATURED_DRUGS[i];
    body.style.setProperty('--n',d.name.length);
    body.textContent='';
    body.appendChild(el('span','fc-cat',d.cat));
    body.appendChild(el('span','fc-name',d.name));
    body.appendChild(el('span','fc-desc','Select your semester to get notes for your exams'));
    pills.textContent='';
    d.tags.concat(['Exam ready']).forEach(function(t){pills.appendChild(el('span','fc-pill',t))});
    pills.appendChild(el('span','fc-pill fc-save','Save this for your exams'));
    note.textContent='Select your semester to get notes';
    var h='#syllabus';
    link.setAttribute('href',h);cap.setAttribute('href',h);
    cap.setAttribute('aria-label','Select your semester to get notes.');
    card.setAttribute('aria-label','Featured drug: '+d.name+', '+d.cat.toLowerCase()+' ('+(i+1)+' of '+FEATURED_DRUGS.length+')');
    for(var k=0;k<dots.length;k++){if(k===i)dots[k].setAttribute('aria-current','true');else dots[k].removeAttribute('aria-current')}
  }
  function show(i,anim){
    if(i===cur&&anim)return;
    clearTimeout(swap);link.classList.remove('is-out','is-in');
    if(!anim||still){cur=i;paint(i);return}
    link.classList.add('is-out');
    swap=setTimeout(function(){
      cur=i;paint(i);
      link.classList.remove('is-out');link.classList.add('is-in');
      void link.offsetWidth;
      link.classList.remove('is-in');
    },FADE);
  }
  function paused(){
    var f=false;try{f=!!card.querySelector(':focus-visible')}catch(e){}
    return hovered||f||document.hidden;
  }
  function schedule(){
    clearTimeout(timer);
    if(still||FEATURED_DRUGS.length<2)return;
    timer=setTimeout(function(){
      if(!paused())show((cur+1)%FEATURED_DRUGS.length,true);
      schedule();
    },INTERVAL);
  }
  var dots=[];
  if(FEATURED_DRUGS.length>1){
    FEATURED_DRUGS.forEach(function(d,i){
      var b=document.createElement('button');b.type='button';b.className='fc-dot';
      b.setAttribute('aria-label','Show '+d.name);
      b.onclick=function(){show(i,true);schedule()};
      dotsBox.appendChild(b);dots.push(b);
    });
    dotsBox.hidden=false;
  }
  card.addEventListener('pointerenter',function(e){if(e.pointerType==='mouse')hovered=true});
  card.addEventListener('pointerleave',function(e){if(e.pointerType==='mouse'){hovered=false;schedule()}});
  card.addEventListener('focusout',function(){schedule()});
  paint(0);schedule();
})();

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
  var spyMap={home:'home',syllabus:'syllabus',ephedrine:'syllabus',unit2:'syllabus',unit3:'syllabus',reels:'reels',gpat:'gpat',careers:'careers',request:'',about:'about'};
  function setActive(k){navLinks.forEach(function(a){if(a.getAttribute('href')==='#'+k)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current')})}
  setActive('home');
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-nav]');
    if(!a)return;
    var id=a.getAttribute('href').slice(1);if(!$(id))return;
    e.preventDefault();setMenu(false);
    if(NOTE_IDS.indexOf(id)>-1){openNote(id);try{history.replaceState(null,'','#'+id)}catch(x){}}
    else goTo(id);
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
    Object.keys(spyMap).forEach(function(id){var el=$(id);if(el&&!el.hidden&&el.getBoundingClientRect().top<=140)cur=id});
    setActive(spyMap[cur]);
  }
  window.addEventListener('scroll',spy,{passive:true});

  /* ---------- notes gate: notes show only after a semester is ticked ----------
     To publish notes for another semester: add a .nlist block with data-sem="V" (cards inside) in the notes panel,
     and any full note sections with data-note data-sem="V". This is a page gate, not security. */
  var ROMANS=['I','II','III','IV','V','VI','VII','VIII'];
  var NOTE_IDS=[].slice.call(document.querySelectorAll('section[data-note]')).map(function(x){return x.id});
  var picks=[].slice.call(document.querySelectorAll('input[name="semsel"]'));
  var panel=$('notespanel'),npbody=$('npbody'),nhint=$('nhint'),soon=$('npsoon'),selected=null;
  var lists=[].slice.call(document.querySelectorAll('.nlist'));
  function hideNotes(){NOTE_IDS.forEach(function(i){$(i).hidden=true})}
  function select(r){
    selected=r||null;
    picks.forEach(function(p){p.checked=(p.value===selected)});
    if(!selected){npbody.hidden=true;nhint.hidden=false;hideNotes();return}
    nhint.hidden=true;npbody.hidden=false;
    $('nptitle').textContent='Semester '+selected+' notes';
    var has=false;
    lists.forEach(function(l){var on=l.dataset.sem===selected;l.hidden=!on;if(on)has=true});
    soon.hidden=has;
    if(!has)$('soonh').textContent='Notes coming soon for Semester '+selected;
    NOTE_IDS.forEach(function(i){var n=$(i);if(n.dataset.sem!==selected)n.hidden=true});
  }
  function toPanel(){
    panel.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    try{panel.focus({preventScroll:true})}catch(e){}
  }
  picks.forEach(function(p){p.addEventListener('change',function(){if(p.checked){select(p.value);setActive('syllabus')}})});
  $('npclose').onclick=function(){select(null);var c=$('semgate');c.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});var f=picks[0];if(f)f.focus({preventScroll:true})};
  function openNote(id,opt){
    var el=$(id);if(!el)return;
    select(el.dataset.sem);
    NOTE_IDS.forEach(function(i){$(i).hidden=(i!==id)});
    if(id==='ephedrine')showSlide(curSlide);
    if(!opt||opt.scroll!==false)goTo(id);
    setActive('syllabus');
  }
  function backToList(){hideNotes();toPanel()}
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('button[data-back]');
    if(b){e.preventDefault();backToList();return}
    var p=e.target.closest&&e.target.closest('button[data-pick]');
    if(p){select(p.dataset.pick);toPanel();setActive('syllabus')}
  });
  /* each semester panel gets a small notes row */
  [].slice.call(document.querySelectorAll('details.sem')).forEach(function(d){
    var r=d.id.replace('sem-',''),sb=d.querySelector('.sb');if(!sb)return;
    var l=lists.filter(function(x){return x.dataset.sem===r})[0],row=document.createElement('div');
    row.className='semnotes';
    if(l){
      var k=l.querySelectorAll('.res').length;
      row.innerHTML='<span><b>Notes for this semester:</b> '+k+' available</span>';
      var bt=document.createElement('button');bt.type='button';bt.className='btn btn-p btn-sm';bt.dataset.pick=r;bt.textContent='Show Semester '+r+' notes';row.appendChild(bt);
    }else{
      row.innerHTML='<span><b>Notes for this semester:</b> coming soon</span>';
      var a=document.createElement('a');a.className='btn btn-s btn-sm';a.href='#request';a.setAttribute('data-nav','');a.textContent='Suggest a topic';row.appendChild(a);
    }
    sb.insertBefore(row,sb.firstChild);
  });
  function openSem(r){
    var d=$('sem-'+r);if(!d)return;
    d.open=true;setActive('syllabus');
    d.scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});
    try{d.querySelector('summary').focus({preventScroll:true})}catch(e){}
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest&&e.target.closest('a[data-sem]');
    if(a){e.preventDefault();e.stopPropagation();openSem(a.dataset.sem);return}
    var b=e.target.closest&&e.target.closest('button[data-notes]');if(!b)return;
    select('IV');toPanel();setActive('syllabus');
  },true);
  /* deep links: #ephedrine, #unit2, #unit3, #refs, #sem-IV, #notes */
  function route(initial){
    var id=decodeURIComponent((location.hash||'').slice(1));if(!id)return;
    if(NOTE_IDS.indexOf(id)>-1){openNote(id);return}
    if(id==='refs'){openNote('ephedrine',{scroll:false});goTo('refs');return}
    var m=/^sem-(I|II|III|IV|V|VI|VII|VIII)$/.exec(id);
    if(m){select(m[1]);var d=$(id);d.open=true;setActive('syllabus');setTimeout(function(){d.scrollIntoView({behavior:'auto',block:'start'})},0);return}
    if(id==='notes'){goTo('syllabus');setActive('syllabus')}
  }
  window.addEventListener('hashchange',function(){route(false)});

  /* ---------- slide viewer ---------- */
  var TITLES=['Ephedrine: mixed-acting drug (cover)','What is Ephedrine?','Why Ephedrine works by mouth','Direct + indirect action','Direct vs indirect action','Why repeated doses work less','How the body handles it','Effects on each organ','Where it is used','Side effects and cautions','Contraindications and interactions','Exam recall in six lines'];
  var thumbs=[].slice.call(document.querySelectorAll('#thumbs button')),n=thumbs.length,cur=0,vimg=$('vimg');
  var curSlide=0;function showSlide(i){show(i)}
  function show(i,focusThumb){
    cur=(i+n)%n;curSlide=cur;
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
  $('viewslides').onclick=function(){openNote('ephedrine',{scroll:false});show(0);$('viewer').scrollIntoView({behavior:reduce?'auto':'smooth',block:'start'});$('viewer').focus({preventScroll:true});setActive('notes')};

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
  route(true);

  /* ---------- careers posters slideshow (separate from the ephedrine viewer) ---------- */
  (function(){
    var root=document.getElementById('ps-viewer');
    if(!root)return;
    var P=[
      ['Medical or Scientific Writer','01'],
      ['Pharmacovigilance Associate','02'],
      ['Clinical Data Management','03'],
      ['Regulatory Affairs Executive','04'],
      ['Medical Coding','05'],
      ['Hospital or Clinical Pharmacist','06'],
      ['Pharma Sales and Marketing','07']
    ];
    var n=P.length,cur=0,img=document.getElementById('ps-img'),link=document.getElementById('ps-link'),
        strip=document.getElementById('ps-thumbs'),thumbs=strip?[].slice.call(strip.querySelectorAll('button')):[];
    function render(i){
      cur=(i+n)%n;
      var src='assets/img/career-slide-'+P[cur][1]+'.webp';
      img.src=src;img.alt=P[cur][0];link.href=src;
      document.getElementById('ps-count').textContent=(cur+1)+' of '+n;
      document.getElementById('ps-title').textContent=P[cur][0];
      thumbs.forEach(function(b,k){if(k===cur)b.setAttribute('aria-current','true');else b.removeAttribute('aria-current')});
      var t=thumbs[cur]&&thumbs[cur].parentNode;
      if(strip&&t)strip.scrollLeft=t.offsetLeft-strip.clientWidth/2+t.clientWidth/2;
    }
    var timer=null;
    function show(i){render(i);clearInterval(timer);timer=setInterval(function(){render(cur+1)},4000)}
    timer=setInterval(function(){render(cur+1)},4000);
    thumbs.forEach(function(b,k){b.onclick=function(){show(k)}});
    document.getElementById('ps-prev').onclick=function(){show(cur-1)};
    document.getElementById('ps-next').onclick=function(){show(cur+1)};
    root.addEventListener('keydown',function(e){
      if(e.key==='ArrowLeft'){show(cur-1);e.preventDefault()}
      if(e.key==='ArrowRight'){show(cur+1);e.preventDefault()}
    });
    var stage=document.getElementById('ps-stage'),sx=null,sy=null,swiped=false,clearT=null;
    stage.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;swiped=false},{passive:true});
    stage.addEventListener('touchend',function(e){
      if(sx===null)return;
      var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;
      if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)){
        swiped=true;clearTimeout(clearT);clearT=setTimeout(function(){swiped=false},400);
        show(cur+(dx<0?1:-1));
      }
      sx=null;
    });
    /* a swipe should change the poster, not open it */
    link.addEventListener('click',function(e){if(swiped){e.preventDefault();swiped=false}});
    show(0);
  })();
})();

/* ---------- unit download buttons on theory cards ----------
   One line per subject: the units that have a PDF live on the site.
   To publish Unit 3 of BP501T later, add 3:'assets/pdf/RxLife4-MedChem-II-Unit-3.pdf' to its line.
   Any unit not listed shows as a greyed "soon" button. Each card shows 5 buttons (data-units on the card). */
(function(){
  var UNIT_PDFS={
    BP501T:{1:'assets/pdf/RxLife4-MedChem-II-Unit-1.pdf',2:'assets/pdf/RxLife4-MedChem-II-Unit-2.pdf',3:'assets/pdf/RxLife4-MedChem-II-Unit-3.pdf',4:'assets/pdf/RxLife4-MedChem-II-Unit-4.pdf',5:'assets/pdf/RxLife4-MedChem-II-Unit-5.pdf'},
    BP301T:{1:'assets/pdf/RxLife4-POC-II-Unit-1.pdf',2:'assets/pdf/RxLife4-POC-II-Unit-2.pdf',3:'assets/pdf/RxLife4-POC-II-Unit-3.pdf',4:'assets/pdf/RxLife4-POC-II-Unit-4.pdf',5:'assets/pdf/RxLife4-POC-II-Unit-5.pdf'},
    BP303T:{1:'assets/pdf/RxLife4-Microbiology-Unit-1.pdf',2:'assets/pdf/RxLife4-Microbiology-Unit-2.pdf',3:'assets/pdf/RxLife4-Microbiology-Unit-3.pdf',4:'assets/pdf/RxLife4-Microbiology-Unit-4.pdf',5:'assets/pdf/RxLife4-Microbiology-Unit-5.pdf'},
    BP404T:{2:'assets/pdf/RxLife4-Pharmacology-I-Unit-II.pdf',3:'assets/pdf/RxLife4-Pharmacology-I-Unit-III.pdf'}
  };
  [].slice.call(document.querySelectorAll('.ubtns[data-code]')).forEach(function(row){
    var code=row.dataset.code,n=parseInt(row.dataset.units,10)||5,pdfs=UNIT_PDFS[code]||{};
    var li=row.closest('li'),cn=li&&li.querySelector('.cn'),name=cn?cn.textContent.trim():code;
    row.setAttribute('role','group');
    row.setAttribute('aria-label','Unit notes for '+name);
    for(var u=1;u<=n;u++){
      var href=pdfs[u],el;
      if(href){
        el=document.createElement('a');
        el.className='ubtn';el.href=href;el.setAttribute('download','');
        el.setAttribute('aria-label','Unit '+u+' notes, PDF: '+name);
        el.textContent='Unit '+u;
      }else{
        el=document.createElement('button');
        el.type='button';el.className='ubtn is-off';
        el.setAttribute('aria-disabled','true');
        el.title='Unit '+u+' notes: coming soon';
        el.setAttribute('aria-label','Unit '+u+' notes, coming soon: '+name);
        el.appendChild(document.createTextNode('Unit '+u));
        var s=document.createElement('small');s.textContent='soon';el.appendChild(s);
      }
      row.appendChild(el);
    }
  });
})();
