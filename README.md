## Start docz server

You can start docz development server by using:

```
$ yarn docz dev
```

It will run on `localhost:3000`.

## Build

### Build library

Production build

```
$ yarn build
```


Development build

```
$ yarn dev
```

Build will appear in `./dist` folder.

### Build documentation

```
$ yarn docz build
```

Command will generate a static site in `.docz/dist/`.

You can try it out with `yarn docz serve`. It will serve generated site on `localhost:3000`.
