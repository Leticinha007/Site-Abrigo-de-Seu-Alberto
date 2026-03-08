// Banco de dados dos cães (simulado)
const caes = [
    {
        id: 1,
        nome: "Théo",
        idade: "3 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Calmo e carinhoso",
        historia: "Chegou ao abrigo após seu tutor falecer. Busca um lar tranquilo para seus anos dourados.",
        imagem: "imagens/Théo1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 2,
        nome: "Sebastian",
        idade: "1 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Resgatada das ruas, adora correr e brincar com outros cães.",
        imagem: "imagens/Sebastian1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 3,
        nome: "Astor",
        idade: "6 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Alegre e sociável",
        historia: "Oi sou o Astor, fui deixado na porta do abrigo quando era um filhotinho pequeno. Mas fui acolhido com todo amor por Seu Alberto e agora estou esperando uma família maravilhosa.",
        imagem: "imagens/Astor1.png",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 4,
        nome: "Sol",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Dócil e tranquila",
        historia: "Sol é muito dócil com outros animais e crianças!",
        imagem: "imagens/Sol1.png",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 5,
        nome: "Ralf",
        idade: "1 ano",
        porte: "Médio/Grande",
        sexo: "Macho",
        personalidade: "Adora água e outros cães",
        historia: "Foi resgatado de uma situação de maus-tratos. Precisa de espaço para gastar energia.",
        imagem: "imagens/Ralf1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 6,
        nome: "Drako",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Apegado e carente",
        historia: "Foi encontrada em uma obra, assustada mas muito amorosa. Adora colo e carinho.",
        imagem: "imagens/Drako1.png",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 7,
        nome: "Nescau",
        idade: "1 ano",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Brincalhão ",
        historia: "Filhote resgatado com a mãe e irmãos. Muito energético e adora brincar.",
        imagem: "imagens/Nescau1.png",
        tags: ["Castrado" , "Vermifugado" , "Vacinado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 8,
        nome: "Ledinha",
        idade: "6 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Tranquila e sábia",
        historia: "Ledinha  é EXTREMAMENTE dócil com pessoas/cachorros, muito tranquila, uma cadela maravilhosa, super companheira!",
        imagem: "imagens/Ledinha1.png",
        tags: ["Castrada" , "Vermifugada" , "Vacinada"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 9,
        nome: "Noah",
        idade: "2 anos",
        porte: "Pequeno/Médio",
        sexo: "Fêmea",
        personalidade: "Esperta e tranquila",
        historia: "Pequeno mas cheio de energia. Adora correr atrás de bolinhas e fazer bagunça.",
        imagem: "imagens/Noah1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 10,
        nome: "Anie",
        idade: "1 ano",
        porte: "Pequeno/Médio",
        sexo: "Fêmea",
        personalidade: "Bela e assustada",
        historia: "Fui largada na porta do abrigo, com cerca de dois meses de idade, juntamente com quatro irmãos",
        imagem: "imagens/Anie1.png",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 11,
        nome: "Sebastian",
        idade: "1 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Resgatada das ruas, adora correr e brincar com outros cães.",
        imagem: "imagens/Sebastian1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 12,
        nome: "Thor",
        idade: "8 anos",
        porte: "grande",
        sexo: "macho",
        personalidade: "Calmo e carinhoso",
        historia: "Chegou ao abrigo após seu tutor falecer. Busca um lar tranquilo para seus anos dourados.",
        imagem: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
        tags: ["idoso", "calmo", "carinhoso"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 13,
         nome: "Stela",
        idade: "2 anos",
        porte: "medio",
        sexo: "femea",
        personalidade: "Brincalhona e energética",
        historia: "Resgatada das ruas, adora correr e brincar com outros cães.",
        imagem: "imagens/Stella.jpg",
        tags: ["jovem", "brincalhona", "energética"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: true
    },
    {
        id: 14,
        nome: "Bob",
        idade: "5 anos",
        porte: "pequeno",
        sexo: "macho",
        personalidade: "Alegre e sociável",
        historia: "Foi abandonado em uma caixa, mas nunca perdeu a alegria de viver.",
        imagem: "imagens/Duque1.png",
        tags: ["adulto", "alegre", "sociável"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 15,
        nome: "Mel",
        idade: "3 anos",
        porte: "medio",
        sexo: "femea",
        personalidade: "Dócil e tranquila",
        historia: "Muito medrosa no início, mas depois que confia é a companheira mais fiel.",
        imagem: "imagens/Lasie.png",
        tags: ["adulto", "dócil", "tranquila"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: true
    }
];

// ========== FUNÇÕES GERAIS ==========

// Função para formatar o porte
function formatarPorte(porte) {
    const portes = {
        'pequeno': 'Pequeno',
        'medio': 'Médio',
        'grande': 'Grande'
    };
    return portes[porte] || porte;
}

// Menu hamburger para mobile
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
}

// Função para animar os números
function animarNumeros() {
    const numeros = document.querySelectorAll('.numero');
    numeros.forEach(numero => {
        const target = parseInt(numero.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                numero.textContent = target;
                clearInterval(timer);
            } else {
                numero.textContent = Math.floor(current);
            }
        }, 30);
    });
}

// ========== FUNÇÕES PARA ADOÇÃO ==========

// Função para criar card de cão (ADOÇÃO)
function criarCardAdocao(cao) {
    const tagsHtml = cao.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="cao-card" data-id="${cao.id}">
            <img src="${cao.imagem}" alt="${cao.nome}">
            <div class="cao-info">
                <h3>${cao.nome}</h3>
                <div class="cao-tags">
                    <span class="tag">${formatarPorte(cao.porte)}</span>
                    <span class="tag">${cao.idade}</span>
                    ${tagsHtml}
                </div>
                <p class="cao-personalidade">${cao.personalidade}</p>
                <p class="cao-historia">${cao.historia}</p>
                <button class="btn-adotar" onclick="abrirModalAdocao(${cao.id})">Quero adotar</button>
            </div>
        </div>
    `;
}

// Função para carregar destaques na página inicial
function carregarDestaques() {
    const destaquesContainer = document.getElementById('destaques-caes');
    if (destaquesContainer) {
        const caesDestaque = caes.filter(cao => cao.destaque).slice(0, 3);
        destaquesContainer.innerHTML = caesDestaque.map(criarCardAdocao).join('');
    }
}

// Função para carregar todos os cães na página de adoção
function carregarTodosCaes() {
    const todosContainer = document.getElementById('todos-caes');
    if (todosContainer) {
        const caesAdocao = caes.filter(cao => cao.paraAdocao === true);
        todosContainer.innerHTML = caesAdocao.map(criarCardAdocao).join('');
    }
}

// Função para filtrar cães de adoção
function filtrarCaes() {
    const porteFiltro = document.getElementById('filtro-porte')?.value;
    const idadeFiltro = document.getElementById('filtro-idade')?.value;
    const sexoFiltro = document.getElementById('filtro-sexo')?.value;
    
    const caesFiltrados = caes.filter(cao => {
        if (!cao.paraAdocao) return false;
        
        let porteOk = !porteFiltro || cao.porte === porteFiltro;
        
        let idadeOk = !idadeFiltro;
        if (idadeFiltro === 'filhote') idadeOk = cao.idade.includes('meses') || cao.idade === '6 meses';
        if (idadeFiltro === 'jovem') idadeOk = cao.idade === '1 ano' || cao.idade === '2 anos';
        if (idadeFiltro === 'adulto') idadeOk = cao.idade === '3 anos' || cao.idade === '4 anos' || cao.idade === '5 anos';
        if (idadeFiltro === 'idoso') idadeOk = cao.idade === '7 anos' || cao.idade === '8 anos';
        
        let sexoOk = !sexoFiltro || cao.sexo === sexoFiltro;
        
        return porteOk && idadeOk && sexoOk;
    });
    
    const todosContainer = document.getElementById('todos-caes');
    if (todosContainer) {
        todosContainer.innerHTML = caesFiltrados.map(criarCardAdocao).join('');
    }
}

// Função para limpar filtros de adoção
function limparFiltros() {
    document.getElementById('filtro-porte').value = '';
    document.getElementById('filtro-idade').value = '';
    document.getElementById('filtro-sexo').value = '';
    carregarTodosCaes();
}

// Função para abrir modal de adoção
function abrirModalAdocao(caoId) {
    const cao = caes.find(c => c.id === caoId);
    if (cao) {
        document.getElementById('cao-nome').textContent = cao.nome;
        document.getElementById('cao-id').value = cao.id;
        document.getElementById('modal-adocao').style.display = 'block';
    }
}

// Inicialização do modal de adoção
function initModalAdocao() {
    const modal = document.getElementById('modal-adocao');
    const closeBtn = document.querySelector('.close');
    
    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Formulário de adoção
function initFormularioAdocao() {
    const form = document.getElementById('form-adocao');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Solicitação de adoção enviada com sucesso! Em breve entraremos em contato.');
            form.reset();
            document.getElementById('modal-adocao').style.display = 'none';
        });
    }
}

// ========== FUNÇÕES PARA APADRINHAMENTO ==========

// Função para criar card de cão (APADRINHAMENTO)
function criarCardApadrinhamento(cao) {
    const tagsHtml = cao.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    return `
        <div class="cao-card" data-id="${cao.id}">
            <img src="${cao.imagem}" alt="${cao.nome}">
            <div class="cao-info">
                <h3>${cao.nome}</h3>
                <div class="cao-tags">
                    <span class="tag">${formatarPorte(cao.porte)}</span>
                    <span class="tag">${cao.idade}</span>
                    ${tagsHtml}
                </div>
                <p class="cao-personalidade">${cao.personalidade}</p>
                <p class="cao-historia">${cao.historia}</p>
                <button class="btn-apadrinhar" onclick="abrirModalApadrinhamento(${cao.id})">Quero apadrinhar</button>
            </div>
        </div>
    `;
}

// Função para carregar cães disponíveis para apadrinhamento
function carregarCaesApadrinhamento() {
    const container = document.getElementById('todos-caes-apadrinhamento');
    if (container) {
        const caesApadrinhamento = caes.filter(cao => cao.paraApadrinhamento === true);
        container.innerHTML = caesApadrinhamento.map(criarCardApadrinhamento).join('');
    }
}

// Função para filtrar cães de apadrinhamento
function filtrarCaesApadrinhamento() {
    const porteFiltro = document.getElementById('filtro-porte')?.value;
    const idadeFiltro = document.getElementById('filtro-idade')?.value;
    const sexoFiltro = document.getElementById('filtro-sexo')?.value;
    
    const caesFiltrados = caes.filter(cao => {
        if (!cao.paraApadrinhamento) return false;
        
        let porteOk = !porteFiltro || cao.porte === porteFiltro;
        
        let idadeOk = !idadeFiltro;
        if (idadeFiltro === 'filhote') idadeOk = cao.idade.includes('meses') || cao.idade === '6 meses';
        if (idadeFiltro === 'jovem') idadeOk = cao.idade === '1 ano' || cao.idade === '2 anos';
        if (idadeFiltro === 'adulto') idadeOk = cao.idade === '3 anos' || cao.idade === '4 anos' || cao.idade === '5 anos';
        if (idadeFiltro === 'idoso') idadeOk = cao.idade === '7 anos' || cao.idade === '8 anos';
        
        let sexoOk = !sexoFiltro || cao.sexo === sexoFiltro;
        
        return porteOk && idadeOk && sexoOk;
    });
    
    const container = document.getElementById('todos-caes-apadrinhamento');
    if (container) {
        container.innerHTML = caesFiltrados.map(criarCardApadrinhamento).join('');
    }
}

// Função para limpar filtros de apadrinhamento
function limparFiltrosApadrinhamento() {
    document.getElementById('filtro-porte').value = '';
    document.getElementById('filtro-idade').value = '';
    document.getElementById('filtro-sexo').value = '';
    carregarCaesApadrinhamento();
}

// Função para abrir modal de apadrinhamento
function abrirModalApadrinhamento(caoId) {
    const cao = caes.find(c => c.id === caoId);
    if (cao) {
        document.getElementById('cao-nome-apadrinhamento').textContent = cao.nome;
        document.getElementById('cao-id-apadrinhamento').value = cao.id;
        document.getElementById('modal-apadrinhamento').style.display = 'block';
    }
}

// Inicialização do modal de apadrinhamento
function initModalApadrinhamento() {
    const modal = document.getElementById('modal-apadrinhamento');
    const closeBtn = modal?.querySelector('.close');
    
    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
}

// Formulário de apadrinhamento
function initFormularioApadrinhamento() {
    const form = document.getElementById('form-apadrinhamento');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Pega o plano escolhido
            const planoSelect = document.getElementById('plano-apadrinhamento');
            const planoTexto = planoSelect.options[planoSelect.selectedIndex]?.text || 'não selecionado';
            
            alert(`Solicitação de apadrinhamento enviada com sucesso!\nPlano escolhido: ${planoTexto}\nEm breve entraremos em contato.`);
            form.reset();
            document.getElementById('modal-apadrinhamento').style.display = 'none';
        });
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // Carrega os elementos comuns
    carregarDestaques();
    animarNumeros();
    initMobileMenu();
    
    // Verifica em qual página está e carrega as funções apropriadas
    const path = window.location.pathname;
    
    if (path.includes('adocao.html')) {
        // Página de adoção
        carregarTodosCaes();
        initModalAdocao();
        initFormularioAdocao();
        
        // Event listeners para filtros de adoção
        const filtroPorte = document.getElementById('filtro-porte');
        const filtroIdade = document.getElementById('filtro-idade');
        const filtroSexo = document.getElementById('filtro-sexo');
        const limparBtn = document.getElementById('limpar-filtros');
        
        if (filtroPorte) filtroPorte.addEventListener('change', filtrarCaes);
        if (filtroIdade) filtroIdade.addEventListener('change', filtrarCaes);
        if (filtroSexo) filtroSexo.addEventListener('change', filtrarCaes);
        if (limparBtn) limparBtn.addEventListener('click', limparFiltros);
        
    } else if (path.includes('apadrinhamento.html')) {
        // Página de apadrinhamento
        carregarCaesApadrinhamento();
        initModalApadrinhamento();
        initFormularioApadrinhamento();
        
        // Event listeners para filtros de apadrinhamento
        const filtroPorte = document.getElementById('filtro-porte');
        const filtroIdade = document.getElementById('filtro-idade');
        const filtroSexo = document.getElementById('filtro-sexo');
        const limparBtn = document.getElementById('limpar-filtros');
        
        if (filtroPorte) filtroPorte.addEventListener('change', filtrarCaesApadrinhamento);
        if (filtroIdade) filtroIdade.addEventListener('change', filtrarCaesApadrinhamento);
        if (filtroSexo) filtroSexo.addEventListener('change', filtrarCaesApadrinhamento);
        if (limparBtn) limparBtn.addEventListener('click', limparFiltrosApadrinhamento);
        
    } else {
        // Página inicial (index.html) - só carrega os destaques
        // Os modais não são necessários aqui, mas se existirem, inicializa
        if (document.getElementById('modal-adocao')) {
            initModalAdocao();
            initFormularioAdocao();
        }
        if (document.getElementById('modal-apadrinhamento')) {
            initModalApadrinhamento();
            initFormularioApadrinhamento();
        }
    }
});