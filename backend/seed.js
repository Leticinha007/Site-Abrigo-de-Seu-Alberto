require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
      }
);

async function seed() {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM dog_tags');
    await client.query('DELETE FROM dogs');

    await client.query(`
        INSERT INTO dogs (id, nome, idade, porte, sexo, personalidade, historia, imagem, destaque, para_adocao, para_apadrinhamento) VALUES
        (1,'Agnes','15/01/2026','Filhote','Fêmea','EM BREVE DISPONÍVEL PARA ADOÇÃO','Oi, eu sou a Agnes. Ainda sou uma filhotinha, mas já estou crescendo cheia de saúde, curiosidade e vontade de brincar. Cada dia aqui é uma nova descoberta, um carinho gostoso e uma corridinha animada com meus amiguinhos. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinha para encontrar minha família definitiva. Enquanto esse dia não chega, posso receber amor através do apadrinhamento, que me ajuda a continuar crescendo protegida e bem cuidada. Estou só começando minha história e já sonho com um lar cheio de carinho, segurança e muito amor para compartilhar.','imagens/Agnes.jpeg',false,false,true),
        (2,'Anie','2 anos','Porte Médio','Fêmea','Brincalhona e alegre','Oi, eu sou a Anie. Sou uma cadelinha muito doce e tranquila, daquelas que gostam de observar tudo com calma e receber carinho com jeitinho. Tenho um coração cheio de amor e adoro quando alguém se aproxima com paciência e gentileza. Meu maior sonho é encontrar uma família que entenda o meu jeitinho e me dê um lar cheio de cuidado, carinho e amor.','imagens/Anie2.jpeg',false,true,true),
        (3,'Any','11 anos','Porte Médio','Fêmea','Bela e assustada','Oi, eu sou a Any. Cheguei ao abrigo quando tinha cerca de dois meses, junto com meus quatro irmãos. Aqui somos conhecidos como a gangue do Xerife. Eu cheguei a ser adotada uma vez, mas infelizmente fui devolvida porque disseram que eu não deixava ninguém se aproximar. A verdade é que eu só preciso de um pouco de tempo para confiar.','imagens/Any1.png',false,true,true),
        (4,'Astor','4 anos','Porte Médio','Macho','Alegre e sociável','Oi, eu sou o Astor. Quando eu era só um filhotinho pequeno, fui deixado na porta do abrigo. Eu não entendia muito bem o que estava acontecendo, mas a minha história não terminou ali. Seu Alberto me acolheu com muito amor e cuidado. Hoje eu estou maiorzinho, mais forte e cheio de amor para dar.','imagens/Astor.jpeg',false,true,true),
        (5,'Bartô','3 anos','Porte Médio','Macho','Resiliente e dócil','Oi, eu sou o Bartô. Sou um cachorro muito especial, cheio de amor para dar e sempre pronto para receber carinho. Tenho um jeitinho tranquilo e gosto de estar por perto das pessoas, aproveitando cada momento de atenção e afeto. Com amor, paciência e companhia, tenho certeza de que posso ser um amigo fiel.','imagens/Bartô.jpeg',false,true,true),
        (6,'Bento','15/01/2026','Filhote','Macho','EM BREVE DISPONÍVEL PARA ADOÇÃO','Oi, eu sou o Bento. Sou só um filhotinho ainda, mas já tenho um coração enorme cheio de amor para dar. Estou crescendo forte, saudável e cercado de cuidado, aprendendo todos os dias como o mundo pode ser bonito quando existe carinho. Ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família definitiva.','imagens/Bento.jpeg',false,false,true),
        (7,'Beto','15/01/2026','Filhote','Macho','EM BREVE DISPONÍVEL PARA ADOÇÃO','Oi, eu sou o Beto. Ainda sou filhotinho e estou crescendo forte, saudável e cheio de energia para descobrir o mundo. Cada dia aqui é uma nova aventura, cheia de brincadeiras e muito carinho das tias do abrigo. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho.','imagens/Beto.jpeg',false,false,true),
        (8,'Black','5 anos','Porte Médio','Macho','Tímido e sensível','Oi, eu sou o Black. Eu fui resgatado pelo Seu Alberto e, desde o começo, sempre fui um cachorro assustado. A vida me ensinou a ter medo antes mesmo de entender o que era carinho. Mas, quando percebo que ninguém vai me machucar, meu coração começa a se acalmar e eu mostro meu lado mais doce.','imagens/Black1.jpeg',false,true,true),
        (9,'Boris','5 anos','Porte Grande','Macho','Esperto e tranquilo','Oi, eu sou o Boris. Minha história começou aqui no abrigo, porque minha mamãe foi resgatada ainda buchuda e acabou tendo a mim e aos meus irmãos aqui. Crescemos juntos, brincando e aprendendo a confiar nas pessoas que cuidam da gente com tanto carinho.','imagens/Boris1.jpg',false,true,true),
        (10,'Cacau','5 anos','Porte Médio','Macho','Doce e companheira','Oi, eu sou a Cacau. Minha mamãe foi resgatada ainda buchuda e eu nasci aqui no abrigo junto com meus irmãos Boris, Phlox, Klinton e Will. Desde pequenininha crescemos juntos, cercados pelo cuidado e pelo carinho de quem cuida do abrigo.','imagens/Cacau.jpeg',false,true,true),
        (11,'Chloe','7 anos','Porte Pequeno','Fêmea','Mãe coruja','Oi, eu sou a Chloe. Eu cheguei ao abrigo ainda pequena, depois de enfrentar momentos difíceis nas ruas. Aqui encontrei cuidado, comida, segurança e pessoas que me deram muito carinho. Aos poucos fui aprendendo que podia confiar novamente.','imagens/Chloe1.jpg',false,true,true),
        (12,'Cidinha','3 anos','Porte Médio','Fêmea','Carinhosa e tímida','Oi, eu sou a Cidinha. Minha história começou com alguns desafios, mas tudo mudou quando cheguei ao abrigo e encontrei pessoas que cuidaram de mim com muito carinho. Sou uma cachorrinha doce, tranquila e muito companheira.','imagens/Cidinha2.jpeg',false,true,true),
        (13,'Deno','3 anos','Porte Grande','Macho','Forte e brincalhão','Poucos dias antes do Natal, uma surpresa foi deixada na porta do abrigo: oito filhotinhos indefesos, abandonados juntos, ainda muito pequenos e extremamente debilitados. Em meio à correria de fim de ano, eles se tornaram o nosso presente de Natal. Deno, Sol e Dracko ainda aguardam uma família.','imagens/Deno1.jpeg',false,true,true),
        (14,'Dobby','2 anos','Porte Pequeno','Macho','Apegado e carente','Oi, eu sou o Dobby. Fui abandonado ainda filhotinho em frente ao abrigo junto com meus irmãos. Nós chegamos muito debilitados, mas recebemos todos os cuidados necessários. Alguns dos meus irmãos já encontraram suas famílias, mas eu e meu irmão Sebastian ainda estamos esperando.','imagens/Doby2.jpeg',false,true,true),
        (15,'Dolly','3 anos','Porte Grande','Fêmea','Esperançosa e calma','Oi, eu sou a Dolly. Minha história começou de forma bem delicada. Minha mamãe deu à luz a mim e a mais cinco filhotes em plena calçada. Felizmente fomos resgatadas e levadas para a segurança do abrigo. Um a um, meus irmãos foram encontrando suas famílias. Até minha mamãe já ganhou um lar. Eu fiquei aqui esperando a minha vez.','imagens/Dolly.jpeg',false,true,true),
        (16,'Dorothy','1 ano','Porte Médio','Fêmea','Alegre e dócil','Oi, eu sou a Dorothy. Um dia apareci na rua do abrigo junto com minha irmã, Mélanie. Mesmo sem fazer barulho, conseguimos tocar o coração do Seu Alberto. Fomos levadas para um lar temporário, onde tivemos acompanhamento veterinário. Sou uma menina doce, cheia de vida.','imagens/Dorothy2.jpeg',false,true,true),
        (17,'Drako','3 anos','Porte Grande','Macho','Apegado e carente','Drako foi abandonado na porta do abrigo junto com seus 7 irmãos, poucos dias antes do Natal. Pequenos demais, frágeis e muito debilitados, chegaram precisando de ajuda urgente. Receberam todo o tratamento necessário e hoje são extremamente carinhosos e companheiros.','imagens/Drako1.png',false,true,true),
        (18,'Duque','7 anos','Porte Grande','Macho','Dócil e amoroso','Oi, eu sou o Duque. Eu nasci aqui no abrigo e, desde pequeno, sonhava em ter uma família. Esse sonho se tornou realidade quando fui adotado e passei cinco anos vivendo em um lar. Mas, por circunstâncias da vida, precisei voltar para o abrigo. Continuo sendo um cão dócil, carinhoso e muito brincalhão.','imagens/Duque1.png',false,true,true),
        (19,'Feijoada','2 anos','Porte Médio','Fêmea','Tranquila e sábia','Oi, eu sou a Feijoada. Fui resgatada ainda filhotinha, tão pequenininha que parecia mesmo um feijãozinho — e foi assim que ganhei meu nome. Cheguei a ser adotada uma vez, mas infelizmente não consegui me adaptar. Por isso, hoje o ideal é que minha adoção seja conjunta, para que eu tenha a companhia de outro cão.','imagens/feijoada1.png',false,true,true),
        (20,'Felicia','7 anos','Porte Médio','Fêmea','Calma e carinhosa','Oi, eu sou a Felícia. Minha história comoveu muitas pessoas. Eu fui encontrada paraplégica, amarrada em uma via muito movimentada. Infelizmente fiquei com uma sequela na coluna e não tenho mais os movimentos das minhas patinhas traseiras, mas isso não me impede de amar e de sentir alegria.','imagens/Felicia1.jpg',true,true,true),
        (21,'Frederico','2 anos','Porte Grande','Macho','Amoroso e cativante','Oi, eu sou o Frederico. Fui abandonado perto do abrigo e estava cheio de pulgas, precisando de cuidados e proteção. Sou daquele tipo que se aproxima com muuuuuita energia e vontade de brincar. Sou um cachorro forte e cheio de energia, por isso precisarei de uma família que invista no meu adestramento.','imagens/Frederico1.jpeg',false,true,true),
        (22,'Gilly','10 anos','Porte Médio','Fêmea','Dócil e brincalhão','Oi, eu sou a Gilly. Eu venho de uma ninhada de quatro filhotes que foram abandonados por um carro na porta do abrigo. Meus três irmãos foram adotados, mas eu fiquei. Já estou aqui há cerca de quatro anos esperando pela minha chance.','imagens/Gilly1.jpg',false,true,true),
        (23,'Henzel','7 anos','Porte Grande','Macho','Dócil e brincalhão','Oi, eu sou o Henzel. Quando eu tinha cerca de três meses, fui jogado de um carro em uma rua perto do abrigo. Aqui no abrigo encontrei cuidado, segurança e vários amiguinhos para brincar. Hoje sou um cachorro muito carinhoso, companheiro e adoro estar perto das pessoas.','imagens/henzel.jpg',false,true,true),
        (24,'Hillary','10 anos','Porte Médio','Fêmea','Calma, dócil e carinhosa','Oi, eu sou a Hillary. Eu nasci aqui no abrigo e sou filha da Pituxa e do Fred. Passei por um momento difícil quando uma castração não deu certo e acabei tendo uma ninhada de oito filhotes. Apenas dois sobreviveram, mas a alegria de vê-los adotados foi muito especial.','imagens/hillary1.jpg',false,true,true),
        (25,'Jessie','5 anos','Porte Grande','Fêmea','Esperançosa e leal','Oi, eu sou a Jessie. Eu nasci aqui no abrigo. Eu cheguei a ser adotada e, por um tempo, achei que tinha encontrado meu lar definitivo. Mas depois que cresci, fui devolvida. Foi um momento muito difícil, mas hoje continuo aqui, mais madura e mais forte, com o mesmo sonho de encontrar uma família que me ame de verdade.','imagens/Jessie2.jpeg',false,true,true),
        (26,'Jhonny','2 anos','Porte Médio','Macho','Guerreiro e alegre','Oi, eu sou o Jhony. Eu apareci na frente do abrigo em um estado muito delicado. Depois dos exames veio o diagnóstico de cinomose. Mas eu lutei e consegui vencer essa batalha. Hoje faço sessões de acupuntura e laser semanalmente, sempre recebendo muito carinho. Sou um cão cheio de amor e gratidão.','imagens/Jhony1.jpeg',true,true,true),
        (27,'Joseph','7 anos','Porte Médio','Macho','Dócil e brincalhão','Oi, eu sou o Joseph. Quando eu ainda era pequeno, fui acolhido por uma protetora que cuidou de mim com muito carinho. Eu cheguei a ser adotado, mas cerca de um ano depois acabei sendo devolvido. Foi então que Seu Alberto me recebeu no abrigo e me deu uma nova chance.','imagens/Joseph.jpg',false,true,true),
        (28,'Klinton','5 anos','Porte Grande','Macho','Calmo e companheiro','Oi, eu sou o Klinton. Minha mamãe foi resgatada já buchuda e foi aqui no abrigo que eu nasci, junto com meus irmãos Boris, Phlox, Cacau e Will. Desde o primeiro dia de vida eu conheci cuidado, segurança e muito carinho.','imagens/klinton1.jpg',false,true,true),
        (29,'Kovu','5 anos','Porte Grande','Macho','Tímido e carinhoso','Oi, eu sou o Kovu. Eu nasci aqui no abrigo. Eu cheguei a ser adotado junto com a Clarinha, mas não consegui me adaptar tão rápido e acabei sendo devolvido. No começo eu sou um pouco assustado, mas com paciência e carinho eu vou ganhando confiança.','imagens/kovu1.jpg',false,true,true),
        (30,'Lexie','4 anos','Porte Médio','Fêmea','Assustada e doce','Oi, eu sou a Lexie. Minha mamãe se chama Scarlett e ela foi resgatada perto do Clube da Aeronáutica. Eu nasci no abrigo já em segurança. Minha família é bem grande, fomos 14 irmãozinhos. Eu sou um pouquinho assustada no começo, mas quando me sinto segura adoro brincar e correr.','imagens/Lexie2.jpeg',false,true,true),
        (31,'Lady','7 anos','Porte Médio','Fêmea','Fiel e protetora','Oi, eu sou a Lady. Eu cheguei ao abrigo junto com minha mamãe, Artemis, e minha tia, Scarlett. Antes vivíamos na rua, perto da casa do Reginaldo Rossi. Seu Alberto conseguiu nos resgatar e nos trazer para um lugar seguro.','imagens/Lady1.jpeg',false,true,true),
        (32,'Lion','6 anos','Porte Médio','Macho','Dócil e brincalhão','Oi, eu sou o Lion, mas aqui no abrigo também me chamam de Zé Dentinho, por causa dos meus dentinhos que aparecem e fazem todo mundo rir. Eu nasci no abrigo, depois que minha mamãe Arya foi resgatada. Meus irmãos já foram todos adotados, agora só falta a minha vez.','imagens/Lion1.jpg',false,true,true),
        (33,'Logan','11 anos','Porte Grande','Macho','Dócil e carente','Oi, eu sou o Logan. Um dia eu estava vagando sem rumo quando acabei sendo atropelado. Felizmente, o motorista parou para me ajudar. Como ele morava em apartamento, acabou me deixando no abrigo de Seu Alberto. Hoje minha adoção finalmente foi liberada e estou esperando ansioso por uma família.','imagens/logan1.jpg',false,true,true),
        (34,'Lupe','12 anos','Porte Grande','Macho','Brincalhão','Oi, eu sou o Lupe. Quando cheguei ao abrigo, eu era bem arisco e desconfiado. Com o tempo, carinho e muita paciência, fui entendendo que estava seguro. Hoje sou um vira-lata de porte médio bem brincalhão. Tenho heterocromia, um dos meus olhinhos é azul.','imagens/lupe1.jpg',false,true,true),
        (35,'Luckin','11 anos','Porte Médio','Macho','Leal e tímido','Oi, eu sou o Luckin. Meu nome foi inventado por Seu Alberto, juntando Lucky com IN. Vim de uma ninhada de filhotes que foi abandonada na porta do abrigo. Eu, Radijah, Any, Lauren e mais um irmão fomos acolhidos aqui e hoje fazemos parte da gangue do Xerife.','imagens/luckin1.jpg',false,true,true),
        (36,'Lula','10 anos','Porte Médio','Macho','Dócil e brincalhão','Oi, eu sou o Lula. Eu tinha uma tutora que cuidava de mim com carinho, mas um dia ela faleceu e os filhos dela me colocaram na rua. Minha sorte foi que Seu Alberto me acolheu. Quando alguém visita o abrigo, eu sou um dos primeiros a correr para pedir carinho.','imagens/Lula1.jpg',false,true,true),
        (37,'Malu','3 anos','Porte Pequeno','Fêmea','Dócil e assustada','Oi, eu sou a Malu. Eu vivia em uma comunidade onde algumas pessoas jogavam pedras em mim. Até que o Seu Alberto soube do que estava acontecendo e foi imediatamente me salvar. Por causa de tudo que passei, fiquei com alguns traumas, mas com tempo e carinho posso me transformar em uma cadelinha muito carinhosa.','imagens/Malu1.jpeg',true,true,true),
        (38,'Melanie','2 anos','Porte Médio','Fêmea','Doce e brincalhona','Oi, eu sou a Melanie. Eu apareci na rua do abrigo junto com a minha irmã Dorothy. Mesmo sem fazer barulho, conseguimos tocar o coração do Seu Alberto. Sou uma menina doce, cheia de vida, e só estou esperando a minha vez de ser escolhida.','imagens/Melanie.jpeg',false,true,true),
        (39,'Milu','4 anos','Porte Médio','Fêmea','Carinhosa e companheira','Oi, eu sou a Milu. Um dia, Seu Alberto ouviu dizer que uma cadela tinha tido filhotes dentro de um mercadinho em reforma e foi até lá ver o que estava acontecendo. Era eu, com meus dois bebês. Meus dois filhotes foram adotados. Eu fiquei. Sou uma cadela muito carinhosa e companheira.','imagens/Milu1.jpeg',false,true,true),
        (40,'Moly','4 anos','Porte Médio','Fêmea','Tranquila e dócil','Oi, eu sou a Moly. Eu vivia em uma área de mata onde Seu Alberto costumava visitar e levar alimento para os animais. O casal que cuidava de mim se mudou, e eu fiquei sem ninguém. Quando soube da situação, ele me trouxe para o abrigo. Sou dócil, muito tranquila e gosto de ambientes calmos.','imagens/Molly1.jpeg',false,true,true),
        (41,'Nescau','2 anos','Porte Médio','Macho','Brincalhão e dócil','Oi, eu sou o Nescau. Minha mamãe deu à luz na beira de um riacho e era ali que a gente vivia. Um dia, Seu Alberto ouviu falar da gente e foi nos resgatar. Minha mãe e minhas irmãs foram adotadas e eu continuo esperando ansiosamente pela minha família.','imagens/Nescau2.jpeg',false,true,true),
        (42,'Neguinho','5 anos','Porte Grande','Macho','Dócil e tranquilo','Oi, eu sou o Neguinho. Eu sou extremamente dócil com pessoas, crianças e outros pets. Sabe aquele cachorro que adora deitar pertinho e receber carinho? Sou eu! Sou tranquilo, companheiro e gosto de fazer parte da família.','imagens/Neguinho2.jpg',false,true,true),
        (43,'Noah','2 anos','Porte Médio','Fêmea','Esperta e tranquila','Oi, eu sou a Noah. Eu sou extremamente dócil, adoro carinho e brincar, e me dou super bem com outros cães! Sou uma companheira tranquila, mas também gosto de momentos de diversão. Estou pronta para fazer parte da sua vida.','imagens/Noah1.jpg',false,true,true),
        (44,'Percy','5 anos','Porte Grande','Macho','Brincalhão e dócil','Oi, eu sou o Percy. Eu nasci no abrigo, minha mamãe Brigitte chegou na mesma época que meu pai Henzel. Eu cresci aqui, cercado de cuidado, mas ainda sonho em ter um lar só meu. Amo brincar de bolinha, posso passar horas correndo atrás dela!','imagens/Percy1.jpg',false,true,true),
        (45,'Phlox','5 anos','Porte Grande','Macho','Doce e esperançoso','Oi, eu sou o Phlox. Minha mamãe foi resgatada já buchuda e foi no abrigo que eu nasci, junto com meus irmãos Boris, Cacau, Klinton e Will. Já tenho cinco anos e continuo aqui, com o coração cheio de esperança de que alguém me escolha.','imagens/Phlox1.jpeg',false,true,true),
        (46,'Priscila Joy','3 anos','Porte Grande','Fêmea','Calma e sensível','Oi, eu sou a Priscila Joy. Eu cheguei ao abrigo ainda bem novinha. Pouco tempo depois fui diagnosticada com cinomose, mas felizmente o tratamento começou bem no início e consegui vencer essa batalha sem ficar com nenhuma sequela. Hoje estou saudável e pronta para começar uma nova história.','imagens/Priscila Joy1.jpeg',false,true,true),
        (47,'Rabito','2 anos','Porte Pequeno','Macho','Guerreiro e resiliente','Oi, eu sou o Rabito. Eu cheguei ao abrigo ainda filhote, junto com meus dois irmãos. Em um momento da minha vida enfrentei uma grande batalha quando contraí cinomose. A doença deixou algumas sequelas: perdi a visão e tive problemas nos movimentos das minhas patinhas. Mas eu lutei muito e fui melhorando com acupuntura e laser.','imagens/Rabito1.jpeg',false,true,true),
        (48,'Ralf','2 anos','Porte Grande','Macho','Adora água e outros cães','Oi, eu sou o Ralf. Meus irmãos Bernardo e Joca já foram adotados, e agora só falta a minha casinha! Eu sou um rapaz muito lindo, dócil, adoro carinho e brincar. Amo água e uma boa praia me deixa feliz demais!','imagens/Ralf1.jpg',false,true,true),
        (49,'Sebastian','2 anos','Porte Pequeno','Macho','Dócil e brincalhão','Oi, eu sou o Sebastian. Sou dócil, adoro carinho e brincar, e me dou super bem com outros cães. No começo posso ser um pouco assustado com pessoas que não conheço, mas é só ter um pouquinho de paciência e muito amor que logo me acostumo e viro um companheiro fiel.','imagens/Sebastian1.jpg',false,true,true),
        (50,'Sol','3 anos','Porte Grande','Fêmea','Dócil e tranquila','Oi, eu sou a Sol. Talvez você se lembre da minha turma, os crequinhas. Há cerca de dois anos fui abandonada na porta do abrigo junto com quase dez irmãos. Fiz todo o tratamento, cresci forte e hoje estou saudável e pronta para encontrar uma família.','imagens/Sol1.png',false,true,true),
        (51,'Sophia','6 anos','Porte Médio','Fêmea','Meiga e tranquila','Oi, eu sou a Sophia. Eu vivia em uma área de mata onde algumas pessoas da região costumavam me alimentar. Quando soube da situação, Seu Alberto decidiu me levar para o abrigo. Descobriram que eu tinha leishmaniose. Fiz todo o tratamento e hoje estou bem e estabilizada.','imagens/Sofia1.jpeg',false,true,true),
        (52,'Spike','8 anos','Porte Médio','Macho','Energético e carinhoso','Oi, eu sou o Spike. Eu sou cheio de energia e adoro brincar, correr e explorar tudo ao meu redor. Sou muito carinhoso e gosto de estar perto das pessoas, mas também tenho meu jeitinho atento e protetor. Quando confio, viro um amigo fiel para todas as horas.','imagens/Spike1.jpeg',true,true,true),
        (53,'Suape','6 anos','Porte Médio','Fêmea','Dócil e carinhosa','Oi, eu sou a Suape. Fui resgatada perto do Complexo Portuário que inspirou meu nome, uma palavra tupi-guarani que significa caminhos sinuosos. Tenho uma personalidade peculiar: às vezes peço carinho latindo, mas quando a pessoa vai me agarrar, posso dar uma escapadinha. Só preciso de alguém que me entenda.','imagens/suape1.jpg',false,true,true),
        (54,'Summer','5 anos','Porte Grande','Fêmea','Sensível e assustada','Oi, eu sou a Summer. Eu nasci no abrigo, porque minha mamãe Brigitte chegou aqui na mesma época que meu papai Henzel. Sou de porte grande e tenho um coração sensível. Sou um pouco assustada no começo, mas só preciso de amor e paciência para confiar.','imagens/Summer1.jpg',false,true,true),
        (55,'Théo','3 anos','Porte Médio','Macho','Dócil e brincalhão','Oi, eu sou o Théo! Fui abandonado ainda bebezinho em uma BR, mas papai Alberto me resgatou e mudou minha história. Hoje sou um menino muito lindo e completamente pronto para ser adotado! Sou MUITO dócil, SUUUUPER carinhoso e adoro ganhar atenção.','imagens/Théo.jpeg',false,true,true),
        (56,'Tigrão','3 anos','Porte Médio','Macho','Cauteloso e dócil','Oi, eu sou o Tigrão. Minha mamãe, Ledinha, foi resgatada em uma área de mata, bem na beira de um barranco. Eu nasci junto com mais dois irmãos. Meus irmãos já foram adotados e minha mamãe também vai ganhar um lar, agora só falta a minha vez.','imagens/Tigrão2.jpeg',false,true,true),
        (57,'Tobias','15/01/2026','Filhote','Macho','EM BREVE DISPONÍVEL PARA ADOÇÃO','Oi, eu sou o Tobias. Ainda sou filhotinho e estou crescendo forte e saudável. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família. Estou só começando minha jornada e já sonho com um futuro cheio de carinho.','imagens/Tobias.jpeg',false,false,true),
        (58,'Vicky','8 anos','Porte Médio','Fêmea','Dengosa e calma','Oi, eu sou a Vicky. Uma noite um casal chegou na porta do abrigo pedindo para que Seu Alberto me acolhesse. Disseram que tinham me encontrado e que eu chorava muito. No começo eu chorava bastante e até ganhei o apelido de chorona, mas era só porque tudo era novo para mim.','imagens/Vicky.jpeg',false,true,true),
        (59,'Wagner','15/01/2026','Filhote','Macho','EM BREVE DISPONÍVEL PARA ADOÇÃO','Oi, eu sou o Wagner. Ainda sou filhotinho e estou crescendo cheio de saúde e curiosidade pelo mundo. Cada dia é uma descoberta nova pra mim. Por enquanto, ainda não estou disponível para adoção, mas em breve estarei prontinho para encontrar minha família definitiva.','imagens/Wagner.jpeg',false,false,true),
        (60,'Will','5 anos','Porte Médio','Macho','Tranquilo e companheiro','Oi, eu sou o Will. Nasci no abrigo junto com meus irmãos, depois que minha mamãe foi resgatada ainda buchuda. Cresci cercado de cuidado, mas ainda não conheci o que é ter um lar só meu. Sou tranquilo, carinhoso e gosto de brincar com meus amigos daqui.','imagens/Will1.jpeg',false,true,true),
        (61,'Xuxa','8 anos','Porte Grande','Fêmea','Mãe coruja e protetora','Oi, eu sou a Xuxa, também chamada de Artemis. Eu fui resgatada de um ponto de abandono em Boa Viagem, onde vivia nas ruas junto com vários outros cães. Sou de porte grande e, no começo, posso ser um pouco desconfiada com pessoas que não conheço.','imagens/xuxa1.jpg',false,true,true),
        (62,'Laika','5 anos','Porte Médio','Fêmea','Reservada e independente','Oi, eu sou a Laika. Já passei por muitas mudanças na minha vida e hoje sigo esperando pela minha própria família. Sou uma cadelinha tranquila, gosto de ficar mais na minha e observar tudo ao meu redor. Tenho uma personalidade forte e posso ser um pouco dominante com outros cães.','imagens/Laika.jpeg',false,true,true)
    `);

    await client.query(`
      INSERT INTO dog_tags (dog_id, tag) VALUES
      (1,'Castrada'),(1,'Vacinada'),(1,'Vermifugada'),
      (2,'Castrada'),(2,'Vacinada'),(2,'Vermifugada'),
      (3,'Castrada'),(3,'Vacinada'),(3,'Vermifugada'),
      (4,'Castrado'),(4,'Vacinado'),(4,'Vermifugado'),
      (5,'Castrado'),(5,'Vacinado'),(5,'Vermifugado'),
      (6,'Castrado'),(6,'Vacinado'),(6,'Vermifugado'),
      (7,'Castrado'),(7,'Vacinado'),(7,'Vermifugado'),
      (8,'Castrado'),(8,'Vacinado'),(8,'Vermifugado'),
      (9,'Castrado'),(9,'Vacinado'),(9,'Vermifugado'),
      (10,'Castrado'),(10,'Vacinado'),(10,'Vermifugado'),
      (11,'Castrada'),(11,'Vacinada'),(11,'Vermifugada'),
      (12,'Castrada'),(12,'Vacinada'),(12,'Vermifugada'),
      (13,'Castrado'),(13,'Vacinado'),(13,'Vermifugado'),
      (14,'Castrado'),(14,'Vacinado'),(14,'Vermifugado'),
      (15,'Castrada'),(15,'Vacinada'),(15,'Vermifugada'),
      (16,'Castrada'),(16,'Vacinada'),(16,'Vermifugada'),
      (17,'Castrado'),(17,'Vacinado'),(17,'Vermifugado'),
      (18,'Castrado'),(18,'Vacinado'),(18,'Vermifugado'),
      (19,'Castrada'),(19,'Vacinada'),(19,'Vermifugada'),
      (20,'Castrada'),(20,'Vacinada'),(20,'Vermifugada'),
      (21,'Castrado'),(21,'Vacinado'),(21,'Vermifugado'),
      (22,'Castrada'),(22,'Vacinada'),(22,'Vermifugada'),
      (23,'Castrado'),(23,'Vacinado'),(23,'Vermifugado'),
      (24,'Castrada'),(24,'Vacinada'),(24,'Vermifugada'),
      (25,'Castrado'),(25,'Vacinado'),(25,'Vermifugado'),
      (26,'Castrado'),(26,'Vacinado'),(26,'Vermifugado'),
      (27,'Castrado'),(27,'Vacinado'),(27,'Vermifugado'),
      (28,'Castrado'),(28,'Vacinado'),(28,'Vermifugado'),
      (29,'Castrado'),(29,'Vacinado'),(29,'Vermifugado'),
      (30,'Castrada'),(30,'Vacinada'),(30,'Vermifugada'),
      (31,'Castrada'),(31,'Vacinada'),(31,'Vermifugada'),
      (32,'Castrado'),(32,'Vacinado'),(32,'Vermifugado'),
      (33,'Castrado'),(33,'Vacinado'),(33,'Vermifugado'),
      (34,'Castrado'),(34,'Vacinado'),(34,'Vermifugado'),
      (35,'Castrado'),(35,'Vacinado'),(35,'Vermifugado'),
      (36,'Castrado'),(36,'Vacinado'),(36,'Vermifugado'),
      (37,'Castrada'),(37,'Vacinada'),(37,'Vermifugada'),
      (38,'Castrada'),(38,'Vacinada'),(38,'Vermifugada'),
      (39,'Castrado'),(39,'Vacinado'),(39,'Vermifugado'),
      (40,'Castrada'),(40,'Vacinada'),(40,'Vermifugada'),
      (41,'Castrado'),(41,'Vacinado'),(41,'Vermifugado'),
      (42,'Castrado'),(42,'Vacinado'),(42,'Vermifugado'),
      (43,'Castrada'),(43,'Vacinada'),(43,'Vermifugada'),
      (44,'Castrado'),(44,'Vacinado'),(44,'Vermifugado'),
      (45,'Castrado'),(45,'Vacinado'),(45,'Vermifugado'),
      (46,'Castrada'),(46,'Vacinada'),(46,'Vermifugada'),
      (47,'Castrado'),(47,'Vacinado'),(47,'Vermifugado'),
      (48,'Castrado'),(48,'Vacinado'),(48,'Vermifugado'),
      (49,'Castrado'),(49,'Vacinado'),(49,'Vermifugado'),
      (50,'Castrada'),(50,'Vacinada'),(50,'Vermifugada'),
      (51,'Castrada'),(51,'Vacinada'),(51,'Vermifugada'),
      (52,'Castrado'),(52,'Vacinado'),(52,'Vermifugado'),
      (53,'Castrada'),(53,'Vacinada'),(53,'Vermifugada'),
      (54,'Castrado'),(54,'Vacinado'),(54,'Vermifugado'),
      (55,'Castrado'),(55,'Vacinado'),(55,'Vermifugado'),
      (56,'Castrado'),(56,'Vacinado'),(56,'Vermifugado'),
      (57,'Castrado'),(57,'Vacinado'),(57,'Vermifugado'),
      (58,'Castrada'),(58,'Vacinada'),(58,'Vermifugada'),
      (59,'Castrado'),(59,'Vacinado'),(59,'Vermifugado'),
      (60,'Castrado'),(60,'Vacinado'),(60,'Vermifugado'),
      (61,'Castrada'),(61,'Vacinada'),(61,'Vermifugada'),
      (62,'Castrada'),(62,'Vacinada'),(62,'Vermifugada')
    `);

    console.log('Banco populado com sucesso!');
  } catch (err) {
    console.error('Erro:', err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seed();
