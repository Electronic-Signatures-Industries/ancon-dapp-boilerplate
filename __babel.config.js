module.exports = {
  presets: ["@vue/app", 
    [
      '@babel/preset-env',
      {
        targets: {
          esmodules: true,
        },
      },
    ],
  ],
  plugins: [
    ["@babel/proposal-decorators", { legacy: true }],
    ["@babel/proposal-class-properties", { loose: true }],
    ["transform-runtime", {regenerator: true}],
    ["@babel/plugin-transform-runtime"],
    ["transform-regenerator"]
  ],

};
