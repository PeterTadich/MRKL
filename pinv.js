//https://github.com/PeterTadich/pseudo-inverse/blob/main/pinv.mjs

//pinv = pseudo-inverse

//ECMAScript module

/*
%MATLAB 'pinv()'
X = [
     1     2
     3     4
     5     6
     7     8
];
>> pinv(X)'
ans =
   -1.0000    0.8500
   -0.5000    0.4500
    0.0000    0.0500
    0.5000   -0.3500
*/

/*
//----- using svdcmp();
var a = [
    [0,0,0],
    [0,1,2],
    [0,3,4],
    [0,5,6],
    [0,7,8]
];
var m = 4; //number of rows
var n = 2; //number of columns
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
var U = svdClean(uwv[0]); // Drop the first element in the array as it is zero.
var S = svdClean(uwv[1]); // 'W'
var V = svdClean(uwv[2]);
print_matrix(U);
print_vector(S);
print_matrix(V);
var Sinv = identity_matrix(n); // Identity matrix.
for(var i=0;i<S.length;i=i+1){
    Sinv[i][i] = 1.0/S[i];
}
var ATAinv = matrix_multiplication(
                matrix_multiplication(
                    U,Sinv
                ),
                matrix_transpose(V)
            );
print_matrix(ATAinv);
*/
/*
//ans:
-1.0000, 0.8500
-0.5000, 0.4500
-0.0000, 0.0500
0.5000, -0.3500
*/

/*
//----- using pinv();
var a = [
    [1,2],
    [3,4],
    [5,6],
    [7,8]
];
pinv(a);
*/
/*
//ans:
-1.0000, 0.8500
-0.5000, 0.4500
-0.0000, 0.0500
0.5000, -0.3500
*/

/*
var a = [
    [1,2],
    [3,4],
    [5,6],
    [7,8]
];
    //Pseudo inverse (left inverse). A+ = (A^TA)^-1)A^T
    //   -step 1. A^TA
    var ATA = matrix_multiplication(matrix_transpose(A),A); //left pseudo inverse
    //Pseudo inverse (right inverse). A+ = A^T(AA^T)^-1)
    //var AAT = matrix_multiplication(A,matrix_transpose(A)); //right pseudo inverse
*/

//import * as svdcmp from 'singular-value-decomposition';
//import * as hlao from 'matrix-computations';
//import * as svdcmp from '../singular-value-decomposition/svdcmp.mjs';
//import * as hlao from '../matrix-computations/hlao.mjs';

//pinv() - using Singular Value Decomposition
function pinv(X){
    var debug = 0;
    
    //Step 1. Get the size of the matrix 'A'.
    var m; var n; //'m' number of rows === 'n' number of columns.
    [m,n] = [X.length,X[0].length];
    if(debug) console.log('A: ' + m + ' x ' + n);
    
    //Step 2. Make a copy.
    var A = zeros_matrix(m,n);
    for(var i=0;i<m;i=i+1){
        for(var j=0;j<n;j=j+1){
            A[i][j] = X[i][j];
        }
    }
    
    //Step 3. Adjust the 'A' matrix for SVD.
    for(var i=0;i<m;i=i+1){ //For each row of A[] add an extra element '0.0' to the beginning of the array (beginning of the row).
        A[i].unshift(0.0);
    }
    var offsetRow = []; // Create an array of zeroes (row vector) 1x4.
    for(var i=0;i<(n+1);i=i+1){
        offsetRow.push(0.0);
    }
    A.unshift(offsetRow); //Add the row vector of zeroes to the beginning of A[] array.
    
    //Step 4. SVD.
    var w = zeros_vector((n+1),'row'); //Row vector where index = 0 is undefined.
    var v = zeros_matrix((n+1),(n+1)); //Matrix.
    var uwv = svdcmp(A, m, n, w, v);
    var U = svdClean(uwv[0]); // Drop the first element in the array as it is zero.
    var S = svdClean(uwv[1]); // 'W'
    var V = svdClean(uwv[2]);
    if(debug) console.log('U: ' + U);
    if(debug) console.log('S: ' + S);
    if(debug) console.log('V: ' + V);
    //ref:
    //   - http://www.kwon3d.com/theory/jkinem/svd.html
    //   - http://au.mathworks.com/help/matlab/ref/svd.html
    //   - https://au.mathworks.com/help/matlab/ref/pinv.html
    //   - https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_pseudoinverse
    
    //Step 5. Return Inverse.
    //   - reciprocal of 'S'
    var Sinv = identity_matrix(S.length); // Identity matrix.
    var TOL = 1e-12; //Tolerance for the evaluation of 'S'.
    for(var i=0;i<S.length;i=i+1){
        if(Math.abs(S[i]) > TOL) Sinv[i][i] = 1.0/S[i];
        else Sinv[i][i] = 0.0; // IMPORTANT: need to check this. Is it '1' or '0'?
    }
    //   - solve for the inverse
    var Ainv = matrix_multiplication(
            matrix_multiplication(
                U,Sinv
            ),
            matrix_transpose(V)
        );
    if(debug) console.log('(A x AT)-1:');
    //if(debug) printDesignMatrix(Ainv);
    if(debug) console.log(Ainv);
    return(Ainv);
}

/*
export {
    pinv
};
*/