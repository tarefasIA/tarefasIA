// Marca que o JS carregou — isso ativa a animação de entrada no CSS.
// Se por algum motivo este arquivo não carregar, o site continua
// 100% visível e funcional (ver style.css).
document.documentElement.classList.add('js');

// ---------------------------------------------------------
// Scroll reveal
// ---------------------------------------------------------
const revealTargets = document.querySelectorAll('.section, .hero');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealTargets.forEach((el) => observer.observe(el));
} else {
  // Sem suporte a IntersectionObserver: mostra tudo direto.
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// ---------------------------------------------------------
// Botão "Copiar código"
// ---------------------------------------------------------
const copyBtn = document.getElementById('copy-btn');
const copyFeedback = document.getElementById('copy-feedback');

if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const code = copyBtn.getAttribute('data-code') || '';

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        // Fallback para navegadores/contextos sem Clipboard API
        const textarea = document.createElement('textarea');
        textarea.value = code;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      if (copyFeedback) {
        copyFeedback.classList.add('is-visible');
        setTimeout(() => copyFeedback.classList.remove('is-visible'), 2200);
      }
    } catch (err) {
      console.error('Não foi possível copiar o código:', err);
    }
  });
}
