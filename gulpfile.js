//@ts-check
'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
const acceleratorBuild = require('@wm/accelerator-build');

acceleratorBuild.initializeAccelerator(build, gulp);

// remove code above and uncomment code below to edit webpack config
//
// acceleratorBuild.initializeAccelerator(build, gulp, webpackConfig => {
//     // edit webpart config here
//     return {
//         ...webpackConfig,
//     };
// });

build.initialize(gulp);
