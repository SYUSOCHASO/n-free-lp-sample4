(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // menu
  var b=d.querySelector('.hd__burger'), nav=d.getElementById('spnav');
  if(b&&nav){
    b.addEventListener('click',function(){
      var o=b.getAttribute('aria-expanded')==='true';
      b.setAttribute('aria-expanded',String(!o));
      b.setAttribute('aria-label',o?'メニューを開く':'メニューを閉じる');
      nav.classList.toggle('open',!o);
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){b.setAttribute('aria-expanded','false');nav.classList.remove('open');});});
  }

  // reveal
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{rootMargin:'0px 0px -12% 0px'});
  d.querySelectorAll('.rv,.flow').forEach(function(el){io.observe(el);});

  // story
  var stage=d.querySelector('.story__stage'), phone=d.querySelector('.phone'), steps=[].slice.call(d.querySelectorAll('.step'));
  function setStep(n){
    phone.setAttribute('data-step',n); stage.setAttribute('data-step',n);
    steps.forEach(function(s){ s.classList.toggle('is-active', s.getAttribute('data-step')===String(n)); });
  }
  if(phone){
    setStep(1);
    var mq=window.matchMedia('(max-width:860px)'), timer=null, cur=1;
    var sio=new IntersectionObserver(function(es){
      if(mq.matches) return;
      es.forEach(function(e){ if(e.isIntersecting) setStep(e.target.getAttribute('data-step')); });
    },{rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){sio.observe(s);});
    // mobile: autoplay while visible
    var vis=new IntersectionObserver(function(es){
      es.forEach(function(e){
        clearInterval(timer);
        if(e.isIntersecting && mq.matches && !reduce){
          timer=setInterval(function(){cur=cur%4+1;phone.setAttribute('data-step',cur);stage.setAttribute('data-step',cur);},2800);
        }
      });
    },{threshold:.4});
    vis.observe(phone);
  }

  // expense toggles
  d.querySelectorAll('.exp__toggle').forEach(function(t){
    t.addEventListener('click',function(){
      var el=d.getElementById(t.getAttribute('aria-controls'));
      var o=t.getAttribute('aria-expanded')==='true';
      t.setAttribute('aria-expanded',String(!o)); el.hidden=o;
    });
  });
})();
