module.exports = {
  extends: ["eslint:recommended"],
  plugins: ["import", "jest", "prettier"],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2018
  },
  env: {
    node: true,
    "jest/globals": true
  },
  settings: {
    "import/internal-regex": "^@internal/"
  },
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": ["error", { varsIgnorePattern: "^h$" }],
    "max-lines": ["error", { max: 180 }],
    "no-warning-comments": "error",
    "no-constant-condition": ["error", { checkLoops: false }],
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"],
          "internal",
          "parent",
          ["sibling", "index"]
        ],
        "newlines-between": "always",
        alphabetize: {
          order: "asc"
        }
      }
    ],
    "import/no-self-import": "error",
    "import/no-useless-path-segments": [
      "error",
      {
        noUselessIndex: true
      }
    ],
    "import/newline-after-import": "error"
  }
};
