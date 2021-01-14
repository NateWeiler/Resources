import path from 'path';
import fs from 'fs';
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import progressPlugin from 'rollup-plugin-progress';
import ignore from 'rollup-plugin-ignore';
import alias from 'rollup-plugin-alias';
import _ from 'lodash';
import pkg from './package.json';
import multiEntry from 'rollup-plugin-multi-entry';
import stub from 'rollup-plugin-stub';

const compiledLicense = _.template(fs.readFileSync('./build/license-header.txt', 'utf8'));
const bannerData = _.pick(pkg, ['version', 'copyright']);
const banner = compiledLicense(Object.assign({includesVtt: true}, bannerData));

const watch = {
  clearScreen: false
};

const onwarn = (warning) => {
  // ignore unknow option for --no-progress
  if (warning.code === 'UNKNOWN_OPTION' && warning.message.indexOf('progress') !== -1) {
    return;
  }

  // eslint-disable-next-line no-console
  console.warn(warning.message);
};

const primedIgnore = ignore(['videojs-vtt.js']);
const primedResolve = resolve({
  mainFields: ['jsnext:main', 'module', 'main'],
  browser: true
});
const primedCjs = commonjs({
  sourceMap: false
});
const primedBabel = babel({
  runtimeHelpers: true,
  babelrc: false,
  exclude: 'node_modules/**(!http-streaming)',
  compact: false,
  presets: [
    ['@babel/preset-env', {
      loose: true,
      modules: false
    }]
  ],
  plugins: [
    '@babel/plugin-transform-object-assign',
    ['@babel/plugin-transform-runtime', {regenerator: false}]
  ]
});

const progress = () => {
  if (process.env.TRAVIS || process.env.NETLIFY) {
    return {};
  }

  return progressPlugin();
};

const globals = {
  browser: {
    'global': 'window',
    'global/window': 'window',
    'global/document': 'document'
  },
  module: {
  },
  test: {
    qunit: 'QUnit',
    qunitjs: 'QUnit',
    sinon: 'sinon'
  }
};

const moduleExternals = [
  'global',
  '@videojs/xhr',
  'safe-json-parse',
  'videojs-vtt.js',
  'url-toolkit',
  'm3u8-parser',
  'mpd-parser',
  'mux.js',
  'aes-decrypter',
  'keycode',
  '@babel/runtime'
];
const externals = {
  browser: Object.keys(globals.browser).concat([
  ]),
  module(id) {
    const result = moduleExternals.some((ext) => id.indexOf(ext) !== -1);

    return result;
  },
  test: Object.keys(globals.test).concat([
  ])
};

export default cliargs => [
  // standard umd file
  {
    input: 'src/js/index.js',
    output: {
      format: 'umd',
      file: 'dist/video.js',
      name: 'videojs',
      banner,
      globals: globals.browser
    },
    external: externals.browser,
    plugins: [
      alias({
        'video.js': path.resolve(__dirname, './src/js/video.js')
      }),
      primedResolve,
      json(),
      primedCjs,
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  // es, cjs
  {
    input: 'src/js/index.js',
    output: [
      {
        format: 'es',
        file: 'dist/video.es.js',
        banner,
        globals: globals.module
      }, {
        format: 'cjs',
        file: 'dist/video.cjs.js',
        banner,
        globals: globals.module
      }
    ],
    external: externals.module,
    plugins: [
      alias({
        'video.js': path.resolve(__dirname, './src/js/video.js'),
        '@videojs/http-streaming': path.resolve(__dirname, './node_modules/@videojs/http-streaming/dist/videojs-http-streaming.es.js')
      }),
      json(),
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  // novtt umd
  {
    input: 'src/js/index.js',
    output: {
      format: 'umd',
      file: 'dist/alt/video.novtt.js',
      name: 'videojs',
      banner: compiledLicense(Object.assign({includesVtt: true}, bannerData)),
      globals: globals.browser
    },
    external: externals.browser,
    plugins: [
      primedIgnore,
      alias({
        'video.js': path.resolve(__dirname, './src/js/video.js')
      }),
      primedResolve,
      json(),
      primedCjs,
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  // core cjs, es
  {
    input: 'src/js/video.js',
    output: [
      {
        format: 'es',
        file: 'core.es.js',
        banner,
        globals: globals.module
      }, {
        format: 'cjs',
        file: 'core.js',
        banner,
        globals: globals.module
      }
    ],
    external: externals.module,
    plugins: [
      json(),
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  // core umd
  {
    input: 'src/js/video.js',
    output: {
      format: 'umd',
      name: 'videojs',
      file: 'dist/alt/video.core.js',
      banner,
      globals: globals.browser
    },
    external: externals.browser,
    plugins: [
      primedResolve,
      json(),
      primedCjs,
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  // core novtt umd
  {
    input: 'src/js/video.js',
    output: {
      format: 'umd',
      name: 'videojs',
      file: 'dist/alt/video.core.novtt.js',
      banner: compiledLicense(Object.assign({includesVtt: true}, bannerData)),
      globals: globals.browser
    },
    external: externals.browser,
    plugins: [
      primedIgnore,
      primedResolve,
      json(),
      primedCjs,
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  },
  {
    input: 'test/unit/**/*.test.js',
    output: {
      format: 'iife',
      name: 'videojsTests',
      file: 'test/dist/bundle.js',
      globals: globals.test
    },
    external: externals.test,
    plugins: [
      multiEntry({exports: false}),
      alias({
        'video.js': path.resolve(__dirname, './src/js/video.js')
      }),
      primedResolve,
      json(),
      stub(),
      primedCjs,
      primedBabel,
      cliargs.progress !== false ? progress() : {}
    ],
    onwarn,
    watch
  }

];
