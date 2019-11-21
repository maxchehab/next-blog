# Next.js + Blog

Import CMS generated `.md` files in your Next.js project

## Installation

```
npm install --save with-blog
```

or

```
yarn add with-blog
```

## Usage

Structured markdown files are compiled from a `contentPath` directory and a [path map](https://nextjs.org/docs#static-html-export) is generated with a custom `pagePath` property.

```js
const withBlog = require("with-blog");

module.exports = withBlog({ 
    contentPath: "content/articles", // directory of .md files
    pagePath: "/article/" // dynamic page route
});
```

This assumes there is a **content** directory located at `content/articles`.

```
content
└── articles
    ├── a-blog-post.md
    ├── another-blog-post.md
    └── yet-another-blog-post.md
```

And a dynamic `/article/[slug]` page.

```
pages
└── article
    └── [slug].jsx
```

For more information, check out the [example project](https://github.com/maxchehab/with-blog/tree/master/examples/simple-blog).