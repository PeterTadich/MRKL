/*
var Xstart = [[1, 0, 0, 1], [0, 1, 0, 0], [0, 0, 1, 1], [0, 0, 0, 1]];
var Xend = [[0, 0, 1, 0.1], [1, 0, 0, 0], [0, 1, 0, 4.1], [0, 0, 0, 1]];
var Tf = 5;
var N = 4;
var method = 5;
var traj = CartesianTrajectory(Xstart, Xend, Tf, N, method);
console.log(traj);
*/

function CartesianTrajectory(Xstart, Xend, Tf, N, method){
    var Rstart; var pstart; var Rend; var pend;
    var timegap = Tf / (N - 1);
    var traj = []; //will be a multi-dimensional array (N x m x n)
    [Rstart, pstart] = TransToRp(Xstart);
    [Rend, pend] = TransToRp(Xend);
    for(var i=0;i<N;i=i+1){
        if(method === 3){
            var s = CubicTimeScaling(Tf,timegap * i);
        } else {
            var s = QuinticTimeScaling(Tf,timegap * i);
        }
        //rotation
        var A = matrix_multiplication(
                    Rstart,
                    MatrixExp3(
                        matrix_multiplication_scalar(
                            MatrixLog3(
                                matrix_multiplication(
                                    matrix_transpose(Rstart),
                                    Rend
                                )
                            ),
                            s
                        )
                    )
                );
        //translation
        var B = matrix_arithmetic(
                    vector_transpose(pstart),
                    matrix_multiplication_scalar(
                        matrix_arithmetic(
                            vector_transpose(pend),
                            vector_transpose(pstart),
                            '-'
                        ),
                        s
                    ),
                    '+'
                 );
        
        traj.push(
            [
                [A[0][0],A[0][1],A[0][2],B[0][0]],
                [A[1][0],A[1][1],A[1][2],B[1][0]],
                [A[2][0],A[2][1],A[2][2],B[2][0]],
                [    0.0,    0.0,    0.0,    1.0],
            ]
        );
    }
    return traj;
}

/*
function traj = CartesianTrajectory(Xstart, Xend, Tf, N, method)
% *** CHAPTER 9: TRAJECTORY GENERATION ***
% Takes Xstart: The initial end-effector configuration,
%       Xend: The final end-effector configuration,
%       Tf: Total time of the motion in seconds from rest to rest,
%       N: The number of points N > 1 (Start and stop) in the discrete 
%          representation of the trajectory,
%       method: The time-scaling method, where 3 indicates cubic 
%               (third-order polynomial) time scaling and 5 indicates 
%               quintic (fifth-order polynomial) time scaling.
% Returns traj: The discretized trajectory as a list of N matrices in SE(3)
%               separated in time by Tf/(N-1). The first in the list is 
%               Xstart and the Nth is Xend .
% This function is similar to ScrewTrajectory, except the origin of the 
% end-effector frame follows a straight line, decoupled from the rotational
% motion.
% Example Input:
% 
% clear; clc;
% Xstart = [[1, 0, 0, 1]; [0, 1, 0, 0]; [0, 0, 1, 1]; [0, 0, 0, 1]];
% Xend = [[0, 0, 1, 0.1]; [1, 0, 0, 0]; [0, 1, 0, 4.1]; [0, 0, 0, 1]];
% Tf = 5;
% N = 4;
% method = 5;
% traj = CartesianTrajectory(Xstart, Xend, Tf, N, method)
% 
% Output:
% traj =
%    1.0000         0         0    1.0000
%         0    1.0000         0         0
%         0         0    1.0000    1.0000
%         0         0         0    1.0000
%
%    0.9366   -0.2140    0.2774    0.8111
%    0.2774    0.9366   -0.2140         0
%   -0.2140    0.2774    0.9366    1.6506
%         0         0         0    1.0000
%
%    0.2774   -0.2140    0.9366    0.2889
%    0.9366    0.2774   -0.2140         0
%   -0.2140    0.9366    0.2774    3.4494
%         0         0         0    1.0000
%
%   -0.0000    0.0000    1.0000    0.1000
%    1.0000   -0.0000    0.0000         0
%    0.0000    1.0000   -0.0000    4.1000
%         0         0         0    1.0000

timegap = Tf / (N - 1);
traj = cell(1, N);
[Rstart, pstart] = TransToRp(Xstart);
[Rend, pend] = TransToRp(Xend);
for i = 1: N
    if method == 3
        s = CubicTimeScaling(Tf,timegap * (i - 1));
    else
        s = QuinticTimeScaling(Tf,timegap * (i - 1));
    end
    traj{i} ...
    = [Rstart * MatrixExp3(MatrixLog3(Rstart' * Rend) * s), ...
       pstart + s * (pend - pstart); 0, 0, 0, 1];
end
end
*/