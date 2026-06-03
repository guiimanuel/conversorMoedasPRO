<div align="center">

# 💱 Conversor de Moedas PRO

**Aplicativo mobile de conversão de moedas em tempo real com autenticação Firebase**

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0.33-000020?style=flat-square&logo=expo&logoColor=white)](https://expo.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12.12.1-FFCA28?style=flat-square&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Axios](https://img.shields.io/badge/Axios-1.15.2-5A29E4?style=flat-square&logo=axios&logoColor=white)](https://axios-http.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

</div>

---

## 📖 Sobre o Projeto

**Conversor de Moedas PRO** é um aplicativo mobile multiplataforma desenvolvido com **React Native + Expo** que permite ao usuário converter moedas em tempo real consumindo dados de uma API externa via **Axios**. O app conta com autenticação de usuários gerenciada pelo **Firebase**, navegação entre telas com React Navigation e ícones da biblioteca `@expo/vector-icons`.

---

## ✨ Funcionalidades

- 🔐 **Autenticação** — login e cadastro de usuários via Firebase
- 💰 **Conversão em tempo real** — cotações atualizadas via integração com API de câmbio
- 🌍 **Múltiplas moedas** — suporte a diversas moedas internacionais
- 🗺️ **Navegação entre telas** — React Navigation com Native Stack
- 🎨 **Ícones** — interface enriquecida com `@expo/vector-icons`
- 📱 **Multiplataforma** — Android, iOS e Web a partir de uma única base de código

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| Framework Mobile | React Native 0.81.5 |
| Plataforma | Expo ~54.0.33 |
| Linguagem | JavaScript (ES2023) |
| Autenticação | Firebase 12.12.1 |
| HTTP Client | Axios 1.15.2 |
| Navegação | React Navigation 7.x (Native Stack) |
| Ícones | @expo/vector-icons 15.x |
| Build Tool | EAS CLI |

---

## 📁 Estrutura do Projeto

```
conversorMoedasPRO/
├── App.js                  # Entrada principal do app
├── app.json                # Configurações do Expo
├── eas.json                # Configurações de build EAS
├── metro.config.js         # Configuração do bundler Metro
├── package.json
│
├── src/
│   └── screens/
│       └── index.js        # Ponto de entrada das telas
│
└── assets/                 # Recursos estáticos (imagens, fontes)
```

---

## 🚀 Como Executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18.x
- [Expo Go](https://expo.dev/go) no dispositivo ou emulador configurado

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/guiimanuel/conversorMoedasPRO.git

# 2. Acesse a pasta
cd conversorMoedasPRO

# 3. Instale as dependências
npm install
```

### Configuração do Firebase

1. Acesse o [Console do Firebase](https://console.firebase.google.com/) e crie um projeto
2. Ative o **Authentication** (Email/Senha)
3. Adicione as credenciais do Firebase no arquivo de configuração do projeto

### Executando

```bash
# Iniciar o servidor de desenvolvimento
npm start

# Android
npm run android

# iOS
npm run ios

# Web
npm run web
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um **fork** do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-feature`
3. Faça commit das alterações: `git commit -m 'feat: adiciona minha feature'`
4. Faça push para a branch: `git push origin feature/minha-feature`
5. Abra um **Pull Request**

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 👨‍💻 Desenvolvedor

Desenvolvido por **[Guilherme Manuel](https://github.com/guiimanuel)**

[![GitHub](https://img.shields.io/badge/GitHub-guiimanuel-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/guiimanuel)
[![Instagram](https://img.shields.io/badge/Instagram-guiimanuel__-E4405F?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/guiimanuel_/)

---

<div align="center">

⭐ Se este projeto foi útil, deixe uma estrela no repositório!

</div>
