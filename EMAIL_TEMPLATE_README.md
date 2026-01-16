# 📧 Templates de Email HTML

Este diretório contém templates de email HTML personalizados que seguem o design do portfólio.

## 📁 Arquivos

- **`email-template.html`** - Template completo com condicionais Handlebars (para uso geral)
- **`email-template-emailjs.html`** - Template para EmailJS (versão simplificada sem condicionais)

## 🎨 Design

Os templates seguem um design minimalista e limpo:

- **Cores:**
  - Fundo: Branco `#ffffff`
  - Texto principal: `#212121` e `#333333`
  - Texto secundário: `#666666` e `#999999`
  - Links: `#0066cc`
  - Bordas: `#e0e0e0`

- **Fontes:**
  - Padrão: `Segoe UI`, Roboto, Arial (sans-serif)
  - Tamanhos: 24px (título), 15px (corpo), 13px (labels), 12px (rodapé)

- **Estilo:**
  - Minimalista e profissional
  - Sem elementos decorativos excessivos
  - Layout limpo e organizado
  - Responsivo para email clients

## 🚀 Como Usar no EmailJS

### Passo a Passo:

1. **Abra o arquivo `email-template-emailjs.html`**
2. **Selecione todo o conteúdo** (Ctrl+A ou Cmd+A)
3. **Copie** (Ctrl+C ou Cmd+C)
4. **No EmailJS Dashboard:**
   - Vá em **Email Templates**
   - Crie ou edite um template
   - No campo **Content**, selecione **HTML** (não Plain Text)
   - Cole o HTML copiado
   - Configure os campos:
     - **Subject:** `Nova mensagem do portfólio - {{subject}}`
     - **To Email:** `contato@joaopossidonio.com`
     - **From Email:** Deixe em branco ou `contato@joaopossidonio.com`
     - **From Name:** `Portfólio - {{from_name}}`
     - **Reply To:** `{{reply_to}}`
5. **Salve o template**

## 📋 Variáveis Disponíveis

O template utiliza as seguintes variáveis do EmailJS:

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `{{from_name}}` | Nome do remetente | "João Silva" |
| `{{from_email}}` | Email do remetente | "joao@exemplo.com" |
| `{{subject}}` | Assunto selecionado | "Oportunidade de Emprego" |
| `{{company}}` | Nome da empresa | "Empresa XYZ" ou "Não informado" |
| `{{message}}` | Mensagem do usuário | Texto completo da mensagem |
| `{{to_email}}` | Email de destino | "contato@joaopossidonio.com" |
| `{{reply_to}}` | Email para resposta | Mesmo que `{{from_email}}` |

## ✨ Características do Template

- ✅ **Design Consistente** - Mantém o visual do portfólio
- ✅ **Responsivo** - Funciona bem em diferentes clientes de email
- ✅ **Profissional** - Layout limpo e organizado
- ✅ **Acessível** - Contraste adequado e estrutura semântica
- ✅ **Compatível** - Testado para principais clientes de email

## 🔍 Preview

O template inclui:
- Header simples com título
- Informações organizadas (Nome, Email, Assunto, Empresa)
- Seção de mensagem com bordas sutis
- Rodapé discreto
- Estrutura de tabelas para compatibilidade com email clients
- Design limpo sem elementos decorativos excessivos

## 📱 Compatibilidade

O template foi criado usando tabelas HTML (técnica padrão para emails) para máxima compatibilidade com:
- Gmail
- Outlook (todas as versões)
- Apple Mail
- Yahoo Mail
- Clientes de email móveis

## 🎯 Customização

Para personalizar o template:

1. **Cores:** Procure por valores hexadecimais (`#212121`, `rgb(255, 252, 223)`)
2. **Fontes:** Procure por `font-family` nos estilos inline
3. **Tamanhos:** Ajuste valores `font-size` e `padding`
4. **Conteúdo:** Modifique o texto dentro das tags HTML

**⚠️ Importante:** Mantenha todos os estilos inline (não use CSS externo) para garantir compatibilidade com clientes de email.

