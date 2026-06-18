/* ============================================================
   Shared lightbox — used by messages.html and photos.html.
   Requires ALL_PHOTOS (from data.js). Exposes openLightbox(i).
   ============================================================ */
(function(){
  const lb = document.createElement('div');
  lb.className='lightbox';
  lb.setAttribute('role','dialog');
  lb.setAttribute('aria-modal','true');
  lb.setAttribute('aria-label','Photo viewer');
  lb.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">✕</button>'+
    '<button class="lb-btn lb-prev" aria-label="Previous photo">‹</button>'+
    '<button class="lb-btn lb-next" aria-label="Next photo">›</button>'+
    '<img alt="" />'+
    '<div class="lb-cap"></div>';
  document.body.appendChild(lb);

  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-cap');
  let lbIndex = 0;

  window.openLightbox = function(i){
    if(i<0||i>=ALL_PHOTOS.length) return;
    lbIndex=i;
    lbImg.src=ALL_PHOTOS[i].src;
    lbCap.textContent=ALL_PHOTOS[i].name;
    lb.classList.add('open');
    document.body.style.overflow='hidden';
  };
  function close(){lb.classList.remove('open');document.body.style.overflow='';}
  function step(d){let n=lbIndex+d;if(n<0)n=ALL_PHOTOS.length-1;if(n>=ALL_PHOTOS.length)n=0;window.openLightbox(n);}

  lb.querySelector('.lb-close').addEventListener('click',close);
  lb.querySelector('.lb-prev').addEventListener('click',e=>{e.stopPropagation();step(-1);});
  lb.querySelector('.lb-next').addEventListener('click',e=>{e.stopPropagation();step(1);});
  lb.addEventListener('click',e=>{if(e.target===lb)close();});
  document.addEventListener('keydown',e=>{
    if(!lb.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')step(-1);
    if(e.key==='ArrowRight')step(1);
  });
})();
