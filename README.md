# Modern Robotics
Modern Robotics - a JavaScript port from Modern Robotics: Mechanics, Planning, and Control (Kevin Lynch and Frank Park, Cambridge University Press 2017)

```bash
REF:
http://hades.mech.northwestern.edu/index.php/Modern_Robotics
https://github.com/NxRLab/ModernRobotics
```

## Dependencies

Required modules (not part of "Lynch: Modern Robotics") but included in this repository:

```bash
hlao.js
mtojs.js
ludcmp.js
det.js
basic_trig.js
svdcmp.js
pinv.js
```

## Installation

### Google Chrome Web browser

Download repository and open mr.html in web browser.

## How to use

### Google Chrome Web browser

In the web browser open console (developer tools).

## Examples

### Google Chrome Web browser

Given the joint torques, calculate the joint angular accelerations:

```js
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
```

Results:

```js
ddthetalist = 
[[-0.9739],
[25.5847],
[-32.9150]]
```

## To do

```bash
MatrixLog3() needs more test cases
DistanceToSE3 - read about this
Move det() to mtojs.js
Move norm(T,'fro') to mtojs.js (see DistanceToSE3.js, DistanceToSO3.js)
Need a multidimensional print statement
```

## License

[MIT](LICENSE)
Including: Only to be used to help humanity move forward in a positive manner.