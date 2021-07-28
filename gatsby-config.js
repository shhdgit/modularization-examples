module.exports = {
  pathPrefix: "/modularization-examples",
  siteMetadata: {
    title: `业务逻辑拆分模式`,
    description: `业务逻辑拆分模式`,
  },
  plugins: [
    {
      resolve: `gatsby-theme-gardenx`,
      options: {
        rootNote: "/README",
        contentPath: `${__dirname}`,
        parseWikiLinks: true,
      },
    },
  ],
};
