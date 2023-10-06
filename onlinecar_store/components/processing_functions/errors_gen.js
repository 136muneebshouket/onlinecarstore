let resobj={
    success: undefined,
    msg: undefined,
    show: false
}

function generate_err(success,response){
    resobj.success = success
    resobj.msg = response
    if(response){
      resobj.show = true;
    }
   console.log(resobj)

}


export { generate_err, resobj}