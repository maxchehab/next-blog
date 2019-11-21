const withBlog = require("with-blog");

module.exports = withBlog(
  { contentPath: "content/articles", pagePath: "/" },
  { poweredByHeader: false }
);
