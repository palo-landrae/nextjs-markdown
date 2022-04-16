import type { NextPage } from "next";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { IPost } from "../../interfaces/IPost";
import { data } from "../api/sample_data";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface IProps {
  post: IPost;
}

const BlogPage: NextPage<IProps> = ({ post }) => {
  return <div>{post.content}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = data.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params as IParams;

  const post = data.find((post) => {
    return post.slug === slug;
  });

  return {
    props: {
      post: JSON.parse(JSON.stringify(post)),
    },
    revalidate: 30,
  };
};

export default BlogPage;
