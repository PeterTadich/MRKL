/*
var T = [[1, 0, 0, 0], [0, 0, -1, 0], [0, 1, 0, 3], [0, 0, 0, 1]];
[R, p] = TransToRp(T);
console.log(R);
console.log(p);

var T = [[1, 0, 0, 4], [0, 1, 0, 5], [0, 0, 1, 6], [0, 0, 0, 1]];
[S, q] = TransToRp(T);
console.log(R); //check to see if 'R' has changed (should not have changed)
console.log(p);
*/

function TransToRp(T){
    var R = [
            [T[0][0],T[0][1],T[0][2]],
            [T[1][0],T[1][1],T[1][2]],
            [T[2][0],T[2][1],T[2][2]]
        ];
    var p = [T[0][3],T[1][3],T[2][3]]; //row vector
    return [R,p];
}

/*
function [R, p] = TransToRp(T)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes the transformation matrix T in SE(3) 
% Returns R: the corresponding rotation matrix
%         p: the corresponding position vector .
% Example Input:
% 
% clear; clc;
% T = [[1, 0, 0, 0]; [0, 0, -1, 0]; [0, 1, 0, 3]; [0, 0, 0, 1]];
% [R, p] = TransToRp(T)
% 
% Output:
% R =
%     1     0     0
%     0     0    -1
%     0     1     0
% p =
%     0
%     0
%     3

R = T(1: 3, 1: 3);
p = T(1: 3, 4);
end
*/