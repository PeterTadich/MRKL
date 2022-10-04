/*
var V = [[1],[2],[3],[4],[5],[6]];
var se3mat = VecTose3(V);
console.log(se3mat);
*/

function VecTose3(V){
    var R = VecToso3([[V[0][0]],[V[1][0]],[V[2][0]]]);
    var se3mat = [
            [R[0][0],R[0][1],R[0][2],V[3][0]],
            [R[1][0],R[1][1],R[1][2],V[4][0]],
            [R[2][0],R[2][1],R[2][2],V[5][0]],
            [    0.0,    0.0,    0.0,    0.0]
        ];
    return se3mat;
}

/*
function se3mat = VecTose3(V)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes a 6-vector (representing a spatial velocity).
% Returns the corresponding 4x4 se(3) matrix.
% Example Input:
% 
% clear; clc;
% V = [1; 2; 3; 4; 5; 6];
% se3mat = VecTose3(V)
% 
% Output:
% se3mat =
%     0    -3     2     4
%     3     0    -1     5
%    -2     1     0     6
%     0     0     0     0 

se3mat = [VecToso3(V(1: 3)), V(4: 6); 0, 0, 0, 0];
end
*/