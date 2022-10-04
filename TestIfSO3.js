/*
var mat = [
            [1.0,0.0,  0.0],
            [0.0,0.1,-0.95],
            [0.0,1.0,  0.1]
       ];
var judge = TestIfSO3(mat);
console.log(judge);
*/

function TestIfSO3(mat){
    var judge = (DistanceToSO3(mat) < 1e-3) ? 1 : 0; //why take the norm of a scalar (see below)?
    return judge;
}

/*
function judge = TestIfSO3(mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes mat: A 3x3 matrix.
% Check if mat is close to or on the manifold SO(3).
% Example Inputs:
% 
% clear; clc;
% mat = [1.0, 0.0,   0.0;
%        0.0, 0.1, -0.95;
%        0.0, 1.0,   0.1];
% judge = TestIfSO3(mat)
% 
% Output:
% dudge =
%     0

judge = norm(DistanceToSO3(mat)) < 1e-3;
end
*/