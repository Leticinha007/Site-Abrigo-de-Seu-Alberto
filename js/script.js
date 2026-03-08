// ========== FUNÇÕES DE DATA DINÂMICA ==========

// Retorna o ano atual
function getAnoAtual() {
    return new Date().getFullYear();
}

// Retorna o ano de fundação do abrigo 
const ANO_FUNDACAO = 2004; 

// Calcula quantos anos de história
function getAnosHistoria() {
    return getAnoAtual() - ANO_FUNDACAO;
}

// Atualiza o ano no copyright
function atualizarCopyright() {
    const elementosCopyright = document.querySelectorAll('.footer-bottom p');
    elementosCopyright.forEach(elemento => {
        if (elemento.textContent.includes('©')) {
            // Substitui qualquer ano entre 1900 e 2100 pelo ano atual
            elemento.textContent = elemento.textContent.replace(/© \d{4}/g, `© ${getAnoAtual()}`);
        }
    });
}

// Atualiza os anos de história no site
function atualizarAnosHistoria() {
    // Procura o elemento que contém "Anos de História"
    const elementosAnos = document.querySelectorAll('.numero-item p');
    elementosAnos.forEach(elemento => {
        if (elemento.textContent.includes('Anos de História')) {
            // Encontra o elemento irmão que contém o número
            const parent = elemento.parentElement;
            const numeroElement = parent?.querySelector('.numero');
            
            if (numeroElement) {
                const anosHistoria = getAnosHistoria();
                numeroElement.textContent = anosHistoria;
                numeroElement.setAttribute('data-target', anosHistoria);
            }
        }
    });

    // Também atualiza no footer se houver menção
    const footerTextos = document.querySelectorAll('.footer-info p');
    footerTextos.forEach(elemento => {
        if (elemento.textContent.includes('desde')) {
            // Atualiza o texto mantendo a informação "desde 2004"
            elemento.textContent = `Dedicado ao resgate e adoção de cães abandonados desde ${ANO_FUNDACAO}.`;
        }
    });
}

// ========== FUNÇÕES PARA WHATSAPP ==========

// Números de WhatsApp específicos para cada tipo de formulário
// Formato: código do país + DDD + número (sem espaços, sem +)
const NUMEROS_WHATSAPP = {
    adocao: "5581999903645",      // Número para adoções 
    apadrinhamento: "5581999204111", // Número para apadrinhamentos 
    contato: "5581999204111"       // Número para contato geral 
};

// Função para enviar formulário de adoção via WhatsApp
function enviarWhatsAppAdocao(event) {
    event.preventDefault(); // Impede o envio tradicional
    
    // Pegar valores dos campos
    const nome = document.getElementById("nome")?.value || "Não informado";
    const email = document.getElementById("email")?.value || "Não informado";
    const telefone = document.getElementById("telefone")?.value || "Não informado";
    const endereco = document.getElementById("endereco")?.value || "Não informado";
    const caoNome = document.getElementById("cao-nome")?.textContent || "Não informado";
    const caoId = document.getElementById("cao-id")?.value || "Não informado";
    
    // Campos adicionais
    const tipoResidencia = document.getElementById("tipo-residencia")?.value || "Não informado";
    
    const experienciaSelect = document.getElementById("experiencia");
    const experiencia = experienciaSelect?.value === "sim" ? "Sim" : experienciaSelect?.value === "nao" ? "Não" : "Não informado";
    
    const criancasSelect = document.getElementById("criancas");
    const criancas = criancasSelect?.value === "sim" ? "Sim" : criancasSelect?.value === "nao" ? "Não" : "Não informado";
    
    const outrosAnimaisSelect = document.getElementById("outros-animais");
    const outrosAnimais = outrosAnimaisSelect?.value === "sim" ? "Sim" : outrosAnimaisSelect?.value === "nao" ? "Não" : "Não informado";
    
    const porque = document.getElementById("porque")?.value || "Não informado";
    
    // Construir a mensagem
    let mensagem = `*NOVA SOLICITAÇÃO DE ADOÇÃO* 🐕%0a%0a`;
    mensagem += `*Cão de interesse:* ${caoNome} (ID: ${caoId})%0a`;
    mensagem += `*Nome:* ${nome}%0a`;
    mensagem += `*E-mail:* ${email}%0a`;
    mensagem += `*Telefone:* ${telefone}%0a`;
    mensagem += `*Endereço:* ${endereco}%0a`;
    mensagem += `*Tipo de residência:* ${tipoResidencia}%0a`;
    mensagem += `*Já teve cães antes?* ${experiencia}%0a`;
    mensagem += `*Possui crianças?* ${criancas}%0a`;
    mensagem += `*Possui outros animais?* ${outrosAnimais}%0a`;
    mensagem += `*Por que deseja adotar?* ${porque}%0a`;
    
    // Criar URL do WhatsApp com o número específico para adoção
    const url = `https://wa.me/${NUMEROS_WHATSAPP.adocao}?text=${mensagem}`;
    
    // Abrir WhatsApp em nova aba
    window.open(url, '_blank');
    
    // Fechar o modal
    document.getElementById('modal-adocao').style.display = 'none';
    
    // Redirecionar para obrigada.html após 1 segundo
    setTimeout(() => {
        window.location.href = "obrigada.html";
    }, 9000);
}

// Função para enviar formulário de apadrinhamento via WhatsApp
function enviarWhatsAppApadrinhamento(event) {
    event.preventDefault(); // Impede o envio tradicional
    
    // Pegar valores dos campos
    const nome = document.getElementById("nome-apadrinhamento")?.value || "Não informado";
    const email = document.getElementById("email-apadrinhamento")?.value || "Não informado";
    const telefone = document.getElementById("telefone-apadrinhamento")?.value || "Não informado";
    const caoNome = document.getElementById("cao-nome-apadrinhamento")?.textContent || "Não informado";
    const caoId = document.getElementById("cao-id-apadrinhamento")?.value || "Não informado";
    
    // Plano escolhido
    const planoSelect = document.getElementById("plano-apadrinhamento");
    const planoTexto = planoSelect?.options[planoSelect.selectedIndex]?.text || "Não selecionado";
    
    // Mensagem opcional
    const mensagem = document.getElementById("mensagem-apadrinhamento")?.value || "Não informada";
    
    // Construir a mensagem
    let mensagemWhats = `*NOVA SOLICITAÇÃO DE APADRINHAMENTO* 🐕%0a%0a`;
    mensagemWhats += `*Cão de interesse:* ${caoNome} (ID: ${caoId})%0a`;
    mensagemWhats += `*Nome:* ${nome}%0a`;
    mensagemWhats += `*E-mail:* ${email}%0a`;
    mensagemWhats += `*Telefone:* ${telefone}%0a`;
    mensagemWhats += `*Plano escolhido:* ${planoTexto}%0a`;
    mensagemWhats += `*Mensagem:* ${mensagem}%0a`;
    
    // Criar URL do WhatsApp com o número específico para apadrinhamento
    const url = `https://wa.me/${NUMEROS_WHATSAPP.apadrinhamento}?text=${mensagemWhats}`;
    
    // Abrir WhatsApp em nova aba
    window.open(url, '_blank');
    
    // Fechar o modal
    document.getElementById('modal-apadrinhamento').style.display = 'none';
    
    // Redirecionar para obrigada.html após 1 segundo
    setTimeout(() => {
        window.location.href = "obrigada.html";
    }, 1000);
}

// Função para enviar formulário de contato via WhatsApp
function enviarWhatsAppContato(event) {
    event.preventDefault(); // Impede o envio tradicional
    
    // Pegar valores dos campos
    const nome = document.getElementById("nome")?.value || "Não informado";
    const email = document.getElementById("email")?.value || "Não informado";
    const telefone = document.getElementById("telefone")?.value || "Não informado";
    
    // Assunto
    const assuntoSelect = document.getElementById("assunto");
    const assuntoTexto = assuntoSelect?.options[assuntoSelect.selectedIndex]?.text || "Não selecionado";
    
    // Mensagem
    const mensagem = document.getElementById("mensagem")?.value || "Não informada";
    
    // Construir a mensagem
    let mensagemWhats = `*NOVA MENSAGEM DE CONTATO* 📬%0a%0a`;
    mensagemWhats += `*Nome:* ${nome}%0a`;
    mensagemWhats += `*E-mail:* ${email}%0a`;
    mensagemWhats += `*Telefone:* ${telefone}%0a`;
    mensagemWhats += `*Assunto:* ${assuntoTexto}%0a`;
    mensagemWhats += `*Mensagem:* ${mensagem}%0a`;
    
    // Criar URL do WhatsApp com o número específico para contato
    const url = `https://wa.me/${NUMEROS_WHATSAPP.contato}?text=${mensagemWhats}`;
    
    // Abrir WhatsApp em nova aba
    window.open(url, '_blank');
    
    // Redirecionar para obrigada.html após 1 segundo
    setTimeout(() => {
        window.location.href = "obrigada.html";
    }, 1000);
}

// Banco de dados dos cães
const caes = [
    {
        id: 1,
        nome: "Agnes",
        idade: "15/01/2026",
        porte: "Filhote",
        sexo: "Fêmea",
        personalidade: "EM BREVE DISPONÍVEL PARA ADOÇÃO",
        historia: "Oi, eu sou a Agnes. Ainda sou uma filhotinha, mas já estou crescendo cheia de saúde, curiosidade e vontade de brincar. Cada dia aqui é uma nova descoberta, um carinho gostoso e uma corridinha animada com meus amiguinhos. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinha para encontrar minha família definitiva. Enquanto esse dia não chega, posso receber amor através do apadrinhamento, que me ajuda a continuar crescendo protegida e bem cuidada. Estou só começando minha história e já sonho com um lar cheio de carinho, segurança e muito amor para compartilhar.",
        imagem: "imagens/Agnes.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: false,
        paraApadrinhamento: true
    },
    {
        id: 2,
        nome: "Anie",
        idade: "2 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Brincalhona e alegre",
        historia: "Oi, eu sou a Anie. Sou uma cadelinha muito doce e tranquila, daquelas que gostam de observar tudo com calma e receber carinho com jeitinho. Tenho um coração cheio de amor e adoro quando alguém se aproxima com paciência e gentileza. Posso até ser um pouco reservada no começo, mas quando me sinto segura mostro todo o meu lado carinhoso e companheiro. Meu maior sonho é encontrar uma família que entenda o meu jeitinho e me dê um lar cheio de cuidado, carinho e amor.",
        imagem: "imagens/Anie1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false

    },
    {
        id: 3,
        nome: "Any",
        idade: "11 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Bela e assustada",
        historia: "Oi, eu sou a Any. Cheguei ao abrigo quando tinha cerca de dois meses, junto com meus quatro irmãos. Aqui somos conhecidos como a “gangue do Xerife” — existe um pacto entre nós: ele nos protege e nós retribuímos com muita lealdade. Eu cheguei a ser adotada uma vez, mas infelizmente fui devolvida porque disseram que eu não deixava ninguém se aproximar. A verdade é que eu só preciso de um pouco de tempo para confiar. Não sou um caso perdido, apenas uma cadelinha que precisa de paciência e respeito pelo seu tempo. Eu confio no Seu Alberto e sei que, com alguém que tenha carinho e calma, posso aprender a confiar também. Dentro de mim existe muito amor esperando para ser descoberto. Só preciso de alguém que aceite esse desafio e me dê uma chance.",
        imagem: "imagens/Any1.png",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 4,
        nome: "Astor",
        idade: "4 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Alegre e sociável",
        historia: "Oi, eu sou o Astor. Quando eu era só um filhotinho pequeno, fui deixado na porta do abrigo. Eu não entendia muito bem o que estava acontecendo… só sabia que estava sozinho. Mas a minha história não terminou ali. Seu Alberto me acolheu com muito amor e cuidado. Aqui eu tive proteção, comida, carinho e a chance de crescer em segurança. Aos poucos, fui aprendendo que nem todos os finais são tristes — alguns são recomeços. Hoje eu estou maiorzinho, mais forte e cheio de amor para dar. Sou um companheiro fiel, daqueles que gosta de estar por perto, sentir o carinho e fazer parte da família. Agora eu só estou esperando por você. Por uma família maravilhosa que queira me dar um lar de verdade, com paciência, cuidado e muito amor. Prometo retribuir com lealdade, alegria e aquele olhar cheio de gratidão que só quem já foi resgatado sabe ter. Você quer ser o meu final feliz?",
        imagem: "imagens/Astor1.png",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 5,
        nome: "Bartô",
        idade: "3 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Resiliente e dócil",
        historia: "Oi, eu sou o Bartô. Sou um cachorro muito especial, cheio de amor para dar e sempre pronto para receber carinho. Tenho um jeitinho tranquilo e gosto de estar por perto das pessoas, aproveitando cada momento de atenção e afeto. Aqui no abrigo tenho amigos e sou bem cuidado, mas no fundo do meu coração eu sonho mesmo é com uma família só minha, um lugar onde eu possa me sentir parte de um lar de verdade. Com amor, paciência e companhia, tenho certeza de que posso ser um amigo fiel e trazer muita alegria para quem decidir me dar uma chance.",
        imagem: "imagens/Bartô.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 6,
        nome: "Bento",
        idade: "15/01/2026",
        porte: "Filhote",
        sexo: "Macho",
        personalidade: "EM BREVE DISPONÍVEL PARA ADOÇÃO",
        historia: "Oi, eu sou o Bento. Sou só um filhotinho ainda, mas já tenho um coração enorme cheio de amor para dar. Estou crescendo forte, saudável e cercado de cuidado, aprendendo todos os dias como o mundo pode ser bonito quando existe carinho. Ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família definitiva. Enquanto isso, posso receber amor através do apadrinhamento, que me ajuda a continuar crescendo com segurança e tudo o que preciso. Mal posso esperar pelo dia em que vou correr pela casa da minha família e ouvir alguém me chamar de “meu menino”.",
        imagem: "imagens/Bento.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: false,
        paraApadrinhamento: true
    },
    {
        id: 7,
        nome: "Beto",
        idade: "15/01/2026",
        porte: "Filhote",
        sexo: "Macho",
        personalidade: "EM BREVE DISPONÍVEL PARA ADOÇÃO",
        historia: "Oi, eu sou o Beto. Ainda sou filhotinho e estou crescendo forte, saudável e cheio de energia para descobrir o mundo. Cada dia aqui é uma nova aventura, cheia de brincadeiras e muito carinho das tias do abrigo. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família definitiva. Enquanto esse dia não chega, posso receber amor através do apadrinhamento, que me ajuda a continuar crescendo com tudo o que preciso. Estou só começando minha história e já sonho com um lar cheio de cuidado, proteção e muito amor para compartilhar.",
        imagem: "imagens/Beto.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: false,
        paraApadrinhamento: true
    },
    {
        id: 8,
        nome: "Black",
        idade: "5 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Tímido e sensível",
        historia: "Oi, eu sou o Black. Eu fui resgatado pelo Seu Alberto e, desde o começo, sempre fui um cachorro assustado. A vida me ensinou a ter medo antes mesmo de entender o que era carinho, então eu demoro um pouquinho para confiar. Gosto de observar primeiro, sentir o ambiente e ter certeza de que estou seguro. Mas, quando percebo que ninguém vai me machucar, meu coração começa a se acalmar e eu mostro meu lado mais doce. Eu não sou de chegar fazendo festa, sou do tipo que conquista devagar, com um olhar tímido e passos cuidadosos. Tudo o que eu preciso é de uma família paciente, que respeite meu tempo e me ajude a descobrir que o mundo também pode ser um lugar de amor. Dentro de mim existe um companheiro fiel esperando apenas uma chance para florescer.",
        imagem: "imagens/Black1.jpeg",
        tags: ["Castrado" , "Vacinado" , "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 9,
        nome: "Boris",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Esperto e tranquilo",
        historia: "Oi, eu sou o Boris. Minha história começou aqui no abrigo, porque minha mamãe foi resgatada ainda buchuda e acabou tendo a mim e aos meus irmãos aqui. Crescemos juntos, brincando e aprendendo a confiar nas pessoas que cuidam da gente com tanto carinho. Alguns dos meus irmãos ainda estão por aqui também, todos esperando pela mesma coisa: uma família para chamar de nossa. Eu sou um cãozinho cheio de amor para dar e fico imaginando como deve ser ter um lar, alguém para brincar comigo, passear e me dar carinho todos os dias. Enquanto esse dia não chega, sigo aqui no abrigo com esperança de que, em algum momento, alguém vai olhar para mim e perceber que eu posso ser o companheiro que estava faltando.",
        imagem: "imagens/Boris1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 10,
        nome: "Cacau",
        idade: "5 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Doce e companheira",
        historia: "Oi, eu sou a Cacau. Minha mamãe foi resgatada ainda buchuda e eu nasci aqui no abrigo junto com meus irmãos Boris, Phlox, Klinton e Will. Desde pequenininha crescemos juntos, cercados pelo cuidado e pelo carinho de quem cuida do abrigo. A vida aqui tem amor e amizade, mas no fundo do meu coração eu sonho em ter algo muito especial: uma família só minha. Enquanto esse dia não chega, sigo brincando com meus irmãos e esperando com esperança pelo momento em que alguém vai me escolher e me levar para casa, para começar uma nova história cheia de amor.",
        imagem: "imagens/Cacau.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 11,
        nome: "Chloe",
        idade: "7 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Mãe coruja",
        historia: "Oi, eu sou a Chloe. Eu cheguei ao abrigo ainda pequena, depois de enfrentar momentos difíceis nas ruas. Aqui encontrei cuidado, comida, segurança e pessoas que me deram muito carinho. Aos poucos fui aprendendo que podia confiar novamente e hoje sou uma cachorrinha doce, que gosta de companhia e de receber atenção. A vida no abrigo é cheia de amiguinhos, mas no fundo do meu coração eu sonho em ter uma família só minha, um lar onde eu possa dar e receber muito amor todos os dias. Enquanto esse dia não chega, sigo esperando com esperança por alguém que olhe para mim e perceba que posso ser uma companheira muito especial.",
        imagem: "imagens/Chloe1.jpg",
        tags: ["Castrada" , "Vacinada" , "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 12,
        nome: "Cidinha",
        idade: "3 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Carinhosa e tímida",
        historia: "Oi, eu sou a Cidinha. Minha história começou com alguns desafios, mas tudo mudou quando cheguei ao abrigo e encontrei pessoas que cuidaram de mim com muito carinho. Aqui eu aprendi a me sentir segura, recebi atenção e passei a conviver com vários amiguinhos. Sou uma cachorrinha doce, tranquila e muito companheira. Gosto de carinho, de momentos calmos e de estar perto das pessoas. Mesmo sendo grata por tudo que tenho aqui, o que eu mais sonho é ter uma família só minha, um lar onde eu possa viver cercada de amor e dar todo o carinho que guardo no meu coração.",
        imagem: "imagens/Cidinha2.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 13,
         nome: "Deno",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Forte e brincalhão",
        historia: "Poucos dias antes do Natal, uma surpresa foi deixada na porta do abrigo: oito filhotinhos indefesos, abandonados juntos, ainda muito pequenos e extremamente debilitados. Em meio à correria de fim de ano, eles se tornaram o nosso “presente de Natal”. Carinhosamente, foram apelidados de crequinhas. Tão frágeis, tão pequeninos… mas cheios de vontade de viver. Receberam todo o tratamento necessário, cuidados intensivos e muito amor. Aos poucos, foram ficando fortes, saudáveis e prontos para descobrir o mundo. Alguns dos seus irmãozinhos já foram adotados e hoje vivem em lares cheios de carinho. Mas Deno, Sol e Dracko ainda aguardam. Eles cresceram, estão ótimos, cheios de energia e prontos para escrever um novo capítulo da própria história. Cada um com seu jeitinho especial, mas todos com o mesmo desejo: ter uma família para chamar de sua. Que tal transformar o abandono deles em um verdadeiro milagre de Natal que dura o ano inteiro? Deno, Sol e Dracko só precisam de uma chance para retribuir com amor, lealdade e muitos momentos felizes.",
        imagem: "imagens/Deno1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 14,
        nome: "Dobby",
        idade: "2 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Apegado e carente",
        historia: "Oi, eu sou o Dobby. Fui abandonado ainda filhotinho em frente ao abrigo junto com meus irmãos. Nós chegamos muito debilitados, frágeis e precisando de ajuda urgente, mas recebemos todos os cuidados necessários e, com muito carinho e dedicação, conseguimos sobreviver e ficar fortes novamente. Foi uma grande vitória. Alguns dos meus irmãos já encontraram suas famílias, mas eu e meu irmão Sebastian ainda estamos esperando pela nossa vez. Crescemos aqui com esperança no coração, sonhando com o dia em que alguém também vai nos escolher. Somos jovens, cheios de vida e temos muito amor para dar. Tudo o que queremos é uma família que nos acolha, nos permita fazer parte da rotina e dividir os momentos simples da vida. Eu já venci a parte mais difícil da minha história, agora só falta encontrar um lar onde eu possa viver cercado de amor.",
        imagem: "imagens/Doby1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 15,
        nome: "Dolly",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Esperançosa e calma",
        historia: "Oi, eu sou a Dolly. Minha história começou de forma bem delicada. Minha mamãe deu à luz a mim e a mais cinco filhotes em plena calçada, expostas ao frio, à fome e aos perigos da rua. Felizmente fomos resgatadas e levadas para a segurança do abrigo, onde recebemos cuidado, proteção e muito amor. Com o tempo ficamos fortes e saudáveis e, um a um, meus irmãos foram encontrando suas famílias. Até minha mamãe já ganhou um lar. Eu fiquei aqui esperando a minha vez. Sou saudável, cheia de amor para dar e sonho em encontrar alguém que me escolha para fazer parte da sua vida. Tudo o que eu mais quero agora é um lar onde eu possa viver cercada de carinho e finalmente ter uma família para chamar de minha.",
        imagem: "imagens/Dolly.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 16,
        nome: "Dorothy",
        idade: "1 ano",
        porte: "Pequeno",
        sexo: "Fêmea",
        personalidade: "Alegre e dócil",
        historia: "Oi, eu sou a Dorothy. Um dia apareci na rua do abrigo junto com minha irmã, Mélanie. Éramos duas vidinhas indefesas pedindo ajuda em silêncio, e foi assim que Seu Alberto nos encontrou. Mesmo com o abrigo cheio, ele não conseguiu nos deixar para trás e nos levou para um lar temporário. Lá passamos por um período delicado, porque ficamos doentinhas, mas recebemos todos os cuidados e muito carinho. Com o tempo nos recuperamos bem e hoje estamos saudáveis, cheias de energia e prontas para viver uma nova história. Eu adoro brincar, correr e aproveitar cada momento enquanto espero algo muito especial: uma família definitiva. Já mostrei que sou forte, doce e cheia de vontade de viver, agora só falta alguém abrir o coração e me dar a chance de ter um lar.",
        imagem: "imagens/Dorothy1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 17,
        nome: "Drako",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Apegado e carente",
        historia: "Drako foi abandonado na porta do abrigo junto com seus 7 irmãos, poucos dias antes do Natal. Pequenos demais, frágeis e muito debilitados, chegaram precisando de ajuda urgente. Em meio àquela situação tão difícil, acabaram se tornando o nosso “presente de Natal”. Carinhosamente, foram apelidados de crequinhas. Oito vidinhas que lutaram desde cedo para sobreviver. Receberam todo o tratamento necessário, cuidado, proteção e muito amor. Aos poucos, foram ficando fortes, saudáveis e cheios de energia. Alguns dos irmãos já encontraram suas famílias e hoje vivem cercados de carinho. Mas Drako, Deno e Sol continuam esperando. Eles são extremamente carinhosos, companheiros e adoram estar por perto. Têm aquele jeitinho fiel, de quem só quer fazer parte de uma família e retribuir com amor verdadeiro. Depois de superarem um começo tão difícil, agora só falta uma coisa: um lar definitivo, onde possam crescer, brincar e serem amados para sempre. Que tal transformar a espera deles no mais bonito dos finais felizes?",
        imagem: "imagens/Drako1.png",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 18,
        nome: "Duque",
        idade: "7 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e amoroso",
        historia: "Oi, eu sou o Duque. Eu nasci aqui no abrigo e, desde pequeno, sonhava em ter uma família. Esse sonho se tornou realidade quando fui adotado e passei cinco anos vivendo em um lar, acreditando que aquele seria meu final feliz. Mas, por circunstâncias da vida, precisei voltar para o abrigo. Minha tutora já estava com idade avançada e não conseguia mais lidar com meu porte grande. Mesmo com essa mudança difícil, continuo sendo um cão dócil, carinhoso e muito brincalhão. Adoro companhia, gosto de interagir e tenho aquele jeitinho alegre de quem só quer estar perto e fazer parte da rotina da família. Eu já sei como é ter um lar e sonho em viver isso novamente. Agora estou esperando por uma nova oportunidade, um lar preparado para meu porte e com muito espaço no coração para me receber.",
        imagem: "imagens/Duque1.png",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 19,
        nome: "Feijoada",
        idade: "2 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Tranquila e sábia",
        historia: "Oi, eu sou a Feijoada. Fui resgatada ainda filhotinha, tão pequenininha que parecia mesmo um feijãozinho — e foi assim que ganhei meu nome. Desde bebê sempre fui doce, brincalhona e cheia de energia. Cresci espalhando alegria por onde passo, adorando correr, brincar e estar por perto. Cheguei a ser adotada uma vez, mas infelizmente não consegui me adaptar como esperado. Por isso, hoje o ideal é que minha adoção seja conjunta, para que eu tenha a companhia de outro cão e me sinta mais segura. Sou amorosa, cheia de vida e só preciso de um lar que entenda meu jeitinho e me dê a chance de florescer. Com paciência e carinho, tenho certeza de que posso viver um final feliz ao lado de uma família que me escolha de verdade.",
        imagem: "imagens/feijoada1.png",
        tags: ["Castrada" , "Vacinada" , "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 20,
        nome: "Felicia",
        idade: "5 anos",
        porte: "Pequeno",
        sexo: "Fêmea",
        personalidade: "Calma e carinhosa",
        historia: "Oi, eu sou a Felícia. Minha história comoveu muitas pessoas. Eu fui encontrada paraplégica, amarrada em uma via muito movimentada, sozinha e sem entender o que estava acontecendo. Passei alguns dias abandonada até que minha história chegou ao coração de Seu Alberto, que foi me buscar e me acolheu imediatamente. Infelizmente fiquei com uma sequela na coluna e não tenho mais os movimentos das minhas patinhas traseiras, mas isso não me impede de amar, de sentir alegria e de aproveitar a vida. Eu sou uma cadela muito carinhosa e simplesmente adoro receber carinho — por mim, pode fazer carinho o dia inteiro que eu fico feliz! Sou alegre, amorosa e muito grata por todo cuidado que recebo. Minha deficiência não define quem eu sou. Eu sou forte, cheia de amor e só preciso de uma família especial que enxergue além das minhas limitações e me dê a chance de viver cercada de carinho, segurança e amor.",
        imagem: "imagens/Felicia1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 21,
        nome: "Frederico",
        idade: "2 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Amoroso e cativante",
        historia: "Oi, eu sou o Frederico. Fui abandonado perto do abrigo e estava cheio de pulgas, precisando de cuidados e proteção. Felizmente minha saúde estava boa, e logo recebi tudo o que precisava para ficar limpinho, confortável e seguro. Mesmo depois do abandono, continuei sendo o mesmo cão carinhoso e amigável de sempre. Sou daquele tipo que se aproxima devagarinho, abana o rabinho e conquista com simplicidade. Gosto de companhia, de carinho e de estar por perto das pessoas. Agora estou esperando uma família que enxergue o quanto posso ser um companheiro leal e cheio de amor para dar. Só falta alguém olhar para mim e dizer: “vem pra casa”.",
        imagem:"imagens/Frederico2.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 22,
        nome: "Gilly",
        idade: "10 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou a Gilly. Eu venho de uma ninhada de quatro filhotes que foram abandonados por um carro na porta do abrigo. Meus três irmãos foram adotados e seguiram suas vidas em novos lares, mas eu fiquei. Já estou aqui há cerca de quatro anos esperando pela minha chance. Sou uma cadelinha calma, dócil e muito carinhosa. No começo posso ser um pouquinho desconfiada, mas é só até eu conhecer melhor a pessoa. Depois que percebo que posso confiar, mostro meu jeitinho doce e companheiro. No fundo, tudo o que eu mais quero é ter uma família para chamar de minha, um lar com carinho, segurança e um cantinho onde eu possa finalmente sentir que pertenço.",
        imagem: "imagens/Gilly1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 23,
        nome: "Henzel",
        idade: "7 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Henzel. Quando eu tinha cerca de três meses, fui jogado de um carro em uma rua perto do abrigo. Foi tudo muito rápido e eu fiquei assustado, sem entender o que estava acontecendo. Eu era só um filhote e minha vida mudou quando Seu Alberto me encontrou e me acolheu com muito carinho. Aqui no abrigo encontrei cuidado, segurança e também vários amiguinhos para brincar, o que ajudou meu coração a ficar mais leve. Hoje eu já cresci e, apesar do meu porte grande, sou um cachorro muito carinhoso, companheiro e adoro estar perto das pessoas. Tenho muito amor para dar e só estou esperando uma família que enxergue além do meu tamanho e me dê a chance de viver cercado de carinho e de um lar de verdade.",
        imagem: "imagens/henzel.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 24,
        nome: "Hillary",
        idade: "10 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Calma, dócil e carinhosa",
        historia: "Oi, eu sou a Hillary. Eu nasci aqui no abrigo e sou filha da Pituxa e do Fred — meu papai virou estrelinha em 2018, mas carrego comigo todo o amor que ele deixou. Cresci aqui ao lado da minha irmã Gabi e o abrigo sempre foi o único lar que eu conheci. Passei por um momento difícil quando uma castração não deu certo e acabei tendo uma ninhada de oito filhotes. Infelizmente apenas dois sobreviveram, mas a alegria de ver meus bebês sendo adotados e indo para lares cheios de amor foi muito especial para mim. Mesmo depois de tudo o que vivi, continuo sendo uma cadela cheia de carinho para dar. Agora eu também sonho em sentir o que é ter uma família só minha, um lar onde eu possa receber amor, cuidado e finalmente pertencer.",
        imagem: "imagens/hillary1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 25,
        nome: "Jessie",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Esperançosa e leal",
        historia: "Oi, eu sou a Jessie. Eu nasci aqui no abrigo. Minha mamãe, Brigitte, chegou na mesma época que meu pai, Henzel, e os dois tinham sido vítimas de abandono, mas encontraram aqui cuidado e proteção. Eu cheguei a ser adotada e, por um tempo, achei que tinha encontrado meu lar definitivo. Mas depois que cresci, fui devolvida. Disseram que iam se mudar e que eu dava muito trabalho. Foi um momento muito difícil para mim e por um tempo fiquei nervosa, insegura e com medo de confiar novamente. Com paciência e muito carinho, fui aos poucos recuperando minha confiança e voltando a ser feliz. Hoje continuo aqui, mais madura e mais forte, mas ainda com o mesmo sonho: encontrar uma família que me ame de verdade e que não desista de mim. Tudo o que eu mais quero é um lar onde o amor seja para sempre.",
        imagem: "imagens/Jessie2.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 26,
        nome: "Jhonny",
        idade: "2 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Guerreiro e alegre",
        historia: "Oi, eu sou o Jhony. Eu apareci na frente do abrigo em um estado muito delicado. Estava muito debilitado, desnutrido, cheio de carrapatos e com os olhinhos tão sensíveis que mal conseguia abri-los. Depois dos exames veio o diagnóstico de cinomose, e começou um período difícil, cheio de cuidados e atenção para que eu pudesse me recuperar. Mas eu lutei e consegui vencer essa batalha. Hoje sigo me adaptando às sequelas que a doença deixou, faço sessões de acupuntura e laser semanalmente, sempre recebendo muito carinho. Mesmo assim, sou um cachorro alegre, cheio de vida, gosto de brincar, correr e aproveitar cada momento. Minha condição não define quem eu sou. Sou um cão cheio de amor e gratidão, só esperando por uma família especial que entenda meus cuidados e queira compartilhar a vida comigo.",
        imagem: "imagens/Jhony1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 27,
        nome: "Joseph",
        idade: "7 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Joseph. Quando eu ainda era pequeno, fui acolhido por uma protetora que cuidou de mim com muito carinho até que eu encontrasse uma família. Eu cheguei a ser adotado e por um tempo achei que tinha encontrado meu lar para sempre, mas cerca de um ano depois acabei sendo devolvido e precisei recomeçar mais uma vez. Foi então que Seu Alberto me recebeu no abrigo e me deu uma nova chance de esperar por uma família. Mesmo depois dessa decepção, continuo sendo um cachorro amoroso, que gosta de companhia e ainda acredita no amor. Tudo o que eu mais quero agora é um lar definitivo, com alguém que olhe para mim com carinho e esteja disposto a construir uma história para sempre ao meu lado.",
        imagem: "imagens/Joseph.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 28,
        nome: "Klinton",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Calmo e companheiro",
        historia: "Oi, eu sou o Klinton. Minha mamãe foi resgatada já buchuda e foi aqui no abrigo que eu nasci, junto com meus irmãos Boris, Phlox, Cacau e Will. Desde o primeiro dia de vida eu conheci cuidado, segurança e muito carinho de quem cuida da gente todos os dias. Cresci brincando com meus irmãos, aprendendo a confiar nas pessoas e a dar muito amor. Alguns de nós ainda estamos aqui esperando pela nossa vez. Eu sigo sonhando em ter uma família só minha, um lar onde eu possa crescer, brincar e fazer parte da rotina de quem me escolher. Tenho muito amor para dar e estou pronto para levar alegria e companheirismo para quem abrir o coração para mim.",
        imagem: "imagens/klinton1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 29,
        nome: "Kovu",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Tímido e carinhoso",
        historia: "Oi, eu sou o Kovu. Eu nasci aqui no abrigo. Minha mamãe, Brigitte, chegou na mesma época que meu pai, Henzel, e os dois tinham sido vítimas de abandono antes de encontrarem proteção. Foi aqui que eu cresci cercado de cuidado. Eu cheguei a ser adotado junto com a Clarinha e por um tempo achei que tinha encontrado meu lar definitivo, mas não consegui me adaptar tão rápido quanto ela e acabei sendo devolvido. No começo eu sou um pouco assustado e preciso de um tempinho para entender que estou seguro, mas com paciência e carinho eu vou ganhando confiança. Sou carinhoso, gosto de estar perto e tenho uma paixão especial por bolinhas, que sempre despertam meu lado mais brincalhão. Tudo o que eu preciso é de uma família que respeite meu tempo e queira construir comigo um vínculo cheio de amor.",
        imagem: "imagens/kovu1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 30,
        nome: "Lexie",
        idade: "4 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Assustada e doce",
        historia: "Oi, eu sou a Lexie. Minha mamãe se chama Scarlett e ela, a titia Artemis e minha priminha Lady foram resgatadas perto do Clube da Aeronáutica, em um lugar cheiooo de doguinhos correndo risco de vida. Foi depois disso que eu nasci no abrigo, já em segurança, cercada de cuidado. Minha família é bem grande, fomos 14 irmãozinhos, mas infelizmente alguns viraram estrelinha, e eu aprendi desde cedo que a vida é preciosa. Eu sou um pouquinho assustada no começo, preciso de um tempinho para entender que está tudo bem e que posso confiar, mas quando me sinto segura eu adoro brincar, correr e mostrar meu jeitinho alegre. Dentro de mim tem muito amor guardado, só esperando uma família paciente e carinhosa que me dê a chance de florescer e viver tudo o que um lar de verdade pode oferecer.",
        imagem: "imagens/Lexie1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 31,
        nome: "Lady",
        idade: "7 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Fiel e protetora",
        historia: "Oi, eu sou a Lady. Eu cheguei ao abrigo junto com minha mamãe, Artemis, e minha tia, Scarlett. Antes vivíamos na rua, perto da casa do Reginaldo Rossi, junto com outros amiguinhos. Seu Alberto, com seu coração enorme, conseguiu nos resgatar e nos trazer para um lugar seguro, embora infelizmente não pudesse levar todos que estavam por lá. Desde então estou aqui, recebendo cuidado e carinho, mas ainda esperando algo muito especial: uma família para chamar de minha. Tudo o que eu mais quero é um lar cheio de amor, onde eu possa viver protegida e compartilhar todo o carinho que tenho para dar.",
        imagem: "imagens/Lady1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 32,
        nome: "Lion",
        idade: "6 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Lion, mas aqui no abrigo também me chamam de Zé Dentinho, por causa dos meus dentinhos que aparecem e fazem todo mundo rir. Eu nasci no abrigo, depois que minha mamãe Arya foi resgatada junto com a amiguinha Sansa. Elas passaram por momentos muito difíceis antes de chegar aqui, mas finalmente encontraram proteção e cuidado. Meu papai Pajé também teve uma história difícil antes de ser acolhido pelo Seu Alberto. Eu cresci cercado de carinho e segurança, mas ainda não conheci o que é ter um lar só meu. Meus irmãos já foram todos adotados, assim como meus pais, e agora só falta a minha vez. Sou cheio de vida, carinho e vontade de fazer parte de uma família. Tudo o que eu mais quero é encontrar alguém que me escolha e me dê a chance de viver cercado de amor.",
        imagem: "imagens/Lion1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 33,
        nome: "Logan",
        idade: "11 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e carente",
        historia: "Oi, eu sou o Logan. Um dia eu estava vagando sem rumo quando acabei sendo atropelado. Felizmente, o motorista parou para me ajudar, cuidou de mim e garantiu que eu recebesse todo o tratamento necessário até me recuperar. Como ele morava em apartamento e me achava grande demais, acabou me deixando no abrigo de Seu Alberto, comprometendo-se a ajudar com meus cuidados, mas sem que eu fosse colocado para adoção. Assim eu passei alguns anos aqui, mesmo com muitas pessoas dizendo que eu sou lindão e demonstrando interesse. Pareço até um pastor alemão em versão dourada. Hoje minha adoção finalmente foi liberada e eu estou esperando ansioso por uma família. Apesar do meu porte grande, sou muito dócil, carinhoso e adoro chegar perto das pessoas para pedir carinho. Só estou esperando alguém olhar para mim com amor e me levar para casa.",
        imagem: "imagens/logan1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 34,
        nome: "Lupe",
        idade: "12 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Brincalhão",
        historia: "Oi, eu sou o Lupe. Quando cheguei ao abrigo, eu era bem arisco e desconfiado, ficava sempre na defensiva porque a vida me ensinou a me proteger primeiro. Com o tempo, carinho e muita paciência, fui entendendo que estava seguro e que podia confiar de novo. Hoje sou um vira-lata de porte médio dócil, carinhoso e bem brincalhão, gosto de estar perto das pessoas e de receber atenção. Tenho heterocromia, um dos meus olhinhos é azul, e dizem que isso me deixa ainda mais especial. Sou muito querido pelos voluntários, que torcem muito para que eu encontre uma família só minha. Preciso contar que sou um pouco ciumento, então prefiro ser o único cachorro da casa, e também preciso de espaço para correr e gastar energia, pois não me adapto bem a apartamento. No fundo, tudo o que eu quero é um lar com quintal, amor e alguém que me escolha para sempre, porque quando eu amo, eu amo de verdade.",
        imagem: "imagens/lupe1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 35,
        nome: "Luckin",
        idade: "11 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Leal e tímido",
        historia: "Oi, eu sou o Luckin. Meu nome foi inventado por Seu Alberto, juntando “Lucky”, que significa sortudo em inglês, com “IN”. Depois ele descobriu que também existe uma rede de cafés chinesa com esse nome, olha só! Eu vim de uma ninhada de filhotes que foi abandonada na porta do abrigo quando tínhamos cerca de dois meses de idade. Eu, Radijah, Any, Lauren e mais um irmão fomos acolhidos aqui e hoje fazemos parte do grupo conhecido como a “gangue do Xerife”. Existe um acordo entre nós: ele nos protege e nós retribuímos com muita lealdade. No começo eu posso ser um pouco assustado, mas com paciência e carinho eu mostro que sou um cachorro calmo, dócil e muito carinhoso. Tudo o que eu preciso é de alguém que me dê uma chance para eu finalmente ser o cachorro mais sortudo do mundo.",
        imagem: "imagens/luckin1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 36,
        nome: "Lula",
        idade: "10 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Lula. Eu tinha uma tutora que cuidava de mim com carinho, mas um dia ela faleceu e, depois disso, os filhos dela me colocaram na rua. Foi um momento muito difícil, porque além da tristeza de perder quem eu amava, passei a enfrentar fome, frio e os perigos da rua. Em um desses dias eu corri atrás de uma galinha, mas era só para brincar, porque sou um cachorro muito dócil e brincalhão. Mesmo assim, fui ameaçado por causa disso. Minha sorte foi que Seu Alberto me acolheu e me trouxe para o abrigo. Aqui encontrei proteção e cuidado, mas ainda sonho em ter uma família novamente. Quando alguém visita o abrigo, eu sou um dos primeiros a correr para pedir carinho e atenção, porque adoro estar perto das pessoas. Tudo o que eu mais quero é uma nova oportunidade de ser feliz e de ser amado outra vez.",
        imagem: "imagens/Lula1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 37,
        nome: "Malu",
        idade: "3 anos",
        porte: "Pequeno",
        sexo: "Fêmea",
        personalidade: "Dócil e assustada.",
        historia: "Oi, eu sou a Malu. Minha história é bem triste, como a de muitos amiguinhos aqui do abrigo. Eu vivia em uma comunidade onde algumas pessoas que usavam drogas jogavam pedras em mim. Era muito assustador… Até que o Seu Alberto soube do que estava acontecendo e foi imediatamente me salvar daquela maldade enorme. Por causa de tudo que passei, fiquei com alguns traumas e ainda sou um pouco assustada. Mas, no fundo, eu só preciso de muita paciência, calma e amor para aprender a confiar novamente. Com tempo e carinho, posso me transformar em uma cadelinha muito carinhosa, doce e alegre. Se você tiver um coração paciente e quiser me dar a chance de descobrir que o mundo também pode ser cheio de amor, eu prometo tentar todos os dias ser sua melhor amiga.",
        imagem: "imagens/Malu1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 38,
        nome: "Melanie",
        idade: "2 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Doce e brincalhona",
        historia: "Oi, eu sou a Melanie. Eu apareci na rua do abrigo junto com a minha irmã Dorothy e, mesmo sem fazer barulho, conseguimos tocar o coração do Seu Alberto. O abrigo estava cheio naquele momento, mas isso não impediu que ele nos ajudasse. Fomos levadas para um lar temporário, onde tivemos acompanhamento veterinário e recebemos todos os cuidados que precisávamos. Assim que fomos liberadas, viemos para o abrigo, onde estamos até hoje. Aqui eu brinco, corro e aproveito cada dia com esperança no coração. Sou uma menina doce, cheia de vida, e só estou esperando a minha vez de ser escolhida. Enquanto minha família não chega, sigo acreditando que, em algum momento, alguém vai olhar para mim e sentir que eu sou exatamente o amor que estava faltando em casa.",
        imagem: "imagens/Melanie1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 39,
        nome: "Milu",
        idade: "4 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Carinhosa e companheira",
        historia: "Oi, eu sou a Milu. Um dia, Seu Alberto ouviu dizer que uma cadela tinha tido filhotes dentro de um mercadinho em reforma e foi até lá ver o que estava acontecendo. Era eu, com meus dois bebês, tentando protegê-los como podia. O abrigo estava lotado, então fomos para a casa da funcionária Bárbara, que virou nosso lar temporário. Lá fizemos tratamento para a doença do carrapato e, com cuidado e carinho, ficamos bem. Depois de alguns meses fomos para o abrigo e meus dois filhotes foram adotados. Eu fiquei. Sou uma cadela muito carinhosa e companheira, adoro estar perto e fazer parte da rotina. Agora só falta a minha vez de ter um lar para chamar de meu.",
        imagem: "imagens/Milu1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 40,
        nome: "Moly",
        idade: "4 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Tranquila e dócil",
        historia: "Oi, eu sou a Moly. Eu vivia em uma área de mata onde Seu Alberto costumava visitar e levar alimento para os animais. O casal que cuidava de mim e das minhas companheiras se mudou, e eu fiquei sem ninguém. Eu já tinha tratado a cinomose antes, então quando ele soube da situação, me trouxe para o abrigo. Sou dócil, muito tranquila e gosto de ambientes calmos. Só quero um cantinho seguro, carinho e alguém que me escolha para sempre.",
        imagem: "imagens/Molly.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 41,
        nome: "Nescau",
        idade: "2 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Brincalhão e dócil",
        historia: "Oi, eu sou o Nescau. Minha mamãe deu à luz na beira de um riacho e era ali que a gente vivia. Um dia, Seu Alberto ouviu falar da gente e foi nos resgatar. Eu estava entre os cinco filhotes dela. No começo eu era bem assustado, mas ao mesmo tempo sempre fui muito carinhoso. Minha mãe e minhas irmãs foram adotadas e eu continuo esperando ansiosamente pela minha família. Sou pequeno, cheio de amor para dar e só preciso de uma chance.",
        imagem: "imagens/Nescau1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 42,
        nome: "Neguinho",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Dócil e tranquilo",
        historia: "Oi, eu sou o Neguinho. Eu sou extremamente dócil com pessoas, crianças e outros pets. Sabe aquele cachorro que adora deitar pertinho e receber carinho? Sou eu! Sou tranquilo, companheiro e gosto de fazer parte da família. Meu sonho é ter um lar onde eu possa descansar tranquilo e receber muito cafuné todos os dias.",
        imagem: "imagens/Neguinho2.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 43,
        nome: "Noah",
        idade: "2 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Esperta e tranquila",
        historia: "Oi, eu sou a Noah. Eu sou extremamente dócil, adoro carinho e brincar, e me dou super bem com outros cães! Sou uma companheira tranquila, mas também gosto de momentos de diversão. Estou pronta para fazer parte da sua vida e encher seus dias de alegria e amor.",
        imagem: "imagens/Noah1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 44,
        nome: "Percy",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Brincalhão e dócil",
        historia: "Oi, eu sou o Percy. Eu nasci no abrigo, minha mamãe Brigitte chegou na mesma época que meu pai Henzel, e os dois foram vítimas de abandono antes de me terem. Eu cresci aqui, cercado de cuidado, mas ainda sonho em ter um lar só meu. Amo brincar de bolinha, posso passar horas correndo atrás dela! Sou grande no tamanho e também no amor que tenho para oferecer.",
        imagem: "imagens/Percy1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 45,
        nome: "Phlox",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Doce e esperançoso",
        historia: "Oi, eu sou o Phlox. Minha mamãe foi resgatada já buchuda e foi no abrigo que eu nasci, junto com meus irmãos Boris, Cacau, Klinton e Will. Desde o primeiro dia de vida eu conheci a segurança e o cuidado, mas ainda não conheci o que é ter um lar só meu. Cresci brincando com meus irmãos, aprendendo a confiar e a amar, e até hoje seguimos esperando por uma família. Eu já tenho cinco anos e continuo aqui, com o coração cheio de esperança de que alguém me escolha e me leve para viver tudo aquilo que eu só conheço de ouvir falar: uma casa, uma caminha só minha e amor para sempre.",
        imagem: "imagens/Phlox1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 46,
        nome: "Priscila Joy",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Calma e sensível",
        historia: "Oi, eu sou a Priscila Joy. Eu cheguei ao abrigo ainda bem novinha, com cerca de dois a três meses de vida. Pouco tempo depois fui diagnosticada com cinomose, mas felizmente o tratamento começou bem no início e, com muito cuidado e carinho, consegui vencer essa batalha sem ficar com nenhuma sequela. Hoje estou saudável e pronta para começar uma nova história. Sou uma cadelinha calma, quietinha e observadora. No começo posso ser um pouco assustada, porque tenho um jeitinho mais sensível, mas com tempo, paciência e amor eu mostro todo o carinho que tenho para dar. Tudo o que eu mais quero agora é um lar tranquilo e uma família que me ajude a florescer.",
        imagem: "imagens/Priscila Joy1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 47,
        nome: "Rabito",
        idade: "2 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Guerreiro e resiliente",
        historia: "Oi, eu sou o Rabito. Eu cheguei ao abrigo ainda filhote, junto com meus dois irmãos. Infelizmente um deles virou estrelinha e o outro foi adotado, mas eu fiquei aqui esperando minha vez. Em um momento da minha vida enfrentei uma grande batalha quando contraí cinomose. Foi muito difícil e a doença deixou algumas sequelas: perdi a visão e tive problemas nos movimentos das minhas patinhas. Mas eu lutei muito e, com cuidados, acupuntura e sessões de laser, fui melhorando aos poucos. Hoje eu consigo andar, mesmo com um pouco de dificuldade, e continuo cheio de vontade de viver. Eu gosto de brincar, explorar e aproveitar cada momento. Mesmo sem enxergar, sinto o mundo de outras formas e tenho muito amor para dar. Só estou esperando uma família que enxergue além das minhas limitações e me dê a chance de viver cercado de carinho.",
        imagem: "imagens/Rabito1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 48,
        nome: "Ralf",
        idade: "2 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Adora água e outros cães",
        historia: "Oi, eu sou o Ralf. Meus irmãos Bernardo e Joca já foram adotados, e agora só falta a minha casinha! Eu sou um rapaz muito lindo, dócil, adoro carinho e brincar. Amo água e uma boa praia me deixa feliz demais! Me dou super bem com outros cães e estou pronto para fazer parte de uma família que queira alegria, companhia e muito amor no dia a dia.",
        imagem: "imagens/Ralf1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 49,
        nome: "Sebastian",
        idade: "2 anos",
        porte: "Pequeno",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Sebastian. Sou dócil, adoro carinho e brincar, e me dou super bem com outros cães. No começo posso ser um pouco assustado com pessoas que não conheço, mas é só ter um pouquinho de paciência e muito amor que logo eu me acostumo e viro um companheiro fiel. Eu prometo que, quando confiar em você, vou te dar todo o amor que tenho guardado aqui dentro.",
        imagem: "imagens/Sebastian1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 50,
        nome: "Sol",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Dócil e tranquila",
        historia: "Oi, eu sou a Sol. Talvez você se lembre da minha turma, os crequinhas. Há cerca de dois anos fui abandonada na porta do abrigo junto com quase dez irmãos. Éramos muito bebês e estávamos muito debilitados, com a pele bem machucada, e foi por isso que recebemos esse apelido carinhoso. Fiz todo o tratamento, cresci forte e hoje estou saudável e pronta para encontrar uma família. Sou muito dócil, adoro carinho e amo brincar. Também me dou bem com outros cães. No começo posso ser um pouco assustada com pessoas que não conheço, mas com um pouco de paciência eu logo aprendo a confiar e mostro todo o meu carinho. Tudo o que eu preciso é de uma chance para finalmente ter um lar.",
        imagem: "imagens/Sol1.png",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 51,
        nome: "Sophia",
        idade: "6 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Meiga e tranquila",
        historia: "Oi, eu sou a Sophia. Eu vivia em uma área de mata onde algumas pessoas da região costumavam me alimentar, e assim eu ia levando a vida ao lado de outros cães que também estavam por lá. Eu sempre fui uma menina tranquila e quietinha. Um dia, as pessoas que costumavam cuidar da gente se mudaram e a comida deixou de aparecer todos os dias. Às vezes alguém passava e deixava um pouquinho, mas não era mais como antes. Foi então que Seu Alberto, que sempre ia até a mata para apreciar a natureza e levava um pouco de ração para os animais, me encontrou. Ele perguntou sobre mim e, quando soube da situação, decidiu me levar para o abrigo. Quando cheguei, descobriram que eu estava com algumas lesões na orelha e no focinho e, depois dos exames, viram que eu tinha leishmaniose. Fiz todo o tratamento e hoje estou bem e estabilizada, usando sempre minha coleira e sendo acompanhada direitinho. Sou uma cachorra muito tranquila e doce. No começo posso ser um pouquinho cismada, mas com calma e carinho eu volto a confiar e mostro todo o amor que tenho guardado. Inclusive, quando escuto alguém chamar meu nome, eu até me arrepio de alegria. Só estou esperando uma família que tenha paciência e amor para me dar a chance de ser feliz.",
        imagem: "imagens/Sofia1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 52,
        nome: "Spike",
        idade: "8 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Energético e carinhoso",
        historia: "Oi, eu sou o Spike. Eu sou cheio de energia e adoro brincar, correr e explorar tudo ao meu redor. Sou muito carinhoso e gosto de estar perto das pessoas, mas também tenho meu jeitinho atento e protetor. Quando confio, viro um amigo fiel para todas as horas. Meu maior desejo é ter uma família que goste de aventura, mas que também tenha tempo para carinho e companhia.",
        imagem: "imagens/Spike1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: true,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 53,
        nome: "Stela",
        idade: "3 anos",
        porte: "Pequeno",
        sexo: "Fêmea",
        personalidade: "Energética e brincalhona",
        historia: "Oi, eu sou a Stela! Tenho 3 anos, sou de porte pequeno, mas não se engane… eu tenho energia de sobra! Sou super dócil, adoro carinho e amo brincar. Me dou muito bem com outros cães e posso passar o dia inteiro correndo, pulando e me divertindo. Brincar é praticamente meu esporte favorito! Sou castrada, vacinada e vermifugada, pronta para levar alegria para uma família que tenha espaço no coração (e disposição!) para acompanhar meu ritmo.",
        imagem: "imagens/Stella.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 54,
        nome: "Suape",
        idade: "6 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Dócil e carinhosa",
        historia: "Oi, eu sou a Suape. Fui resgatada perto do Complexo Portuário que inspirou meu nome, uma palavra tupi-guarani que significa “caminhos sinuosos”… e acho que combina comigo, porque minha vida também teve seus caminhos difíceis. Quando fui encontrada, eu era bem arisca, mas melhorei muito com o tempo e o cuidado que recebi. Eu sou dócil e carinhosa do meu jeito. Tenho uma personalidade peculiar: às vezes peço carinho latindo, mas quando a pessoa vai me agarrar, eu posso dar uma escapadinha. Não gosto muito de ser apertada, gosto das coisas no meu tempo. Talvez por isso eu ainda não tenha sido adotada. Só preciso de alguém que me entenda, respeite meu jeitinho e me dê uma chance de mostrar o quanto posso amar.",
        imagem: "imagens/suape1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 55,
        nome: "Summer",
        idade: "5 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Sensível e assustada",
        historia: "Oi, eu sou a Summer. Eu nasci no abrigo, porque minha mamãe Brigitte chegou aqui na mesma época que meu papai Henzel, e os dois tinham sido vítimas de abandono. Cresci cercada de cuidado, mas ainda sonho em conhecer o que é ter um lar de verdade. Sou de porte grande e tenho um coração sensível. Sou um pouco assustada no começo, mas só preciso de amor e paciência para confiar. Quando me sinto segura, mostro minha doçura. As tias do abrigo indicam que eu seja adotada junto com alguém que me faça companhia, porque me sinto mais confiante assim. Meu maior desejo é encontrar alguém que me dê tempo e me escolha para sempre.",
        imagem: "imagens/Summer1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 56,
        nome: "Théo",
        idade: "3 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Dócil e brincalhão",
        historia: "Oi, eu sou o Théo! Fui abandonado ainda bebezinho em uma BR, mas papai Alberto me resgatou e mudou minha história. Hoje sou um menino muito lindo e completamente pronto para ser adotado! Sou MUITO dócil, SUUUUPER carinhoso, extremamente meigo e adoro ganhar atenção. Amo brincar, amo carinho e fico feliz demais quando posso correr e me divertir. Ah, e se tiver uma praia no meio do caminho, melhor ainda! Me dou SUPER bem com outros cães e adoro companhia. Modéstia à parte… sou um partidão mesmo! Só estou esperando minha família aparecer.",
        imagem: "imagens/Théo1.jpg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 57,
        nome: "Tigrão",
        idade: "3 anos",
        porte: "Grande",
        sexo: "Macho",
        personalidade: "Cauteloso e Dócil",
        historia: "Oi, eu sou o Tigrão. Minha mamãe, Ledinha, foi resgatada em uma área de mata, bem na beira de um barranco, um lugar muito perigoso para filhotes. Eu nasci junto com mais dois irmãos e éramos bem pequenininhos quando chegamos ao abrigo, cheios de carrapatos e precisando de cuidados. Felizmente fomos tratados e hoje estamos saudáveis e fortes. Meus irmãos já foram adotados e minha mamãe também vai ganhar um lar, agora só falta a minha vez. Eu sou um cachorro muito dócil, mas no começo posso ser um pouco cismado com quem ainda não conheço. Às vezes eu lato ou rosno, mas é só porque preciso de um tempinho para confiar, prometo que não sou de morder. Com paciência, carinho e amor eu mostro meu lado companheiro e carinhoso. Estou aqui esperando uma família que me dê uma chance de ter um lar cheio de amor.",
        imagem: "imagens/Tigrão1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 58,
        nome: "Tobias",
        idade: "15/01/2026",
        porte: "Filhote",
        sexo: "Macho",
        personalidade: "EM BREVE DISPONÍVEL PARA ADOÇÃO",
        historia: "Oi, eu sou o Tobias. Ainda sou filhotinho e estou crescendo forte e saudável. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família. Enquanto esse dia não chega, posso receber amor através do apadrinhamento. Estou só começando minha jornada e já sonho com um futuro cheio de carinho, brincadeiras e um lar só meu.",
        imagem: "imagens/Tobias.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: false,
        paraApadrinhamento: true
    },
    {
        id: 59,
        nome: "Vicky",
        idade: "8 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Dengosa e calma",
        historia: "Oi, eu sou a Vicky. Uma noite um casal chegou na porta do abrigo pedindo para que Seu Alberto me acolhesse. Disseram que tinham me encontrado e que eu chorava muito, por isso não podiam ficar comigo. Não sabemos ao certo o que aconteceu antes, mas acabei vindo morar aqui no abrigo. No começo eu chorava bastante e até ganhei o apelido de “chorona”, mas era só porque tudo era novo para mim. Com o tempo fui me acostumando, me sentindo mais segura e aprendendo a confiar novamente. Hoje estou aqui esperando por algo muito especial: uma família que me dê carinho, paciência e um lar para chamar de meu.",
        imagem: "imagens/Vicky1.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 60,
        nome: "Wagner",
        idade: "15/01/2026",
        porte: "Filhote",
        sexo: "Macho",
        personalidade: "EM BREVE DISPONÍVEL PARA ADOÇÃO",
        historia: "Oi, eu sou o Wagner. Ainda sou filhotinho e estou crescendo cheio de saúde e curiosidade pelo mundo. Cada dia é uma descoberta nova pra mim — uma brincadeira diferente, um cheirinho novo, um carinho que aquece o coração. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família definitiva. Enquanto esse momento não chega, posso receber amor através do apadrinhamento, que já faz toda diferença na minha vidinha. Estou só começando minha história e sonho com o dia em que terei um lar para chamar de meu, com muito carinho, proteção e brincadeiras sem fim.",
        imagem: "imagens/Wagner.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: false,
        paraApadrinhamento: true
    },
    {
        id: 61,
        nome: "Will",
        idade: "5 anos",
        porte: "Médio",
        sexo: "Macho",
        personalidade: "Tranquilo e companheiro.",
        historia: "Oi, eu sou o Will. Nasci no abrigo junto com meus irmãos, depois que minha mamãe foi resgatada ainda buchuda. Cresci cercado de cuidado, mas ainda não conheci o que é ter um lar só meu. Sou tranquilo, carinhoso e gosto de brincar com meus amigos daqui. Meu maior sonho é ser escolhido e finalmente descobrir como é ter uma família para chamar de minha.",
        imagem: "imagens/Will1.jpeg",
        tags: ["Castrado", "Vacinado", "Vermifugado"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 62,
        nome: "Xuxa",
        idade: "8 anos",
        porte: "Grande",
        sexo: "Fêmea",
        personalidade: "Mãe coruja e protetora",
        historia: "Oi, eu sou a Xuxa, também chamada de Artemis. Eu fui resgatada de um ponto de abandono em Boa Viagem, onde vivia nas ruas junto com vários outros cães e precisava proteger minha filhote, a Lady. Depois de um pedido de socorro, fui resgatada junto com ela e uma amiga, e finalmente encontrei segurança no abrigo. Sou de porte grande e, no começo, posso ser um pouco desconfiada com pessoas que não conheço, porque sempre tive um forte instinto de proteção. Gosto de cuidar de quem amo e às vezes até lato para proteger. Recebi o nome Artemis por causa da minha força, mas também sou chamada carinhosamente de Xuxa. No fundo, sou uma cadela cheia de amor, só esperando uma família que entenda meu jeitinho e me dê um lar cheio de carinho e segurança.",
        imagem: "imagens/xuxa1.jpg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    },
    {
        id: 63,
        nome: "Laika",
        idade: "5 anos",
        porte: "Médio",
        sexo: "Fêmea",
        personalidade: "Reservada e independente",
        historia: "Oi, eu sou a Laika. Já passei por muitas mudanças na minha vida e hoje sigo esperando pela minha própria família. Sou uma cadelinha tranquila, gosto de ficar mais na minha e observar tudo ao meu redor. Recebo carinho, claro, mas também gosto do meu espaço e não sou muito fã de ficar sendo agarrada o tempo todo. Tenho uma personalidade forte e posso ser um pouco dominante com outros cães, por isso me dou melhor com machos que sejam mais tranquilos e não dominantes. Com o tempo e convivendo com as pessoas certas, fui melhorando bastante e aprendendo a confiar cada vez mais. No fundo, sou uma menina independente, mas que também merece ter um lar, respeito e alguém que entenda o meu jeitinho.",
        imagem: "imagens/Laika.jpeg",
        tags: ["Castrada", "Vacinada", "Vermifugada"],
        destaque: false,
        paraAdocao: true,
        paraApadrinhamento: false
    }
];

// ========== FUNÇÕES GERAIS ==========

// Função para formatar o porte
function formatarPorte(porte) {
    const portes = {
        'pequeno': 'Pequeno',
        'medio': 'Médio',
        'grande': 'Grande',
        'filhote': 'Filhote'
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

// ========== FUNÇÕES PARA TRUNCAR TEXTO E LER MAIS ==========

// Função para truncar texto com limite de caracteres
function truncarTexto(texto, limite = 100) {
    if (!texto || texto.length <= limite) return texto;
    return texto.substring(0, limite) + '...';
}

// Função para expandir/recolher texto (LER MAIS/LER MENOS)
function lerMais(caoId) {
    const cao = caes.find(c => c.id === caoId);
    if (cao) {
        const elementoHistoria = document.getElementById(`historia-${caoId}`);
        const botao = elementoHistoria.nextElementSibling;
        
        if (elementoHistoria.textContent.includes('...') || elementoHistoria.textContent.length <= 100) {
            // Mostrar texto completo
            elementoHistoria.textContent = cao.historia;
            botao.textContent = 'Ler menos';
        } else {
            // Voltar ao texto resumido
            elementoHistoria.textContent = truncarTexto(cao.historia, 100);
            botao.textContent = 'Ler mais';
        }
    }
}

// ========== FUNÇÕES PARA ADOÇÃO ==========

// Função para criar card de cão (ADOÇÃO) - COM LER MAIS
function criarCardAdocao(cao) {
    const tagsHtml = cao.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const historiaResumida = truncarTexto(cao.historia, 100);
    const personalidadeDisplay = cao.personalidade ? `<p class="cao-personalidade">${cao.personalidade}</p>` : '';
    
    return `
        <div class="cao-card" data-id="${cao.id}">
            <img src="${cao.imagem}" alt="${cao.nome}">
            <div class="cao-info">
                <h3>${cao.nome}</h3>
                <div class="cao-tags">
                    <span class="tag">${formatarPorte(cao.porte)}</span>
                    <span class="tag">🎉 ${cao.idade}</span>
                    ${tagsHtml}
                </div>
                ${personalidadeDisplay}
                <p class="cao-historia" id="historia-${cao.id}">${historiaResumida}</p>
                ${cao.historia && cao.historia.length > 100 ? 
                    `<button class="btn-ler-mais" onclick="lerMais(${cao.id})">Ler mais</button>` : 
                    ''}
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
    
    console.log('Filtros aplicados:', { porteFiltro, idadeFiltro, sexoFiltro }); // Para debug
    
    const caesFiltrados = caes.filter(cao => {
        if (!cao.paraAdocao) return false;
        
        // ===== FILTRO DE PORTE =====
        let porteOk = true;
        if (porteFiltro) {
            const porteCao = String(cao.porte).toLowerCase().trim();
            const porteFiltroLower = porteFiltro.toLowerCase();
            
            // Remove acentos do porte do cão
            const porteCaoSemAcento = porteCao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            // Remove acentos do filtro
            const porteFiltroSemAcento = porteFiltroLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            // Tenta várias formas de comparação
            porteOk = 
                porteCaoSemAcento === porteFiltroSemAcento || // "medio" === "medio"
                porteCao.includes(porteFiltroLower) ||        // "médio" inclui "medio"
                porteFiltroLower.includes(porteCao) ||       // "medio" inclui "médio"
                porteCaoSemAcento.includes(porteFiltroSemAcento) || // "medio" inclui "medio"
                porteCao === "médio" && porteFiltroLower === "medio"; // Caso específico "médio"
        }
        
        // FILTRO DE IDADE
        let idadeOk = !idadeFiltro;
        const idadeCao = String(cao.idade).toLowerCase();
        if (idadeFiltro === 'filhote') idadeOk = idadeCao.includes('meses') || idadeCao.includes('2026') || idadeCao.includes('filhote');
        if (idadeFiltro === 'jovem') idadeOk = idadeCao === '1 ano' || idadeCao === '2 anos';
        if (idadeFiltro === 'adulto') idadeOk = idadeCao === '3 anos' || idadeCao === '4 anos' || idadeCao === '5 anos' || idadeCao === '6 anos';
        if (idadeFiltro === 'idoso') idadeOk = idadeCao === '7 anos' || idadeCao === '8 anos' || idadeCao === '10 anos' || idadeCao === '11 anos' || idadeCao === '12 anos';
        
        // FILTRO DE SEXO 
        let sexoOk = true;
        if (sexoFiltro) {
            const sexoCao = String(cao.sexo).toLowerCase().trim();
            const sexoFiltroLower = sexoFiltro.toLowerCase();
            
            // Remove acentos para comparação
            const sexoCaoSemAcento = sexoCao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const sexoFiltroSemAcento = sexoFiltroLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            sexoOk = sexoCaoSemAcento === sexoFiltroSemAcento || 
                    sexoCao.includes(sexoFiltroLower) || 
                    sexoFiltroLower.includes(sexoCao);
        }
        
        return porteOk && idadeOk && sexoOk;
    });
    
    const todosContainer = document.getElementById('todos-caes');
    if (todosContainer) {
        if (caesFiltrados.length === 0) {
            todosContainer.innerHTML = '<p style="text-align: center; padding: 2rem;">Nenhum cão encontrado com esses filtros.</p>';
        } else {
            todosContainer.innerHTML = caesFiltrados.map(criarCardAdocao).join('');
        }
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

// ========== FUNÇÕES PARA APADRINHAMENTO ==========

// Função para criar card de cão (APADRINHAMENTO) - COM LER MAIS
function criarCardApadrinhamento(cao) {
    const tagsHtml = cao.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    const historiaResumida = truncarTexto(cao.historia, 100);
    const personalidadeDisplay = cao.personalidade ? `<p class="cao-personalidade">${cao.personalidade}</p>` : '';
    
    return `
        <div class="cao-card" data-id="${cao.id}">
            <img src="${cao.imagem}" alt="${cao.nome}">
            <div class="cao-info">
                <h3>${cao.nome}</h3>
                <div class="cao-tags">
                    <span class="tag">${formatarPorte(cao.porte)}</span>
                    <span class="tag">🎉 ${cao.idade}</span>
                    ${tagsHtml}
                </div>
                ${personalidadeDisplay}
                <p class="cao-historia" id="historia-${cao.id}">${historiaResumida}</p>
                ${cao.historia && cao.historia.length > 100 ? 
                    `<button class="btn-ler-mais" onclick="lerMais(${cao.id})">Ler mais</button>` : 
                    ''}
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
        
        // ===== FILTRO DE PORTE =====
        let porteOk = true;
        if (porteFiltro) {
            const porteCao = String(cao.porte).toLowerCase().trim();
            const porteFiltroLower = porteFiltro.toLowerCase();
            
            // Remove acentos do porte do cão
            const porteCaoSemAcento = porteCao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const porteFiltroSemAcento = porteFiltroLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            porteOk = 
                porteCaoSemAcento === porteFiltroSemAcento ||
                porteCao.includes(porteFiltroLower) ||
                porteFiltroLower.includes(porteCao) ||
                porteCaoSemAcento.includes(porteFiltroSemAcento) ||
                porteCao === "médio" && porteFiltroLower === "medio";
        }
        
        // FILTRO DE IDADE
        let idadeOk = !idadeFiltro;
        const idadeCao = String(cao.idade).toLowerCase();
        if (idadeFiltro === 'filhote') idadeOk = idadeCao.includes('meses') || idadeCao.includes('2026') || idadeCao.includes('filhote');
        if (idadeFiltro === 'jovem') idadeOk = idadeCao === '1 ano' || idadeCao === '2 anos';
        if (idadeFiltro === 'adulto') idadeOk = idadeCao === '3 anos' || idadeCao === '4 anos' || idadeCao === '5 anos' || idadeCao === '6 anos';
        if (idadeFiltro === 'idoso') idadeOk = idadeCao === '7 anos' || idadeCao === '8 anos' || idadeCao === '10 anos' || idadeCao === '11 anos' || idadeCao === '12 anos';
        
        // FILTRO DE SEXO
        let sexoOk = true;
        if (sexoFiltro) {
            const sexoCao = String(cao.sexo).toLowerCase().trim();
            const sexoFiltroLower = sexoFiltro.toLowerCase();
            
            // Remove acentos para comparação
            const sexoCaoSemAcento = sexoCao.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const sexoFiltroSemAcento = sexoFiltroLower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            
            sexoOk = sexoCaoSemAcento === sexoFiltroSemAcento || 
                    sexoCao.includes(sexoFiltroLower) || 
                    sexoFiltroLower.includes(sexoCao);
        }
        
        return porteOk && idadeOk && sexoOk;
    });
    
    const container = document.getElementById('todos-caes-apadrinhamento');
    if (container) {
        if (caesFiltrados.length === 0) {
            container.innerHTML = '<p style="text-align: center; padding: 2rem;">Nenhum cão encontrado com esses filtros.</p>';
        } else {
            container.innerHTML = caesFiltrados.map(criarCardApadrinhamento).join('');
        }
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

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', () => {
    // ATUALIZA DATAS DINÂMICAS
    atualizarCopyright();
    atualizarAnosHistoria();
    
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
        
        // Adiciona evento de submit do formulário de adoção
        const formAdocao = document.getElementById('form-adocao');
        if (formAdocao) {
            formAdocao.addEventListener('submit', enviarWhatsAppAdocao);
        }
        
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
        
        // Adiciona evento de submit do formulário de apadrinhamento
        const formApadrinhamento = document.getElementById('form-apadrinhamento');
        if (formApadrinhamento) {
            formApadrinhamento.addEventListener('submit', enviarWhatsAppApadrinhamento);
        }
        
        // Event listeners para filtros de apadrinhamento
        const filtroPorte = document.getElementById('filtro-porte');
        const filtroIdade = document.getElementById('filtro-idade');
        const filtroSexo = document.getElementById('filtro-sexo');
        const limparBtn = document.getElementById('limpar-filtros');
        
        if (filtroPorte) filtroPorte.addEventListener('change', filtrarCaesApadrinhamento);
        if (filtroIdade) filtroIdade.addEventListener('change', filtrarCaesApadrinhamento);
        if (filtroSexo) filtroSexo.addEventListener('change', filtrarCaesApadrinhamento);
        if (limparBtn) limparBtn.addEventListener('click', limparFiltrosApadrinhamento);
        
    } else if (path.includes('contato.html')) {
        // Página de contato
        // Adiciona evento de submit do formulário de contato
        const formContato = document.getElementById('form-contato');
        if (formContato) {
            formContato.addEventListener('submit', enviarWhatsAppContato);
        }
        
    } else {
        // Página inicial (index.html)
        if (document.getElementById('modal-adocao')) {
            initModalAdocao();
            // Adiciona evento de submit do formulário de adoção
            const formAdocao = document.getElementById('form-adocao');
            if (formAdocao) {
                formAdocao.addEventListener('submit', enviarWhatsAppAdocao);
            }
        }
        if (document.getElementById('modal-apadrinhamento')) {
            initModalApadrinhamento();
            // Se tiver formulário de apadrinhamento no index, adiciona também
            const formApadrinhamento = document.getElementById('form-apadrinhamento');
            if (formApadrinhamento) {
                formApadrinhamento.addEventListener('submit', enviarWhatsAppApadrinhamento);
            }
        }
    }
});