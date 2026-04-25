// Aplica tema salvo antes do render para evitar flash
(function () {
    var t = localStorage.getItem('tema');
    if (t) document.documentElement.setAttribute('data-theme', t);
})();

function toggleDarkMode() {
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var next = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('tema', next);
    atualizarIconeTema();
}

function atualizarIconeTema() {
    var btn = document.getElementById('btn-tema');
    if (!btn) return;
    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    btn.setAttribute('title', isDark ? 'Modo claro' : 'Modo escuro');
}

// Scroll reveal
var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });

function observeReveal() {
    document.querySelectorAll('.reveal:not(.visible)').forEach(function (el) {
        revealObserver.observe(el);
    });
}
window.observeReveal = observeReveal;

// Contador animado
function animarContadores() {
    document.querySelectorAll('.numero[data-target]').forEach(function (el) {
        var target = parseInt(el.dataset.target);
        if (isNaN(target)) return;
        var steps = 60;
        var duration = 1800;
        var increment = target / steps;
        var current = 0;
        var step = 0;
        var timer = setInterval(function () {
            step++;
            current = Math.min(Math.round(increment * step), target);
            el.textContent = current.toLocaleString('pt-BR');
            if (current >= target) clearInterval(timer);
        }, duration / steps);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    atualizarIconeTema();

    // Adiciona classe reveal automaticamente nos elementos estáticos
    var selectors = [
        '.section-title',
        '.section-subtitle',
        '.numero-item',
        '.depoimento-card',
        '.porque-texto',
        '.porque-imagem',
        '.cupom-card',
        '.categoria-card',
        '.timeline-item',
        '.contato-info',
        '.contato-form'
    ];
    selectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el, i) {
            el.classList.add('reveal');
            el.style.setProperty('--delay', (i * 0.08) + 's');
        });
    });

    observeReveal();

    // Ativa contador quando a seção de números entra na tela
    var numeros = document.querySelector('.numeros');
    if (numeros) {
        new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                animarContadores();
                entries[0].target._contadorFeito = true;
            }
        }, { threshold: 0.3 }).observe(numeros);
    }
});
