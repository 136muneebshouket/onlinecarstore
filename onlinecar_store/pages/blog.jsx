import React, { useContext } from "react";
import Search_bar from "@/components/blog_components/Search_bar";
import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Parser from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Blog = ({ blogsdata, loadiing }) => {
  const router = useRouter();
  const { message, setMessage } = useContext(Context);

  if (loadiing) {
    setMessage({ loader: true });
  } else {
    setMessage({ loader: false });
  }
  // console.log(router.asPath)

  // if(!(router.asPath.startsWith('/blogs/blog'))){
  //   return <>
  //   <h1>Page not Found</h1>
  //   </>
  // }

  return (
    <>
      <div className="main_blogs">
        <div className="head_blogs">
          <Search_bar />
        </div>
        <div className="blogs_section">
          <div className="all_blogs">
            <div className="blogs_lists">
              <div className="title">
                <h1>Our Blogs</h1>
              </div>

              {blogsdata?.map((v, index) => {
                return (
                  <>
                    <Link href={`/blog/${v.slug}`} key={index} >
                      <div className="blog_div">
                        <div className="img_div">
                          <Image width={1000} height={1000} unoptimized={true} src={v?.photo?.img_url} alt="" />

                          <div className="blog_tag">{v?.type}</div>
                          <div className="layer"></div>
                        </div>
                        <div className="content_div">
                          <h2>{v?.title}</h2>
                          <div className="others">
                            <span>{v?.author}</span>
                            <span>
                              {" "}
                              {new Date(v?.createdAt).toDateString()}
                            </span>
                            <span>{v.views}</span>
                          </div>
                          <div className="content">
                             {Parser(v?.content)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                );
              })}
            </div>

            <div className="pagination_btns"></div>
          </div>

          <div className="sidebar"></div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params, query, res }) {
  const resp = await axios.get(
    `${process.env.Host}/api/blogs/fetch_blog?filters=${query.filters}&limit=12&page=${query.page}`
  );
  const blogsdata = resp.data.data;
  // console.log(blogsdata)
  const pages = Math.ceil(resp.data.count / 12);
  let loadingg = true;
  if (blogsdata) {
    loadingg = false;
  }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  return {
    props: {
      blogsdata,
      loadiing: loadingg,
      total: pages,
      pagenum: query.page || 1,
    },
    // revalidate: 300
  };
}

export default Blog;
