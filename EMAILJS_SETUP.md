# Configuração do EmailJS para o Formulário de Contato

## 📧 Como configurar o envio automático de emails

### 1. Criar conta no EmailJS

Acesse [https://www.emailjs.com/](https://www.emailjs.com/) e crie uma conta gratuita.

### 2. Adicionar um serviço de email

**⚠️ IMPORTANTE: Se você receber o erro "insufficient authentication scopes" do Gmail API, use a opção SMTP ao invés do Gmail OAuth.**

#### Opção A: Usar SMTP (RECOMENDADO - Mais fácil e confiável)

1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha **SMTP** (não Gmail OAuth)
4. Configure com as credenciais SMTP do seu provedor de email:
   - **Gmail SMTP:**
     - Host: `smtp.gmail.com`
     - Port: `587`
     - Username: Seu email Gmail completo
     - Password: Use uma "Senha de App" do Google (veja instruções abaixo)
   - **Outlook SMTP:**
     - Host: `smtp-mail.outlook.com`
     - Port: `587`
     - Username: Seu email Outlook
     - Password: Sua senha do Outlook
5. Anote o **Service ID**

**Como criar Senha de App no Gmail:**
1. Acesse [Google Account Security](https://myaccount.google.com/security)
2. Ative a verificação em duas etapas (se ainda não tiver)
3. Vá em "Senhas de app"
4. Selecione "Email" e "Outro (nome personalizado)"
5. Digite "EmailJS" e clique em "Gerar"
6. Copie a senha gerada (16 caracteres) e use no EmailJS

#### Opção B: Usar Gmail OAuth (Mais complexo)

1. No dashboard, vá em **Email Services**
2. Clique em **Add New Service**
3. Escolha **Gmail**
4. Você precisará configurar OAuth 2.0 no Google Cloud Console:
   - Crie um projeto no [Google Cloud Console](https://console.cloud.google.com/)
   - Ative a Gmail API
   - Configure OAuth consent screen
   - Crie credenciais OAuth 2.0
   - Adicione os escopos necessários: `https://www.googleapis.com/auth/gmail.send`
5. Siga todas as instruções do EmailJS para conectar
6. Anote o **Service ID**

**Nota:** Se você receber o erro "insufficient authentication scopes", significa que os escopos OAuth não foram configurados corretamente. Use a Opção A (SMTP) que é mais simples.

### 3. Criar um template de email

1. Vá em **Email Templates**
2. Clique em **Create New Template**
3. Configure o template:

#### Opção A: Usar Template HTML Personalizado (RECOMENDADO)

O projeto inclui um template HTML que segue o design do portfólio:

1. Abra o arquivo `email-template-emailjs.html` na raiz do projeto
2. Copie TODO o conteúdo HTML
3. No EmailJS, no campo **Content**, selecione **HTML** ao invés de **Plain Text**
4. Cole o HTML copiado

**Configurações do Template:**

- **Subject:** `Nova mensagem do portfólio - {{subject}}`
- **To Email:** `contato@joaopossidonio.com`
- **From Email:** Deixe em branco ou use `contato@joaopossidonio.com` (NÃO use `{{from_email}}`)
- **From Name:** `Portfólio - {{from_name}}`
- **Reply To:** `{{reply_to}}` ou `{{from_email}}`
- **Content:** Cole o HTML do arquivo `email-template-emailjs.html`

**Variáveis disponíveis no template:**
- `{{from_name}}` - Nome do remetente
- `{{from_email}}` - Email do remetente
- `{{subject}}` - Assunto selecionado
- `{{company}}` - Nome da empresa (será "Não informado" se não preenchido)
- `{{message}}` - Mensagem do usuário
- `{{to_email}}` - Email de destino
- `{{reply_to}}` - Email para resposta

#### Opção B: Template de Texto Simples

Se preferir usar texto simples:

**Subject:** `Nova mensagem do portfólio - {{subject}}`

**Content (Plain Text):**
```
Nova mensagem recebida através do formulário de contato:

Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}
Empresa: {{company}}

Mensagem:
{{message}}

---
Esta mensagem foi enviada através do formulário de contato do portfólio.
Você pode responder diretamente a este email.
```

**Configurações:**
- **To Email:** `contato@joaopossidonio.com`
- **From Email:** Deixe em branco ou `contato@joaopossidonio.com`
- **Reply To:** `{{reply_to}}`

4. Salve o template e anote o **Template ID**

**📝 Nota:** O template HTML (`email-template-emailjs.html`) usa as mesmas cores, fontes e estilo visual do portfólio, criando uma experiência consistente e profissional.

### 4. Obter a chave pública

1. Vá em **Account** → **General**
2. Encontre sua **Public Key**
3. Copie a chave

### 5. Adicionar as credenciais no código

#### Opção A: Usar variáveis de ambiente (RECOMENDADO)

1. Crie um arquivo `.env` na raiz do projeto (se ainda não existir)
2. Adicione as seguintes variáveis:

```env
REACT_APP_EMAILJS_SERVICE_ID=seu_service_id_aqui
REACT_APP_EMAILJS_TEMPLATE_ID=seu_template_id_aqui
REACT_APP_EMAILJS_PUBLIC_KEY=sua_public_key_aqui
```

3. Reinicie o servidor de desenvolvimento (`npm start`)

**⚠️ IMPORTANTE:** 
- Não commite o arquivo `.env` no Git (ele já deve estar no `.gitignore`)
- As variáveis devem começar com `REACT_APP_` para funcionar no React

#### Opção B: Substituir diretamente no código

Abra o arquivo `src/Pages/LandingPage.js` e localize a função `handleSubmit`. Substitua as seguintes linhas:

```javascript
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || "SEU_SERVICE_ID_AQUI";
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "SEU_TEMPLATE_ID_AQUI";
const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "SUA_PUBLIC_KEY_AQUI";
```

Substitua os valores após o `||` pelas suas credenciais reais.

### 6. Testar o formulário

1. Execute o projeto: `npm start`
2. Acesse a seção de contato
3. Preencha o formulário
4. Clique em "Enviar Mensagem"
5. Verifique se o email chegou em `contato@joaopossidonio.com`

## 🔒 Segurança

As credenciais do EmailJS são públicas por design e podem ser expostas no frontend. O EmailJS possui:
- Limite de requisições por dia (200 emails/mês no plano gratuito)
- Proteção contra spam
- Captcha opcional

## 📊 Plano Gratuito

- ✅ 200 emails por mês
- ✅ 2 templates de email
- ✅ 1 serviço de email
- ✅ Suporte básico

## 🔧 Solução de Problemas

### Erro: "Request had insufficient authentication scopes"

**Causa:** O serviço Gmail OAuth não está configurado corretamente ou os escopos OAuth não foram concedidos.

**Solução:**
1. **Recomendado:** Use SMTP ao invés de Gmail OAuth (veja Opção A na seção 2)
2. Se preferir usar OAuth, verifique:
   - Se os escopos corretos foram adicionados no Google Cloud Console
   - Se o OAuth consent screen está configurado corretamente
   - Se você autorizou todos os escopos necessários

### Erro: "Invalid template ID" ou "Invalid service ID"

**Causa:** As credenciais não foram configuradas corretamente.

**Solução:**
1. Verifique se copiou corretamente os IDs do dashboard do EmailJS
2. Certifique-se de que não há espaços extras antes ou depois dos IDs
3. Se estiver usando variáveis de ambiente, reinicie o servidor após criar o arquivo `.env`

### Erro: "Email sending failed"

**Causa:** Problema com o serviço de email ou limite excedido.

**Solução:**
1. Verifique se o serviço de email está ativo no dashboard do EmailJS
2. Verifique se não excedeu o limite de 200 emails/mês (plano gratuito)
3. Teste o serviço diretamente no dashboard do EmailJS

## 🆘 Suporte

- Documentação oficial: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- Suporte do EmailJS: [https://www.emailjs.com/support/](https://www.emailjs.com/support/)

