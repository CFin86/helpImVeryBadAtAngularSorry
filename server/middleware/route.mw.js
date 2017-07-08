//WEEK 5/ DAY 22/ SLIDE 11
exports.isAsset =function(path){
    var pieces = path.split('/');
    if(pieces.length == 0) {
        return false;
    }
    if(path.indexOf('/api')!== -1 || path.indexOf('/?')!== -1){
        return true;
    }
    if(pieces[pieces.length - 1].indexOf(".")!== -1){
        return true;
    }
    return false;
}