# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Code Quality with SonarQube

This project uses SonarQube for continuous code quality inspection and security analysis.

### Prerequisites

1. **SonarQube Server**: Ensure SonarQube is running locally at `http://localhost:9000`
   - Download from [SonarQube Downloads](https://www.sonarsource.com/products/sonarqube/downloads/)
   - Or run with Docker: `docker run -d --name sonarqube -p 9000:9000 sonarqube:latest`

2. **SonarScanner**: Install the SonarScanner CLI globally

   ```bash
   npm install -g sonar-scanner
   ```

### Running SonarQube Analysis

To analyze your code and send results to SonarQube:

```bash
npm run sonar
```

This command will:


- Scan all source files in the `src/` directory
- Exclude `node_modules`, `dist`, and `build` directories
- Upload analysis results to your local SonarQube instance
- Generate a detailed report with code smells, bugs, vulnerabilities, and security hotspots

### Viewing Results

After running the analysis:


1. Navigate to `http://localhost:9000` in your browser
2. Log in to SonarQube (default credentials: admin/admin)
3. Find the `frontend` project to view:
   - Code quality metrics
   - Security vulnerabilities
   - Code coverage
   - Technical debt
   - Duplications

### Best Practices

- **Run before committing**: Execute `npm run sonar` before pushing code to catch issues early
- **Monitor quality gates**: Ensure your code passes the defined quality gates
- **Address critical issues**: Prioritize fixing bugs and vulnerabilities flagged by SonarQube
- **Track trends**: Regularly review metrics to maintain code quality over time

### Configuration

The SonarQube configuration is defined in [sonar-project.properties](sonar-project.properties):


- Project key: `frontend`
- Source directory: `src/`
- Host URL: `http://localhost:9000`

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
