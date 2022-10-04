/*
var Blist = [
    [0.0000,1.0000,0.0000,1.0000],
    [0.0000,0.0000,1.0000,0.0000],
    [1.0000,0.0000,0.0000,0.0000],
    [0.0000,2.0000,0.0000,0.2000],
    [0.2000,0.0000,2.0000,0.3000],
    [0.2000,3.0000,1.0000,0.4000]
]
var thetalist = [[0.2],[1.1],[0.1],[1.2]];
var Jb = JacobianBody(Blist, thetalist);
print_matrix(Jb);
*/

function JacobianBody(Blist, thetalist){
    var n = thetalist.length;
    var Jb = [];
    Jb[n-1] = matrix_transpose(extract_column(Blist,n-1))[0];
    var T = identity_matrix(4);
    for(var i=(thetalist.length-1-1);i>=0;i=i-1){
        T = matrix_multiplication(
                    T,
                    MatrixExp6(
                        VecTose3(
                            matrix_multiplication_scalar(extract_column(Blist,i+1),-1.0*thetalist[i+1][0])
                        )
                    )
                );
        Jb[i] = matrix_transpose(matrix_multiplication(Adjoint(T),extract_column(Blist,i)))[0];
    }
    Jb = matrix_transpose(Jb);
    return Jb;
}

/*
function Jb = JacobianBody(Blist, thetalist)
% *** CHAPTER 5: VELOCITY KINEMATICS AND STATICS ***
% Takes Blist: The joint screw axes in the end-effector frame when the
%              manipulator is at the home position, in the format of a 
%              matrix with the screw axes as the columns,
%       thetalist: A list of joint coordinates.
% Returns the corresponding body Jacobian (6xn real numbers).
% Example Input:
% 
% clear; clc;
% Blist = [[0; 0; 1;   0; 0.2; 0.2], ...
%        [1; 0; 0;   2;   0;   3], ...
%        [0; 1; 0;   0;   2;   1], ...
%        [1; 0; 0; 0.2; 0.3; 0.4]];
% thetalist = [0.2; 1.1; 0.1; 1.2];
% Jb = JacobianBody(Blist, thetalist)
% 
% Output:
% Jb =
%   -0.0453    0.9950         0    1.0000
%    0.7436    0.0930    0.3624         0
%   -0.6671    0.0362   -0.9320         0
%    2.3259    1.6681    0.5641    0.2000
%   -1.4432    2.9456    1.4331    0.3000
%   -2.0664    1.8288   -1.5887    0.4000

Jb = Blist;
T = eye(4);
for i = length(thetalist) - 1: -1: 1
    T = T * MatrixExp6(VecTose3(-1 * Blist(:, i + 1) * thetalist(i + 1)));
	Jb(:, i) = Adjoint(T) * Blist(:, i);
end
end
*/