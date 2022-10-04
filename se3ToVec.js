/*
var se3mat = [
        [ 0, -3,  2, 4],
        [ 3,  0, -1, 5],
        [-2,  1,  0, 6],
        [ 0,  0,  0, 0]
];
var V = se3ToVec(se3mat);
console.log(V);
*/

function se3ToVec(se3mat){
    var V = [ //twist
            [se3mat[2][1]], //w
            [se3mat[0][2]],
            [se3mat[1][0]],
            [se3mat[0][3]], //v
            [se3mat[1][3]],
            [se3mat[2][3]]
        ];
    return V;
}

/*
function V = se3ToVec(se3mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes se3mat a 4x4 se(3) matrix
% Returns the corresponding 6-vector (representing spatial velocity).
% Example Input:
% 
% clear; clc;
% se3mat = [[0, -3, 2, 4]; [3, 0, -1, 5]; [-2, 1, 0, 6]; [0, 0, 0, 0]];
% V = se3ToVec(se3mat)
% 
% Output:
% V =
%     1
%     2
%     3
%     4
%     5
%     6

V = [se3mat(3, 2); se3mat(1, 3); se3mat(2, 1); se3mat(1: 3, 4)];
end
*/