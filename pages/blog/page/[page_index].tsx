import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import { POST_PER_PAGE } from '@/config/index';
import Pagination from '@/components/Pagination';
import { getPosts } from '@/lib/post';
import CategoryList from '@/components/CategoryList';

const BLogPage = ({
  posts,
  numPages,
  currentPage,
  categories
}: {
  posts: Array<any>;
  numPages: number;
  currentPage: any;
  categories: any;
}) => {
  return (
    <Layout>
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, i) => (
              <Post key={i} post={post} />
            ))}
          </div>
          <Pagination currentpage={currentPage} numPages={numPages} />
        </div>

        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default BLogPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POST_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() }
    });
  }
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const page = parseInt(params?.page_index ?? 1);
  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  //GET CATEGORIES FOR SIDEBAR
  const categories: Array<any> = posts.map(post => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POST_PER_PAGE);
  const pageIndex = page - 1;
  const orderPost = posts.slice(
    pageIndex * POST_PER_PAGE,
    (pageIndex + 1) * POST_PER_PAGE
  );

  return {
    props: {
      posts: orderPost,
      numPages,
      currentPage: page,
      categories: uniqueCategories
    }
  };
}
