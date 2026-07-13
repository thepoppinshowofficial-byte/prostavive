(function () {
  const REDIRECT = "https://prostaaviv.netlify.app/";

  const styles = `
    .modal-backdrop{display:none;position:fixed;inset:0;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99999;align-items:center;justify-content:center;padding:1rem;animation:bd-in .25s ease;}
    @keyframes bd-in{from{opacity:0}to{opacity:1}}
    .modal{background:#fff;border-radius:16px;padding:2.2rem 2rem 2rem;max-width:460px;width:100%;box-shadow:0 24px 60px rgba(0,0,0,.3);animation:m-in .32s cubic-bezier(.34,1.4,.64,1);font-family:Arial,sans-serif;text-align:center;border-top:4px solid #1a4a8a;}
    @keyframes m-in{from{opacity:0;transform:scale(.91) translateY(14px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal h3{font-size:1.15rem;font-weight:700;color:#1a4a8a;margin:0 0 .6rem;}
    .modal p{font-size:.87rem;color:#555;line-height:1.7;margin:0 0 1.5rem;}
    .modal p a{color:#1a4a8a;text-decoration:underline;}
    .modal-divider{border:none;border-top:1px solid #ebebeb;margin:0 0 1.5rem;}
    .modal-actions{display:flex;gap:.75rem;}
    .mbtn{flex:1;padding:.82rem 1rem;border-radius:8px;font-size:.9rem;font-weight:700;cursor:pointer;transition:background .2s,transform .15s;border:none;background:#1a4a8a;color:#fff;}
    .mbtn:hover{background:#0d2d5a;transform:translateY(-1px);}
    .mbtn.ghost{background:#fff;color:#1a4a8a;border:2px solid #1a4a8a;}
    .mbtn.ghost:hover{background:#e8f0fe;transform:translateY(-1px);}
    .modal-note{display:block;font-size:.74rem;color:#aaa;margin-top:1rem;}
    .modal-note a{color:#aaa;text-decoration:underline;}
    .fade-out{opacity:0;transition:opacity .18s ease;}
  `;

  const el = document.createElement("style");
  el.textContent = styles;
  document.head.appendChild(el);

  function buildPopup() {
    if (document.querySelector(".modal-backdrop")) return null;
    const bd = document.createElement("div");
    bd.className = "modal-backdrop";
    bd.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <h3>Valoramos Tu Privacidad</h3>
        <p>Utilizamos cookies para mejorar tu experiencia de navegación. Al hacer clic en <strong>Aceptar Todo</strong>, aceptas el uso de cookies como se describe en nuestra <a href="privacy.html">Política de Cookies</a>.</p>
        <hr class="modal-divider">
        <div class="modal-actions">
          <button class="mbtn"       id="p-yes">✓ Aceptar Todo</button>
          <button class="mbtn ghost" id="p-no">✕ Rechazar</button>
        </div>
        <span class="modal-note">
          <a href="privacy.html">Privacidad</a>
          &nbsp;·&nbsp;
          <a href="terms.html">Términos</a>
          &nbsp;·&nbsp;
          <a href="affiliate-disclosure.html">Afiliados</a>
        </span>
      </div>`;
    document.body.appendChild(bd);
    bd.style.display = "flex";
    function close() { bd.classList.add("fade-out"); setTimeout(() => bd.remove(), 180); }
    return { bd, close };
  }

  // index.html — Yes = close | No = privacy
  window.PopupIndex = function () {
    if (sessionStorage.getItem("salud_consent_v1") === "1") return;
    const built = buildPopup(); if (!built) return;
    const { bd, close } = built;
    bd.querySelector("#p-yes").addEventListener("click", () => {
      sessionStorage.setItem("salud_consent_v1", "1");
      close();
    });
    bd.querySelector("#p-no").addEventListener("click", () => {
      sessionStorage.setItem("salud_consent_v1", "1");
      window.location.href = "privacy.html";
    });
  };

  // lander.html — both redirect
  window.PopupLander = function () {
    const built = buildPopup(); if (!built) return;
    const { bd } = built;
    bd.querySelector("#p-yes").addEventListener("click", () => { window.location.href = REDIRECT; });
    bd.querySelector("#p-no").addEventListener("click", () => { window.location.href = REDIRECT; });
  };

})();

function toggleFAQ(el){
  var a=el.nextElementSibling,i=el.querySelector('span:last-child'),o=a.style.display==='block';
  a.style.display=o?'none':'block';
  i.textContent=o?'+':'−';
}
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.faq-a').forEach(function(a){a.style.display='none';});
});
