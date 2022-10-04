/*
var M = [
        [-1, 0,  0, 0],
        [ 0, 1,  0, 6],
        [ 0, 0, -1, 2],
        [ 0, 0,  0, 1]
    ];
var Blist = [
        [      0,         0,         0],
        [      0,         0,         0],
        [-1.0000,         0,    1.0000],
        [ 2.0000,         0,         0],
        [      0,    1.0000,         0],
        [      0,         0,    0.1000]
    ];
var pi = Math.PI;
var thetalist = [[pi / 2],[3],[pi]];
var T = FKinBody(M, Blist, thetalist);
print_matrix(T);
*/

function FKinBody(M, Blist, thetalist){
    var T = M;
    for(var i=0;i<thetalist.length;i=i+1){
        T = matrix_multiplication(
                T,
                MatrixExp6(VecTose3(matrix_multiplication_scalar(extract_column(Blist,i),thetalist[i])))
            );
    }
    return T;
}

/*
function T = FKinBody(M, Blist, thetalist)
% *** CHAPTER 4: FORWARD KINEMATICS ***
% Takes M: the home configuration (position and orientation) of the
%          end-effector,
%       Blist: The joint screw axes in the end-effector frame when the 
%              manipulator is at the home position,
%       thetalist: A list of joint coordinates.
% Returns T in SE(3) representing the end-effector frame when the joints 
% are at the specified coordinates (i.t.o Body Frame).
% Example Inputs:
% 
% clear; clc;
% M = [[-1, 0, 0, 0]; [0, 1, 0, 6]; [0, 0, -1, 2]; [0, 0, 0, 1]];
% Blist = [[0; 0; -1; 2; 0; 0], [0; 0; 0; 0; 1; 0], [0; 0; 1; 0; 0; 0.1]];
% thetalist = [pi / 2; 3; pi];
% T = FKinBody(M, Blist, thetalist)
% 
% Output:
% T =
%   -0.0000    1.0000         0   -5.0000
%    1.0000    0.0000         0    4.0000
%         0         0   -1.0000    1.6858
%         0         0         0    1.0000

T = M;
for i = 1: size(thetalist)
    T = T * MatrixExp6(VecTose3(Blist(:, i) * thetalist(i)));
end
end
*/