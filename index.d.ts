declare module "@maxchehab/next-page" {
  interface NextBlogConfig {
    contentPath: string;
    pagePath: string;
  }

  export default function withBlog(
    config: NextBlogConfig,
    nextConfig?: any
  ): any;
}
