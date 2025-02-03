# Contributing Guide to Tech Department Website

## Prerequisites

- Node.js v20.0.0 or later (lts/iron recommended)
- PNPM v8.0.0 or later

## Getting Started

1. Clone the repository

   ```bash
   git clone https://github.com/esc-chula/intania-link.git
   ```

2. Install the dependencies

   ```bash
   pnpm install
   ```

3. Generate Prisma client (In case `pnpm install` doesn't run it)

   ```bash
   pnpm generate
   ```

   > [!NOTE]  
   > The database's model of this project is using a schemas and migrations from [tech-website](https://github.com/esc-chula/tech-website), so it's required to clone and using `docker-compose` from [tech-website](https://github.com/esc-chula/tech-website)

4. Start the development server

   ```bash
   pnpm dev
   ```

5. Done! You are now good to go!

## Practices

- **Commit Message**: Use the following format for commit messages: `type: description`. For example, `feat: add button component`.
  Please check [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more information.

- **Branching**: Use the following format for branch names: `type/description`. For example, `feature/button`.

## Recommended Extensions for VSCode

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

### WSL (for Windows users)

_Not required but recommended._
If you have some time or encounter some issues, I recommend setting up WSL for development.

Please check the [official documentation](https://docs.microsoft.com/en-us/windows/wsl/install) for more information.
