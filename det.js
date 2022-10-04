//ref: I:\code\spatial_v2\js\AnomalyDetection\ad.js

/*
&MATLAB 'det()'
a = [1,-2,4;-5,2,0;1,0,3]
det(a)
%ans = -32
*/

/*
//Anomaly Detection
//Example 1
var a = [];
a.push([1,-2,4]);
a.push([-5,2,0]);
a.push([1,0,3]);
var N = 3;
console.log("The determinant of 'A' is: " + det(a));
//ans = -32
*/

//det() - determinant
function det(X){
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
    
    //Step 3. Adjust the 'A' matrix for decomposition.
    for(var i=0;i<m;i=i+1){ //For each row of A[] add an extra element '0.0' to the beginning of the array (beginning of the row).
        A[i].unshift(0.0);
    }
    var offsetRow = []; // Create an array of zeroes (row vector) 1x4.
    for(var i=0;i<(n+1);i=i+1){
        offsetRow.push(0.0);
    }
    A.unshift(offsetRow); //Add the row vector of zeroes to the beginning of A[] array.
    
    //Step 4. Calc. determinant
    var a; var idx; var d; // 'd' - Set by ludcmp() either +/-1
    [a,idx,d] = ludcmp(A,m); // Decompose the matrix just once.
    for(var i=1;i<=m;i=i+1) d = d*a[i][i];
    if(debug) console.log("The determinant of 'A' is: " + d);
    return(d);
}