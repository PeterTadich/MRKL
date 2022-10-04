/*
var Tf = 2;
var t = 0.6;
var s = CubicTimeScaling(Tf,t);
console.log(s);
*/

function CubicTimeScaling(Tf, t){
    var s = 3.0 * Math.pow((t / Tf),2.0) - 2.0 * Math.pow((t / Tf),3.0);
    return s;
}

/*
function s = CubicTimeScaling(Tf, t)
% *** CHAPTER 9: TRAJECTORY GENERATION ***
% Takes Tf: Total time of the motion in seconds from rest to rest,
%       t: The current time t satisfying 0 < t < Tf.
% Returns s: The path parameter s(t) corresponding to a third-order 
%            polynomial motion that begins and ends at zero velocity.
% Example Input: 
% 
% clear; clc;
% Tf = 2;
% t = 0.6;
% s = CubicTimeScaling(Tf,t)
% 
% Output:
% s =
%    0.2160

s = 3 * (t / Tf) ^ 2 - 2 * (t / Tf) ^ 3;
end
*/