export default {
    keepInWin(val,valv,max){
        // console.log('')
        // console.log(val)
        // console.log(valv)
        // console.log(max)
        return max < (val+valv)? max/2-valv/2:val
    },
    setWidth(max){
        return max < 1280?max-60:500
    }
};
