# ENEM BOX 2026 — Landing Page

Landing page **estática, responsiva e interativa, otimizada para iPhone** da ENEM BOX, com a identidade visual aprovada: roxo, ciano, laranja e fundo claro. Desenvolvida em HTML, CSS e JavaScript puro. Não exige Node.js, banco de dados ou instalação.

> **O produto é um kit de arquivos PDF, não um aplicativo ou micro-SaaS.** A prévia da box no site é demonstrativa. Os materiais pagos **não estão incluídos neste repositório**, para não ficarem acessíveis publicamente.

## Publicar no GitHub Pages (passo a passo)

1. Crie um repositório no GitHub, por exemplo `enem-box`.
2. **Extraia o ZIP** enviado pelo ChatGPT. Não envie apenas o ZIP ao repositório.
3. Envie **o conteúdo da pasta extraída para a raiz do repositório**, onde deve ficar o `index.html` (pelo GitHub: **Add file → Upload files**, ou pelo VS Code/Git).
4. Confira se a pasta oculta `.github/workflows/` também entrou no repositório. Se enviar pela interface web, talvez seja necessário adicionar essa pasta com Git/VS Code; veja também a alternativa sem workflow abaixo.
5. No GitHub, abra **Settings → Pages → Build and deployment** e selecione **GitHub Actions** como origem.
6. Entre na aba **Actions** para acompanhar a execução de `Publicar ENEM BOX no GitHub Pages`. A URL do site aparece em **Settings → Pages** quando a publicação terminar. Em geral será `https://SEU-USUARIO.github.io/enem-box/`.
7. Faça testes em celular e computador no endereço publicado.

**Alternativa sem workflow:** se a pasta `.github` não for enviada, vá em **Settings → Pages → Build and deployment → Deploy from a branch** e configure `main` / `/(root)`. A página também funciona assim porque todos os caminhos são relativos e existe um arquivo `.nojekyll`.

## Antes de vender: configurar o checkout e a empresa

Edite `config.js`:

```javascript
window.ENEM_BOX_CONFIG = {
  CHECKOUT_URL: "https://URL-REAL-DO-SEU-CHECKOUT",
  SELLER_NAME: "RAZÃO SOCIAL / NOME DA EMPRESA",
  SELLER_CNPJ: "00.000.000/0001-00",
  SUPPORT_EMAIL: "suporte@seudominio.com.br",
  TERMS_URL: "https://seudominio.com.br/termos",
  PRIVACY_URL: "https://seudominio.com.br/privacidade"
};
```

**Atenção:** os valores acima são *exemplos*, não estão preenchidos no site. Substitua pelos seus dados verdadeiros. Enquanto `CHECKOUT_URL` estiver vazio, o botão de compra mostrará o aviso **“Checkout ainda não conectado”**. O site não processa pagamento por conta própria.

A entrega do kit em PDF deverá ser configurada **dentro da plataforma de pagamento/produtos**, com liberação após confirmação da compra. Não hospede o ZIP pago ou PDFs para entrega na pasta pública deste projeto: todos poderiam baixar sem comprar.

## Conteúdo anunciado (baseado no kit real preparado)

- 125 páginas de materiais;
- 12 envelopes com 48 questões autorais e gabarito comentado;
- 12 cartões de revisão;
- 8 fichas de redação;
- mapas de estudo, Plano B, Kit dos Dois Domingos e checklist;
- preço exibido na página: **R$ 29,90** (edite `index.html` se mudar).

A revisão pedagógica humana dos materiais é recomendada antes da comercialização. Não anuncie correção de redação individual, resultados garantidos ou personalização automática — esses serviços não fazem parte deste produto.

## Estrutura

```
index.html                # Landing page e conteúdo comercial
styles.css                # Cores, responsividade e animações
script.js                 # Menu, modal de prévia, FAQ, CTA e efeitos
config.js                 # Checkout + dados do vendedor (públicos)
assets/                   # Logo, ilustração e favicon
previews/                 # Capturas para conferência local (não publicadas no workflow)
.github/workflows/        # Publicação automática no GitHub Pages
.nojekyll                 # Impede transformação desnecessária pelo Jekyll
.gitignore               # Mantém arquivos locais e PDFs pagos fora do Git
README.md                 # Este guia
```

## Requisitos e cuidados

- Funciona em hospedagem estática, inclusive GitHub Pages, Netlify, Vercel e Cloudflare Pages.
- Caminhos de CSS/JS/imagens são **relativos**, adequados para repositórios publicados em subpastas.
- A fonte Montserrat utiliza Google Fonts. Em modo offline, o navegador usa fontes alternativas.
- Não adicione senhas, chaves de API ou credenciais a `config.js`: este arquivo é **público**.
- Revise identificação do fornecedor, termos, privacidade, política de reembolso e checkout conforme sua operação.
- Teste todo o fluxo real: clique no anúncio → LP → checkout → pagamento → entrega do PDF.

## Ajustes especiais para iPhone (versão 2.0)

- Compatível com dimensões de tela dos iPhones SE (320/375 px), 13/14/15/16 e Pro Max (390/393/414/428/430/440 px) e visualização horizontal.
- Cartões verticais legíveis, linha do tempo em coluna, tipografia maior, sem necessidade de rolagem horizontal.
- Menu de navegação para toque, áreas clicáveis grandes e FAQ expansível.
- Barra fixa de compra considera a área segura inferior (home indicator) com `env(safe-area-inset-bottom)`.
- Modais de prévia e de checkout ficam dentro da altura útil da tela e permitem rolagem quando necessário.
- Respeita a preferência de reduzir movimento no iOS.
- A página funciona no GitHub Pages em subpastas (caminhos relativos).

**Importante:** tamanhos iPhone foram simulados no Chromium com modo de dispositivo móvel; teste também em um iPhone real, especialmente Safari, antes de investir em anúncios.
