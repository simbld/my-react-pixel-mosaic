module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
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
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "prettier/prettier"
  ],
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-var-requires": "error",
    "prettier/prettier": [
      "error",
      { singleQuote: false, trailingComma: "none", semi: true }
    ],
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
