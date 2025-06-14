module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require features/step-definitions/**/*.ts",
    "--require support/**/*.ts",
    "--publish-quiet",
    "features/**/*.feature"
  ].join(" "),
};
