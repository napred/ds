import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const nativeInput = 'temp/native.js';
const webInput = 'temp/index.js';
const external = id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/');
const name = 'napred.primitives';

const babelCJS = {
  babelrc: false,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
  exclude: /node_modules/,
};

const babelESM = {
  exclude: /node_modules/,
  runtimeHelpers: true,
  presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
};

const commonjsOptions = {
  include: /node_modules/,
};

const globals = {
  '@napred/browser': 'napred.browser',
  '@napred/ds': 'napred.ds',
  emotion: 'emotion',
  react: 'React',
  'react-dom': 'ReactDOM',
};

export default [
  // cjs dev
  {
    external,
    input: webInput,
    output: {
      exports: 'named',
      file: 'dist/primitives.cjs.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
      babel(babelCJS),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // cjs prod, min
  {
    external,
    input: webInput,
    output: {
      exports: 'named',
      file: 'dist/primitives.cjs.min.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs(),
      babel(babelCJS),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        sourcemap: true,
      }),
    ],
  },

  // esm
  {
    input: webInput,
    external,
    output: {
      file: 'dist/primitives.m.js',
      format: 'esm',
    },
    plugins: [
      babel(babelESM),
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
    ],
  },

  // umd
  {
    input: webInput,
    output: { exports: 'named', file: 'dist/primitives.umd.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      babel(babelESM),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    ],
  },

  // umd prod
  {
    input: webInput,
    output: { exports: 'named', file: 'dist/primitives.umd.min.js', format: 'umd', name, globals },
    external: Object.keys(globals),
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      babel(babelESM),
      commonjs(commonjsOptions),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terser({
        sourcemap: true,
      }),
    ],
  },

  // cjs native
  {
    external,
    input: nativeInput,
    output: {
      exports: 'named',
      file: 'dist/primitives-native.cjs.js',
      format: 'cjs',
    },
    plugins: [
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
      babel(babelCJS),
    ],
  },

  // esm native
  {
    external,
    input: nativeInput,
    output: {
      file: 'dist/primitives-native.m.js',
      format: 'esm',
    },
    plugins: [
      babel(babelESM),
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx'],
      }),
      commonjs({
        ignoreGlobal: true,
      }),
    ],
  },
];
