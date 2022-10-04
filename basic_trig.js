//https://stackoverflow.com/questions/39244371/javascript-cotangent-and-arccotangent

//cotangent (cos(x)/sin(x) = 1.0/tan(x))
function cot(x){
    return (1.0/Math.tan(x));
}

//arccotangent
function acot(x){
    return (Math.PI/2.0 - Math.atan(x));
}