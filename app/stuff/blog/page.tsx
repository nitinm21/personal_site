import BlogArchiveClient from './BlogArchiveClient';
import { getBlogPosts } from './posts';

export const revalidate = 3600;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogArchiveClient posts={posts} />;
}
