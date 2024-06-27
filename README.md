# MyTailWoindProject.WEB

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

#### Commands

```bash
#Install dependencies
npm install

#Run development
npm run dev

#Run test
npm run test

#Format code
npm run format

#Review code linting issue
npm run lint

#Fix code lint issues
npm run lint:fix

#Build project
npm run build
```

#### Toolings and Extensions

- Framework: `Next.js`
- Precommit Hook: `husky`
- Linting: [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- SonarLint: [SonarLint](https://marketplace.visualstudio.com/items?itemName=SonarSource.sonarlint-vscode)
- Unit Test: [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- Code Formatter: [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

Install extensions and update VS code `settings.json`

```json
"window.commandCenter": true
"editor.defaultFormatter": "esbenp.prettier-vscode",
"editor.formatOnPaste": false,
"editor.formatOnType": false,
"editor.formatOnSave": true,
"editor.formatOnSaveMode": "file",
"jest.autoRun": { "watch": false, "onSave": "test-file" }
```

#### Recommand VSCode Extensions

- [React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- [Auto Complete Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind Documentation](https://marketplace.visualstudio.com/items?itemName=alfredbirk.tailwind-documentation)
- [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
- [GitLens ](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
