import React, { useState , useContext } from "react";
import dynamic from "next/dynamic";
import Parser from "html-react-parser";
import axios from "axios";
import Context from "@/components/processing_functions/context";

const Joditeditr = dynamic(() => import("../jodit_editor/Jodit"), {
  ssr: false,
});

const Ad_new_blog = () => {

  const { message, setMessage } = useContext(Context);
  const [blog_content, setBlog_content] = useState('');

  const Blogdata = {
    title: "",
    type: "",
    content: "",
    author: "",
    metadesc: "",
  };
  const [blogdata, setBlogdata] = useState(Blogdata);
  const [imagestoshow, setImagestoshow] = useState();

  async function handleimgpicked(event) {
    // setLoading(true);
    const file = event.target.files[0];
    const filename = event.target.files[0].name;
    if (file.size > 4 * 1024 * 1024) {
      // setLoading(false);
      // setMessage({
      //   success: false,
      //   msg: "Image size should not exceed 4MB. Upload your Images again",
      // });
      // setLoading(false);
      return;
    }
    const reader = new FileReader();

    const promise = new Promise((resolve) => {
      reader.onload = (e) => {
        setImagestoshow((prevSelectedImages) => ({
          ...prevSelectedImages,
          url: e.target.result,
          filename,
        }));
        resolve();
      };
    });
    // set_blog();

    reader.readAsDataURL(file);
    // setLoading(false);
  }

  function set_blog(){
    let obj = blogdata;
    obj.content = blog_content;
    setBlogdata(obj)
  }
  async function blog_upload() {
    set_blog()
    
    let admin_token = JSON.parse(localStorage.getItem('admin_token'))
    // console.log(admin_token)

    setMessage({ loader: true });
    await axios.post(`/api/admin/blogs/add_blogs`,{blogdata , imagestoshow , admin_token})
    .then((result) => {
      setMessage({ loader: false });
      setMessage({ success: true, msg: result.data.message });
      console.log(result.data)
      setBlogdata(Blogdata)
      setImagestoshow()
    }).catch((err) => {
      setMessage({ loader: false });
      setMessage({ success: false, msg: err?.response?.data.message });
    });

  }



  return (
    <>
      <div className="blog_upload">
        <h2>Add new blogs</h2>

        <div className="form_blog">
          {imagestoshow ? (
            <>
              <div className="blog_img_uplod">
                <img src={imagestoshow?.url} alt="" />
              </div>
            </>
          ) : null}

          <div className="form_input">
            <label>Upload img</label>
            <input type="file" accept="image/*" onChange={handleimgpicked} required/>
          </div>

          <div className="form_input">
            <label>Title</label>
            <input  type="text"  onChange={(e)=> setBlogdata({...blogdata , title:(e.target.value)})} required/>
          </div>

          <div className="form_input">
            <label>Meta desc</label>
            <input type="text"  onChange={(e)=> setBlogdata({...blogdata , metadesc:(e.target.value)})}  required/>
          </div>

          <div className="form_input">
            <label>Author</label>
            <input type="text"  onChange={(e)=> setBlogdata({...blogdata , author:(e.target.value)})} required/>
          </div>

          <div className="form_input">
            <label>Type</label>
            <select name="type" id=""  onChange={(e)=> setBlogdata({...blogdata , type:(e.target.value)})} required>
              <option value="">select type</option>
              <option value="news">news</option>
              <option value="opinions">opinions</option>
              <option value="car-reviews">car-reviews</option>
              <option value="cars-in-pakistan">cars-in-pakistan</option>
            </select>
          </div>

          <Joditeditr value={blog_content} setValue={setBlog_content} />

          <div className="blog_content">
             {Parser(blog_content)}
          </div>

          <div className="blogs_btn">
            <button onClick={blog_upload}>Publish</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ad_new_blog;
