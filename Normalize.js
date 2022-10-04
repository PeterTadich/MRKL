/*
var V = [[1],[2],[3]];
var norm_v = Normalize(V);
console.log(norm_v);
*/

function Normalize(V){
    var norm_v = matrix_multiplication_scalar(V,1.0/matrix_norms(V,"2"));
    return norm_v;
}

/*
function norm_v = Normalize(V)
% *** BASIC HELPER FUNCTIONS ***
% Takes in a vector.
% Scales it to a unit vector.
% Example Input:
% 
% clear; clc;
% V = [1; 2; 3];
% norm_v = Normalize(V)
% 
% Output:
% norm_v =
%    0.2673
%    0.5345
%    0.8018

norm_v = V / norm(V);
end
*/
