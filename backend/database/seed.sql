-- Reexecutar este arquivo preserva as publicações existentes.
insert into public.girodegaragem_artigos (titulo, categoria, descricao, conteudo, data_publicacao)
select 'Para onde vai o movimento do motor?', 'Motores', 'Da queima do combustível até o giro das rodas.', 'Num motor a combustão com pistões, a mistura que queima empurra o pistão. A biela liga essa peça ao virabrequim, que transforma o movimento de sobe e desce em rotação.

A transmissão leva a rotação até as rodas motrizes. Pense na saída de um carro parado. A primeira marcha ajuda a colocar o veículo em movimento, enquanto as marchas mais altas atendem a outras situações.', date '2026-11-16'
where not exists (select 1 from public.girodegaragem_artigos where titulo = 'Para onde vai o movimento do motor?');

insert into public.girodegaragem_artigos (titulo, categoria, descricao, conteudo, data_publicacao)
select 'Hatch ou sedã no dia a dia?', 'Comparativos', 'Duas carrocerias vistas pelo espaço que cada uma oferece.', 'No hatch, a tampa traseira abre junto com o vidro. No sedã, o porta-malas forma um volume separado. Essa diferença muda a maneira de colocar bolsas e caixas dentro do carro.

Para comparar dois modelos, vale pensar no que você costuma transportar. Uma abertura larga pode ajudar com uma caixa grande, mesmo quando a ficha de outro carro informa mais litros de porta-malas.', date '2026-11-15'
where not exists (select 1 from public.girodegaragem_artigos where titulo = 'Hatch ou sedã no dia a dia?');

insert into public.girodegaragem_artigos (titulo, categoria, descricao, conteudo, data_publicacao)
select 'O caderno de manutenção', 'Manutenção', 'Uma maneira simples de organizar as revisões.', 'Em casa dá para separar uma página para data, quilometragem e serviço feito. Guardar a nota junto do registro facilita lembrar o que foi trocado e conversar com a oficina.

O calendário de revisão depende do modelo. Por isso, usamos o manual do proprietário como referência para montar a próxima linha do caderno.', date '2026-11-14'
where not exists (select 1 from public.girodegaragem_artigos where titulo = 'O caderno de manutenção');

insert into public.girodegaragem_artigos (titulo, categoria, descricao, conteudo, data_publicacao)
select 'O Fusca e o motor lá atrás', 'História', 'Uma escolha de projeto que mudou o desenho do carro.', 'Em muitos carros, abrir o capô dianteiro revela o motor. No Fusca clássico da Volkswagen, o conjunto fica na traseira e o espaço da frente serve para bagagem.

Comparar fotos do Fusca e de um hatch atual é um jeito divertido de estudar projeto. O lugar de cada peça interfere no espaço que sobra para malas e passageiros.', date '2026-11-13'
where not exists (select 1 from public.girodegaragem_artigos where titulo = 'O Fusca e o motor lá atrás');

insert into public.girodegaragem_artigos (titulo, categoria, descricao, conteudo, data_publicacao)
select 'Como ler a notícia de um lançamento', 'Novidades', 'Antes de comparar números, confira qual versão foi apresentada.', 'Uma marca pode apresentar várias versões de um mesmo modelo. O equipamento que aparece na foto de divulgação às vezes pertence só a uma delas.

Na nossa ficha de leitura, anotamos modelo, versão e mercado de venda. Depois separamos o que a marca anunciou do que um teste de rodagem conseguiu observar.', date '2026-11-12'
where not exists (select 1 from public.girodegaragem_artigos where titulo = 'Como ler a notícia de um lançamento');
