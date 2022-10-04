/*
var Slist = [
    [     0,         0,         0],
    [     0,         0,         0],
    [1.0000,         0,   -1.0000],
    [4.0000,         0,   -6.0000],
    [     0,    1.0000,         0],
    [     0,         0,   -0.1000]
];
var M = [[-1, 0, 0, 0],[0, 1, 0, 6],[0, 0, -1, 2],[0, 0, 0, 1]];
var T = [[0, 1, 0, -5],[1, 0, 0, 4],[0, 0, -1, 1.6858],[0, 0, 0, 1]];
var thetalist0 = [[1.5],[2.5],[3]];
var eomg = 0.01;
var ev = 0.001;
[thetalist, success] = IKinSpace(Slist, M, T, thetalist0, eomg, ev);
console.log(thetalist);
console.log(success);
*/

function IKinSpace(Slist, M, T, thetalist0, eomg, ev){
    var thetalist = thetalist0;
    var i = 0;
    var maxiterations = 20;
    var Tsb = FKinSpace(M, Slist, thetalist);
    var Vs = matrix_multiplication(Adjoint(Tsb),se3ToVec(MatrixLog6(matrix_multiplication(TransInv(Tsb),T))));
    var err = matrix_norms([[Vs[0][0]],[Vs[1][0]],[Vs[2][0]]],"2") > eomg || matrix_norms([[Vs[3][0]],[Vs[4][0]],[Vs[5][0]]],"2") > ev;
    while(err && i < maxiterations){
        thetalist = matrix_arithmetic(thetalist,matrix_multiplication(matrix_transpose(pinv(JacobianSpace(Slist, thetalist))),Vs),"+");
        i = i + 1;
        Tsb = FKinSpace(M, Slist, thetalist);
        Vs = matrix_multiplication(Adjoint(Tsb),se3ToVec(MatrixLog6(matrix_multiplication(TransInv(Tsb),T))));
        err = matrix_norms([[Vs[0][0]],[Vs[1][0]],[Vs[2][0]]],"2") > eomg || matrix_norms([[Vs[3][0]],[Vs[4][0]],[Vs[5][0]]],"2") > ev;
    }
    var success = !err;
    
    return[thetalist, success];
}

/*
function [thetalist, success] ...
         = IKinSpace(Slist, M, T, thetalist0, eomg, ev)
% *** CHAPTER 6: INVERSE KINEMATICS ***
% Takes Slist: The joint screw axes in the space frame when the manipulator
%              is at the home position, in the format of a matrix with the
%              screw axes as the columns,
%       M: The home configuration of the end-effector,
%       T: The desired end-effector configuration Tsd,
%       thetalist0: An initial guess of joint angles that are close to 
%                   satisfying Tsd,
%       eomg: A small positive tolerance on the end-effector orientation 
%             error. The returned joint angles must give an end-effector 
%             orientation error less than eomg,
%       ev: A small positive tolerance on the end-effector linear position 
%           error. The returned joint angles must give an end-effector 
%           position error less than ev.
% Returns thetalist: Joint angles that achieve T within the specified 
%                    tolerances,
%         success: A logical value where TRUE means that the function found
%                  a solution and FALSE means that it ran through the set 
%                  number of maximum iterations without finding a solution
%                  within the tolerances eomg and ev.
% Uses an iterative Newton-Raphson root-finding method.
% The maximum number of iterations before the algorithm is terminated has 
% been hardcoded in as a variable called maxiterations. It is set to 20 at 
% the start of the function, but can be changed if needed.  
% Example Inputs:
% 
% clear; clc;
% Slist = [[0; 0;  1;  4; 0;    0], ...
%        [0; 0;  0;  0; 1;    0], ...
%        [0; 0; -1; -6; 0; -0.1]];
% M = [[-1, 0, 0, 0]; [0, 1, 0, 6]; [0, 0, -1, 2]; [0, 0, 0, 1]];
% T = [[0, 1, 0, -5]; [1, 0, 0, 4]; [0, 0, -1, 1.6858]; [0, 0, 0, 1]];
% thetalist0 = [1.5; 2.5; 3];
% eomg = 0.01;
% ev = 0.001;
% [thetalist, success] = IKinSpace(Slist, M, T, thetalist0, eomg, ev)
% 
% Output:
% thetalist =
%    1.5707
%    2.9997
%    3.1415
% success =
%     1

thetalist = thetalist0;
i = 0;
maxiterations = 20;
Tsb = FKinSpace(M, Slist, thetalist);
Vs = Adjoint(Tsb) * se3ToVec(MatrixLog6(TransInv(Tsb) * T));
err = norm(Vs(1: 3)) > eomg || norm(Vs(4: 6)) > ev;
while err && i < maxiterations
    thetalist = thetalist + pinv(JacobianSpace(Slist, thetalist)) * Vs;
    i = i + 1;
    Tsb = FKinSpace(M, Slist, thetalist);
    Vs = Adjoint(Tsb) * se3ToVec(MatrixLog6(TransInv(Tsb) * T));
    err = norm(Vs(1: 3)) > eomg || norm(Vs(4: 6)) > ev;
end
success = ~ err;
end
*/