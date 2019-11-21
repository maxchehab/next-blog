const fs = require("fs");

const getPathsForArticles = config =>
  fs
    .readdirSync(config.contentPath)
    .map(fileName => {
      const trimmedName = fileName.substring(0, fileName.length - 3);

      return {
        [`${config.pagePath}${trimmedName}`]: {
          page: `${config.pagePath}[slug]`,
          query: {
            slug: trimmedName
          }
        }
      };
    })
    .reduce((acc, curr) => {
      return { ...acc, ...curr };
    }, {});

const throwError = message => {
  throw new Error(`[with-blog] ${message}`);
};

module.exports = (config, nextConfig = {}) => {
  if (!config || !config.contentPath) {
    throwError("The contentPath property is missing!");
  }

  if (!config.pagePath) {
    throwError("The pagePath property is missing!");
  }

  return Object.assign({}, nextConfig, {
    webpack: configuration => {
      configuration.module.rules.push({
        test: /\.md$/,
        use: "frontmatter-markdown-loader"
      });

      return configuration;
    },

    async exportPathMap(defaultPathMap) {
      const providedExportPathMap =
        nextConfig.defaultPathMap ||
        function(map) {
          return map;
        };

      return {
        ...defaultPathMap,
        ...providedExportPathMap(defaultPathMap),
        ...getPathsForArticles(config)
      };
    }
  });
};
