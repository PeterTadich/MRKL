/*
var omg = [[1],[2],[3]];
var so3mat = VecToso3(omg);
console.log(so3mat);
*/

function VecToso3(omg){
    var so3mat = [
        [          0, -omg[2][0],  omg[1][0]],
        [  omg[2][0],          0, -omg[0][0]],
        [ -omg[1][0],  omg[0][0],          0]
    ];
    return so3mat;
}

/*
function so3mat = VecToso3(omg)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a 3-vector (angular velocity).
% Returns the skew symmetric matrix in so(3).
% Example Input:
% 
% clear; clc;
% omg = [1; 2; 3];
% so3mat = VecToso3(omg)
% 
% Output:
% so3mat =
%     0    -3     2
%     3     0    -1
%    -2     1     0

so3mat = [0, -omg(3), omg(2); omg(3), 0, -omg(1); -omg(2), omg(1), 0];
end
*/