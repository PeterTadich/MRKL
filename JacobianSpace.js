/*
var Slist = [
    [     0,    1.0000,         0,    1.0000],
    [     0,         0,    1.0000,         0],
    [1.0000,         0,         0,         0],
    [     0,    2.0000,         0,    0.2000],
    [0.2000,         0,    2.0000,    0.3000],
    [0.2000,    3.0000,    1.0000,    0.4000]
];
var thetalist = [[0.2],[1.1],[0.1],[1.2]];
var Js = JacobianSpace(Slist, thetalist);
print_matrix(Js);
*/

function JacobianSpace(Slist, thetalist){
    var Js = [];
    Js[0] = matrix_transpose(extract_column(Slist,0))[0];
    var T = identity_matrix(4);
    for(var i=(2-1);i<thetalist.length;i=i+1){
        T = matrix_multiplication(T,MatrixExp6(VecTose3(matrix_multiplication_scalar(extract_column(Slist,(i-1)),thetalist[i-1]))));
        Js[i] = matrix_transpose(matrix_multiplication(Adjoint(T),extract_column(Slist,i)))[0];
    }
    Js = matrix_transpose(Js);
    return Js;
}

/*
function Js = JacobianSpace(Slist, thetalist)
% *** CHAPTER 5: VELOCITY KINEMATICS AND STATICS ***
% Takes Slist: The joint screw axes in the space frame when the manipulator
%              is at the home position, in the format of a matrix with the
%              screw axes as the columns,
%       thetalist: A list of joint coordinates. 
% Returns the corresponding space Jacobian (6xn real numbers).
% Example Input:
% 
% clear; clc;
% Slist = [[0; 0; 1;   0; 0.2; 0.2], ...
%        [1; 0; 0;   2;   0;   3], ...
%        [0; 1; 0;   0;   2;   1], ...
%        [1; 0; 0; 0.2; 0.3; 0.4]];
% thetalist = [0.2; 1.1; 0.1; 1.2];
% Js = JacobianSpace(Slist, thetalist)
% 
% Output:
% Js =
%         0    0.9801   -0.0901    0.9575
%         0    0.1987    0.4446    0.2849
%    1.0000         0    0.8912   -0.0453
%         0    1.9522   -2.2164   -0.5116
%    0.2000    0.4365   -2.4371    2.7754
%    0.2000    2.9603    3.2357    2.2251

Js = Slist;
T = eye(4);
for i = 2: length(thetalist)
    T = T * MatrixExp6(VecTose3(Slist(:, i - 1) * thetalist(i - 1)));
	Js(:, i) = Adjoint(T) * Slist(:, i);
end
end
*/