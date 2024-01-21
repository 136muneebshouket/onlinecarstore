

let totalprogress = 0

const imagekit_upload = (carid, imagesto_upload) => {

    // const { message, setMessage } = useContext(Context);

    let progress = parseInt((100 / (imagesto_upload.length + 1)).toFixed(0)) 

    let interval =  setInterval(()=>{
        totalprogress += progress 
       
     },1000)
    setTimeout(() => {
        clearInterval(interval)
        totalprogress = 0
        // setMessage({progress:null});
        // setMessage({loader:false});
    }, (imagesto_upload.length * 1000));


    // console.log(imagesto_upload);
    // let Cloudimages = [];
    // if (imagesto_upload.length > 0 && carid) {
    //   for (let i = 0; i < imagesto_upload.length; i++) {

       
    //   }

    //   if (Cloudimages.length > 0 ) {
    //     let images = {
    //       carid,
    //       Cloudimages,
    //     };
    //     await axios
    //       .post(`/api/uploadcar/uploadimages`, images)
    //       .then(async (res) => {
    //         if (res.status == 201) {
    //           console.log(res?.data);
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err?.response?.data);
    //         errors_in_imgs.push(`error in db upload images`);
    //       })
          
    //   }
    // }

 
}

export { imagekit_upload , totalprogress}
