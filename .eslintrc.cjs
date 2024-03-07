module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    tsconfigRootDir: "src",
    project: "./tsconfig.json",
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      tsx: true,
      js: true,
      ts: true
    }
  },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "import"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/prettier"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "no-tabs": "off",
    "no-underscore-dangle": ["error", { allow: ["__dirname", "__filename"] }],
    indent: ["error", 2, { SwitchCase: 1 }],
    "comma-dangle": ["error", "never"],
    "implicit-arrow-linebreak": ["error", "beside"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never"
      }
    ],
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }]
  }
};
