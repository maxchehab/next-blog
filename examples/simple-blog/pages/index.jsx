import React, { Component } from "react";
import Link from "next/link";

async function getArticles() {
  const markdownFiles = require
    .context("../content/articles", false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));

  return await Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../content/articles/${path}`);
      return {
        ...markdown,
        slug: path.substring(0, path.length - 3)
      };
    })
  );
}

export default class Home extends Component {
  static async getInitialProps() {
    return { articles: await getArticles() };
  }

  render() {
    const articles = this.props.articles.map(article => {
      const href = `article/${article.slug}`;

      return (
        <Link href={href}>
          <h1>
            <a href={href}>{article.attributes.title}</a>
          </h1>
        </Link>
      );
    });

    return <>{articles}</>;
  }
}
