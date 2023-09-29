// import axios from "axios";

// // function for uploading to cloudinary
// const uploadimages = async (carid, new_imgs, images_old) => {
//   let errors_in_imgs = [];

//   if (new_imgs.length > 0) {
//     let imagesto_upload;
//     if(images_old.length > 0){
//       const imgs_to_uplod = new_imgs.filter((imgs) => {
//         if (!images_old.includes(imgs)) {
//           return imgs;
//         }
//       });
//       imagesto_upload = imgs_to_uplod
//     }else{
//       imagesto_upload = new_imgs
//     }

//     // console.log(imagesto_upload);
//     let Cloudimages = [];
//     if (imagesto_upload.length > 0 && carid) {
//       const uploadData = new FormData();
//       for (let i = 0; i < imagesto_upload.length; i++) {
//         uploadData.append("file", imagesto_upload[i].file);
//         uploadData.append("upload_preset", process.env.APP_PRESET_NAME);
//         uploadData.append("cloud_name", process.env.APP_CLOUD_NAME);
//         try {
//           await axios
//             .post(
//               `https://api.cloudinary.com/v1_1/${process.env.APP_CLOUD_NAME}/image/upload`,
//               uploadData
//             )
//             .then((res) => {
//               console.log(res.data.secure_url);
//               // Cloudimages.push(res.data.secure_url);
//               //  setCloudimages([...Cloudimages,res.data.secure_url])
//               Cloudimages.push(res.data.secure_url);
//             })
//             .catch((err) => {
//               console.error(err);
//               errors_in_imgs.push(
//                 `error in cloud upload of ${imagesto_upload[i].file.name}`
//               );
//             });
//           // Process the uploaded image URLs here, e.g., save them to your state or send them to the server.
//         } catch (error) {
//           console.error("Upload failed:", error);
//           errors_in_imgs.push(`error in cloud upload images`);
//           continue;
//         }
//       }

//       if (Cloudimages.length == imagesto_upload.length ) {
//         let images = {
//           carid,
//           Cloudimages,
//         };
//         await axios
//           .post(`/api/uploadcar/uploadimages`, images)
//           .then(async (res) => {
//             if (res.status == 201) {
//               // setError(res?.data);
//               console.log(res?.data);
//               // resetState();
//               // resettextarea();
//               //  await uploadimages(res?.data.car_id)
//               // setLoading(false);
//             }
//           })
//           .catch((err) => {
//             console.log(err?.response?.data);
//             errors_in_imgs.push(`error in db upload images`);
//           })
          
//       }
//     }

//   }

//   // console.log(new_imgs[0].file);
//   // for uploading to cloudinary
//   return errors_in_imgs;
// };

// export default uploadimages;
