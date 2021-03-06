/*
 * Copyright (C) Highsoft AS
 */

const gulp = require('gulp');

/* *
 *
 *  Tasks
 *
 * */

/**
 * Gulp task to run the building process of distribution files. By default it
 * builds all the distribution files. Usage: "gulp build".
 *
 * - `--file` Optional command line argument. Use to build a one or sevral
 *   files. Usage: "gulp build --file highcharts.js,modules/data.src.js"
 *
 * - `--force` Optional CLI argument to force a rebuild of scripts.
 *
 * @todo add --help command to inform about usage.
 *
 * @return {Promise<void>}
 *         Promise to keep
 */
function task() {

    const argv = require('yargs').argv;
    const build = require('../build.js');
    const log = require('./lib/log');

    return new Promise((resolve, reject) => {

        const BuildScripts = build.getBuildScripts({
            debug: (argv.d || argv.debug || false),
            files: (
                (argv.file) ?
                    argv.file.split(',') :
                    null
            ),
            type: (argv.type || null)
        });

        log.message('Generating code...');

        BuildScripts
            .fnFirstBuild()
            .then(() => log.success('Created code'))
            .then(resolve)
            .catch(reject);
    });
}

gulp.task('scripts-js', task);
