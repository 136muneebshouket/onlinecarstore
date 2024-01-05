
let totalwork = 0;
function p_func(v) {
    if(v == 'stop'){
        totalwork = 0
    }else{
        totalwork += v
    }
 
}
export {p_func,totalwork}