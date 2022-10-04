//need more test cases (see Fig 3.13 page 75)

/*
var R = [[0, 0, 1], [1, 0, 0], [0, 1, 0]];
var so3mat = MatrixLog3(R);
console.log(so3mat);
*/

//page 72
function MatrixLog3(R){
    var acosinput = (trace(R) - 1.0) / 2.0;
    
    if(acosinput >= 1){
        var so3mat = zeros_matrix(3,3);
    } else if(acosinput <= -1.0){
        if(!NearZero(1.0 + R[2][2])){
            var omg = matrix_multiplication_scalar(
                        [[R[0][2]],[R[1][2]],[(1.0 + R[2][2])]],
                        (1.0 / Math.sqrt(2.0 * (1.0 + R[2][2])))
                    );
        } else if(!NearZero(1 + R[1][1])){
            var omg = matrix_multiplication_scalar(
                        [[R[0][1]],[(1.0 + R[1][1])],[R[2][1]]],
                        (1.0 / Math.sqrt(2 * (1.0 + R[1][1])))
                    );
        } else {
            var omg = matrix_multiplication_scalar(
                        [[(1.0 + R[0][0])],[R[1][0]],[R[2][0]]],
                        (1.0 / Math.sqrt(2 * (1.0 + R[0][0])))
                    );
        }
        var so3mat = matrix_multiplication_scalar(VecToso3(omg),Math.PI);
    } else {
        var theta = Math.acos(acosinput);
        var so3mat = matrix_multiplication_scalar(
                    matrix_arithmetic(
                        R,
                        matrix_transpose(R),
                        '-'
                    ),
                    theta * (1.0 / (2.0 * Math.sin(theta)))
                );
    }
    
    return so3mat;
}

/*
function so3mat = MatrixLog3(R)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes R (rotation matrix).
% Returns the corresponding so(3) representation of exponential 
% coordinates.
% Example Input:
% 
% clear; clc;
% R = [[0, 0, 1]; [1, 0, 0]; [0, 1, 0]];
% so3mat = MatrixLog3(R)
% 
% Output:
% angvmat =
%         0   -1.2092    1.2092
%    1.2092         0   -1.2092
%   -1.2092    1.2092         0

acosinput = (trace(R) - 1) / 2;
if acosinput >= 1
    so3mat = zeros(3);
elseif acosinput <= -1
    if ~NearZero(1 + R(3, 3))
        omg = (1 / sqrt(2 * (1 + R(3, 3)))) ...
              * [R(1, 3); R(2, 3); 1 + R(3, 3)];
    elseif ~NearZero(1 + R(2, 2))
        omg = (1 / sqrt(2 * (1 + R(2, 2)))) ...
              * [R(1, 2); 1 + R(2, 2); R(3, 2)];
    else
        omg = (1 / sqrt(2 * (1 + R(1, 1)))) ...
              * [1 + R(1, 1); R(2, 1); R(3, 1)];
    end
    so3mat = VecToso3(pi * omg);
else
	theta = acos(acosinput);
    so3mat = theta * (1 / (2 * sin(theta))) * (R - R');
end
end
*/