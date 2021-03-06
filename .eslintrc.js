module.exports = {
  // Plugins that provide the processors to parse code for linting
  plugins: ["prettier"],
  // files to exclude
  ignorePatterns: ["dist/**", "scripts/**"],
  // A wrapper around the Babel parser that makes it compatible with ESLint.
  parser: "@babel/eslint-parser",
  extends: [
    // Uses the recommended rules from eslint
    "eslint:recommended",
    /*
      Uses the recommended rules from eslint-config-airbnb-base
      depends on eslint-plugin-import to work
    */
    "airbnb-base",
    // Make sure the "prettier" rules are last, that way they overwrite previous configurations.
    "prettier",
    /*
      Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
      Make sure this is always the last configuration in the extends array.
    */
    "plugin:prettier/recommended",
  ],
  /*
    babelOptions is an object containing Babel configuration options that are passed to Babel's parser at runtime.
    For cases where users might not want to use a Babel configuration file or are running Babel through another tool (such as Webpack with babel-loader).
    https://github.com/babel/babel/tree/main/eslint/babel-eslint-parser#additional-parser-configuration
  */
  parserOptions: {
    babelOptions: {
      configFile: "./babel.config.js",
    },
  },
  env: {
    // Node.js global variables and Node.js scoping.
    node: true,
    // browser global variables.
    browser: true,
    // Define predefined global jest variables.
    jest: true,
  },
  // @babel/eslint-parser and prettier rules go here
  rules: {
    "prettier/prettier": ["error"],
    // https://stackoverflow.com/questions/44939304/eslint-should-be-listed-in-the-projects-dependencies-not-devdependencies
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
  },
  /*
    disable rules for ts files
    we'll want to use a typescript parser instead with prettier
  */
  overrides: [
    {
      files: ["**/*.ts"],
      // Plugins that provide the processors to parse code for linting
      plugins: ["@typescript-eslint", "prettier"],
      // A parser that converts TypeScript into an ESTree-compatible form so it can be used in ESLint.
      parser: "@typescript-eslint/parser",
      /*
        Create a separate TypeScript config file (tsconfig.eslint.json) intended for eslint configuration.
        This file extends 'tsconfig' configuration and setups 'include' key for files that have to be linted.
      */
      parserOptions: {
        project: "./tsconfig.eslint.json",
      },
      extends: [
        // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        "plugin:@typescript-eslint/recommended",
        /*
          Uses the recommended rules from eslint-config-airbnb-typescript
          depends on @typescript-eslint/eslint-plugin and eslint-plugin-import to work
        */
        "airbnb-typescript/base",
        // Make sure the "prettier" rules are last, that way they overwrite previous configurations.
        "prettier",
        // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        "prettier/@typescript-eslint",
        /*
          Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
          Make sure this is always the last configuration in the extends array.
        */
        "plugin:prettier/recommended",
      ],
      env: {
        // Node.js global variables and Node.js scoping.
        node: true,
        // browser global variables.
        browser: true,
        // Define predefined global jest variables.
        jest: true,
      },
      // @typescript-eslint/parser and prettier rules go here
      rules: {
        "prettier/prettier": ["error"],
        // https://stackoverflow.com/questions/44939304/eslint-should-be-listed-in-the-projects-dependencies-not-devdependencies
        "import/no-extraneous-dependencies": [
          "error",
          { devDependencies: true },
        ],
      },
    },
  ],
};
