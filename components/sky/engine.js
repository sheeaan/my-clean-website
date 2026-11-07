/* eslint-disable */
// The sky: now and then one of Shawn's real flights cruises past behind the page. Light mode has clouds and contrails
// (stir them with the cursor); dark mode has stars, constellations on hover, satellites, meteors and the real
// lighting of each aircraft. Ported verbatim from the design mockup; components/Sky.tsx supplies the canvases.
//
// startSky(host) runs the engine with `this` = host and returns its stop function.
export function startSky(host) {
  (function () {
    if (this._skyStop) return;
    const NIGHT = true; // the night-sky trial page only
    // real bright stars [ra h, dec deg, mag, tint, group], their stick figures, and where each group sits on the page
    const CAT = [[11.0621,61.751,1.79,"o",0],[11.0307,56.383,2.37,"w",0],[11.8972,53.695,2.44,"w",0],[12.2571,57.033,3.31,"w",0],[12.9005,55.96,1.77,"w",0],[13.3988,54.925,2.23,"w",0],[13.7923,49.313,1.86,"b",0],[8.5044,60.718,3.36,"y",0],[9.5255,63.062,3.65,"w",0],[9.8498,59.039,3.78,"w",0],[9.5476,51.677,3.17,"w",0],[8.9868,48.042,3.14,"w",0],[9.0604,47.157,3.6,"w",0],[10.2849,42.914,3.45,"w",0],[10.3721,41.499,3.05,"r",0],[11.1611,44.498,3.01,"o",0],[11.7675,47.779,3.69,"o",0],[11.308,33.094,3.49,"o",0],[11.303,31.529,3.79,"y",0],[7.5767,31.888,1.58,"w",1],[7.7553,28.026,1.14,"o",1],[6.6285,16.399,1.93,"w",1],[6.7322,25.131,2.98,"y",1],[6.3827,22.514,2.88,"r",1],[7.3354,21.982,3.53,"w",1],[7.1856,30.245,4.41,"o",1],[6.2479,22.507,3.28,"r",1],[7.5987,26.896,4.06,"o",1],[7.0685,20.57,3.9,"y",1]], CON = [["the big dipper",[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6]],null],["ursa major",[[0,1],[1,2],[2,3],[3,0],[3,4],[4,5],[5,6],[0,8],[8,7],[8,9],[1,9],[9,10],[10,11],[10,12],[2,16],[16,15],[15,14],[14,13],[16,17],[17,18]],[7,8,9,10,11,12,13,14,15,16,17,18,19]],["gemini",[[19,20],[19,25],[25,22],[22,23],[23,26],[20,27],[27,24],[24,28],[28,21],[25,27]],null]], GRP = [[12.3341,55.58,1,330,230],[7.0511,24.616,0,230,300]];
    const T = {"737 MAX 8":{"d":["M0 0 L0.8 0.7 L1.1 1.3 L1.3 2 L1.5 2.7 L1.6 3.3 L1.7 4 L1.8 4.7 L1.8 5.3 L1.9 6 L1.9 6.7 L1.9 7.3 L1.9 8 L1.9 25.8 L1.8 27.2 L1.7 28.6 L1.6 29.9 L1.4 31.3 L1.3 32.7 L1.1 34 L1 35.4 L0.8 36.8 L0.6 38.1 L0.4 39.5 L-0.4 39.5 L-0.6 38.1 L-0.8 36.8 L-1 35.4 L-1.1 34 L-1.3 32.7 L-1.4 31.3 L-1.6 29.9 L-1.7 28.6 L-1.8 27.2 L-1.9 25.8 L-1.9 8 L-1.9 7.3 L-1.9 6.7 L-1.9 6 L-1.8 5.3 L-1.8 4.7 L-1.7 4 L-1.6 3.3 L-1.5 2.7 L-1.3 2 L-1.1 1.3 L-0.8 0.7 Z","M1.8 15.2 L17.9 23.8 L17.9 25.2 L7.6 23.1 L1.8 23.1 Z M-1.8 23.1 L-7.6 23.1 L-17.9 25.2 L-17.9 23.8 L-1.8 15.2 Z","M1 32.4 L7.2 36.5 L7.2 38.2 L1 36.4 Z M-1 36.4 L-7.2 38.2 L-7.2 36.5 L-1 32.4 Z","M4.7 15 L4.8 14.7 L5 14.5 L5.3 14.4 L5.7 14.3 L6.2 14.4 L6.5 14.5 L6.7 14.7 L6.8 15 L6.6 19.1 L4.9 19.1 Z M-6.8 15 L-6.7 14.7 L-6.5 14.5 L-6.2 14.4 L-5.7 14.3 L-5.3 14.4 L-5 14.5 L-4.8 14.7 L-4.7 15 L-4.9 19.1 L-6.6 19.1 Z"],"L":39.5,"S":35.9,"eng":[[5.7,19.1],[-5.7,19.1]],"tip":[17.65,24.42],"by":18.37,"mk":"b","lr":[3.5,16.0],"w":3.8,"wr":[15.21,7.9],"fl":[[5.31,23.44,0.96,0.36],[9.52,23.78,0.8,0.36],[13.74,24.64,0.8,0.36]]},"737-700":{"d":["M0 0 L0.8 0.7 L1.1 1.3 L1.3 2 L1.4 2.6 L1.6 3.3 L1.7 4 L1.7 4.6 L1.8 5.3 L1.8 5.9 L1.9 6.6 L1.9 7.2 L1.9 7.9 L1.9 20.1 L1.8 21.4 L1.7 22.8 L1.6 24.1 L1.4 25.5 L1.3 26.8 L1.1 28.2 L1 29.5 L0.8 30.9 L0.6 32.2 L0.4 33.6 L-0.4 33.6 L-0.6 32.2 L-0.8 30.9 L-1 29.5 L-1.1 28.2 L-1.3 26.8 L-1.4 25.5 L-1.6 24.1 L-1.7 22.8 L-1.8 21.4 L-1.9 20.1 L-1.9 7.9 L-1.9 7.2 L-1.9 6.6 L-1.8 5.9 L-1.8 5.3 L-1.7 4.6 L-1.7 4 L-1.6 3.3 L-1.4 2.6 L-1.3 2 L-1.1 1.3 L-0.8 0.7 Z","M1.7 12.4 L17.9 21 L17.9 22.4 L7.5 20.2 L1.7 20.2 Z M-1.7 20.2 L-7.5 20.2 L-17.9 22.4 L-17.9 21 L-1.7 12.4 Z","M1 26.9 L7.2 31 L7.2 32.7 L1 30.9 Z M-1 30.9 L-7.2 32.7 L-7.2 31 L-1 26.9 Z","M4.8 12.3 L4.8 12.1 L5.1 11.9 L5.4 11.8 L5.7 11.8 L6.1 11.8 L6.4 11.9 L6.6 12.1 L6.7 12.3 L6.5 16.1 L5 16.1 Z M-6.7 12.3 L-6.6 12.1 L-6.4 11.9 L-6.1 11.8 L-5.7 11.8 L-5.4 11.8 L-5.1 11.9 L-4.8 12.1 L-4.8 12.3 L-5 16.1 L-6.5 16.1 Z"],"L":33.6,"S":35.8,"eng":[[5.7,16.1],[-5.7,16.1]],"tip":[17.6,21.63],"by":15.55,"mk":"b","lr":[3.5,13.2],"w":3.76,"wr":[12.43,7.8],"fl":[[5.29,20.56,0.95,0.35],[9.49,20.92,0.8,0.35],[13.7,21.82,0.8,0.35]]},"737-800":{"d":["M0 0 L0.8 0.7 L1.1 1.3 L1.3 2 L1.4 2.6 L1.6 3.3 L1.7 4 L1.7 4.6 L1.8 5.3 L1.8 5.9 L1.9 6.6 L1.9 7.2 L1.9 7.9 L1.9 26 L1.8 27.3 L1.7 28.7 L1.6 30 L1.4 31.4 L1.3 32.7 L1.1 34.1 L1 35.4 L0.8 36.8 L0.6 38.1 L0.4 39.5 L-0.4 39.5 L-0.6 38.1 L-0.8 36.8 L-1 35.4 L-1.1 34.1 L-1.3 32.7 L-1.4 31.4 L-1.6 30 L-1.7 28.7 L-1.8 27.3 L-1.9 26 L-1.9 7.9 L-1.9 7.2 L-1.9 6.6 L-1.8 5.9 L-1.8 5.3 L-1.7 4.6 L-1.7 4 L-1.6 3.3 L-1.4 2.6 L-1.3 2 L-1.1 1.3 L-0.8 0.7 Z","M1.7 15.2 L17.9 23.8 L17.9 25.2 L7.5 23 L1.7 23 Z M-1.7 23 L-7.5 23 L-17.9 25.2 L-17.9 23.8 L-1.7 15.2 Z","M1 32.4 L7.2 36.5 L7.2 38.2 L1 36.4 Z M-1 36.4 L-7.2 38.2 L-7.2 36.5 L-1 32.4 Z","M4.8 15.1 L4.8 14.9 L5.1 14.7 L5.4 14.6 L5.7 14.5 L6.1 14.6 L6.4 14.7 L6.6 14.9 L6.7 15.1 L6.5 18.8 L5 18.8 Z M-6.7 15.1 L-6.6 14.9 L-6.4 14.7 L-6.1 14.6 L-5.7 14.5 L-5.4 14.6 L-5.1 14.7 L-4.8 14.9 L-4.8 15.1 L-5 18.8 L-6.5 18.8 Z"],"L":39.5,"S":35.8,"eng":[[5.7,18.8],[-5.7,18.8]],"tip":[17.6,24.41],"by":18.33,"mk":"b","lr":[3.5,16.0],"w":3.76,"wr":[15.21,7.8],"fl":[[5.29,23.34,0.95,0.35],[9.49,23.7,0.8,0.35],[13.7,24.59,0.8,0.35]]},"767-300ER":{"d":["M0 0 L1.1 0.9 L1.4 1.8 L1.7 2.6 L1.9 3.5 L2.1 4.4 L2.2 5.3 L2.3 6.2 L2.4 7 L2.5 7.9 L2.5 8.8 L2.5 9.7 L2.5 10.6 L2.5 36.8 L2.4 38.6 L2.3 40.5 L2.1 42.3 L1.9 44.1 L1.7 45.9 L1.5 47.7 L1.3 49.5 L1.1 51.3 L0.8 53.1 L0.6 54.9 L-0.6 54.9 L-0.8 53.1 L-1.1 51.3 L-1.3 49.5 L-1.5 47.7 L-1.7 45.9 L-1.9 44.1 L-2.1 42.3 L-2.3 40.5 L-2.4 38.6 L-2.5 36.8 L-2.5 10.6 L-2.5 9.7 L-2.5 8.8 L-2.5 7.9 L-2.4 7 L-2.3 6.2 L-2.2 5.3 L-2.1 4.4 L-1.9 3.5 L-1.7 2.6 L-1.4 1.8 L-1.1 0.9 Z","M2.3 22.2 L23.8 36.2 L23.8 38.2 L8.8 33.2 L2.3 33.2 Z M-2.3 33.2 L-8.8 33.2 L-23.8 38.2 L-23.8 36.2 L-2.3 22.2 Z","M1.4 45.6 L9.3 51.1 L9.3 53.3 L1.4 50.8 Z M-1.4 50.8 L-9.3 53.3 L-9.3 51.1 L-1.4 45.6 Z","M6.5 23.1 L6.6 22.8 L6.9 22.5 L7.3 22.3 L7.8 22.2 L8.4 22.3 L8.8 22.5 L9.1 22.8 L9.2 23.1 L9 27.9 L6.7 27.9 Z M-9.2 23.1 L-9.1 22.8 L-8.8 22.5 L-8.4 22.3 L-7.8 22.2 L-7.3 22.3 L-6.9 22.5 L-6.6 22.8 L-6.5 23.1 L-6.7 27.9 L-9 27.9 Z"],"L":54.94,"S":47.57,"eng":[[7.8,27.8],[-7.8,27.8]],"tip":[23.48,36.79],"by":26.65,"mk":"b","lr":[4.1,23.1],"w":5.03,"wr":[22.25,11.0],"fl":[[7.04,33.69,1.27,0.49],[12.62,34.83,0.89,0.49],[18.2,36.64,0.8,0.49]]},"777-300ER":{"d":["M0 0 L1.3 1.1 L1.8 2.2 L2.1 3.3 L2.4 4.3 L2.6 5.4 L2.7 6.5 L2.9 7.6 L3 8.7 L3 9.8 L3.1 10.8 L3.1 11.9 L3.1 13 L3.1 51.6 L3 53.8 L2.8 56 L2.6 58.3 L2.4 60.5 L2.1 62.7 L1.9 65 L1.6 67.2 L1.3 69.4 L1 71.7 L0.7 73.9 L-0.7 73.9 L-1 71.7 L-1.3 69.4 L-1.6 67.2 L-1.9 65 L-2.1 62.7 L-2.4 60.5 L-2.6 58.3 L-2.8 56 L-3 53.8 L-3.1 51.6 L-3.1 13 L-3.1 11.9 L-3.1 10.8 L-3 9.8 L-3 8.7 L-2.9 7.6 L-2.7 6.5 L-2.6 5.4 L-2.4 4.3 L-2.1 3.3 L-1.8 2.2 L-1.3 1.1 Z","M2.9 29.9 L30.5 47.9 L32.4 50.2 L32.4 51.6 L12.6 43.9 L2.9 43.9 Z M-2.9 43.9 L-12.6 43.9 L-32.4 51.6 L-32.4 50.2 L-30.5 47.9 L-2.9 29.9 Z","M1.7 61.7 L10.8 68.3 L10.8 71 L1.7 68.3 Z M-1.7 68.3 L-10.8 71 L-10.8 68.3 L-1.7 61.7 Z","M8.4 31.4 L8.6 30.9 L9 30.6 L9.6 30.3 L10.4 30.2 L11.1 30.3 L11.8 30.6 L12.2 30.9 L12.3 31.4 L11.9 37.8 L8.8 37.8 Z M-12.3 31.4 L-12.2 30.9 L-11.8 30.6 L-11.1 30.3 L-10.4 30.2 L-9.6 30.3 L-9 30.6 L-8.6 30.9 L-8.4 31.4 L-8.8 37.8 L-11.9 37.8 Z"],"L":73.9,"S":64.8,"eng":[[10.4,37.8],[-10.4,37.8]],"tip":[32.1,50.85],"by":35.53,"mk":"b","lr":[4.7,30.7],"w":6.2,"wr":[29.93,14.0],"fl":[[9.35,44.48,1.56,0.63],[14.47,44.94,1.13,0.63],[19.6,46.53,0.87,0.63],[24.72,48.19,0.8,0.63]]},"787-9":{"d":["M0 0 L1.2 1 L1.7 2 L2 3 L2.2 4.1 L2.4 5.1 L2.6 6.1 L2.7 7.1 L2.8 8.1 L2.8 9.1 L2.9 10.2 L2.9 11.2 L2.9 12.2 L2.9 41.9 L2.8 44 L2.6 46.1 L2.4 48.2 L2.2 50.3 L2 52.4 L1.7 54.5 L1.5 56.5 L1.2 58.6 L0.9 60.7 L0.6 62.8 L-0.6 62.8 L-0.9 60.7 L-1.2 58.6 L-1.5 56.5 L-1.7 54.5 L-2 52.4 L-2.2 50.3 L-2.4 48.2 L-2.6 46.1 L-2.8 44 L-2.9 41.9 L-2.9 12.2 L-2.9 11.2 L-2.9 10.2 L-2.8 9.1 L-2.8 8.1 L-2.7 7.1 L-2.6 6.1 L-2.4 5.1 L-2.2 4.1 L-2 3 L-1.7 2 L-1.2 1 Z","M2.7 25.1 L28.2 42.4 L30.1 44.7 L30.1 45.8 L10.9 37.7 L2.7 37.7 Z M-2.7 37.7 L-10.9 37.7 L-30.1 45.8 L-30.1 44.7 L-28.2 42.4 L-2.7 25.1 Z","M1.6 52.1 L9.8 58 L9.8 60.6 L1.6 58.1 Z M-1.6 58.1 L-9.8 60.6 L-9.8 58 L-1.6 52.1 Z","M7.8 26.7 L8 26.3 L8.3 25.9 L8.9 25.7 L9.6 25.6 L10.3 25.7 L10.9 25.9 L11.3 26.3 L11.4 26.7 L11.1 32.6 L8.2 32.6 Z M-11.4 26.7 L-11.3 26.3 L-10.9 25.9 L-10.3 25.7 L-9.6 25.6 L-8.9 25.7 L-8.3 25.9 L-8 26.3 L-7.8 26.7 L-8.2 32.6 L-11.1 32.6 Z"],"L":62.8,"S":60.1,"eng":[[9.6,32.6],[-9.6,32.6]],"tip":[29.75,45.28],"by":30.16,"mk":"b","lr":[4.5,25.9],"w":5.8,"wr":[25.12,12.6],"fl":[[8.69,38.2,1.37,0.57],[13.44,39.0,1.0,0.57],[18.18,40.66,0.8,0.57],[22.93,42.38,0.8,0.57]]},"A319":{"d":["M0 0 L0.8 0.7 L1.1 1.4 L1.4 2.1 L1.5 2.8 L1.6 3.5 L1.8 4.2 L1.8 4.8 L1.9 5.5 L1.9 6.2 L2 6.9 L2 7.6 L2 8.3 L2 19.6 L1.9 21 L1.8 22.5 L1.6 23.9 L1.5 25.3 L1.4 26.7 L1.2 28.1 L1 29.6 L0.8 31 L0.6 32.4 L0.4 33.8 L-0.4 33.8 L-0.6 32.4 L-0.8 31 L-1 29.6 L-1.2 28.1 L-1.4 26.7 L-1.5 25.3 L-1.6 23.9 L-1.8 22.5 L-1.9 21 L-2 19.6 L-2 8.3 L-2 7.6 L-2 6.9 L-1.9 6.2 L-1.9 5.5 L-1.8 4.8 L-1.8 4.2 L-1.6 3.5 L-1.5 2.8 L-1.4 2.1 L-1.1 1.4 L-0.8 0.7 Z","M1.8 12.5 L17.9 20.7 L17.9 22.2 L7.1 19.5 L1.8 19.5 Z M-1.8 19.5 L-7.1 19.5 L-17.9 22.2 L-17.9 20.7 L-1.8 12.5 Z","M1.1 27.1 L6.2 30.2 L6.2 31.8 L1.1 30.9 Z M-1.1 30.9 L-6.2 31.8 L-6.2 30.2 L-1.1 27.1 Z","M5.1 12.6 L5.2 12.4 L5.4 12.2 L5.7 12 L6.1 12 L6.5 12 L6.8 12.2 L7 12.4 L7.1 12.6 L6.9 16.2 L5.3 16.2 Z M-7.1 12.6 L-7 12.4 L-6.8 12.2 L-6.5 12 L-6.1 12 L-5.7 12 L-5.4 12.2 L-5.2 12.4 L-5.1 12.6 L-5.3 16.2 L-6.9 16.2 Z"],"L":33.84,"S":35.8,"eng":[[6.1,16.2],[-6.1,16.2]],"tip":[17.6,21.32],"by":15.32,"mk":"a","lr":[3.6,13.3],"w":3.95,"wr":[12.52,7.0],"fl":[[5.36,19.81,0.83,0.32],[9.54,20.4,0.8,0.32],[13.72,21.45,0.8,0.32]]},"A320":{"d":["M0 0 L0.8 0.7 L1.1 1.4 L1.4 2.1 L1.5 2.8 L1.6 3.5 L1.8 4.2 L1.8 4.8 L1.9 5.5 L1.9 6.2 L2 6.9 L2 7.6 L2 8.3 L2 23.4 L1.9 24.8 L1.8 26.2 L1.6 27.6 L1.5 29 L1.4 30.5 L1.2 31.9 L1 33.3 L0.8 34.7 L0.6 36.1 L0.4 37.6 L-0.4 37.6 L-0.6 36.1 L-0.8 34.7 L-1 33.3 L-1.2 31.9 L-1.4 30.5 L-1.5 29 L-1.6 27.6 L-1.8 26.2 L-1.9 24.8 L-2 23.4 L-2 8.3 L-2 7.6 L-2 6.9 L-1.9 6.2 L-1.9 5.5 L-1.8 4.8 L-1.8 4.2 L-1.6 3.5 L-1.5 2.8 L-1.4 2.1 L-1.1 1.4 L-0.8 0.7 Z","M1.8 14.5 L17.9 22.7 L17.9 24.2 L7.1 21.5 L1.8 21.5 Z M-1.8 21.5 L-7.1 21.5 L-17.9 24.2 L-17.9 22.7 L-1.8 14.5 Z","M1.1 30.6 L6.2 33.7 L6.2 35.3 L1.1 34.4 Z M-1.1 34.4 L-6.2 35.3 L-6.2 33.7 L-1.1 30.6 Z","M5.1 14.5 L5.2 14.3 L5.4 14.1 L5.7 14 L6.1 13.9 L6.5 14 L6.8 14.1 L7 14.3 L7.1 14.5 L6.9 18.1 L5.3 18.1 Z M-7.1 14.5 L-7 14.3 L-6.8 14.1 L-6.5 14 L-6.1 13.9 L-5.7 14 L-5.4 14.1 L-5.2 14.3 L-5.1 14.5 L-5.3 18.1 L-6.9 18.1 Z"],"L":37.57,"S":35.8,"eng":[[6.1,18.1],[-6.1,18.1]],"tip":[17.6,23.26],"by":17.26,"mk":"a","lr":[3.6,15.3],"w":3.95,"wr":[14.46,7.0],"fl":[[5.36,21.76,0.83,0.32],[9.54,22.35,0.8,0.32],[13.72,23.39,0.8,0.32]]},"A321":{"d":["M0 0 L0.8 0.7 L1.1 1.4 L1.4 2.1 L1.5 2.8 L1.6 3.5 L1.8 4.2 L1.8 4.8 L1.9 5.5 L1.9 6.2 L2 6.9 L2 7.6 L2 8.3 L2 30.3 L1.9 31.7 L1.8 33.1 L1.6 34.6 L1.5 36 L1.4 37.4 L1.2 38.8 L1 40.2 L0.8 41.7 L0.6 43.1 L0.4 44.5 L-0.4 44.5 L-0.6 43.1 L-0.8 41.7 L-1 40.2 L-1.2 38.8 L-1.4 37.4 L-1.5 36 L-1.6 34.6 L-1.8 33.1 L-1.9 31.7 L-2 30.3 L-2 8.3 L-2 7.6 L-2 6.9 L-1.9 6.2 L-1.9 5.5 L-1.8 4.8 L-1.8 4.2 L-1.6 3.5 L-1.5 2.8 L-1.4 2.1 L-1.1 1.4 L-0.8 0.7 Z","M1.8 17.8 L17.9 26 L17.9 27.5 L7.1 24.8 L1.8 24.8 Z M-1.8 24.8 L-7.1 24.8 L-17.9 27.5 L-17.9 26 L-1.8 17.8 Z","M1.1 37.4 L6.2 40.5 L6.2 42.1 L1.1 41.2 Z M-1.1 41.2 L-6.2 42.1 L-6.2 40.5 L-1.1 37.4 Z","M5.1 17.9 L5.2 17.6 L5.4 17.4 L5.7 17.3 L6.1 17.3 L6.5 17.3 L6.8 17.4 L7 17.6 L7.1 17.9 L6.9 21.6 L5.3 21.6 Z M-7.1 17.9 L-7 17.6 L-6.8 17.4 L-6.5 17.3 L-6.1 17.3 L-5.7 17.3 L-5.4 17.4 L-5.2 17.6 L-5.1 17.9 L-5.3 21.6 L-6.9 21.6 Z"],"L":44.51,"S":35.8,"eng":[[6.1,21.6],[-6.1,21.6]],"tip":[17.6,26.6],"by":20.6,"mk":"a","lr":[3.6,18.6],"w":3.95,"wr":[17.8,7.0],"fl":[[5.36,25.1,0.83,0.32],[9.54,25.69,0.8,0.32],[13.72,26.73,0.8,0.32]]},"A321neo":{"d":["M0 0 L0.8 0.7 L1.1 1.4 L1.4 2.1 L1.5 2.8 L1.6 3.5 L1.8 4.2 L1.8 4.8 L1.9 5.5 L1.9 6.2 L2 6.9 L2 7.6 L2 8.3 L2 30.3 L1.9 31.7 L1.8 33.1 L1.6 34.6 L1.5 36 L1.4 37.4 L1.2 38.8 L1 40.2 L0.8 41.7 L0.6 43.1 L0.4 44.5 L-0.4 44.5 L-0.6 43.1 L-0.8 41.7 L-1 40.2 L-1.2 38.8 L-1.4 37.4 L-1.5 36 L-1.6 34.6 L-1.8 33.1 L-1.9 31.7 L-2 30.3 L-2 8.3 L-2 7.6 L-2 6.9 L-1.9 6.2 L-1.9 5.5 L-1.8 4.8 L-1.8 4.2 L-1.6 3.5 L-1.5 2.8 L-1.4 2.1 L-1.1 1.4 L-0.8 0.7 Z","M1.8 17.8 L17.9 26 L17.9 27.5 L7.1 24.8 L1.8 24.8 Z M-1.8 24.8 L-7.1 24.8 L-17.9 27.5 L-17.9 26 L-1.8 17.8 Z","M1.1 37.4 L6.2 40.5 L6.2 42.1 L1.1 41.2 Z M-1.1 41.2 L-6.2 42.1 L-6.2 40.5 L-1.1 37.4 Z","M4.9 17.6 L5 17.3 L5.3 17.1 L5.6 16.9 L6.1 16.9 L6.5 16.9 L6.9 17.1 L7.2 17.3 L7.3 17.6 L7 21.5 L5.2 21.5 Z M-7.3 17.6 L-7.2 17.3 L-6.9 17.1 L-6.5 16.9 L-6.1 16.9 L-5.6 16.9 L-5.3 17.1 L-5 17.3 L-4.9 17.6 L-5.2 21.5 L-7 21.5 Z"],"L":44.51,"S":35.8,"eng":[[6.1,21.5],[-6.1,21.5]],"tip":[17.6,26.6],"by":20.6,"mk":"a","lr":[3.6,18.6],"w":3.95,"wr":[17.8,7.0],"fl":[[5.36,25.1,0.83,0.32],[9.54,25.69,0.8,0.32],[13.72,26.73,0.8,0.32]]},"A330-200":{"d":["M0 0 L1.2 1 L1.6 2 L1.9 3 L2.2 4 L2.4 4.9 L2.5 5.9 L2.6 6.9 L2.7 7.9 L2.8 8.9 L2.8 9.9 L2.8 10.9 L2.8 11.8 L2.8 38.5 L2.7 40.5 L2.5 42.6 L2.4 44.6 L2.1 46.6 L1.9 48.7 L1.7 50.7 L1.4 52.7 L1.2 54.8 L0.9 56.8 L0.6 58.8 L-0.6 58.8 L-0.9 56.8 L-1.2 54.8 L-1.4 52.7 L-1.7 50.7 L-1.9 48.7 L-2.1 46.6 L-2.4 44.6 L-2.5 42.6 L-2.7 40.5 L-2.8 38.5 L-2.8 11.8 L-2.8 10.9 L-2.8 9.9 L-2.8 8.9 L-2.7 7.9 L-2.6 6.9 L-2.5 5.9 L-2.4 4.9 L-2.2 4 L-1.9 3 L-1.6 2 L-1.2 1 Z","M2.6 23.5 L30.1 40.1 L30.1 42.1 L10.9 34.1 L2.6 34.1 Z M-2.6 34.1 L-10.9 34.1 L-30.1 42.1 L-30.1 40.1 L-2.6 23.5 Z","M1.6 48.8 L9.7 54.1 L9.7 56.4 L1.6 54.2 Z M-1.6 54.2 L-9.7 56.4 L-9.7 54.1 L-1.6 48.8 Z","M8.4 25 L8.5 24.6 L8.8 24.3 L9.4 24.1 L9.9 24.1 L10.5 24.1 L11.1 24.3 L11.4 24.6 L11.5 25 L11.2 30.1 L8.7 30.1 Z M-11.5 25 L-11.4 24.6 L-11.1 24.3 L-10.5 24.1 L-9.9 24.1 L-9.4 24.1 L-8.8 24.3 L-8.5 24.6 L-8.4 25 L-8.7 30.1 L-11.2 30.1 Z"],"L":58.82,"S":60.3,"eng":[[9.9,30.1],[-9.9,30.1]],"tip":[29.85,40.69],"by":27.77,"mk":"a","lr":[4.4,24.3],"w":5.64,"wr":[23.53,10.6],"fl":[[8.66,34.52,1.11,0.48],[13.43,35.48,0.82,0.48],[18.21,37.44,0.8,0.48],[22.99,39.41,0.8,0.48]]},"A330-300":{"d":["M0 0 L1.2 1 L1.6 2 L1.9 3 L2.2 4 L2.4 4.9 L2.5 5.9 L2.6 6.9 L2.7 7.9 L2.8 8.9 L2.8 9.9 L2.8 10.9 L2.8 11.8 L2.8 43.4 L2.7 45.4 L2.5 47.4 L2.4 49.5 L2.1 51.5 L1.9 53.5 L1.7 55.5 L1.4 57.6 L1.2 59.6 L0.9 61.6 L0.6 63.7 L-0.6 63.7 L-0.9 61.6 L-1.2 59.6 L-1.4 57.6 L-1.7 55.5 L-1.9 53.5 L-2.1 51.5 L-2.4 49.5 L-2.5 47.4 L-2.7 45.4 L-2.8 43.4 L-2.8 11.8 L-2.8 10.9 L-2.8 9.9 L-2.8 8.9 L-2.7 7.9 L-2.6 6.9 L-2.5 5.9 L-2.4 4.9 L-2.2 4 L-1.9 3 L-1.6 2 L-1.2 1 Z","M2.6 26.4 L30.1 43 L30.1 45 L10.9 37 L2.6 37 Z M-2.6 37 L-10.9 37 L-30.1 45 L-30.1 43 L-2.6 26.4 Z","M1.6 53.8 L9.7 59.1 L9.7 61.4 L1.6 59.2 Z M-1.6 59.2 L-9.7 61.4 L-9.7 59.1 L-1.6 53.8 Z","M8.4 27.9 L8.5 27.5 L8.8 27.2 L9.4 27 L9.9 26.9 L10.5 27 L11.1 27.2 L11.4 27.5 L11.5 27.9 L11.2 33 L8.7 33 Z M-11.5 27.9 L-11.4 27.5 L-11.1 27.2 L-10.5 27 L-9.9 26.9 L-9.4 27 L-8.8 27.2 L-8.5 27.5 L-8.4 27.9 L-8.7 33 L-11.2 33 Z"],"L":63.66,"S":60.3,"eng":[[9.9,33.0],[-9.9,33.0]],"tip":[29.85,43.58],"by":30.66,"mk":"a","lr":[4.4,27.2],"w":5.64,"wr":[26.42,10.6],"fl":[[8.66,37.41,1.11,0.48],[13.43,38.37,0.82,0.48],[18.21,40.33,0.8,0.48],[22.99,42.3,0.8,0.48]]},"A340-300":{"d":["M0 0 L1.2 1 L1.6 2 L1.9 3 L2.2 4 L2.4 4.9 L2.5 5.9 L2.6 6.9 L2.7 7.9 L2.8 8.9 L2.8 9.9 L2.8 10.9 L2.8 11.8 L2.8 43.4 L2.7 45.4 L2.5 47.5 L2.4 49.5 L2.1 51.5 L1.9 53.5 L1.7 55.6 L1.4 57.6 L1.2 59.6 L0.9 61.7 L0.6 63.7 L-0.6 63.7 L-0.9 61.7 L-1.2 59.6 L-1.4 57.6 L-1.7 55.6 L-1.9 53.5 L-2.1 51.5 L-2.4 49.5 L-2.5 47.5 L-2.7 45.4 L-2.8 43.4 L-2.8 11.8 L-2.8 10.9 L-2.8 9.9 L-2.8 8.9 L-2.7 7.9 L-2.6 6.9 L-2.5 5.9 L-2.4 4.9 L-2.2 4 L-1.9 3 L-1.6 2 L-1.2 1 Z","M2.6 26.4 L30.1 43 L30.1 45 L10.9 37 L2.6 37 Z M-2.6 37 L-10.9 37 L-30.1 45 L-30.1 43 L-2.6 26.4 Z","M1.6 53.8 L9.7 59.1 L9.7 61.4 L1.6 59.2 Z M-1.6 59.2 L-9.7 61.4 L-9.7 59.1 L-1.6 53.8 Z","M6.4 27.1 L6.5 26.8 L6.8 26.6 L7.1 26.4 L7.5 26.4 L8 26.4 L8.3 26.6 L8.6 26.8 L8.6 27.1 L8.4 31.4 L6.7 31.4 Z M-8.6 27.1 L-8.6 26.8 L-8.3 26.6 L-8 26.4 L-7.5 26.4 L-7.1 26.4 L-6.8 26.6 L-6.5 26.8 L-6.4 27.1 L-6.7 31.4 L-8.4 31.4 Z M13.1 31.4 L13.2 31.2 L13.4 31 L13.8 30.8 L14.2 30.8 L14.6 30.8 L14.9 31 L15.2 31.2 L15.3 31.4 L15.1 35.8 L13.3 35.8 Z M-15.3 31.4 L-15.2 31.2 L-14.9 31 L-14.6 30.8 L-14.2 30.8 L-13.8 30.8 L-13.4 31 L-13.2 31.2 L-13.1 31.4 L-13.3 35.8 L-15.1 35.8 Z"],"L":63.69,"S":60.3,"eng":[[7.5,31.4],[-7.5,31.4],[14.2,35.8],[-14.2,35.8]],"tip":[29.85,43.59],"by":30.67,"mk":"a","lr":[4.4,27.2],"w":5.64,"wr":[26.43,10.6],"fl":[[8.66,37.42,1.11,0.48],[13.43,38.38,0.82,0.48],[18.21,40.34,0.8,0.48],[22.99,42.31,0.8,0.48]]},"A340-500":{"d":["M0 0 L1.2 1 L1.6 2 L1.9 3 L2.2 4 L2.4 4.9 L2.5 5.9 L2.6 6.9 L2.7 7.9 L2.8 8.9 L2.8 9.9 L2.8 10.9 L2.8 11.8 L2.8 47.6 L2.7 49.7 L2.5 51.7 L2.4 53.7 L2.1 55.8 L1.9 57.8 L1.7 59.8 L1.4 61.8 L1.2 63.9 L0.9 65.9 L0.6 67.9 L-0.6 67.9 L-0.9 65.9 L-1.2 63.9 L-1.4 61.8 L-1.7 59.8 L-1.9 57.8 L-2.1 55.8 L-2.4 53.7 L-2.5 51.7 L-2.7 49.7 L-2.8 47.6 L-2.8 11.8 L-2.8 10.9 L-2.8 9.9 L-2.8 8.9 L-2.7 7.9 L-2.6 6.9 L-2.5 5.9 L-2.4 4.9 L-2.2 4 L-1.9 3 L-1.6 2 L-1.2 1 Z","M2.6 27.9 L31.7 45.7 L31.7 47.8 L11.3 39.5 L2.6 39.5 Z M-2.6 39.5 L-11.3 39.5 L-31.7 47.8 L-31.7 45.7 L-2.6 27.9 Z","M1.6 57.4 L10.8 63.4 L10.8 65.8 L1.6 63.2 Z M-1.6 63.2 L-10.8 65.8 L-10.8 63.4 L-1.6 57.4 Z","M6.5 28.6 L6.6 28.3 L6.9 28 L7.4 27.8 L7.9 27.7 L8.5 27.8 L9 28 L9.3 28.3 L9.4 28.6 L9.1 33.7 L6.8 33.7 Z M-9.4 28.6 L-9.3 28.3 L-9 28 L-8.5 27.8 L-7.9 27.7 L-7.4 27.8 L-6.9 28 L-6.6 28.3 L-6.5 28.6 L-6.8 33.7 L-9.1 33.7 Z M13.5 33.3 L13.6 32.9 L13.9 32.6 L14.4 32.5 L14.9 32.4 L15.5 32.5 L15.9 32.6 L16.2 32.9 L16.4 33.3 L16.1 38.4 L13.8 38.4 Z M-16.4 33.3 L-16.2 32.9 L-15.9 32.6 L-15.5 32.5 L-14.9 32.4 L-14.4 32.5 L-13.9 32.6 L-13.6 32.9 L-13.5 33.3 L-13.8 38.4 L-16.1 38.4 Z"],"L":67.93,"S":63.45,"eng":[[7.9,33.7],[-7.9,33.7],[14.9,38.4],[-14.9,38.4]],"tip":[31.43,46.3],"by":32.49,"mk":"a","lr":[4.4,28.7],"w":5.64,"wr":[27.85,11.6],"fl":[[9.0,39.88,1.23,0.52],[14.05,40.88,0.91,0.52],[19.1,42.91,0.8,0.52],[24.15,44.98,0.8,0.52]]},"A340-600":{"d":["M0 0 L1.2 1 L1.6 2 L1.9 3 L2.2 4 L2.4 4.9 L2.5 5.9 L2.6 6.9 L2.7 7.9 L2.8 8.9 L2.8 9.9 L2.8 10.9 L2.8 11.8 L2.8 55.1 L2.7 57.1 L2.5 59.1 L2.4 61.1 L2.1 63.2 L1.9 65.2 L1.7 67.2 L1.4 69.3 L1.2 71.3 L0.9 73.3 L0.6 75.4 L-0.6 75.4 L-0.9 73.3 L-1.2 71.3 L-1.4 69.3 L-1.7 67.2 L-1.9 65.2 L-2.1 63.2 L-2.4 61.1 L-2.5 59.1 L-2.7 57.1 L-2.8 55.1 L-2.8 11.8 L-2.8 10.9 L-2.8 9.9 L-2.8 8.9 L-2.7 7.9 L-2.6 6.9 L-2.5 5.9 L-2.4 4.9 L-2.2 4 L-1.9 3 L-1.6 2 L-1.2 1 Z","M2.6 31.6 L31.7 49.5 L31.7 51.6 L11.3 43.2 L2.6 43.2 Z M-2.6 43.2 L-11.3 43.2 L-31.7 51.6 L-31.7 49.5 L-2.6 31.6 Z","M1.6 64.8 L10.8 70.8 L10.8 73.2 L1.6 70.6 Z M-1.6 70.6 L-10.8 73.2 L-10.8 70.8 L-1.6 64.8 Z","M6.5 32.4 L6.6 32.1 L6.9 31.8 L7.4 31.6 L7.9 31.5 L8.5 31.6 L9 31.8 L9.3 32.1 L9.4 32.4 L9.1 37.5 L6.8 37.5 Z M-9.4 32.4 L-9.3 32.1 L-9 31.8 L-8.5 31.6 L-7.9 31.5 L-7.4 31.6 L-6.9 31.8 L-6.6 32.1 L-6.5 32.4 L-6.8 37.5 L-9.1 37.5 Z M13.5 37.1 L13.6 36.7 L13.9 36.5 L14.4 36.3 L14.9 36.2 L15.5 36.3 L15.9 36.5 L16.2 36.7 L16.4 37.1 L16.1 42.2 L13.8 42.2 Z M-16.4 37.1 L-16.2 36.7 L-15.9 36.5 L-15.5 36.3 L-14.9 36.2 L-14.4 36.3 L-13.9 36.5 L-13.6 36.7 L-13.5 37.1 L-13.8 42.2 L-16.1 42.2 Z"],"L":75.36,"S":63.45,"eng":[[7.9,37.5],[-7.9,37.5],[14.9,42.2],[-14.9,42.2]],"tip":[31.43,50.1],"by":36.29,"mk":"a","lr":[4.4,32.5],"w":5.64,"wr":[31.65,11.6],"fl":[[9.0,43.68,1.23,0.52],[14.05,44.68,0.91,0.52],[19.1,46.71,0.8,0.52],[24.15,48.78,0.8,0.52]]},"A350-900":{"d":["M0 0 L1.2 1 L1.7 2.1 L2 3.1 L2.3 4.2 L2.5 5.2 L2.6 6.3 L2.8 7.3 L2.8 8.3 L2.9 9.4 L3 10.4 L3 11.5 L3 12.5 L3 45.3 L2.9 47.5 L2.7 49.6 L2.5 51.8 L2.3 53.9 L2 56.1 L1.8 58.2 L1.5 60.4 L1.2 62.5 L0.9 64.7 L0.7 66.8 L-0.7 66.8 L-0.9 64.7 L-1.2 62.5 L-1.5 60.4 L-1.8 58.2 L-2 56.1 L-2.3 53.9 L-2.5 51.8 L-2.7 49.6 L-2.9 47.5 L-3 45.3 L-3 12.5 L-3 11.5 L-3 10.4 L-2.9 9.4 L-2.8 8.3 L-2.8 7.3 L-2.6 6.3 L-2.5 5.2 L-2.3 4.2 L-2 3.1 L-1.7 2.1 L-1.2 1 Z","M2.7 26.7 L30.4 44.7 L32.4 47.1 L32.4 48.2 L11.6 39.1 L2.7 39.1 Z M-2.7 39.1 L-11.6 39.1 L-32.4 48.2 L-32.4 47.1 L-30.4 44.7 L-2.7 26.7 Z","M1.6 56.1 L9.9 61.9 L9.9 64.4 L1.6 61.9 Z M-1.6 61.9 L-9.9 64.4 L-9.9 61.9 L-1.6 56.1 Z","M8.9 28.6 L9 28.1 L9.4 27.8 L10 27.6 L10.7 27.5 L11.4 27.6 L12 27.8 L12.3 28.1 L12.5 28.6 L12.1 34.5 L9.2 34.5 Z M-12.5 28.6 L-12.3 28.1 L-12 27.8 L-11.4 27.6 L-10.7 27.5 L-10 27.6 L-9.4 27.8 L-9 28.1 L-8.9 28.6 L-9.2 34.5 L-12.1 34.5 Z"],"L":66.8,"S":64.75,"eng":[[10.7,34.5],[-10.7,34.5]],"tip":[32.08,47.7],"by":31.68,"mk":"a","lr":[4.6,27.5],"w":5.96,"wr":[26.72,12.4],"fl":[[9.26,39.58,1.31,0.56],[14.4,40.51,0.94,0.56],[19.53,42.43,0.8,0.56],[24.67,44.39,0.8,0.56]]}};
    const LIV = [{"b":"#f4f5f6","e":"#d5dade"},{"b":"#f4f5f6","e":"#d5dade","t":"#0e8c94","w":["tail","#0e8c94"]},{"b":"#f4f5f6","e":"#d5dade","t":"#1b0088"},{"b":"#f4f5f6","e":"#d5dade","t":"#5fb4e3","w":[0.64,"#8fcdee"]},{"b":"#f4f5f6","e":"#1b1b1b","belly":"#1b1b1b","rd":1},{"b":"#d8dbdd","e":"#d5dade"},{"b":"#f4f5f6","e":"#1f4e96"},{"b":"#d2dfe5","e":"#d2dfe5"}]; // liveries as seen from underneath, one per airline and era
    // the maple leaf in Air Canada's belly rondelle (unit size, stem towards the tail)
    const LEAF = new Path2D('M0 -1L.12 -.72L.3 -.82L.24 -.4L.5 -.62L.46 -.48L.78 -.52L.68 -.3L.86 -.22L.5 .08L.56 .24L.06 .16L.07 .6L-.07 .6L-.06 .16L-.56 .24L-.5 .08L-.86 -.22L-.68 -.3L-.78 -.52L-.46 -.48L-.5 -.62L-.24 -.4L-.3 -.82L-.12 -.72Z');
    const F = [["787-9",348,1,0],["787-9",12,0,0],["737-800",42,0,0],["737 MAX 8",296,1,1],["A350-900",320,0,0],["737-800",197,1,1],["A320",163,0,2],["A320",107,0,2],["A319",286,0,2],["A319",344,0,2],["737 MAX 8",13,0,1],["A330-200",300,0,3],["A321neo",65,1,3],["A321neo",71,0,3],["A321neo",49,1,3],["A321neo",297,0,3],["777-300ER",296,1,4],["777-300ER",309,0,4],["A321neo",255,0,5],["A330-300",70,0,0],["737-800",283,0,0],["737-800",250,0,0],["A321neo",63,0,5],["787-9",40,0,4],["A321",84,0,4],["767-300ER",182,1,0],["A321",1,0,0],["737-800",185,1,6],["737-800",4,0,6],["737-700",197,1,0],["737-800",13,0,0],["A320",12,0,0],["737-800",231,0,0],["737-800",44,0,0],["787-9",12,0,0],["737-700",186,1,0],["767-300ER",182,1,7],["A321",2,0,7],["737-800",13,0,0],["737-700",241,0,0],["A320",194,0,0],["A340-600",348,1,0],["737-800",231,0,0],["737-800",44,0,0],["A340-600",12,0,0],["A340-500",348,1,7],["737-800",231,0,0],["737-800",44,0,0],["A340-300",12,0,7]];
    const reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const KM = 0.28;
    const seeded = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const sprite = (rgb, stops) => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const x = c.getContext('2d'), gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
      for (const [o, a] of stops) gr.addColorStop(o, 'rgba(' + rgb + ',' + a + ')');
      x.fillStyle = gr;
      x.fillRect(0, 0, 64, 64);
      return c;
    };
    const PUFF = sprite('255,255,255', [[0, 1], [0.3, 0.7], [0.55, 0.3], [0.8, 0.07], [1, 0]]);
    const GLOW = {
      r: sprite('255,78,60', [[0, 0.95], [0.22, 0.4], [1, 0]]),
      g: sprite('90,255,190', [[0, 0.9], [0.22, 0.32], [1, 0]]),
      w: sprite('255,255,255', [[0, 1], [0.18, 0.45], [1, 0]]),
    };
    const shapes = {};
    const g = { st: null, tr: null, fx: null, s: null, t: null, f: null, W: 0, H: 0, n: 0, lookAt: 0, dirty: false, stars: [], grid: new Map() };
    let passes = [], order = [], timer = 0, raf = 0, idle = 0, lastTrail = -1e9;

    const paintStars = () => {
      const r = seeded(9569), x = g.s, n = Math.round(g.W * g.H / 14000);
      x.clearRect(0, 0, g.W, g.H);
      g.stars = [];
      g.grid = new Map();
      for (let i = 0; i < n; i++) {
        const px = r() * g.W, py = r() * g.H, m = r(), tint = r(), a = (0.12 + 0.5 * m * m) * (NIGHT ? 1 - 0.55 * Math.pow(py / g.H, 3) : 1), rad = 0.45 + 0.7 * m * m;
        const rgb = tint < 0.1 ? '255,224,190' : tint < 0.2 ? '200,218,255' : '255,255,255';
        x.fillStyle = 'rgba(' + rgb + ',' + a.toFixed(3) + ')';
        x.beginPath();
        x.arc(px, py, rad, 0, 6.2832);
        x.fill();
        const star = [px, py, rad, a, rgb, -1e9], key = ((px / 32) | 0) + ',' + ((py / 32) | 0);
        g.stars.push(star);
        if (!g.grid.has(key)) g.grid.set(key, []);
        g.grid.get(key).push(star);
      }
      if (NIGHT) paintReal(x);
    };
    // A couple of real constellations, their stars at their real brightness and true shape, each kept in its own
    // spot so it's always there: the great bear (with the big dipper) upper right, the twins of Gemini upper left.
    // Laid out as you'd see them looking up (north at the top, east on the left).
    const PXD = 8.5; // px per degree
    const TINTS = { w: '255,255,255', b: '208,222,255', y: '255,244,216', o: '255,214,168', r: '255,190,155' };
    const SGLOW = {};
    for (const k in TINTS) SGLOW[k] = sprite(TINTS[k], [[0, 0.9], [0.2, 0.32], [1, 0]]);
    const paintReal = (x) => {
      const D2R = Math.PI / 180, R2D = 180 / Math.PI;
      g.real = CAT.map(([ra, dec, mag, tint, gi]) => {
        const [ra0h, de0d, fromRight, gx, gy] = GRP[gi], ra0 = ra0h * 15 * D2R, de0 = de0d * D2R, cx = fromRight ? g.W - gx : gx, cy = gy;
        const a1 = ra * 15 * D2R - ra0, d1 = dec * D2R; // orthographic about the group's centre, so the figure keeps its true shape
        const ex = Math.cos(d1) * Math.sin(a1), ny = Math.sin(d1) * Math.cos(de0) - Math.cos(d1) * Math.sin(de0) * Math.cos(a1);
        const px = cx - ex * R2D * PXD, py = cy - ny * R2D * PXD;
        // a touch brighter than the background stars, but only a touch
        const rad = Math.max(0.5, Math.min(2.1, 1.8 - 0.32 * mag)), a = Math.max(0.36, Math.min(1, 0.98 - 0.15 * mag)), rgb = TINTS[tint];
        if (mag < 2.2) { x.globalAlpha = 0.2 * (2.4 - mag) / 2.4; x.drawImage(SGLOW[tint], px - rad * 4, py - rad * 4, rad * 8, rad * 8); }
        x.globalAlpha = a;
        x.fillStyle = 'rgb(' + rgb + ')';
        x.beginPath();
        x.arc(px, py, rad, 0, 6.2832);
        x.fill();
        x.globalAlpha = 1;
        const star = [px, py, rad, a, rgb, -1e9], key = ((px / 32) | 0) + ',' + ((py / 32) | 0);
        g.stars.push(star);
        if (!g.grid.has(key)) g.grid.set(key, []);
        g.grid.get(key).push(star);
        return [px, py, rad];
      });
      lnKick();
    };
    // Constellation figures: always there as faint lines; when the cursor wanders near one it brightens and its name
    // fades in, then both settle back after it leaves. Drawn on their own layer (under the clouds, like the stars).
    const conOn = CON.map(() => ({ o: 0, tgt: 0 })), REST = 0; // like the real sky: no lines until you go looking
    let lnRaf = 0;
    const lnFrame = () => {
      lnRaf = 0;
      const x = g.l;
      if (!x || !g.real) return;
      let moving = false;
      x.clearRect(0, 0, g.W, g.H);
      const lines = new Map(), names = [];
      CON.forEach(([label, segs], ci) => {
        const st = conOn[ci], target = this._dark ? (st.tgt ? 1 : REST) : 0; // always faintly there, brighter on hover
        st.o += (target - st.o) * (target > st.o ? 0.12 : 0.035);
        if (Math.abs(target - st.o) > 0.01) moving = true; else st.o = target;
        if (st.o < 0.01) return;
        let sx = 0, n = 0, low = -1e9;
        for (const [i, j] of segs) {
          const a = g.real[i], b = g.real[j];
          if (!a || !b) continue;
          const key = i + '-' + j;
          lines.set(key, Math.max(lines.get(key) || 0, st.o)); // a line two figures share is drawn once
          sx += a[0] + b[0];
          n += 2;
          low = Math.max(low, a[1], b[1]);
        }
        if (n) names.push([label, sx / n, low, st.o]);
      });
      x.strokeStyle = 'rgba(170,190,240,0.36)';
      x.lineWidth = 0.7;
      for (const [key, o] of lines) {
        const [i, j] = key.split('-').map(Number), a = g.real[i], b = g.real[j];
        const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
        if (L < 16) continue;
        const ux = dx / L, uy = dy / L, ga = 4 + a[2] * 2, gb = 4 + b[2] * 2; // a small gap at each star, like a chart
        x.globalAlpha = o;
        x.beginPath();
        x.moveTo(a[0] + ux * ga, a[1] + uy * ga);
        x.lineTo(b[0] - ux * gb, b[1] - uy * gb);
        x.stroke();
      }
      x.font = 'italic 11px Inter, system-ui, sans-serif';
      x.textAlign = 'center';
      x.fillStyle = 'rgba(170,186,222,0.6)';
      for (const [label, mx, low, o] of names) { // names only come up on hover
        x.globalAlpha = Math.max(0, (o - REST) / (1 - REST));
        x.fillText(label, Math.max(40, Math.min(g.W - 40, mx)), Math.min(g.H - 8, low + 20));
      }
      x.globalAlpha = 1;
      if (moving) lnRaf = requestAnimationFrame(lnFrame);
    };
    const lnKick = () => { if (NIGHT && !lnRaf) lnRaf = requestAnimationFrame(lnFrame); };
    const segDist = (px, py, a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], L2 = dx * dx + dy * dy || 1;
      const t = Math.max(0, Math.min(1, ((px - a[0]) * dx + (py - a[1]) * dy) / L2));
      return Math.hypot(px - a[0] - dx * t, py - a[1] - dy * t);
    };
    const near = (px, py) => { // which figures the cursor is close to (a star of it, or one of its lines)
      if (!g.real) return;
      CON.forEach(([, segs, trig], ci) => {
        // a figure that wakes from only some of its lines (the bear, from its head and legs) ignores the stars it
        // shares with the rest (the dipper's), so hovering the dipper shows just the dipper
        const use = trig ? trig.map((k) => segs[k]) : segs, shared = new Set(trig ? segs.filter((_, k) => trig.indexOf(k) < 0).flat() : []);
        let d = 1e9;
        for (const [i, j] of use) {
          const a = g.real[i], b = g.real[j];
          if (!a || !b) continue;
          d = Math.min(d, segDist(px, py, a, b));
          if (!shared.has(i)) d = Math.min(d, Math.hypot(px - a[0], py - a[1]) - 20);
          if (!shared.has(j)) d = Math.min(d, Math.hypot(px - b[0], py - b[1]) - 20);
        }
        const on = conOn[ci].tgt ? d < 46 : d < 22; // easier to keep than to catch, so it doesn't flicker at the edge
        if (on !== !!conOn[ci].tgt) { conOn[ci].tgt = on ? 1 : 0; lnKick(); }
      });
    };
    const bind = () => { // the template owns the canvases; pick them up again if they were replaced or resized
      const st = this._starsEl, tr = this._trailEl, fx = this._fxEl;
      if (!st || !tr || !fx) return false;
      const ln = this._linesEl || null, fresh = st !== g.st || tr !== g.tr || fx !== g.fx || ln !== g.ln;
      if (!fresh && !g.force && g.n++ % 30) return true;
      g.force = false;
      const box = tr.parentElement; // measure the sky itself: the trail canvas is hidden at night
      const W = box ? box.clientWidth : 0, H = box ? box.clientHeight : 0;
      if (!W || !H) return false;
      if (fresh || W !== g.W || H !== g.H) {
        g.st = st; g.tr = tr; g.fx = fx; g.W = W; g.H = H;
        st.width = W; st.height = H; tr.width = W; tr.height = H; fx.width = W; fx.height = H;
        g.s = st.getContext('2d');
        g.t = tr.getContext('2d');
        g.f = fx.getContext('2d');
        g.ln = ln;
        g.l = null;
        if (ln) { ln.width = W; ln.height = H; g.l = ln.getContext('2d'); }
        paintStars();
        place();
      }
      return true;
    };

    // Clouds (light mode), seen the way we see the planes: from the ground, looking straight up. No flat bases or
    // side profiles, just irregular patches with torn, wispy edges, greyer where they're thickest, all drifting with
    // one wind (mostly east, which is left from down here). They're lower than the planes, so planes pass behind them.
    // Each is painted once and moved on a compositor animation, so nothing redraws while they drift.
    const NC = 5, cl = [], wa = Math.PI + (Math.random() - 0.5) * 1.4;
    g.wind = [Math.cos(wa), Math.sin(wa)];
    const noise = (seed) => { // smooth value noise on a wrapping 64x64 lattice
      const r = seeded(seed), L = new Float32Array(4096);
      for (let i = 0; i < 4096; i++) L[i] = r();
      const at = (x, y) => L[((y & 63) << 6) + (x & 63)];
      return (x, y) => {
        const xi = Math.floor(x), yi = Math.floor(y), fx = x - xi, fy = y - yi;
        const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
        const a = at(xi, yi), b = at(xi + 1, yi), c = at(xi, yi + 1), d = at(xi + 1, yi + 1);
        return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
      };
    };
    const shape = (i) => {
      const r = seeded(4271 + i * 977);
      const size = i === 0 ? 560 + r() * 160 : i < 3 ? 320 + r() * 160 : 160 + r() * 110;
      return { seed: 77 + i * 131, size, asp: 0.36 + r() * 0.26, lane: i + 0.25 + 0.5 * r(), v: 6 + r() * 2.5, t0: r() * 1000,
        el: null, an: null, key: '' };
    };
    const paintCloud = (c, el, night) => {
      const S = 0.4, nz = noise(c.seed), [ca, sa] = g.wind, ex = c.size / 2, ey = c.size * c.asp / 2;
      const fb = (x, y, o) => { let n = 0, amp = 0.5, f = 1; for (let k = 0; k < o; k++) { n += amp * nz(x * f, y * f); f *= 2.05; amp *= 0.5; } return n; };
      c.bw = Math.ceil(2 * Math.hypot(ex * ca, ey * sa)) + 60;
      c.bh = Math.ceil(2 * Math.hypot(ex * sa, ey * ca)) + 60;
      const gw = Math.ceil(c.bw * S), gh = Math.ceil(c.bh * S), sc = 62 + c.size * 0.08; // small clouds get finer detail
      el.width = gw;
      el.height = gh;
      el.style.width = c.bw + 'px';
      el.style.height = c.bh + 'px';
      const x2 = el.getContext('2d'), img = x2.createImageData(gw, gh), D = img.data;
      for (let y = 0; y < gh; y++) {
        for (let x = 0; x < gw; x++) {
          const px = x / S - c.bw / 2, py = y / S - c.bh / 2, u = px / sc, w = py / sc;
          const qx = fb(u * 0.8 + 3.1, w * 0.8 + 1.7, 3) - 0.44, qy = fb(u * 0.8 + 8.3, w * 0.8 + 4.2, 3) - 0.44; // warp: torn outline
          const a = (px * ca + py * sa) / ex + qx * 1.15, b = (-px * sa + py * ca) / ey + qy * 1.15; // stretched along the wind
          const mask = 1 - (a * a + b * b);
          if (mask < -0.6) continue;
          const n = fb(u * 2 + qx * 2.4, w * 2 + qy * 2.4, 5);
          const d = Math.min(1, mask * 1.1 + (n - 0.47) * 1.45 - 0.18);
          if (d <= 0) continue;
          const cell = fb(u * 3.4 + 11, w * 3.4 + 7, 3); // the lumpy cells you see on a cloud's underside
          const k = (y * gw + x) * 4;
          if (night) {
            const u2 = Math.min(1, Math.pow(d, 1.1) * (0.55 + 0.8 * cell));
            D[k] = 20 + 34 * u2;
            D[k + 1] = 24 + 25 * u2;
            D[k + 2] = 36 + 14 * u2;
            D[k + 3] = 240 * Math.min(1, d / 0.3);
            continue;
          }
          const t = Math.min(0.32, 0.3 * Math.pow(d, 1.3) * Math.max(0.15, 0.2 + 1.45 * (cell - 0.25)));
          D[k] = 255 - 117 * t;
          D[k + 1] = 255 - 107 * t;
          D[k + 2] = 255 - 90 * t;
          D[k + 3] = 255 * Math.min(1, d / 0.3);
        }
      }
      x2.putImageData(img, 0, 0);
    };
    const place = () => {
      if (!g.W) return;
      const n = Math.max(2, Math.min(NC, Math.round(g.W * g.H / 520000))), key = g.W + 'x' + g.H;
      const [wx, wy] = g.wind, cx = [0, g.W, 0, g.W], cy = [0, 0, g.H, g.H];
      const along = cx.map((x, j) => x * wx + cy[j] * wy), across = cx.map((x, j) => -x * wy + cy[j] * wx);
      const s0 = Math.min(...along), s1 = Math.max(...along), q0 = Math.min(...across), q1 = Math.max(...across);
      for (let i = 0; i < NC; i++) {
        const el = this['_cloud' + i];
        if (!el) continue;
        if (i >= n) { el.style.display = 'none'; continue; }
        const c = cl[i] || (cl[i] = shape(i));
        const mode = NIGHT && this._dark ? 1 : 0;
        if (c.el === el && c.key === key && c.mode === mode) continue;
        if (c.el !== el || c.mode !== mode) { paintCloud(c, el, mode === 1); c.mode = mode; }
        c.el = el;
        c.key = key;
        el.style.display = '';
        const R = Math.hypot(c.bw, c.bh) / 2, q = q0 + (q1 - q0) * c.lane / n, a = s0 - R, b = s1 + R, dur = (b - a) / c.v;
        const at = (sv) => 'translate(' + (wx * sv - wy * q - c.bw / 2).toFixed(1) + 'px,' + (wy * sv + wx * q - c.bh / 2).toFixed(1) + 'px)';
        const phase = ((performance.now() / 1000 + c.t0) % dur) / dur;
        if (c.an) c.an.cancel();
        if (reduce || this._skyStill) { el.style.transform = at(a + (b - a) * phase); continue; } // still sky: park it
        c.an = el.animate([{ transform: at(a) }, { transform: at(b) }], { duration: dur * 1000, iterations: Infinity });
        c.an.currentTime = phase * dur * 1000;
      }
    };
    g.mode = -1;
    const themeWatch = NIGHT ? setInterval(() => { // clouds change colour with the theme
      const m = this._dark ? 1 : 0;
      if (m !== g.mode && bind()) { g.mode = m; place(); lnKick(); }
    }, 200) : 0;
    const onResize = () => { g.force = true; if (bind()) place(); };
    window.addEventListener('resize', onResize);
    const keep = setInterval(() => { if (bind()) place(); }, 2000); // re-attach if the page swapped its elements

    // one aircraft on its own small canvas, moved with a transform
    const drawPlane = (p, el, t, dark) => {
      const B = p.B, dpr = p.dpr;
      if (el !== p.el) {
        p.el = el;
        el.width = el.height = Math.round(B * dpr);
        el.style.width = el.style.height = B + 'px';
      }
      const px = p.x0 + p.vx * t, py = p.y0 + p.vy * t;
      el.style.transform = 'translate(' + (px - B / 2).toFixed(2) + 'px,' + (py - B / 2).toFixed(2) + 'px)';
      el.style.display = 'block';
      const ctx = el.getContext('2d'), ty = p.type, k = p.k, c = p.hc, s = p.hs, h = B / 2;
      // The underside, in its airline's livery: wings and tailplane, the flap-track fairings under the trailing edge,
      // nacelles, the wing-to-body fairing bulging a little past the fuselage, the fuselage (with any rear wrap, or Air
      // Canada's black belly and rondelle), rounded off with shading, all in the plane's own shadow. Drawn once per
      // plane, so the detail costs nothing per frame; on the low departures you can actually see it.
      const body = (x, night) => {
        const lv = p.liv || {}, [fus, wing, tail, eng] = shapes[p.name] || (shapes[p.name] = ty.d.map((d) => new Path2D(d)));
        const Wd = ty.w, wy = ty.wr[0], cr = ty.wr[1], L = ty.L, S = ty.S;
        x.save();
        x.translate(h, h);
        x.scale(-1, 1);
        x.rotate(p.hdg);
        x.scale(k, k);
        x.translate(0, -L / 2);
        x.fillStyle = '#e9ecf0';
        x.fill(wing);
        x.fill(tail);
        if (lv.t) for (const sg of [-1, 1]) { // coloured winglets
          x.save();
          x.beginPath();
          x.rect(sg > 0 ? S / 2 - 1.6 : -S / 2 - 98.4, -1e3, 100, 3e3);
          x.clip();
          x.fillStyle = lv.t;
          x.fill(wing);
          x.restore();
        }
        x.fillStyle = '#c4cad1';
        for (const [fx, fy, fl, fw] of ty.fl) for (const sg of [-1, 1]) { x.beginPath(); x.ellipse(sg * fx, fy, fw, fl, 0, 0, 6.2832); x.fill(); }
        x.fillStyle = lv.e || '#d5dade';
        x.fill(eng);
        x.fillStyle = lv.belly || '#e2e6ea';
        x.beginPath();
        x.ellipse(0, wy + cr * 0.45, Wd * 0.56, cr * 0.62, 0, 0, 6.2832);
        x.fill();
        x.fillStyle = lv.b || '#f4f5f6';
        x.fill(fus);
        x.save();
        x.clip(fus);
        if (lv.w) { x.fillStyle = lv.w[1]; x.fillRect(-50, lv.w[0] === 'tail' ? L - 3.6 * Wd * 1.05 : lv.w[0] * L, 100, L); }
        if (lv.belly) { // black from the nose back, narrowing to an end before the white tail cone
          const hw = Wd * 0.36, y1 = L * 0.86;
          x.fillStyle = lv.belly;
          x.beginPath();
          x.moveTo(-hw, 0);
          x.lineTo(hw, 0);
          x.lineTo(hw, y1 - Wd * 2.2);
          x.quadraticCurveTo(hw * 0.7, y1, 0, y1);
          x.quadraticCurveTo(-hw * 0.7, y1, -hw, y1 - Wd * 2.2);
          x.closePath();
          x.fill();
        }
        const gr = x.createLinearGradient(-Wd / 2, 0, Wd / 2, 0); // a round body: darker towards its edges
        gr.addColorStop(0, 'rgba(20,28,40,0.38)');
        gr.addColorStop(0.32, 'rgba(20,28,40,0)');
        gr.addColorStop(0.68, 'rgba(20,28,40,0)');
        gr.addColorStop(1, 'rgba(20,28,40,0.38)');
        x.fillStyle = gr;
        x.fillRect(-Wd, -1, 2 * Wd, L + 2);
        x.restore();
        if (lv.rd) { // the red rondelle with its maple leaf, between the wings
          const ry = wy + cr * 0.3, rr = Wd * 0.3;
          x.fillStyle = '#d22630';
          x.beginPath();
          x.arc(0, ry, rr, 0, 6.2832);
          x.fill();
          if (rr * k * p.dpr > 6) { // the leaf only once it's big enough to read; from further off it's just a red disc
            x.save();
            x.translate(0, ry);
            x.scale(rr * 0.6, rr * 0.6);
            x.fillStyle = lv.belly;
            x.fill(LEAF);
            x.restore();
          }
        }
        x.globalCompositeOperation = 'source-atop'; // only over the plane itself
        x.fillStyle = night ? 'rgba(255,168,110,0.25)' : 'rgba(30,40,58,0.3)'; // its own shadow by day, city light by night
        x.fillRect(-S, -L, 2 * S, 3 * L);
        x.restore();
        if (night) { // at night only a faint glimpse of it, lit from below
          x.save();
          x.setTransform(1, 0, 0, 1, 0, 0);
          x.globalCompositeOperation = 'destination-in';
          x.fillStyle = 'rgba(0,0,0,0.24)';
          x.fillRect(0, 0, x.canvas.width, x.canvas.height);
          x.restore();
        }
      };
      if (!dark) { // a daytime plane never changes, so it's drawn once and then only moved
        if (p.drawn !== el) {
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, B, B);
          body(ctx, false);
          p.drawn = el;
        }
        return;
      }
      p.drawn = null; // at night the lights blink, so it's redrawn each frame
      const x = ctx;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
      x.clearRect(0, 0, B, B);
      if (p.low) { // a low plane over the city, its belly faintly lit by the lights below: painted once, reused
        if (!p.lit) {
          const cv = document.createElement('canvas'), cx2 = cv.getContext('2d');
          cv.width = cv.height = Math.round(B * dpr);
          cx2.setTransform(dpr, 0, 0, dpr, 0, 0);
          body(cx2, true);
          p.lit = cv;
        }
        x.drawImage(p.lit, 0, 0, B, B);
      }
      // Night: only the lights, as you'd see them from the ground at cruise height. The steady nav lights (red
      // port tip, bluish aviation green starboard tip, white tail) are faint pinpricks; what you actually notice are
      // the strobes, a white burst that fades in a blink (Boeing single, Airbus double), and the red beacon pulsing
      // underneath about 45 times a minute.
      const at = (lx, ly) => { const X = lx * k, Y = (ly - ty.L / 2) * k; return [h - (X * c - Y * s), h + (X * s + Y * c)]; };
      const lamp = ([lx, ly], glow, r, a, core, cr) => {
        if (a <= 0.01) return;
        x.globalAlpha = Math.min(1, a);
        x.drawImage(GLOW[glow], lx - r, ly - r, 2 * r, 2 * r);
        x.fillStyle = core;
        x.beginPath();
        x.arc(lx, ly, cr, 0, 6.2832);
        x.fill();
      };
      const [nx, ny] = ty.tip;
      // Nav lights only shine into their own sectors: red ahead and to the left, green ahead and to the right, white
      // straight back. We look up from the middle of the screen, so a plane coming towards us shows red and green,
      // and once it has passed over it's mostly the white tail light. Right overhead you catch all of them.
      const ox = g.W / 2 - px, oy = g.H / 2 - py, od = Math.hypot(ox, oy) || 1;
      const fwd = -(ox * s + oy * c) / od, port = (ox * c - oy * s) / od; // where we are, in the plane's own frame
      const ang = Math.atan2(Math.abs(port), fwd) * 180 / Math.PI; // 0 dead ahead, 180 dead behind
      const front = Math.max(0, Math.min(1, (110 - ang) / 12 + 0.5)), sideP = Math.max(0, Math.min(1, port / 0.12 + 0.5));
      // Seen from underneath, some of each light spills round the wingtip, so the one facing away dims but never vanishes.
      const far = Math.min(1, od / 240), vis = (v) => 1 - far + far * (0.35 + 0.65 * v);
      const lb = p.low ? 1.4 : 1; // a low plane is a few times closer, so every light reads brighter
      // red reads darker than green on a screen, so it gets a little more to look the same; all three sit well under
      // the strobes, which stay the brightest thing on the plane
      lamp(at(-nx, ny), 'r', 2.1 * lb, 0.82 * lb * vis(front * sideP), '#ff8676', 0.56 * lb);
      lamp(at(nx, ny), 'g', 2.1 * lb, 0.72 * lb * vis(front * (1 - sideP)), '#9affd6', 0.56 * lb);
      lamp(at(0, ty.L - 0.3), 'w', 1.8 * lb, 0.62 * lb * vis(1 - front), '#ffffff', 0.5 * lb);
      if (p.low) {
        // Landing lights, on below 10,000 ft: two forward-facing lights at the wing roots. Blinding while it's
        // coming at you, dim once it's side-on or past, with a faint beam into the hazy air ahead.
        const LI = 0.18 + 0.82 * Math.pow(Math.max(0, fwd), 2) * (0.35 + 0.65 * far), nfx = -s, nfy = -c;
        for (const side of [-1, 1]) {
          const q = at(side * ty.lr[0], ty.lr[1]);
          for (let j = 1; j <= 6; j++) { // the beam
            const dd = j * 11, rr = 2 + j * 2.2;
            x.globalAlpha = 0.05 * LI * (1 - j / 7);
            x.drawImage(GLOW.w, q[0] + nfx * dd - rr, q[1] + nfy * dd - rr, 2 * rr, 2 * rr);
          }
          lamp(q, 'w', 3 + 7 * LI, Math.min(1, 0.35 + 0.65 * LI), '#ffffff', 0.6 + 0.5 * LI);
        }
      }
      // Strobes, about 60 a minute. Airbus: the two forward-facing wingtip strobes double-flash (that's how you tell the
      // front), the rear-facing one on the tail cone flashes once, with the first of the pair. Boeing: single flashes,
      // all together, except on the 777 and 787 where the tail one fires a beat ahead of the wings. The tail strobe
      // faces backwards, so like the white tail light it shows most once the plane has gone past.
      const airbus = ty.mk === 'a', per = airbus ? 1.0 : 1.05, sp = (t + p.off) % per, burst = (d) => (d < 0 ? 0 : Math.exp(-d / 0.06));
      const lead = !airbus && /^7[78]7/.test(p.name) ? 0.09 : 0;
      const wI = airbus ? Math.max(burst(sp), burst(sp - 0.13)) : burst(sp - lead), tI = burst(sp) * (0.45 + 0.55 * vis(1 - front));
      if (wI > 0.02) for (const q of [at(-(nx - 0.4), ny + 1.2), at(nx - 0.4, ny + 1.2)]) lamp(q, 'w', (2 + 3.5 * wI) * lb, wI, '#ffffff', 0.5 + 0.4 * wI);
      if (tI > 0.02) lamp(at(0, ty.L), 'w', (2 + 3.5 * tI) * 0.7 * lb, tI, '#ffffff', 0.5 + 0.4 * tI);
      // beacon: an LED flash, so it snaps on, holds for a moment and cuts off; a tight, saturated red point
      const bp = (t + p.off + 0.45) % 1.33, bI = bp < 0.015 ? bp / 0.015 : bp < 0.09 ? 1 : Math.exp(-(bp - 0.09) / 0.035);
      if (bI > 0.02) lamp(at(0, ty.by), 'r', (1.5 + 1.5 * bI) * lb, bI, '#ff4c3a', (0.5 + 0.4 * bI) * lb);
      x.globalAlpha = 1;
    };

    // The trail as it is with nobody touching it: a pure function of emission time s and age a.
    const basePos = (p, s, a, ex, ey) => [p.x0 + p.vx * s - p.hc * ex + p.hs * ey + p.wx * a, p.y0 + p.vy * s + p.hs * ex + p.hc * ey + p.wy * a];
    const lumpAt = (p, s, a) => {
      const d = p.v * s, old = Math.min(1, Math.max(0, (a - 18) / 25));
      return 1 + 0.4 * old * Math.sin(6.2832 * d / p.lam + p.ph[0]) + 0.12 * Math.sin(d * 0.17 + p.ph[1]) + 0.08 * Math.sin(d * 0.43 + p.ph[2]);
    };
    const widthAt = (p, a, lump) => (1.2 + 1.1 * p.spread * Math.pow(Math.max(0, a), 0.8)) * lump;
    const fadeAt = (p, a) => Math.max(0, 1 - (a / p.life) * (a / p.life));
    const gaps = (p, a0, b0) => { // the parts of [a0, b0] that are still analytic (not carved into particles)
      let out = [[a0, b0]];
      for (const h of p.holes) out = out.flatMap(([u, v]) => (h[1] <= u || h[0] >= v) ? [[u, v]] : [[u, h[0]], [h[1], v]].filter(([m, n]) => n - m > 1e-4));
      return out;
    };
    const holeAt = (p, s) => { for (const h of p.holes) if (s >= h[0] && s <= h[1]) return h; return null; };

    // A swirl field with no divergence (the curl of smooth noise): the eddies a disturbance leaves behind.
    const swirlN = noise(991);
    const swirl = (x, y, t) => {
      const e = 0.06, X = x + t * 0.12, Y = y - t * 0.08;
      return [(swirlN(X, Y + e) - swirlN(X, Y - e)) / (2 * e), -(swirlN(X + e, Y) - swirlN(X - e, Y)) / (2 * e)];
    };

    // Stirred stretches of trail are real particles. Each frame they coast and slow down (air drag), ride the
    // eddies while the disturbance still has energy, drift with the wind, and keep ageing like the rest of the
    // trail. Mass is conserved: when they're pushed apart the cloud thins, and mixing makes it puff out.
    const simulate = (p, x, T0, now, dt) => {
      const keep = [], t = now / 1000, drag = Math.exp(-dt / 0.7), calm = Math.exp(-dt / 3);
      for (const q of p.parts) {
        if (T0 - q.s > p.life) continue;
        keep.push(q);
        if (dt > 0) {
          if (q.en > 0.003 || q.vx * q.vx + q.vy * q.vy > 0.25) {
            const [cx, cy] = swirl(q.x / 70, q.y / 70, t); // big, gentle rolls rather than wiggles
            q.x += (q.vx + cx * 26 * q.en) * dt;
            q.y += (q.vy + cy * 26 * q.en) * dt;
            q.g += dt * (6 * q.en + 0.6 * q.mix); // stirred air mixes in: the puff diffuses
            q.vx *= drag;
            q.vy *= drag;
            q.en *= calm;
          }
          q.x += p.wx * dt;
          q.y += p.wy * dt;
        }
      }
      p.parts = keep;
      // Each particle spreads its puff along the stretch to its neighbour on the same line, so a pulled strand
      // thins out instead of breaking into beads, and tears once it's pulled too far apart.
      let count = 0;
      for (let i = 0; i < keep.length; i++) {
        const q = keep[i], a = T0 - q.s;
        const lump = lumpAt(p, q.s, a), w = widthAt(p, a, lump) * (1 + 0.5 * q.mix) + q.g;
        const puff = 0.62 * Math.sqrt(1.6 / w) * fadeAt(p, a) * Math.min(1, Math.max(0, (a - 1.2) / 1.8)) * Math.sqrt(lump) * q.sh;
        const crisp = 0.95 * Math.max(0, Math.min(1, (3.5 - a) / 2.2)) * Math.min(1, Math.max(0, (a - p.gap) / 0.3)) * fadeAt(p, a) * q.ce;
        const al = Math.min(1, (puff + crisp) * q.step / (w * 0.8)) * (1 - 0.35 * q.mix), D = w * 2.4;
        if (al < 0.004) continue;
        const nb = keep[i + 1];
        let k = 1, ex = 0, ey = 0;
        if (nb && nb.line === q.line && nb.s - q.s < 2.5 * q.step / p.v) {
          ex = nb.x - q.x;
          ey = nb.y - q.y;
          const len = Math.hypot(ex, ey);
          if (len < 4 * w + 12) k = Math.max(1, Math.min(12, Math.ceil(len / (0.45 * w))));
          else { ex = 0; ey = 0; } // torn
        }
        x.globalAlpha = al / k;
        for (let j = 0; j < k; j++) x.drawImage(PUFF, q.x + ex * j / k - D / 2, q.y + ey * j / k - D / 2, D, D);
        count += k;
      }
      return count;
    };

    const drawTrails = (now, dt) => {
      const x = g.t;
      x.clearRect(0, 0, g.W, g.H);
      let count = 0;
      for (const p of passes) {
        const T0 = (now - p.t0) / 1000;
        const sNew = Math.min(T0 - p.gap, p.dur), sOld = Math.max(0, T0 - p.life);
        const n = p.eng.length;
        if (sNew > sOld) {
          // fresh: one crisp line per engine, starting about a plane length behind
          const sC = Math.max(sOld, T0 - 3.5);
          if (sNew > sC) {
            x.lineCap = 'round';
            x.strokeStyle = '#ffffff';
            for (const [ex, ey] of p.eng) {
              const N = 14, st = (sNew - sC) / N;
              for (let j = 0; j < N; j++) {
                const s1 = sNew - st * j, s2 = s1 - st, am = T0 - (s1 + s2) / 2;
                const a = 0.95 * Math.min(1, (am - p.gap) / 0.3) * Math.max(0, Math.min(1, (3.5 - am) / 2.2)) * fadeAt(p, am);
                if (a <= 0) continue;
                x.globalAlpha = a;
                x.lineWidth = 0.9 + (am - p.gap) * 0.35;
                for (const [u, v] of p.holes.length ? gaps(p, s2, s1) : [[s2, s1]]) {
                  const [x1, y1] = basePos(p, v, T0 - v, ex, ey), [x2, y2] = basePos(p, u, T0 - u, ex, ey);
                  x.beginPath();
                  x.moveTo(x1, y1);
                  x.lineTo(x2, y2);
                  x.stroke();
                }
              }
            }
          }
          // then it spreads into soft cloud: per engine until the lines merge, then one band that drifts
          // with the wind and, on long-lived trails, breaks into the slow lumps real contrails get
          const eyM = p.eng.reduce((m, e) => m + e[1], 0) / n, share = Math.pow(n, -0.4);
          let s = Math.min(sNew, T0 - 1.2);
          while (s > sOld) {
            const h = p.holes.length ? holeAt(p, s) : null;
            if (h) { s = h[0] - 1e-4; continue; } // that stretch is particles now
            const a = T0 - s, lump = lumpAt(p, s, a), w = widthAt(p, a, lump);
            const step = Math.max(1.1, w * (w > 6 ? 0.55 : 0.4));
            const tgt = 0.62 * Math.sqrt(1.6 / w) * fadeAt(p, a) * Math.min(1, (a - 1.2) / 1.8) * Math.sqrt(lump);
            const al = Math.min(1, tgt * step / (w * 0.8)), D = w * 2.4, m = a < 1.5 ? 1 : Math.exp(-(a - 1.5) / 3.5);
            if (m > 0.06) {
              x.globalAlpha = al * share;
              for (const [ex, ey] of p.eng) {
                const [qx, qy] = basePos(p, s, a, ex * m, ey);
                x.drawImage(PUFF, qx - D / 2, qy - D / 2, D, D);
                count++;
              }
            } else {
              x.globalAlpha = Math.min(1, al * share * n);
              const [qx, qy] = basePos(p, s, a, 0, eyM);
              x.drawImage(PUFF, qx - D / 2, qy - D / 2, D, D);
              count++;
            }
            s -= step / p.v;
          }
        }
        if (p.parts.length) count += simulate(p, x, T0, now, dt);
      }
      x.globalAlpha = 1;
      this._skyCount = count;
    };

    // Turn a stretch of trail into particles, laid out exactly where the analytic trail had it.
    const carve = (p, sa, sb, now) => {
      const T0 = (now - p.t0) / 1000;
      sa = Math.max(sa, 0, T0 - p.life);
      sb = Math.min(sb, T0 - p.gap, p.dur);
      if (sb <= sa || p.parts.length > 2400) return;
      const n = p.eng.length, share = Math.pow(n, -0.4), eyM = p.eng.reduce((m, e) => m + e[1], 0) / n;
      for (const [u, v] of gaps(p, sa, sb)) {
        let s = v;
        while (s > u) {
          const a = T0 - s, w = widthAt(p, a, lumpAt(p, s, a)), step = Math.max(1.1, w * (w > 6 ? 0.55 : 0.4));
          const m = a < 1.5 ? 1 : Math.exp(-(a - 1.5) / 3.5);
          const mk = (ex, ey, sh, ce, line) => {
            const [qx, qy] = basePos(p, s, a, ex, ey);
            p.parts.push({ x: qx, y: qy, s, step, sh, ce, line, vx: 0, vy: 0, en: 0, mix: 0, g: 0 });
          };
          if (m > 0.06) p.eng.forEach(([ex, ey], j) => mk(ex * m, ey, share, 1, j));
          else mk(0, eyM, share * n, 0, -1);
          s -= step / p.v;
        }
      }
      p.parts.sort((u, v) => u.line - v.line || u.s - v.s); // neighbours along each line sit next to each other
      const hs = p.holes.concat([[sa, sb]]).sort((h1, h2) => h1[0] - h2[0]), merged = [];
      for (const h of hs) {
        const l = merged[merged.length - 1];
        if (l && h[0] <= l[1]) l[1] = Math.max(l[1], h[1]); else merged.push([h[0], h[1]]);
      }
      p.holes = merged;
    };

    // The cursor moving through a contrail, like a hand through smoke: the stretch it crosses becomes particles,
    // which get dragged a little way along and parted out of its path, and pick up energy for the eddies.
    const ptr = { x: 0, y: 0, lx: 0, ly: 0, vx: 0, vy: 0, t: 0, on: false, pend: false };
    const stir = (now) => {
      const sp = Math.hypot(ptr.vx, ptr.vy);
      const x0 = ptr.lx, y0 = ptr.ly, x1 = ptr.x, y1 = ptr.y;
      ptr.lx = x1;
      ptr.ly = y1;
      if (sp < 30) return; // a resting cursor doesn't stir anything
      // the moving cursor drags air in a wide, soft zone, and only parts it right at its core
      const R = 70, sx = x1 - x0, sy = y1 - y0, L2 = sx * sx + sy * sy || 1, L = Math.sqrt(L2);
      const dragX = ptr.vx / sp * Math.min(sp, 700) * 0.22, dragY = ptr.vy / sp * Math.min(sp, 700) * 0.22;
      let hit = false;
      for (const p of passes) {
        const T0 = (now - p.t0) / 1000, sNew = Math.min(T0 - p.gap, p.dur), sOld = Math.max(0, T0 - p.life);
        if (sNew > sOld) {
          const Ax = p.x0 + p.wx * T0, Ay = p.y0 + p.wy * T0, Vx = p.vx - p.wx, Vy = p.vy - p.wy, V2 = Vx * Vx + Vy * Vy, V = Math.sqrt(V2);
          const sA = ((x0 - Ax) * Vx + (y0 - Ay) * Vy) / V2, sB = ((x1 - Ax) * Vx + (y1 - Ay) * Vy) / V2;
          const side = (px, py) => ((px - Ax) * Vy - (py - Ay) * Vx) / V; // signed distance from the trail's centre line
          const d0 = side(x0, y0), d1 = side(x1, y1), w = widthAt(p, Math.max(0, T0 - (sA + sB) / 2), 1);
          const near = (d0 > 0) !== (d1 > 0) ? 0 : Math.min(Math.abs(d0), Math.abs(d1));
          if (near < R + w * 1.4) carve(p, Math.min(sA, sB) - (R + w + 16) / V, Math.max(sA, sB) + (R + w + 16) / V, now);
        }
        for (const q of p.parts) {
          let k = ((q.x - x0) * sx + (q.y - y0) * sy) / L2;
          k = k < 0 ? 0 : k > 1 ? 1 : k;
          const dx = q.x - (x0 + sx * k), dy = q.y - (y0 + sy * k), d = Math.hypot(dx, dy);
          if (d > R) continue;
          const f = Math.exp(-(d / 26) * (d / 26)), core = Math.exp(-(d / 9) * (d / 9));
          const nx = d > 0.01 ? dx / d : -sy / L, ny = d > 0.01 ? dy / d : sx / L;
          q.vx += dragX * f + nx * 70 * core;
          q.vy += dragY * f + ny * 70 * core;
          q.en = Math.min(1, q.en + 0.5 * f);
          q.mix = Math.min(1, q.mix + 0.25 * f);
          hit = true;
        }
      }
      if (hit) wake();
    };
    // Little night-sky moments on their own canvas layer: a star flaring under the cursor, and (night trial) the odd
    // satellite or meteor. Each item draws itself and returns the box it used, so only those boxes get cleared.
    let fxItems = [], fxBoxes = [], fxRaf = 0;
    const fxFrame = () => {
      fxRaf = 0;
      const x = g.f;
      if (!x) return;
      const now = performance.now();
      for (const b of fxBoxes) x.clearRect(b[0], b[1], b[2], b[3]);
      fxBoxes = [];
      if (!this._dark) fxItems = [];
      fxItems = fxItems.filter((it) => { const b = it(x, now); if (b) fxBoxes.push(b); return !!b; });
      x.globalAlpha = 1;
      if (fxItems.length) fxRaf = requestAnimationFrame(fxFrame);
    };
    const fxAdd = (it) => { fxItems.push(it); if (!fxRaf) fxRaf = requestAnimationFrame(fxFrame); };
    const twinkle = (st, t0) => (x, now) => {
      const p = (now - t0) / 750;
      if (p >= 1) return null;
      const e = Math.sin(Math.PI * p) * (0.8 + 0.2 * Math.sin(5 * Math.PI * p)), [sx, sy, r, a, rgb] = st, L = 2 + 6 * e;
      x.globalAlpha = 0.55 * e;
      x.drawImage(GLOW.w, sx - 4 - 4 * e, sy - 4 - 4 * e, 8 + 8 * e, 8 + 8 * e);
      x.globalAlpha = Math.min(1, a + 0.7 * e);
      x.fillStyle = 'rgb(' + rgb + ')';
      x.beginPath();
      x.arc(sx, sy, r + 0.7 * e, 0, 6.2832);
      x.fill();
      x.globalAlpha = 0.5 * e;
      x.strokeStyle = 'rgb(' + rgb + ')';
      x.lineWidth = 0.6;
      x.beginPath();
      x.moveTo(sx - L, sy); x.lineTo(sx + L, sy);
      x.moveTo(sx, sy - L); x.lineTo(sx, sy + L);
      x.stroke();
      return [sx - 14, sy - 14, 28, 28];
    };
    const sparkle = (now) => {
      const cx = (ptr.x / 32) | 0, cy = (ptr.y / 32) | 0;
      for (let i = cx - 1; i <= cx + 1; i++) for (let j = cy - 1; j <= cy + 1; j++) {
        for (const st of g.grid.get(i + ',' + j) || []) {
          if (now - st[5] < 1200 || Math.hypot(st[0] - ptr.x, st[1] - ptr.y) > 9 + st[2] * 4) continue;
          st[5] = now;
          fxAdd(twinkle(st, now));
        }
      }
    };
    // A satellite: a steady point (no blinking, which is how you tell it from a plane) sliding slowly across,
    // often fading out mid-sky as it passes into the Earth's shadow.
    const satellite = (ahead = 0) => {
      const W = g.W, H = g.H, side = Math.floor(Math.random() * 4);
      const p0 = side === 0 ? [Math.random() * W, -6] : side === 1 ? [W + 6, Math.random() * H] : side === 2 ? [Math.random() * W, H + 6] : [-6, Math.random() * H];
      let dx = W * (0.2 + Math.random() * 0.6) - p0[0], dy = H * (0.2 + Math.random() * 0.6) - p0[1];
      const l = Math.hypot(dx, dy), v = 13 + Math.random() * 8, b = 0.45 + Math.random() * 0.35, t0 = performance.now() - ahead * 1000;
      const dim = Math.random() < 0.55 ? l * (0.6 + Math.random() * 0.8) / v : Infinity;
      dx /= l;
      dy /= l;
      return (x, now) => {
        const t = (now - t0) / 1000, px = p0[0] + dx * v * t, py = p0[1] + dy * v * t;
        if (t > 2 && (px < -10 || py < -10 || px > W + 10 || py > H + 10)) return null;
        const f = Math.min(1, t / 2) * (t < dim ? 1 : Math.max(0, 1 - (t - dim) / 5));
        if (t > dim && f <= 0) return null;
        x.globalAlpha = 0.35 * b * f;
        x.drawImage(GLOW.w, px - 3.5, py - 3.5, 7, 7);
        x.globalAlpha = b * f;
        x.fillStyle = '#ffffff';
        x.beginPath();
        x.arc(px, py, 0.75, 0, 6.2832);
        x.fill();
        return [px - 6, py - 6, 12, 12];
      };
    };
    // A meteor: a quick bright streak with a fading tail, gone in under a second.
    const meteor = (ahead = 0) => {
      const W = g.W, H = g.H, sx = W * (0.15 + Math.random() * 0.7), sy = H * (0.08 + Math.random() * 0.6), ang = Math.random() * 6.2832;
      const L = 110 + Math.random() * 130, dur = 0.45 + Math.random() * 0.4, t0 = performance.now() - ahead * 1000;
      const ux = Math.cos(ang), uy = Math.sin(ang), ex = sx + ux * L, ey = sy + uy * L;
      return (x, now) => {
        const p = (now - t0) / 1000 / dur;
        if (p >= 1) return null;
        const hx = sx + ux * L * p, hy = sy + uy * L * p, tl = Math.min(L * p, L * 0.45), tx = hx - ux * tl, ty = hy - uy * tl;
        const e = Math.pow(Math.sin(Math.PI * Math.min(1, p * 1.15)), 0.8), gr = x.createLinearGradient(tx, ty, hx, hy);
        gr.addColorStop(0, 'rgba(255,255,255,0)');
        gr.addColorStop(1, 'rgba(225,238,255,' + (0.9 * e).toFixed(3) + ')');
        x.globalAlpha = 1;
        x.strokeStyle = gr;
        x.lineWidth = 1.3;
        x.lineCap = 'round';
        x.beginPath();
        x.moveTo(tx, ty);
        x.lineTo(hx, hy);
        x.stroke();
        x.globalAlpha = 0.5 * e;
        x.drawImage(GLOW.w, hx - 3, hy - 3, 6, 6);
        return [Math.min(sx, ex) - 8, Math.min(sy, ey) - 8, Math.abs(ex - sx) + 16, Math.abs(ey - sy) + 16];
      };
    };
    let evS = 0, evM = 0;
    const evOften = () => (this.props.events ?? 'rare') === 'often';
    const ready = () => this._dark && g.W && !document.hidden && !(g.tr && g.tr.closest('.no-sky'));
    const nextSat = (ms) => { clearTimeout(evS); evS = setTimeout(() => { if (ready()) { fxAdd(satellite()); nextSat(evOften() ? 10000 + Math.random() * 6000 : 70000 + Math.random() * 90000); } else nextSat(5000); }, ms); };
    const nextMet = (ms) => { clearTimeout(evM); evM = setTimeout(() => { if (ready()) { fxAdd(meteor()); nextMet(evOften() ? 12000 + Math.random() * 8000 : 90000 + Math.random() * 150000); } else nextMet(5000); }, ms); };
    this._skyEvent = (kind, ahead) => fxAdd(kind === 'meteor' ? meteor(ahead) : satellite(ahead));
    const touch = () => {
      ptr.pend = false;
      if (reduce || !g.W) return;
      const now = performance.now();
      if (this._dark) { sparkle(now); if (NIGHT) near(ptr.x, ptr.y); } else stir(now);
    };
    const onMove = (e) => {
      const box = g.tr && g.tr.parentElement;
      if (!box) return;
      const rr = box.getBoundingClientRect(), sc = g.W / (rr.width || 1), now = performance.now();
      const x = (e.clientX - rr.left) * sc, y = (e.clientY - rr.top) * sc, dt = Math.max(8, now - ptr.t);
      if (ptr.on && dt < 200) { ptr.vx = (x - ptr.x) / dt * 1000; ptr.vy = (y - ptr.y) / dt * 1000; } else { ptr.vx = 0; ptr.vy = 0; ptr.lx = x; ptr.ly = y; }
      ptr.x = x; ptr.y = y; ptr.t = now; ptr.on = true;
      if (!ptr.pend) { ptr.pend = true; requestAnimationFrame(touch); }
    };
    // phones and tablets have no cursor, so they skip the hover touches (stirred contrails, twinkling stars, constellations)
    const hoverable = !!(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    if (hoverable) window.addEventListener('pointermove', onMove, { passive: true });

    const look = (dir) => { // the footer cat glances up while a plane goes over
      if ((this._lookDir || null) === dir) return;
      this._lookDir = dir;
      this.setState({ look: dir });
    };
    const watch = (now) => {
      let want = null;
      const box = g.tr.parentElement, root = box && box.parentElement; // the sky box, not a canvas that may be hidden
      const cat = root && root.querySelector('.cat');
      if (cat) {
        const rr = box.getBoundingClientRect(), sc = rr.width / g.W, vw = window.innerWidth, vh = window.innerHeight;
        for (const p of passes) {
          const t = (now - p.t0) / 1000;
          if (t >= p.dur || p.looked) continue;
          const X = rr.left + (p.x0 + p.vx * t) * sc, Y = rr.top + (p.y0 + p.vy * t) * sc;
          const vis = X > 0 && Y > 0 && X < vw && Y < vh;
          if (vis && !p.seen) p.seen = now;
          if (p.seen && now - p.seen > 6500) { p.looked = true; continue; }
          if (vis && p.seen && now - p.seen > 1200) {
            const cr = cat.getBoundingClientRect(), dx = X - (cr.left + cr.width / 2);
            want = Math.abs(dx) < 160 * sc ? 'u' : dx < 0 ? 'l' : 'r';
          }
        }
      }
      look(want);
    };

    const frame = () => {
      raf = 0;
      if (!bind()) { idle = setTimeout(() => { idle = 0; wake(); }, 500); return; }
      const now = performance.now(), dark = !!this._dark;
      let flying = 0;
      passes = passes.filter((p) => {
        const t = (now - p.t0) / 1000, el = this['_air' + p.slot];
        if (t < p.dur) {
          flying++;
          if (el) drawPlane(p, el, t, dark);
        } else if (el && !p.landed) {
          el.style.display = 'none';
          p.landed = true;
        }
        return t < p.dur + p.life;
      });
      if (!dark && now - lastTrail > 32) { const dt = Math.min(0.05, (now - lastTrail) / 1000); lastTrail = now; drawTrails(now, dt); g.dirty = true; } // ~30fps is plenty for cloud
      if (now - g.lookAt > 300) { g.lookAt = now; watch(now); }
      if (!passes.length) {
        if (g.dirty) { g.t.clearRect(0, 0, g.W, g.H); g.dirty = false; }
        look(null);
        return;
      }
      if (dark && !flying) { idle = setTimeout(() => { idle = 0; wake(); }, 500); return; } // nothing to draw at night
      raf = requestAnimationFrame(frame);
    };
    const wake = () => { if (!raf && !idle) raf = requestAnimationFrame(frame); };

    const pick = () => { // shuffle bag: every flight comes up once before any repeats
      if (!order.length) {
        order = F.map((_, i) => i);
        for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
      }
      return F[order.pop()];
    };
    const reach = (px, py, ux, uy, pad) => { // distance from a point to just past the edge
      const ax = ux > 1e-6 ? (g.W + pad - px) / ux : ux < -1e-6 ? (-pad - px) / ux : Infinity;
      const ay = uy > 1e-6 ? (g.H + pad - py) / uy : uy < -1e-6 ? (-pad - py) / uy : Infinity;
      return Math.min(ax, ay);
    };
    const schedule = (ms) => { clearTimeout(timer); timer = setTimeout(launch, ms); };
    const launch = (ahead = 0, force = '') => {
      if (!bind() || document.hidden || g.tr.closest('.no-sky')) { schedule(4000); return; }
      const now = performance.now();
      const busy = passes.filter((p) => (now - p.t0) / 1000 < p.dur).map((p) => p.slot);
      const slot = [0, 1].find((i) => busy.indexOf(i) < 0 && this['_air' + i]);
      if (slot === undefined) { schedule(5000); return; }
      const [name, deg0, yyz, li] = force === 'low' ? F.filter((f) => f[2])[0] : force === 'ac' ? F.filter((f) => f[2] && LIV[f[3]].rd)[0] : pick(), ty = T[name];
      // (night trial) your flights out of Pearson go over low, still climbing out: a few km up instead of eleven,
      // on one of Pearson's runway headings (mostly the westbound ones, with Toronto's prevailing westerlies),
      // with landing lights on and no contrail
      const low = NIGHT && !!yyz, liv = LIV[li] || {};
      const deg = low ? [237, 237, 225, 237, 57, 45, 315][Math.floor(Math.random() * 7)] : deg0;
      const k = low ? KM * (2.6 + Math.random() * 1.6) : KM * (0.88 + Math.random() * 0.24); // flight levels vary: higher looks smaller and slower
      const gs = low ? 125 + Math.random() * 25 : 225 + Math.random() * 37, v = gs * k; // ground speed in m/s, on the same scale
      const hdg = deg * Math.PI / 180, hs = Math.sin(hdg), hc = Math.cos(hdg), dx = -hs, dy = -hc;
      const B = Math.ceil(Math.max(ty.L, ty.S) * k + 34 + (low ? 140 : 0));
      const px = g.W * (0.1 + Math.random() * 0.8), py = g.H * (0.06 + Math.random() * 0.88);
      const persistent = Math.random() > 0.35; // some days contrails vanish in seconds, some days they linger
      const wa = Math.random() * 6.2832, ws = 0.8 + Math.random() * 1.8, wx = Math.cos(wa) * ws, wy = Math.sin(wa) * ws;
      // The plane flies through the same air its contrail hangs in, so the wind carries both: the trail stays
      // lined up behind the nose, and over the ground the plane crabs a touch (its track isn't quite its heading).
      const gx = dx * v + wx, gy = dy * v + wy, gv = Math.hypot(gx, gy), ux = gx / gv, uy = gy / gv;
      const back = reach(px, py, -ux, -uy, B), len = back + reach(px, py, ux, uy, B);
      passes.push({
        name, type: ty, slot, k, hdg, hs, hc, B, low, liv, dpr: Math.min(window.devicePixelRatio || 1, 2),
        x0: px - ux * back, y0: py - uy * back, vx: gx, vy: gy, v, dur: len / gv,
        life: low ? 0 : persistent ? 25 + Math.random() * 25 : 3 + Math.random() * 3, spread: persistent ? 1 : 0.55,
        wx, wy, gap: ty.L * 0.9 / gs, lam: 6.5 * ty.S * k,
        eng: ty.eng.map(([ex, ey]) => [ex * k, (ey - ty.L / 2) * k]),
        ph: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28], off: Math.random() * 2, holes: [], parts: [],
        t0: now - ahead * 1000, el: null,
      });
      wake();
      const often = (this.props.flights ?? 'occasional') === 'often';
      schedule(often ? 6000 + Math.random() * 6000 : (len / gv + 15 + Math.random() * 30) * 1000);
    };
    this._skyLaunch = launch;
    this._skyPasses = () => passes;
    this._skyStars = () => g.stars;
    this._skyReal = () => g.real;

    if (bind()) place();
    if (!reduce) schedule(2500);
    if (NIGHT && !reduce) { nextSat(4000); nextMet(9000); } // the first of each comes soon, then they're rare
    this._skyStop = () => {
      clearInterval(keep);
      clearInterval(themeWatch);
      if (lnRaf) cancelAnimationFrame(lnRaf);
      clearTimeout(evS);
      clearTimeout(evM);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      if (fxRaf) cancelAnimationFrame(fxRaf);
      for (const c of cl) if (c && c.an) c.an.cancel();
      clearTimeout(timer);
      clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
      passes = [];
    };
  }).call(host);
  return host._skyStop;
}
