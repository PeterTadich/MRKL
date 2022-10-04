/*
so3mat = [[0, -3, 2],[3, 0, -1],[-2, 1, 0]];
var omg = so3ToVec(so3mat);
console.log(omg);
*/

function so3ToVec(so3mat){
    var omg = [[so3mat[2][1]],[so3mat[0][2]],[so3mat[1][0]]];
    return omg;
}

/*
function omg = so3ToVec(so3mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a 3x3 skew-symmetric matrix (an element of so(3)).
% Returns the corresponding 3-vector (angular velocity).
% Example Input: 
% 
% clear; clc;
% so3mat = [[0, -3, 2]; [3, 0, -1]; [-2, 1, 0]];
% omg = so3ToVec(so3mat)  
% 
% Output:
% omg =
%     1
%     2
%     3

omg = [so3mat(3, 2); so3mat(1, 3); so3mat(2, 1)];
end
*/