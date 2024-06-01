# nf-pathfinder

This is a library I've been using for a while now to perform fast A* pathing with [Three.js](https://github.com/mrdoob/three.js) and even sometimes on server side simulations for games.

Available on NPM here: https://www.npmjs.com/package/nf-pathfinder

# Install

```
npm install nf-pathfinder
```

# Using the library

For most use-cases, you'll only need to use the `computePath` export from the library.

```
import {
  NodeResult,
  computePath,
} from "../../../node_modules/nf-pathfinder/dist/index";

const path = [
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

const result = computePath(path, new Vector2(0, 0), new Vector2(0, 4));
```

# Building and running it yourself

```
npm i
npm run start
```

You should see something similar to the following:

```
start: 0, 0
end: 0, 4
path
1:1,2:1,3:1,4:2,3:3,2:4,1:4,0:4
[S][ ][ ][ ][ ]
[ ][X][X][X][ ]
[W][W][W][W][X]
[ ][ ][ ][X][ ]
[E][X][X][ ][ ]
solved in: 1 ms
```

This is a console output of it running a test path + solution.