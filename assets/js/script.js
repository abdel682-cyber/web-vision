const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));}else{document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));}
const form=document.querySelector('[data-contact-form]');
if(form){
  form.addEventListener('submit',async event=>{
    event.preventDefault();

    const data=new FormData(form);

    const payload={
      nome:data.get('nome'),
      email:data.get('email'),
      messaggio:data.get('messaggio')
    };

    const message=form.querySelector('.form-message');

    try{
      const response=await fetch('https://script.google.com/macros/s/AKfycbzx9HcQIon9k1vLkUG7130guCv3N56F_reL01W5bOLdZwK9EnOFQeV0enclQxMNIGi1/exec',{
        method:'POST',
        headers:{
          'Content-Type':'text/plain;charset=utf-8'
        },
        body:JSON.stringify(payload)
      });

      if(!response.ok){
        throw new Error('Errore nell\'invio');
      }

      message.textContent='Richiesta inviata con successo! Ti ricontatteremo al più presto.';
      form.reset();

    }catch(error){
      message.textContent='Non è stato possibile inviare la richiesta. Riprova tra poco.';
    }
  });
