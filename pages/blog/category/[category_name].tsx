import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { getPosts } from '@/lib/post';
import matter from 'gray-matter';
import CategoryList from '@/components/CategoryList';

const CategoryPage = ({
  posts,
  categoryName,
  categories
}: {
  posts: any;
  categoryName: string;
  categories: any;
}) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Post in {categoryName}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post: any, i: number) => (
              <Post key={i} post={post} />
            ))}
          </div>
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const categories = files.map(fileName => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', fileName),
      'utf-8'
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map(category => ({
    params: { category_name: category }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({
  params: { category_name }
}: {
  params: { category_name: string };
}) {
  const posts = getPosts();

  //GET CATEGORIES FOR SIDEBAR
  const categories: Array<any> = posts.map(post => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const categoryPosts = posts.filter(
    post => post.frontmatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories
    }
  };
}
