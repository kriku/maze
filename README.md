ROBOT IN THE MAZE
-----------------

Game repository:

```sh
git clone git@github.com:kriku/maze.git
cd maze
```

#### Submodules init

To initialize playcanvas engine, run:

```sh
git submodule init
git submodule update
```

Build latest playcanvas version:

```sh
cd engine
npm install && npm run build
```

#### Run project in development mode

Install dependencies:

```sh
cd ../ # cd maze
npm install
```

Start webpack development server:

```sh
npm start
```

Build production bundles:

```sh
npm run build
```
