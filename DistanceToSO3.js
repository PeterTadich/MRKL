/*
var mat = [
        [1.0, 0.0,   0.0],
        [0.0, 0.1, -0.95],
        [0.0, 1.0,   0.1]
    ];
var d = DistanceToSO3(mat);
console.log(d);
*/

function DistanceToSO3(mat){
    if(det(mat) > 0.0){
        var R = matrix_arithmetic(matrix_multiplication(matrix_transpose(mat),mat),identity_matrix(3),'-');
        var d = matrix_norms(R,'fro');
    } else {
        var d = 1e+9;
    }
    return d;
}

/*
function d = DistanceToSO3(mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes mat: A 3x3 matrix.
% Returns the Frobenius norm to describe the distance of mat from the SO(3) 
% manifold.
% Computes the distance from R to the SO(3) manifold using the following 
% method:
% If det(mat) <= 0, return a large number. 
% If det(mat) > 0, return norm(mat' * mat - I).
% Example Inputs:
% 
% clear; clc;
% mat = [1.0, 0.0,   0.0;
%        0.0, 0.1, -0.95;
%        0.0, 1.0,   0.1];
% d = DistanceToSO3(mat)
% 
% Output:
% d =
%     0.0884

if det(mat) > 0
	d = norm(mat' * mat - eye(3), 'fro');
else
    d = 1e+9;
end
end
*/