/*
var se3mat = [
        [0,      0,       0,      0],
        [0,      0, -1.5708, 2.3562],
        [0, 1.5708,       0, 2.3562],
        [0,      0,       0,      0]
    ];
var T = MatrixExp6(se3mat);
console.log(T);

var se3mat = [
        [0,      0,       0,      0],
        [0,      0,       0,      0],
        [0,      0,       0,      0],
        [0,      0,       0,      0]
    ];
var T = MatrixExp6(se3mat);
console.log(T);
*/

function MatrixExp6(se3mat){
    var omgtheta = so3ToVec(
            [
                [se3mat[0][0],se3mat[0][1],se3mat[0][2]],
                [se3mat[1][0],se3mat[1][1],se3mat[1][2]],
                [se3mat[2][0],se3mat[2][1],se3mat[2][2]]
            ]
        );
    if(NearZero(matrix_norms(omgtheta,'2'))){
        var T = [
            [1.0,0.0,0.0,se3mat[0][3]],
            [0.0,1.0,0.0,se3mat[1][3]],
            [0.0,0.0,1.0,se3mat[2][3]],
            [0.0,0.0,0.0,         1.0]
        ];
    } else {
        var omghat; var theta;
        [omghat, theta] = AxisAng3(omgtheta);
        var omgmat = matrix_multiplication_scalar(
                [
                    [se3mat[0][0],se3mat[0][1],se3mat[0][2]],
                    [se3mat[1][0],se3mat[1][1],se3mat[1][2]],
                    [se3mat[2][0],se3mat[2][1],se3mat[2][2]]
                ],
                1.0 / theta
                );
        var R = MatrixExp3(
                    [
                        [se3mat[0][0],se3mat[0][1],se3mat[0][2]],
                        [se3mat[1][0],se3mat[1][1],se3mat[1][2]],
                        [se3mat[2][0],se3mat[2][1],se3mat[2][2]]
                    ]
                );
        var p = matrix_multiplication(
                    matrix_arithmetic(
                        matrix_arithmetic(
                            matrix_multiplication_scalar(identity_matrix(3),theta),
                            matrix_multiplication_scalar(omgmat,(1 - Math.cos(theta))),
                            '+'
                        ),
                        matrix_multiplication_scalar(matrix_multiplication(omgmat,omgmat),(theta - Math.sin(theta))),
                        '+'
                    ),
                    matrix_multiplication_scalar([[se3mat[0][3]],[se3mat[1][3]],[se3mat[2][3]]],1.0/theta)
                );
        T = [
                [R[0][0],R[0][1],R[0][2],p[0][0]],
                [R[1][0],R[1][1],R[1][2],p[1][0]],
                [R[2][0],R[2][1],R[2][2],p[2][0]],
                [    0.0,    0.0,    0.0,    1.0]
            ];
    }
    return T;
}

/*
function T = MatrixExp6(se3mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a se(3) representation of exponential coordinates.
% Returns a T matrix in SE(3) that is achieved by traveling along/about the 
% screw axis S for a distance theta from an initial configuration T = I.
% Example Input:
% 
% clear; clc;
% se3mat = [ 0,      0,       0,      0;
%          0,      0, -1.5708, 2.3562;
%          0, 1.5708,       0, 2.3562;
%          0,      0,       0,      0]
% T = MatrixExp6(se3mat)
% 
% Output:
% T =
%    1.0000         0         0         0
%         0    0.0000   -1.0000   -0.0000
%         0    1.0000    0.0000    3.0000
%         0         0         0    1.0000 

omgtheta = so3ToVec(se3mat(1: 3, 1: 3));
if NearZero(norm(omgtheta))
    T = [eye(3), se3mat(1: 3, 4); 0, 0, 0, 1];
else
    [omghat, theta] = AxisAng3(omgtheta);
    omgmat = se3mat(1: 3, 1: 3) / theta; 
    T = [MatrixExp3(se3mat(1: 3, 1: 3)), ...
         (eye(3) * theta + (1 - cos(theta)) * omgmat ...
          + (theta - sin(theta)) * omgmat * omgmat) ...
            * se3mat(1: 3, 4) / theta;
         0, 0, 0, 1];
end
end
*/