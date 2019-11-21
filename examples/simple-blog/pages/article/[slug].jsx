import React, { Component } from "react";

export default class Article extends Component {
  static async getInitialProps({ query }) {
    const { slug } = query;

    try {
      const article = await import(`../../content/articles/${slug}.md`);

      return { article };
    } catch (error) {
      return { article: undefined };
    }
  }

  render() {
    const { article } = this.props;

    if (!article) {
      return <h1>Not found</h1>;
    }

    return (
      <>
        <h1>{article.attributes.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.html }} />
      </>
    );
  }
}
