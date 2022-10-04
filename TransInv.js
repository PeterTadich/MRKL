/*
var T = [[1, 0, 0, 0],[0, 0, -1, 0],[0, 1, 0, 3],[0, 0, 0, 1]];
var invT = TransInv(T);
console.log(invT);
*/

function TransInv(T){
    var R; var p;
    [R, p] = TransToRp(T);
    var RT = matrix_transpose(R);
    var negRT = matrix_multiplication_scalar(RT,-1.0);
    var negRTp = matrix_multiplication(negRT,[[p[0]],[p[1]],[p[2]]]);
    var invT = [
                [RT[0][0],RT[0][1],RT[0][2], negRTp[0][0]],
                [RT[1][0],RT[1][1],RT[1][2], negRTp[1][0]],
                [RT[2][0],RT[2][1],RT[2][2], negRTp[2][0]],
                [     0.0,     0.0,     0.0,          1.0]
            ];
    return invT;
}

/*
function invT = TransInv(T)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a transformation matrix T.
% Returns its inverse. 
% Uses the structure of transformation matrices to avoid taking a matrix
% inverse, for efficiency.
% Example Input:
% 
% clear; clc;
% T = [[1, 0, 0, 0]; [0, 0, -1, 0]; [0, 1, 0, 3]; [0, 0, 0, 1]];
% invT = TransInv(T)
% 
% Ouput:
% invT =
%     1     0     0     0
%     0     0     1    -3
%     0    -1     0     0
%     0     0     0     1

[R, p] = TransToRp(T);
invT = [transpose(R), -transpose(R) * p; 0, 0, 0, 1];
end
*/