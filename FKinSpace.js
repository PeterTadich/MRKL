/*
var M = [[-1, 0, 0, 0], [0, 1, 0, 6], [0, 0, -1, 2], [0, 0, 0, 1]];
var Slist = [
    [0.0000,0.0000,0.0000],
    [0.0000,0.0000,0.0000],
    [1.0000,0.0000,-1.0000],
    [4.0000,0.0000,-6.0000],
    [0.0000,1.0000,0.0000],
    [0.0000,0.0000,-0.1000]
];
var pi = 3.14159265358979;
var thetalist =[pi/2.0,3,pi];
var T = FKinSpace(M, Slist, thetalist);
print_matrix(T);
*/

function FKinSpace(M, Slist, thetalist){
    var T = M;
    for(var i=(thetalist.length - 1);i>=0;i=i-1){
        T = matrix_multiplication(
                MatrixExp6(
                        VecTose3(
                            matrix_multiplication_scalar(
                                extract_column(Slist,i),
                                thetalist[i]
                            )
                        )
                    ),
                T
            );
    }
    return T;
}

/*
function T = FKinSpace(M, Slist, thetalist)
% *** CHAPTER 4: FORWARD KINEMATICS ***
% Takes M: the home configuration (position and orientation) of the 
%          end-effector,
%       Slist: The joint screw axes in the space frame when the manipulator
%              is at the home position,
%       thetalist: A list of joint coordinates.
% Returns T in SE(3) representing the end-effector frame, when the joints 
% are at the specified coordinates (i.t.o Space Frame).
% Example Inputs:
% 
% clear; clc;
% M = [[-1, 0, 0, 0]; [0, 1, 0, 6]; [0, 0, -1, 2]; [0, 0, 0, 1]];
% Slist = [[0; 0;  1;  4; 0;    0], ...
%        [0; 0;  0;  0; 1;    0], ...
%        [0; 0; -1; -6; 0; -0.1]];
% thetalist =[pi / 2; 3; pi];
% T = FKinSpace(M, Slist, thetalist)
% 
% Output:
% T =
%   -0.0000    1.0000         0   -5.0000
%    1.0000    0.0000         0    4.0000
%         0         0   -1.0000    1.6858
%         0         0         0    1.0000

T = M;
for i = size(thetalist): -1: 1
    T = MatrixExp6(VecTose3(Slist(:, i) * thetalist(i))) * T;
end
end
*/