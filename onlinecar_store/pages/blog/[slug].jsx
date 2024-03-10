import React, { useContext } from "react";
import { useRouter } from "next/router";
import Context from "@/components/processing_functions/context";
import Parser from "html-react-parser";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const slug = ({ loadiing, blogsdata }) => {
  const { message, setMessage } = useContext(Context);

  if (loadiing) {
    setMessage({ loader: true });
  } else {
    setMessage({ loader: false });
  }
  return (
    <>
      <div className="single-blog-page">
        <div className="featureimg">
          <Image
            width={1000}
            height={1000}
            unoptimized={true}
            src={blogsdata?.photo?.img_url}
            alt=""
          />
        </div>

        <div className="hr">
          <hr />
        </div>

        <div className="content_section">
          <div className="heading">
            <h1>{blogsdata?.title}</h1>
          </div>

          <div className="details">
            <div className="author">
              {/* <Image src="" alt="" height={30} width={30} priority={false} unoptimized={true} /> */}
              <i class="bx bxs-user"></i>
              <span>{blogsdata?.author}</span>
              <span>&emsp;—&emsp;</span>
              <i class="bx bxs-calendar"></i>
              <span className="date">
                {new Date(blogsdata?.createdAt).toDateString()}
              </span>
            </div>
            <div className="views">
               <span>&#128065;</span> 
              &nbsp;
              <span className="viewcount">{blogsdata?.views}</span>
            </div>
          </div>

          <div className="content">{Parser(blogsdata?.content)}</div>
        </div>

        <div className="comments">
          <h3>Leave a reply</h3>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="commentinp"
            placeholder={"Comment:*"}
          ></textarea>
          <div className="commentform">
            <input type="text" name="name" id="name" placeholder={"Name:*"} />
            <input
              type="email"
              name="email"
              id="email"
              placeholder={"Email:*"}
            />
          </div>
          <div style={{
            display:'flex' , justifyContent:'flex-end'
          }}>
          <button className="commentbtn">Post Comment</button>
          </div>
         
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps({ params, query, res }) {
  // console.log(params)
  const resp = await axios.get(
    `${process.env.Host}/api/blogs/single_blog?slug=${params.slug}`
  );
  const blogsdata = resp.data.data;
  // console.log(blogsdata);
  // const pages = Math.ceil(resp.data.count / 12);
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
    },
    //   // revalidate: 300
  };
}

export default slug;
