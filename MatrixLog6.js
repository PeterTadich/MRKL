/*
var T = [[1, 0, 0, 0], [0, 0, -1, 0], [0, 1, 0, 3], [0, 0, 0, 1]];
var expmat = MatrixLog6(T);
console.log(expmat);
*/

function MatrixLog6(T){
    var R; var p;
    [R, p] = TransToRp(T); //p is a row vector
    var omgmat = MatrixLog3(R);
    if(isequal(omgmat,zeros_matrix(3,3))){
        var expmat = [
            [0.0,0.0,0.0,T[0][0]],
            [0.0,0.0,0.0,T[1][0]],
            [0.0,0.0,0.0,T[2][0]],
            [0.0,0.0,0.0,    0.0]
        ];
    } else {
        var theta = Math.acos((trace(R) - 1.0) / 2.0);
        var pp = matrix_multiplication(
                        matrix_arithmetic(
                            matrix_arithmetic(identity_matrix(3),matrix_multiplication_scalar(omgmat,(1.0/2.0)),"-"),
                            matrix_multiplication_scalar(matrix_multiplication(omgmat,matrix_multiplication_scalar(omgmat,(1.0/theta))),(1.0/theta - cot(theta/2.0)/2.0)),
                            "+"
                         ),
                        [[p[0]],[p[1]],[p[2]]]
                    );
        var expmat = [
                    [omgmat[0][0],omgmat[0][1],omgmat[0][2],pp[0][0]],
                    [omgmat[1][0],omgmat[1][1],omgmat[1][2],pp[1][0]],
                    [omgmat[2][0],omgmat[2][1],omgmat[2][2],pp[2][0]],
                    [           0,           0,            0,      0]
                ];
    }
    return expmat;
}

/*
function expmat = MatrixLog6(T)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a transformation matrix T in SE(3).
% Returns the corresponding se(3) representation of exponential 
% coordinates.
% Example Input:
% 
% clear; clc;
% T = [[1, 0, 0, 0]; [0, 0, -1, 0]; [0, 1, 0, 3]; [0, 0, 0, 1]];
% expmat = MatrixLog6(T)
% 
% Output:
% expc6 =
%         0         0         0         0
%         0         0   -1.5708    2.3562
%         0    1.5708         0    2.3562
%         0         0         0         0

[R, p] = TransToRp(T);
omgmat = MatrixLog3(R);
if isequal(omgmat, zeros(3))
    expmat = [zeros(3), T(1: 3, 4); 0, 0, 0, 0];
else
    theta = acos((trace(R) - 1) / 2);
    expmat = [omgmat, (eye(3) - omgmat / 2 ...
                      + (1 / theta - cot(theta / 2) / 2) ...
                        * omgmat * omgmat / theta) * p;
              0, 0, 0, 0];    
end
end
*/