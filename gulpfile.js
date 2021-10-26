//@ts-check
'use strict';

const gulp = require('gulp');
const path = require('path');
const build = require('@microsoft/sp-build-web');
const acceleratorBuild = require('@wm/accelerator-build');

// acceleratorBuild.initializeAccelerator(build, gulp);
acceleratorBuild.initializeAccelerator(build, gulp, webpackConfig => {
    return {
        ...webpackConfig,
        resolve: {
            ...webpackConfig.resolve,
            alias: {
                ...webpackConfig.resolve.alias,
                'office-ui-fabric-react': path.join(__dirname, 'node_modules/office-ui-fabric-react'),
                'react': path.join(__dirname, 'node_modules/react'),
                'react-dom': path.join(__dirname, 'node_modules/react-dom'),
                'react-redux': path.join(__dirname, 'node_modules/react-redux'),
                'redux': path.join(__dirname, 'node_modules/redux'),
                '@reduxjs/toolkit': path.join(__dirname, 'node_modules/@reduxjs/toolkit'),
                'webpack': path.join(__dirname, 'node_modules/webpack'),
            },
        }
    }
});
build.initialize(gulp);
