/*
var thetalist = [[0.1],[0.1],[0.1]];
var dthetalist = [[0.1],[0.2],[0.3]];
var ddthetalist = [[2],[1.5],[1]];
var g = [[0],[0],[-9.8]];
var Ftip = [[1],[1],[1],[1],[1],[1]];
var M01 = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0.089159],[0, 0, 0, 1]];
var M12 = [[0, 0, 1, 0.28],[0, 1, 0, 0.13585],[-1, 0 ,0, 0],[0, 0, 0, 1]];
var M23 = [[1, 0, 0, 0],[0, 1, 0, -0.1197],[0, 0, 1, 0.395],[0, 0, 0, 1]];
var M34 = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0.14225],[0, 0, 0, 1]];
var G1 = diag([0.010267, 0.010267, 0.00666, 3.7, 3.7, 3.7]);
var G2 = diag([0.22689, 0.22689, 0.0151074, 8.393, 8.393, 8.393]);
var G3 = diag([0.0494433, 0.0494433, 0.004095, 2.275, 2.275, 2.275]);
var Glist = [G1,G2,G3];
var Mlist = [M01,M12,M23,M34];
var Slist = [
                [1.0000,0.0000,0.0000],
                [0.0000,1.0000,1.0000],
                [1.0000,0.0000,0.0000],
                [0.0000,-0.0890,-0.0890],
                [1.0000,0.0000,0.0000],
                [0.0000,0.0000,0.4250]
            ];
[taulist,Fi] = InverseDynamics(thetalist, dthetalist, ddthetalist, g, Ftip, Mlist, Glist, Slist);
console.log(taulist);
console.log(Fi);
*/

function InverseDynamics(thetalist, dthetalist, ddthetalist, g, Ftip, Mlist, Glist, Slist){
    var n = thetalist.length;
    var Mi = identity_matrix(4);
    var Ai = [];
    var AdTi = [];
    var Vi = [];
    Vi.push(zeros_matrix(6,1));
    var Vdi = [];
    Vdi.push(zeros_matrix(6,1));
    Vdi[0][3][0] = -g[0][0];
    Vdi[0][4][0] = -g[1][0];
    Vdi[0][5][0] = -g[2][0];
    AdTi[n] = Adjoint(TransInv(Mlist[n]));
    var Fi = [];
    Fi[n] = Ftip;
    var taulist = [];
    for(var i=0;i<n;i=i+1){
        Mi = matrix_multiplication(Mi,Mlist[i]);
        Ai[i] = matrix_multiplication(Adjoint(TransInv(Mi)),extract_column(Slist,i));
        AdTi[i] = Adjoint(
                    matrix_multiplication(
                        MatrixExp6(VecTose3(matrix_multiplication_scalar(Ai[i],(thetalist[i][0]*-1.0)))),
                        TransInv(Mlist[i])
                    )
                  );
        Vi.push(matrix_arithmetic(matrix_multiplication(AdTi[i],Vi[i]),matrix_multiplication_scalar(Ai[i],dthetalist[i][0]),"+"));
        Vdi.push(
                 matrix_arithmetic(
                    matrix_arithmetic(
                        matrix_multiplication(AdTi[i],Vdi[i]),
                        matrix_multiplication_scalar(Ai[i],ddthetalist[i][0]),
                        "+"
                    ),
                    matrix_multiplication_scalar(matrix_multiplication(ad(Vi[i+1]),Ai[i]),dthetalist[i][0]),
                    "+"
                    )
                );
    }
    
    for(var i=(n-1);i>=0;i=i-1){
        Fi[i] = matrix_arithmetic(
                matrix_arithmetic(matrix_multiplication(matrix_transpose(AdTi[i+1]),Fi[i+1]),matrix_multiplication(Glist[i],Vdi[i+1]),"+"),
                matrix_multiplication(matrix_transpose(ad(Vi[i+1])),matrix_multiplication(Glist[i],Vi[i+1])),
                "-"
             );
        
        taulist[i] = matrix_multiplication(matrix_transpose(Fi[i]),Ai[i])[0];
    }
    
    return [taulist,Fi]; //[torque,generalized forces]
}

/*
function taulist = InverseDynamics(thetalist, dthetalist, ddthetalist, ...
                                   g, Ftip, Mlist, Glist, Slist)
% *** CHAPTER 8: DYNAMICS OF OPEN CHAINS ***
% Takes thetalist: n-vector of joint variables,
%       dthetalist: n-vector of joint rates,
%       ddthetalist: n-vector of joint accelerations,
%       g: Gravity vector g,
%       Ftip: Spatial force applied by the end-effector expressed in frame 
%             {n+1},
%       Mlist: List of link frames {i} relative to {i-1} at the home 
%              position,
%       Glist: Spatial inertia matrices Gi of the links,
%       Slist: Screw axes Si of the joints in a space frame, in the format
%              of a matrix with the screw axes as the columns.
% Returns taulist: The n-vector of required joint forces/torques.
% This function uses forward-backward Newton-Euler iterations to solve the 
% equation:
% taulist = Mlist(thetalist) * ddthetalist + c(thetalist, dthetalist) ...
%           + g(thetalist) + Jtr(thetalist) * Ftip
% Example Input (3 Link Robot):
% 
% clear; clc;
% thetalist = [0.1; 0.1; 0.1];
% dthetalist = [0.1; 0.2; 0.3];
% ddthetalist = [2; 1.5; 1];
% g = [0; 0; -9.8];
% Ftip = [1; 1; 1; 1; 1; 1];
% M01 = [[1, 0, 0, 0]; [0, 1, 0, 0]; [0, 0, 1, 0.089159]; [0, 0, 0, 1]];
% M12 = [[0, 0, 1, 0.28]; [0, 1, 0, 0.13585]; [-1, 0 ,0, 0]; [0, 0, 0, 1]];
% M23 = [[1, 0, 0, 0]; [0, 1, 0, -0.1197]; [0, 0, 1, 0.395]; [0, 0, 0, 1]];
% M34 = [[1, 0, 0, 0]; [0, 1, 0, 0]; [0, 0, 1, 0.14225]; [0, 0, 0, 1]];
% G1 = diag([0.010267, 0.010267, 0.00666, 3.7, 3.7, 3.7]);
% G2 = diag([0.22689, 0.22689, 0.0151074, 8.393, 8.393, 8.393]);
% G3 = diag([0.0494433, 0.0494433, 0.004095, 2.275, 2.275, 2.275]);
% Glist = cat(3, G1, G2, G3);
% Mlist = cat(3, M01, M12, M23, M34); 
% Slist = [[1; 0; 1;      0; 1;     0], ...
%        [0; 1; 0; -0.089; 0;     0], ...
%        [0; 1; 0; -0.089; 0; 0.425]];
% taulist = InverseDynamics(thetalist, dthetalist, ddthetalist, g, ...
%                         Ftip, Mlist, Glist, Slist)
% 
% Output:
% taulist =
%   74.6962
%  -33.0677
%   -3.2306

n = size(thetalist, 1);
Mi = eye(4);
Ai = zeros(6, n);
AdTi = zeros(6, 6, n + 1);
Vi = zeros(6, n + 1);
Vdi = zeros(6, n + 1);
Vdi(4: 6, 1) = -g;
AdTi(:, :, n + 1) = Adjoint(TransInv(Mlist(:, :, n + 1)));
Fi = Ftip;
taulist = zeros(n, 1);
for i=1: n    
    Mi = Mi * Mlist(:, :, i);
    Ai(:, i) = Adjoint(TransInv(Mi)) * Slist(:, i);    
    AdTi(:, :, i) = Adjoint(MatrixExp6(VecTose3(Ai(:, i) ...
                    * -thetalist(i))) * TransInv(Mlist(:, :, i)));    
    Vi(:, i + 1) = AdTi(:, :, i) * Vi(:, i) + Ai(:, i) * dthetalist(i);
    Vdi(:, i + 1) = AdTi(:, :, i) * Vdi(:, i) ...
                    + Ai(:, i) * ddthetalist(i) ...
                    + ad(Vi(:, i + 1)) * Ai(:, i) * dthetalist(i);    
end
for i = n: -1: 1
    Fi = AdTi(:, :, i + 1)' * Fi + Glist(:, :, i) * Vdi(:, i + 1) ...
         - ad(Vi(:, i + 1))' * (Glist(:, :, i) * Vi(:, i + 1));
    taulist(i) = Fi' * Ai(:, i);
end
end
*/