# InterestPlanner App

**InterestPlanner** is a desktop application built using modern web technologies to help users track cryptocurrency prices and plan their financial goals. The app is powered by Electron, Vue.js 3, Vite, and integrates with the CoinGecko API to fetch live cryptocurrency price data.

## Key Technologies

- **Electron Forge**: Provides the foundation for creating cross-platform desktop applications with web technologies.
- **Vue.js 3**: A progressive JavaScript framework for building user interfaces.
- **Vite**: A fast build tool and development server optimized for modern web projects.
- **Node.js**: Enables backend logic and API communication.
- **CoinGecko API**: Provides cryptocurrency price data used in the app.

## Features

1. **Live Cryptocurrency Price Tracking**: Fetch live prices of cryptocurrencies using the CoinGecko API.
2. **Cross-Platform Support**: Works on Windows, macOS, and Linux.
3. **Hot Reloading**: Develop and test changes quickly with Vite’s development server.
4. **Customizable Settings**: User preferences can be tailored to individual needs.
5. **Elegant UI**: Built with Vue.js 3 for a responsive and modern interface.

## Installation

### Prerequisites

- **Node.js** (v16 or later) and npm
- **Git** (optional for cloning the repository)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/timoschneider249/InterestPlanner.git
   cd InterestPlanner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run start
   ```

4. Build the app for production:
   ```bash
   npm run make
   ```

## CoinGecko API Integration

This app uses the [CoinGecko API](https://www.coingecko.com/en/api/documentation) to fetch cryptocurrency price data. The API allows the app to display real-time USD prices for various cryptocurrencies.

To learn more about the CoinGecko API, visit the [official documentation](https://www.coingecko.com/en/api/documentation).

## Project Structure

```plaintext
.
├── node_modules/
├── out/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css
│   ├── components/
│   │   ├── About.vue
│   │   ├── ROICalculator.vue
│   │   └── TokenCalculator.vue
│   ├── router/
│   │   └── index.js
│   └── services/
│       ├── api.service.js
│       └── ipc.service.js
├── App.vue
├── index.css
├── main.js
├── preload.js
├── renderer.js
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.mjs
├── forge.config.js
├── forge.env.d.ts
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── README.md
└── vite.base.config.mjs
```

## Scripts

- `npm run start`: Starts the app in development mode.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run lint:fix`: Fixes linting issues.
- `npm run format`: Formats code with Prettier.
- `npm run make`: Builds the app for production.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments

- [CoinGecko](https://www.coingecko.com) for providing cryptocurrency price data.
- [Electron](https://www.electronjs.org/) for the app's desktop environment.
- [Vue.js](https://vuejs.org/) for the frontend framework.
- [Vite](https://vitejs.dev/) for the fast development server and build tool.

---

For any issues, questions, or suggestions, please open an issue on the repository or contact the project maintainer.

