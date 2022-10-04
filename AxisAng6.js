/*
var expc6 = [[1],[0],[0],[1],[2],[3]];
[S, theta] = AxisAng6(expc6);
console.log(S);
console.log(theta);
*/

function AxisAng6(expc6){
    var theta = matrix_norms([[expc6[0][0]],[expc6[1][0]],[expc6[2][0]]],'2');
    if(NearZero(theta)){
        theta = matrix_norms([[expc6[3][0]],[expc6[4][0]],[expc6[5][0]]],'2');
    }
    var S = matrix_multiplication_scalar(expc6,(1.0/theta));
    return [S, theta];
}

/*
function [S, theta] = AxisAng6(expc6)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a 6-vector of exponential coordinates for rigid-body motion
% S*theta. 
% Returns S: the corresponding normalized screw axis,
%         theta: the distance traveled along/about S.
% Example Input:
% 
% clear; clc;
% expc6 = [1; 0; 0; 1; 2; 3];
% [S, theta] = AxisAng6(expc6)
%  
% Output:
% S =
%     1
%     0
%     0 
%     1
%     2
%     3
% theta =
%     1

theta = norm(expc6(1: 3));
if NearZero(theta)
    theta = norm(expc6(4: 6));
end
S = expc6 / theta;      
end
*/