//https://github.com/PeterTadich/singular-value-decomposition/blob/main/svdcmp.mjs

//SVD Algorithm: REF: Numerical Recipes in C, page 67

/*
//EXAMPLE 1:
//MATLAB
A = [2 3 5;-4 2 3];
N = null(A)
N = [
   -0.0327
   -0.8512
    0.5238
]
//JavaScript:
var a = [[0,0,0,0],[0,2,3,5],[0,-4,2,3]]; //where row index = 0 is 0 or 'undefined' and column index 0 is 0 or 'undefined'
var m = 2; //number of rows
var n = 3; //number of columns
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
console.log(uwv);
//returns:
uwv = 
[
    //u
    [
     [0, 0, 0, 0],
     [0, 0.8145890264063118,  0.580038548769318, 0],
     [0, 0.580038548769318 , -0.814589026406312, 0]
    ],
    //w
    [0, 6.874359351401238, 4.4433302271834805, -0],
    //v
    [
     [0,  0, 0, 0],
     [0, -0.10051498720732482, 0.9943967648707991  ,  0.0327385302235826],
     [0,  0.524244368462202  , 0.024967217790078877,  0.8512017858131464],
     [0,  0.8456149120506202 , 0.10272152671330309 , -0.523816483577321 ]
    ]
]
//EXAMPLE 2:
//MATLAB
J =    [
    [0.046961454881186436,0.003665949209087669,-0.00020856496132179143,0.270667566549944,0.9615195710987111,0.000567348726648751,0,0,0,0,0];
    [-0.10252734318776414,0.000003659493012730941,-0.013667435260972293,0.9587180787898666,-0.2648752538162803,0.0014458271275222562,0,0,0,0,0];
    [-0.00012487827191445464,0.07715344494685256,-0.035623035034451044,0.0009852247690472578,0.000014791048591311131,-0.9963821349394838,0,0,0,0,0];
    [0.0027728958761704713,-0.001357339999983567,0.9992545320711035,0.013570221347329076,-0.003712385588022704,-0.035817818160460584,0,0,0,0,0];
    [-0.0003293789709416517,0.9970115521336733,0.004118608158697574,-0.001071288684254845,-0.0035281860187628233,0.07705386253981109,0,0,0,0,0];
    [0.9936171056386214,0.00017110220745636395,-0.004192170222515619,0.08609555496478068,-0.07276664199892104,0.00012264866900640623,0,0,0,0,0]
];
N = null(J);
N = [
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     0     0     0     0     0
     1     0     0     0     0
     0     1     0     0     0
     0     0     1     0     0
     0     0     0     1     0
     0     0     0     0     1
]
//JavaScript
var J =    [
    [0.046961454881186436,0.003665949209087669,-0.00020856496132179143,0.270667566549944,0.9615195710987111,0.000567348726648751,0,0,0,0,0],
    [-0.10252734318776414,0.000003659493012730941,-0.013667435260972293,0.9587180787898666,-0.2648752538162803,0.0014458271275222562,0,0,0,0,0],
    [-0.00012487827191445464,0.07715344494685256,-0.035623035034451044,0.0009852247690472578,0.000014791048591311131,-0.9963821349394838,0,0,0,0,0],
    [0.0027728958761704713,-0.001357339999983567,0.9992545320711035,0.013570221347329076,-0.003712385588022704,-0.035817818160460584,0,0,0,0,0],
    [-0.0003293789709416517,0.9970115521336733,0.004118608158697574,-0.001071288684254845,-0.0035281860187628233,0.07705386253981109,0,0,0,0,0],
    [0.9936171056386214,0.00017110220745636395,-0.004192170222515619,0.08609555496478068,-0.07276664199892104,0.00012264866900640623,0,0,0,0,0]
];
var dim = size(J);
var m = dim[0]; //number of rows
var n = dim[1]; //number of columns
for(var j=0;j<m;j=j+1){ //For each row of JJT[] add an extra element '0.0' to the beginning of the array (beginning of the row).
    J[j].unshift(0.0);
}
var offsetRow = []; //create an array of zeroes (row vector)
for(var j=0;j<(n+1);j=j+1){
    offsetRow.push(0.0);
}
J.unshift(offsetRow); //add the row vector of zeroes to the beginning of JJT[] array - now a 7 x 7 matrix
var a = J;
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
console.log(uwv);
var u = uwv[0];
var w = uwv[1];
var v = uwv[2];
var strDump = "";
strDump = strDump + '[';
for(var i=0;i<(n+1);i=i+1){
    if(i != 0){ //ignore first row
        strDump = strDump + '[';
        for(var j=0;j<(n+1);j=j+1){
            if(j != 0){ //ignore first column
                strDump = strDump + v[i][j];
                if(j < n) strDump = strDump + ',';
            }
        }
        strDump = strDump + '],\n';
    }
}
strDump = strDump + ']\n';
console.log(strDump);
cosole.log(w); //IMPORTANT: must ignore drop first element in 'w'
    
    
//JavaScript returned:
v = [
    [-0.0007934079226388016,0.7054389177434484  ,-0.6599320653998129 , 0.002054094387620442, 0.23693318281109768, 0.10345733648807337,0.0,0.0,0.0,0.0,0.0],
    [-0.014299136388077421 ,0.2667383995032105  , 0.5681944655965883 , 0.11696985087707798 , 0.7682476619046354 , 0.04375836101003017,0.0,0.0,0.0,0.0,0.0],
    [-0.9858486950822287   ,0.07194727985656296 , 0.05123683123115585, 0.09013936556357677 ,-0.09785305260859091, 0.0509941302727593 ,0.0,0.0,0.0,0.0,0.0],
    [ 0.16179132882300828  ,0.49025981327249696 , 0.34941204487304495, 0.5826086019160772  ,-0.5178430473101727 , 0.06152966464435489,0.0,0.0,0.0,0.0,0.0],
    [-0.011703472321382885 ,0.43014186079671507 , 0.31526344863396943,-0.7365843649802724  ,-0.2517338550158073 ,-0.3309433573693058 ,0.0,0.0,0.0,0.0,0.0],
    [ 0.03979761626528379  ,0.025562542225189472, 0.13243748072576744,-0.310160312899377   ,-0.11203401959958295, 0.9335266352001529 ,0.0,0.0,0.0,0.0,0.0],
    [ 0.0                  ,0.0                 , 0.0                , 0.0                 , 0.0                , 0.0                ,1.0,0.0,0.0,0.0,0.0],
    [ 0.0                  ,0.0                 , 0.0                , 0.0                 , 0.0                , 0.0                ,0.0,1.0,0.0,0.0,0.0],
    [ 0.0                  ,0.0                 , 0.0                , 0.0                 , 0.0                , 0.0                ,0.0,0.0,1.0,0.0,0.0],
    [ 0.0                  ,0.0                 , 0.0                , 0.0                 , 0.0                , 0.0                ,0.0,0.0,0.0,1.0,0.0],
    [ 0.0                  ,0.0                 , 0.0                , 0.0                 , 0.0                , 0.0                ,0.0,0.0,0.0,0.0,1.0]
]
w = [1.0000000000000016, 0.9999999999999994, 0.9999999999999993, 1.0000000000000002, 1.0000000000000007, 1.0000000000000004, 0, 0, 0, 0, 0]
//EXAMPLE 3:
//Matlab:
// ref: http://au.mathworks.com/help/matlab/ref/svd.html
A = [1 2; 3 4; 5 6; 7 8]
[U,S,V] = svd(A,0) % Economy-size decomposition of a rectangular matrix
U =
   -0.1525   -0.8226
   -0.3499   -0.4214
   -0.5474   -0.0201
   -0.7448    0.3812
S =
   14.2691         0
         0    0.6268
V =
   -0.6414    0.7672
   -0.7672   -0.6414
//JavaScript:
var m = 4;
var n = 2;
var a = [
  [0, 0, 0],
  [0, 1, 2],
  [0, 3, 4],
  [0, 5, 6],
  [0, 7, 8]
];
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
console.log(uwv);
U = [
  [0, 0, 0],
  [0, 0.8226474722256594, -0.15248323331020103],
  [0, 0.42137528768458127, -0.34991837180796415],
  [0, 0.020103103143502915, -0.5473535103057273],
  [0, -0.3811690813975754, -0.7447886488034904]
];
W = [0, 0.6268282324175404, 14.269095499261486];
V = [[0, 0, 0], [0, -0.767187395072177, -0.6414230279950724], [0, 0.6414230279950723, -0.7671873950721768]];
//EXAMPLE 4:
//Matlab:
A = [2 0 2; 0 1 0; 0 0 0]
[U,S,V] = svd(A)
U =
     1     0     0
     0     1     0
     0     0     1
S =
    2.8284         0         0
         0    1.0000         0
         0         0         0
V =
    0.7071         0   -0.7071
         0    1.0000         0
    0.7071         0    0.7071
% Calculate the rank using the number of nonzero singular values.
s = diag(S);
rank_A = nnz(s)
% rank_A returns 2
//JavaScript:
var m = 3;
var n = 3;
var a = [
  [0, 0, 0, 0],
  [0, 2, 0, 2],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
];
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
console.log(uwv);
U = [
  [0, 0, 0, 0],
  [0, -1, 0, 0],
  [0, -0, 0, -1],
  [0, -0, 1, 0]
];
W = [0, 2.82842712474619, 0, 1];
V = [
  [0, 0, 0, 0],
  [0, -0.7071067811865475, 0.7071067811865475, 0],
  [0, -0, 0, -1],
  [0, -0.7071067811865475, -0.7071067811865475, 0]
]
//EXAMPLE 5:
//JavaScript:
var m = 3;
var n = 3;
var a = [
  [0, 0, 0, 0],
  [0, 2, 0, 2],
  [0, 0, 1, 0],
  [0, 0, 0, 0]
];
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(a, m, n, w, v);
console.log(uwv);
var w = uwv[1];
w.shift(); // Drop the first element in the array as it is zero.
var rank = matrix_rank(w);
console.log('Matrix Rank = ' + rank); // returns 'Matrix Rank = 2'
//EXAMPLE 6:
//JavaScript:
var m = 6;
var n = 6;
var J = [
[-0.01399999999999999, -0.01399999999999999, 0.15400000000000003, 9.429780353434622e-18, 4.0413344371862674e-18, 0],
[0.071, 0, 0, -0.15400000000000003, -0.07700000000000003, 0],
[0, 0, 0, -1.0408340855860843e-17, 0.010999999999999994, 0],
[0, 0, 0, 1, 1, 1],
[0, 0, 1, 6.123233995736766e-17, 6.123233995736766e-17, 6.123233995736766e-17],
[1, 1, 6.123233995736766e-17, 6.123233995736766e-17, 6.123233995736766e-17, 6.123233995736766e-17]
]
// Adjust the 'J' matrix for SVD.
for(var j=0;j<m;j=j+1){ //For each row of J[] add an extra element '0.0' to the beginning of the array (beginning of the row).
  J[j].unshift(0.0);
}
var offsetRow = []; //Create an array of zeroes (row vector).
for(var j=0;j<(n+1);j=j+1){
  offsetRow.push(0.0);
}
J.unshift(offsetRow); //Add the row vector of zeroes to the beginning of J[] array - now a (m+1) x (n+1) matrix
var w = zeros_vector((n+1),'row'); //row vector where index = 0 is undefined
var v = zeros_matrix((n+1),(n+1)); //matrix
var uwv = svdcmp(J, m, n, w, v);
console.log(uwv);
var w = uwv[1];
w.shift(); // Drop the first element in the array as it is zero.
var rank = matrix_rank(w);
console.log('Matrix Rank = ' + rank);
*/

//#include <math.h>
//#include "nrutil.h"
function svdcmp(a, m, n, w, v){
//Given a matrix a[1..m][1..n], this routine computes its singular value decomposition, A =
//U·W·V T. The matrix U replaces 'a' on output. The diagonal matrix of singular values W is output
//as a vector w[1..n]. The matrix V (not the transpose V T ) is output as v[1..n][1..n].
//'A' is an M x N matrix (M rows x N columns) page 66 I:\books\coding\Numerical_recipes_in_CNumerical_Recipes.pdf
    var anorm,c,f,g,h,s,scale,x,y,z;
    var rv1=zeros_vector((n+1),'row');
    g=scale=anorm=0.0; //Householder reduction to bidiagonal form.
    for (var i=1;i<=n;i++) {
        var l=i+1;
        rv1[i]=scale*g;
        g=s=scale=0.0;
        if (i <= m) {
            for (var k=i;k<=m;k++) scale += Math.abs(a[k][i]);
                if (scale) {
                for (var k=i;k<=m;k++) {
                    a[k][i] /= scale;
                    s += a[k][i]*a[k][i];
                }
                f=a[i][i];
                g = -1.0*SIGN(Math.sqrt(s),f);
                h=f*g-s;
                a[i][i]=f-g;
                for (var j=l;j<=n;j++) {
                    var s=0.0;
                    for (var k=i;k<=m;k++) s += a[k][i]*a[k][j];
                    f=s/h;
                    for (var k=i;k<=m;k++) a[k][j] += f*a[k][i];
                }
                for (k=i;k<=m;k++) a[k][i] *= scale;
            }
        }
        w[i]=scale*g;
        g=s=scale=0.0;
        if ((i <= m) && (i != n)) {
            for (var k=l;k<=n;k++) scale += Math.abs(a[i][k]);
            if (scale) {
                for (var k=l;k<=n;k++) {
                    a[i][k] /= scale;
                    s += a[i][k]*a[i][k];
                }
                f=a[i][l];
                g = -1.0*SIGN(Math.sqrt(s),f);
                h=f*g-s;
                a[i][l]=f-g;
                for (var k=l;k<=n;k++) rv1[k]=a[i][k]/h;
                for (var j=l;j<=m;j++) {
                    s=0.0;
                    for (var k=l;k<=n;k++) s += a[j][k]*a[i][k];
                    for (var k=l;k<=n;k++) a[j][k] += s*rv1[k];
                }
                for (var k=l;k<=n;k++) a[i][k] *= scale;
            }
        }
        anorm=FMAX(anorm,(Math.abs(w[i])+Math.abs(rv1[i])));
    }
    for (i=n;i>=1;i--) { //Accumulation of right-hand transformations.
        if (i < n) {
            if (g) {
                for (var j=l;j<=n;j++) //Double division to avoid possible underflow.
                v[j][i]=(a[i][j]/a[i][l])/g;
                for (var j=l;j<=n;j++) {
                    s=0.0;
                    for (var k=l;k<=n;k++) s += a[i][k]*v[k][j];
                    for (var k=l;k<=n;k++) v[k][j] += s*v[k][i];
                }
            }
            for (var j=l;j<=n;j++) v[i][j]=v[j][i]=0.0;
        }
        v[i][i]=1.0;
        g=rv1[i];
        l=i;
    }
    for (var i=IMIN(m,n);i>=1;i--) { //Accumulation of left-hand transformations.
        l=i+1;
        g=w[i];
        for (var j=l;j<=n;j++) a[i][j]=0.0;
        if (g) {
            g=1.0/g;
            for (var j=l;j<=n;j++) {
                s=0.0;
                for (var k=l;k<=m;k++) s += a[k][i]*a[k][j];
                f=(s/a[i][i])*g;
                for (var k=i;k<=m;k++) a[k][j] += f*a[k][i];
            }
            for (var j=i;j<=m;j++) a[j][i] *= g;
        } else for (var j=i;j<=m;j++) a[j][i]=0.0;
        ++a[i][i];
    }
    for (var k=n;k>=1;k--) { //Diagonalization of the bidiagonal form: Loop over
        for (var its=1;its<=30;its++) { //singular values, and over allowed iterations.
            var flag=1;
            for (var l=k;l>=1;l--) { //Test for splitting.
                var nm=l-1; //Note that rv1[1] is always zero.
                if (parseFloat(Math.abs(rv1[l])+anorm) == anorm) {
                    flag=0;
                    break;
                }
                if (parseFloat(Math.abs(w[nm])+anorm) == anorm) break;
            }
            if (flag) {
                c=0.0; //Cancellation of rv1[l], if l > 1.
                s=1.0;
                for (var i=l;i<=k;i++) {
                    f=s*rv1[i];
                    rv1[i]=c*rv1[i];
                    if (parseFloat(Math.abs(f)+anorm) == anorm) break;
                    g=w[i];
                    h=pythag(f,g);
                    w[i]=h;
                    h=1.0/h;
                    c=g*h;
                    s = -f*h;
                    for (var j=1;j<=m;j++) {
                        y=a[j][nm];
                        z=a[j][i];
                        a[j][nm]=y*c+z*s;
                        a[j][i]=z*c-y*s;
                    }
                }
            }
            z=w[k];
            if (l == k) { //Convergence.
                if (z < 0.0) { //Singular value is made nonnegative.
                    w[k] = -1.0*z;
                    for (var j=1;j<=n;j++) v[j][k] = -1.0*v[j][k];
                }
                break;
            }
            //if (its == 30) alert('no convergence in 30 svdcmp iterations');
            if (its == 30) console.log('WARNING: no convergence in 30 svdcmp iterations');
            x=w[l]; //Shift from bottom 2-by-2 minor.
            nm=k-1;
            y=w[nm];
            g=rv1[nm];
            h=rv1[k];
            f=((y-z)*(y+z)+(g-h)*(g+h))/(2.0*h*y);
            g=pythag(f,1.0);
            f=((x-z)*(x+z)+h*((y/(f+SIGN(g,f)))-h))/x;
            c=s=1.0; //Next QR transformation:
            for (var j=l;j<=nm;j++) {
                i=j+1;
                g=rv1[i];
                y=w[i];
                h=s*g;
                g=c*g;
                z=pythag(f,h);
                rv1[j]=z;
                c=f/z;
                s=h/z;
                f=x*c+g*s;
                g = g*c-x*s;
                h=y*s;
                y *= c;
                for (var jj=1;jj<=n;jj++) {
                    x=v[jj][j];
                    z=v[jj][i];
                    v[jj][j]=x*c+z*s;
                    v[jj][i]=z*c-x*s;
                }
                z=pythag(f,h);
                w[j]=z; //Rotation can be arbitrary if z = 0.
                if (z) {
                    z=1.0/z;
                    c=f*z;
                    s=h*z;
                }
                f=c*g+s*y;
                x=c*y-s*g;
                for (var jj=1;jj<=m;jj++) {
                    y=a[jj][j];
                    z=a[jj][i];
                    a[jj][j]=y*c+z*s;
                    a[jj][i]=z*c-y*s;
                }
            }
            rv1[l]=0.0;
            rv1[k]=f;
            w[k]=x;
        }
    }
    //free_vector(rv1,1,n);
    
    return [a,w,v];
}

//#include <math.h>
//#include "nrutil.h"
function pythag(a, b){
    //Computes (a2 + b2)1/2 without destructive underflow or overflow.
    var absa=Math.abs(a);
    var absb=Math.abs(b);
    if (absa > absb) return absa*Math.sqrt(1.0+SQR(absb/absa));
    else return (absb == 0.0 ? 0.0 : absb*Math.sqrt(1.0+SQR(absa/absb)));
}

//Taken from rot3dfit.js
function svdClean(A){
    var dim = size(A);
    var m = dim[0]; //Rows.
    
    if(m > 1){
        for(var i=0;i<m;i=i+1){ //For each row of 'A' drop the extra element '0.0' at the beginning of the array (beginning of the row).
            A[i].shift();
        }
        A.shift(); //Drop the first row.
    } else {
        A.shift(); //It is a row vector hence just drop the first element.
    }
    
    return A;
}

//ref: z.js
function size(X){
    if(typeof X[0].length == 'undefined'){ //row vector
        var m = 1;
        var n = X.length;
    }
    else{
        var m = X.length;
        var n = X[0].length;
    }
    return [m,n];
}

//ref: hlao.mjs
function zeros_vector(r,type){
    var u = [];
    
    switch(type){
        case 'col':
            for(var i=0;i<r;i=i+1){
                u.push([0.0]);
            }
            break;
        case 'row':
            for(var i=0;i<r;i=i+1){
                u.push(0.0);
            }
            break;
        default:
            assert(false,'Assertion failed: vector type not one of column (col) or row (row) in function zeros_vector().');
    }
    
    return u;
}

//ref: hlao.mjs
//REF: http://stackoverflow.com/questions/15313418/javascript-assert
function assert(condition, message){
    if(!condition){
        throw message || "Assertion failed";
    }
}

//#define FMAX(a,b) (maxarg1=(a),maxarg2=(b),(maxarg1) > (maxarg2) ? (maxarg1) : (maxarg2))
function FMAX(a,b){
    var maxarg1 = a;
    var maxarg2 = b;
    if(maxarg1 > maxarg2) return maxarg1;
    else return maxarg2;
}

//#define SQR(a) ((sqrarg=(a)) == 0.0 ? 0.0 : sqrarg*sqrarg)
function SQR(a){
    var sqrarg = a;
    if(sqrarg == 0.0) return 0.0;
    else return (sqrarg * sqrarg);
}

//#define SIGN(a,b) ((b) >= 0.0 ? fabs(a) : -fabs(a))
function SIGN(a,b){
    if(b >= 0.0) return Math.abs(a);
    else return -1.0*Math.abs(a);
}

//#define IMIN(a,b) (iminarg1=(a),iminarg2=(b),(iminarg1) < (iminarg2) ? (iminarg1) : (iminarg2))
function IMIN(a,b){
    var iminarg1 = a;
    var iminarg2 = b;
    if(iminarg1 < iminarg2) return iminarg1;
    else return iminarg2;
}

/*
export {
    svdcmp,
    svdClean
};
*/