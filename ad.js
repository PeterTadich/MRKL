/*
var V = [[1],[2],[3],[4],[5],[6]];
var adV = ad(V);
console.log(adV);
*/

function ad(V){
    var omgmat = VecToso3([[V[0][0]],[V[1][0]],[V[2][0]]]);
    var velmat = VecToso3([[V[3][0]],[V[4][0]],[V[5][0]]]);
    var adV = [
        [omgmat[0][0],omgmat[0][1],omgmat[0][2],         0.0,         0.0,         0.0],
        [omgmat[1][0],omgmat[1][1],omgmat[1][2],         0.0,         0.0,         0.0],
        [omgmat[2][0],omgmat[2][1],omgmat[2][2],         0.0,         0.0,         0.0],
        [velmat[0][0],velmat[0][1],velmat[0][2],omgmat[0][0],omgmat[0][1],omgmat[0][2]],
        [velmat[1][0],velmat[1][1],velmat[1][2],omgmat[1][0],omgmat[1][1],omgmat[1][2]],
        [velmat[2][0],velmat[2][1],velmat[2][2],omgmat[2][0],omgmat[2][1],omgmat[2][2]]
    ];
    return adV;
}

/*
function adV = ad(V)
% *** CHAPTER 8: DYNAMICS OF OPEN CHAINS ***
% Takes V: 6-vector spatial velocity.
% Returns adV: The corresponding 6x6 matrix.
% Used to calculate the Lie bracket [V1, V2] = [adV1]V2
% Example Input:
%  
% clear; clc;
% V = [1; 2; 3; 4; 5; 6];
% adV = ad(V)
% 
% Output:
% adV =
%     0    -3     2     0     0     0
%     3     0    -1     0     0     0
%    -2     1     0     0     0     0
%     0    -6     5     0    -3     2
%     6     0    -4     3     0    -1
%    -5     4     0    -2     1     0

omgmat = VecToso3(V(1: 3));
adV = [omgmat, zeros(3); VecToso3(V(4: 6)), omgmat];
end
*/