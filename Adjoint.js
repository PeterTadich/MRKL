/*
var T = [[1, 0, 0, 0],[0, 0, -1, 0],[0, 1, 0, 3],[0, 0, 0, 1]];
var AdT = Adjoint(T);
console.log(AdT);
*/

function Adjoint(T){
    var R; var p;
    [R, p] = TransToRp(T);
    var pmat = VecToso3([[p[0]],[p[1]],[p[2]]]);
    var pR = matrix_multiplication(pmat,R); //prime
    
    var AdT = [
        [ R[0][0], R[0][1], R[0][2],    0.0,    0.0,    0.0],
        [ R[1][0], R[1][1], R[1][2],    0.0,    0.0,    0.0],
        [ R[2][0], R[2][1], R[2][2],    0.0,    0.0,    0.0],
        [pR[0][0],pR[0][1],pR[0][2],R[0][0],R[0][1],R[0][2]],
        [pR[1][0],pR[1][1],pR[1][2],R[1][0],R[1][1],R[1][2]],
        [pR[2][0],pR[2][1],pR[2][2],R[2][0],R[2][1],R[2][2]]
    ];
    return AdT;
}

/*
function AdT = Adjoint(T)
% *** CHAPTER 3: RIGID-BODY MOTIONS ***
% Takes T a transformation matrix SE3. 
% Returns the corresponding 6x6 adjoint representation [AdT].
% Example Input:
% 
% clear; clc;
% T = [[1, 0, 0, 0]; [0, 0, -1, 0]; [0, 1, 0, 3]; [0, 0, 0, 1]];
% AdT = Adjoint(T)
% 
% Output:
% AdT =
%     1     0     0     0     0     0
%     0     0    -1     0     0     0
%     0     1     0     0     0     0
%     0     0     3     1     0     0
%     3     0     0     0     0    -1
%     0     0     0     0     1     0

[R, p] = TransToRp(T);
AdT = [R, zeros(3); VecToso3(p) * R, R];
end
*/