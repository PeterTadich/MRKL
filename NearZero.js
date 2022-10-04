/*
var near = -1e-7;
var judge = NearZero(near);
console.log(judge); //1

var near = -1e-5;
var judge = NearZero(near);
console.log(judge); //0

var near = [[-1e-7],[-1e-7],[-1e-7]];
var judge = NearZero(near);
console.log(judge); //1

var near = [[-1e-1],[-1e-1],[-1e-1]];
var judge = NearZero(near);
console.log(judge); //0
*/

function NearZero(near){
    var TOL = 1e-6;
    if(typeof near.length === 'undefined'){
        //scalar
        var judge = (Math.abs(near) < TOL ? 1 : 0);
    } else {
        //vector
        var judge = (matrix_norms(near,'2') < TOL ? 1 : 0);
    }
    return judge;
}

/*
function judge = NearZero(near)
% *** BASIC HELPER FUNCTIONS ***
% Takes a scalar.
% Checks if the scalar is small enough to be neglected.
% Example Input:
%  
% clear; clc;
% near = -1e-7;
% judge = NearZero(near)
% 
% Output:
% judge =
%     1

judge = norm(near) < 1e-6;
end
*/