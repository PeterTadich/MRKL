/*
var thetalist = [[0.1],[0.1],[0.1]];
var dthetalist = [[0.1],[0.2],[0.3]];
var taulist = [[0.5],[0.6],[0.7]];
var g = [[0],[0],[-9.8]];
var Ftip = [[1],[1],[1],[1],[1],[1]];
var M01 = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0.089159],[0, 0, 0, 1]];
var M12 = [[0, 0, 1, 0.28],[0, 1, 0, 0.13585],[-1, 0 ,0, 0],[0, 0, 0, 1]];
var M23 = [[1, 0, 0, 0],[0, 1, 0, -0.1197],[0, 0, 1, 0.395],[0, 0, 0, 1]];
var M34 = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0.14225],[0, 0, 0, 1]];
var G1 = diag([0.010267, 0.010267, 0.00666, 3.7, 3.7, 3.7]);
var G2 = diag([0.22689, 0.22689, 0.0151074, 8.393, 8.393, 8.393]);
var G3 = diag([0.0494433, 0.0494433, 0.004095, 2.275, 2.275, 2.275]);
var Glist = [G1, G2, G3];
var Mlist = [M01, M12, M23, M34];
var Slist = [
    [1.0000,         0,         0],
    [     0,    1.0000,    1.0000],
    [1.0000,         0,         0],
    [     0,   -0.0890,   -0.0890],
    [1.0000,         0,         0],
    [     0,         0,    0.4250]
];
var ddthetalist = ForwardDynamics(thetalist, dthetalist, taulist, g, Ftip, Mlist, Glist, Slist);
print_matrix(ddthetalist);
*/

function ForwardDynamics(thetalist, dthetalist, taulist, g, Ftip, Mlist, Glist, Slist){
    var MM; var Fi; var VQFs; var GFs; var EEFs;
    [MM,Fi] = MassMatrix(thetalist, Mlist, Glist, Slist);
    var m; var n;
    [m,n] = size(MM);
    if(m !== n){
        console.log("ERROR: mass matrix not square.");
    }
    [VQFs,Fi] = VelQuadraticForces(thetalist, dthetalist, Mlist, Glist, Slist);
    [GFs,Fi] = GravityForces(thetalist, g, Mlist, Glist, Slist);
    [EEFs,Fi] = EndEffectorForces(thetalist, Ftip, Mlist, Glist, Slist);
    var taus = matrix_arithmetic(
                    matrix_arithmetic(taulist,vector_transpose(VQFs),"-"),
                    matrix_arithmetic(vector_transpose(GFs),vector_transpose(EEFs),"+"),
                    "-"
                );
                
    //Adjust the 'MM' matrix for decomposition.
    //   - For each row of MM[] add an extra dummy element '0.0'
    //     to the beginning of the array (beginning of the row).
    for(var i=0;i<m;i=i+1){
        MM[i].unshift(0.0);
    }
    var offsetRow = []; // Create an array of zeroes (row vector).
    for(var i=0;i<(n+1);i=i+1){
        offsetRow.push(0.0);
    }
    MM.unshift(offsetRow); //Add the row vector of zeroes to the beginning of MM[] array.
    
    var invMM = matrixInverseLU(MM,n);
    invMM = svdClean(invMM);
    var ddthetalist = matrix_multiplication(matrix_transpose(invMM),taus);
    return ddthetalist;
}

/*
function ddthetalist = ForwardDynamics(thetalist, dthetalist, taulist, ...
                                       g, Ftip, Mlist, Glist, Slist)
% *** CHAPTER 8: DYNAMICS OF OPEN CHAINS ***
% Takes thetalist: A list of joint variables,
%       dthetalist: A list of joint rates,
%       taulist: An n-vector of joint forces/torques,
%       g: Gravity vector g,
%       Ftip: Spatial force applied by the end-effector expressed in frame 
%             {n+1},
%       Mlist: List of link frames i relative to i-1 at the home position,
%       Glist: Spatial inertia matrices Gi of the links,
%       Slist: Screw axes Si of the joints in a space frame, in the format
%              of a matrix with the screw axes as the columns,
% Returns ddthetalist: The resulting joint accelerations.
% This function computes ddthetalist by solving:
% Mlist(thetalist) * ddthetalist = taulist - c(thetalist,dthetalist) ...
%                                  - g(thetalist) - Jtr(thetalist) * Ftip
% Example Input (3 Link Robot):
% 
% clear; clc;
% thetalist = [0.1; 0.1; 0.1];
% dthetalist = [0.1; 0.2; 0.3]; 
% taulist = [0.5; 0.6; 0.7];
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
% ddthetalist = ForwardDynamics(thetalist, dthetalist, taulist, g, ...
%                             Ftip, Mlist, Glist, Slist)
% 
% Output:
% ddthetalist =
%   -0.9739
%   25.5847
%  -32.9150

ddthetalist = MassMatrix(thetalist, Mlist, Glist, Slist) ...
              \ (taulist - VelQuadraticForces(thetalist, dthetalist, ...
                                              Mlist, Glist, Slist) ...
                 - GravityForces(thetalist, g, Mlist, Glist, Slist) ...
                 - EndEffectorForces(thetalist, Ftip, Mlist, Glist, ...
                                     Slist));
end
*/