/*
var mat = [
        [ 0.675, 0.150,  0.720],
        [ 0.370, 0.771, -0.511],
        [-0.630, 0.619,  0.472]
    ];
var R = ProjectToSO3(mat);
console.log(R);
*/

function ProjectToSO3(mat){
    var m; var n;
    [m,n] = size(mat);
    //For each row of mat[] add an extra dummy element '0.0' or 'undefined'
    //to the beginning of the array (beginning of the row).
    for(var i=0;i<m;i=i+1){
        mat[i].unshift(0.0);
    }
    var offsetRow = []; //Create an array of zeroes (row vector).
    for(var i=0;i<(n+1);i=i+1){
        offsetRow.push(0.0);
    }
    //insert dummy row of zeros to the beginning of the matrix
    mat.unshift(offsetRow);
    
    var a = mat; //where row index = 0 (for all col's) is 0 or 'undefined' and column index 0 is 0 or 'undefined'
    var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
    var v = zeros_matrix((n+1),(n+1)); //matrix
    [a,w,v] = svdcmp(a, m, n, w, v);
    var U = svdClean(a);
    w = svdClean(w);
    var S = [];
    for(var i=0;i<m;i=i+1){
        S[i] = [];
        for(var j=0;j<n;j=j+1){
            if(i == j){
                S[i][j] = w[i];
            } else {
                S[i][j] = 0.0;
            }
        }
    }
    var V = svdClean(v);
    //console.log(U);
    //console.log(S);
    //console.log(V);
    
    var R = matrix_multiplication(U,matrix_transpose(V));
    
    //if det(R) < 0
    //    // In this case the result may be far from mat.
    //    R = [R(:, 1: 2); -R(:, 3)];
    //end
    return R;
}

/*
function R = ProjectToSO3(mat)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes mat: A matrix near SO(3) to project to SO(3).
% Returns R representing the closest rotation matrix that is in SO(3).
% This function uses singular-value decomposition (see
% http://hades.mech.northwestern.edu/index.php/Modern_Robotics_Linear_Algebra_Review)
% and is only appropriate for matrices close to SO(3).
% Example Inputs:
% 
% clear; clc;
% mat = [ 0.675, 0.150,  0.720;
%         0.370, 0.771, -0.511;
%        -0.630, 0.619,  0.472];
% R = ProjectToSO3(mat)
% 
% Output:
% R =
%    0.6790    0.1489    0.7189
%    0.3732    0.7732   -0.5127
%   -0.6322    0.6164    0.4694

[U, S, V] = svd(mat);
R = U * V';
if det(R) < 0
    % In this case the result may be far from mat.
    R = [R(:, 1: 2); -R(:, 3)];
end
end
*/