const api = '/api/publicacoes';
const aviso = document.querySelector('#aviso');
const filtros = document.querySelector('#filtros');
const editor = document.querySelector('#editor');
const leitura = document.querySelector('#leitura');

async function requisitar(url, opcoes) {
  let resposta;
  try {
    resposta = await fetch(url, opcoes);
  } catch {
    throw new Error('Sem conexão com o servidor. Confira a conexão e tente novamente.');
  }
  if (!resposta.ok) {
    const erros = {
      400: 'Revise os campos obrigatórios e o tamanho dos textos.',
      403: 'Senha de edição incorreta.',
      404: 'Publicação não encontrada.'
    };
    throw new Error(erros[resposta.status] || 'Não foi possível acessar as publicações. Tente novamente.');
  }
  return resposta.json();
}

function elemento(tipo, texto, classe) {
  const item = document.createElement(tipo);
  item.textContent = texto;
  if (classe) item.className = classe;
  return item;
}

function dataBR(data) {
  return data.split('-').reverse().join('/');
}

function criarCard(post) {
  const card = elemento('article', '', 'card');
  const endereco = 'artigo.html?id=' + encodeURIComponent(post.id);
  const titulo = elemento('h3', '');
  const link = elemento('a', post.titulo);
  link.href = endereco;
  titulo.append(link);
  const ler = elemento('a', 'Abrir artigo ↗');
  ler.href = endereco;
  card.append(elemento('p', post.categoria + ' · ' + dataBR(post.dataPublicacao), 'meta'),
    titulo, elemento('p', post.descricao || post.conteudo.slice(0, 110)), ler);
  return card;
}

async function carregarLista() {
  const botao = filtros.querySelector('button');
  const lista = document.querySelector('#lista');
  botao.disabled = true;
  aviso.textContent = 'Buscando publicações…';
  lista.replaceChildren();
  try {
    const params = new URLSearchParams(new FormData(filtros));
    const posts = await requisitar(api + '?' + params);
    posts.forEach(post => lista.append(criarCard(post)));
    aviso.textContent = posts.length ? posts.length + ' artigo(s)' : 'Nenhum artigo encontrado. Experimente outra busca.';
  } catch (erro) {
    aviso.textContent = erro.message;
  } finally {
    botao.disabled = false;
  }
}

if (filtros) {
  filtros.addEventListener('submit', evento => {
    evento.preventDefault();
    carregarLista();
  });
  carregarLista();
}

async function abrirArtigo() {
  const id = new URLSearchParams(location.search).get('id');
  if (!id || !/^\d+$/.test(id)) {
    aviso.textContent = 'Selecione uma publicação na página inicial.';
    return;
  }
  try {
    const post = await requisitar(api + '/' + id);
    document.title = post.titulo + ' · ' + document.title.split(' · ').pop();
    leitura.append(elemento('p', post.categoria + ' · ' + dataBR(post.dataPublicacao), 'meta'),
      elemento('h1', post.titulo), elemento('p', 'Por Endrick Ferreira Pedroso e Heitor Flores Liberali'),
      elemento('p', post.descricao || '', 'lead'), elemento('div', post.conteudo, 'body'));
    aviso.textContent = '';
  } catch (erro) {
    aviso.textContent = erro.message;
  }
}
if (leitura) abrirArtigo();

if (editor) editor.addEventListener('submit', async evento => {
  evento.preventDefault();
  const campos = new FormData(editor);
  const post = {};
  for (const chave of ['titulo', 'categoria', 'descricao', 'conteudo']) {
    post[chave] = campos.get(chave).trim();
  }
  if (!post.titulo || !post.categoria || !post.conteudo) {
    aviso.textContent = 'Preencha o título, a categoria e o texto completo.';
    return;
  }
  const botao = editor.querySelector('button');
  botao.disabled = true;
  aviso.textContent = 'Salvando…';
  try {
    const salvo = await requisitar(api, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'X-Senha-Editor': campos.get('senha')},
      body: JSON.stringify(post)
    });
    location.assign('artigo.html?id=' + salvo.id);
  } catch (erro) {
    aviso.textContent = erro.message;
    botao.disabled = false;
  }
});
