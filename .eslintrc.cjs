module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "airbnb",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "eslint-config-prettier",
    "prettier/prettier"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    react: {
      version: "18.2"
    }
  },
  plugins: ["react-refresh"],
  rules: {
    "no-tabs": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    "comma-dangle": ["error", "never"],
    "implicit-arrow-linebreak": ["error", "beside"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "webpack.config.js",
          "**/*.test.js",
          "**/*.spec.js",
          "**/vite.config.js",
          "**/vite.config.ts",
          "**/node_modules/vite/**",
          "**/node_modules/@vitejs/plugin-react/**"
        ]
      }
    ]
  }
};
