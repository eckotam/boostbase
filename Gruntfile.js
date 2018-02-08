/*
 * Generated on 2016-08-30
 * generator-assemble v0.5.0
 * https://github.com/assemble/generator-assemble
 *
 * Copyright (c) 2016 Hariadi Hinta
 * Licensed under the MIT license.
 */

'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// '<%= config.src %>/templates/pages/{,*/}*.hbs'
// use this if you want to match all subfolders:
// '<%= config.src %>/templates/pages/**/*.hbs'

module.exports = function (grunt) {

  require('time-grunt')(grunt);
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    config: {
      src: 'src',
      dist: 'dist'
    },

    watch: {
      assemble: {
        files: ['<%= config.src %>/{content,data,templates}/{,*/}*.{md,hbs,yml}'],
        tasks: ['assemble']
      },
      sass: {
        files: ['<%= config.src %>/templates/scss/{,*/}*.scss'],
        tasks: ['sass'],
        options: {
          livereload: true
        }
      },
      image: {
        files: ['<%= config.src %>/templates/assets/img/*.{jpg,png,gif}'],
        tasks: ['copy:img']
      },
      font: {
        files: ['<%= config.src %>/templates/assets/fonts/*.{woff,woff2}'],
        tasks: ['copy:fonts']
      },
      js: {
        files: ['<%= config.src %>/templates/assets/js/*.js'],
        tasks: ['copy:javascripts']
      }
    },

    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.src %>/templates/scss',
          src: ['*.scss'],
          dest: '<%= config.dist %>/assets/css',
          ext: '.css'
        }]
      }
    },

    assemble: {
      pages: {
        options: {
          flatten: true,
          assets: '<%= config.dist %>/assets',
          layout: '<%= config.src %>/templates/layouts/default.hbs',
          data: '<%= config.src %>/data/*.{json,yml}',
          partials: '<%= config.src %>/templates/partials/*.hbs',
          plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
        },
        files: {
          '<%= config.dist %>/': ['<%= config.src %>/templates/pages/*.hbs']
        }
      }
    },

    copy: {
      javascripts: {
        expand: true,
        cwd: '<%= config.src %>/templates/assets/js/',
        src: '**',
        dest: '<%= config.dist %>/assets/js/'
      },
      images: {
        expand: true,
        cwd: '<%= config.src %>/templates/assets/img/',
        src: '**',
        dest: '<%= config.dist %>/assets/img/'
      },
      favicon: {
        expand: true,
        cwd: '<%= config.src %>/templates/assets/',
        src: 'favicon.ico',
        dest: '<%= config.dist %>/'
      },
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/scss/',
        src: '**/*.scss',
        dest: '<%= config.src %>/templates/scss/vendors/bootstrap/'
      }
    },

    browserSync: {
      dev: {
        bsFiles: {
          src: [
            '<%= config.dist %>/assets/css/*.css',
            '<%= config.dist %>/assets/img/*',
            '<%= config.dist %>/assets/js/**/*.js',
            '<%= config.dist %>/**/*.html'
          ]
        },
        options: {
          watchTask: true,
          debugInfo: true,
          notify: true,
          server: './<%= config.dist %>'
        }
      }
    },

    // Before generating any new files,
    // remove any previously-created files.
    clean: ['<%= config.dist %>/**/*.{html,xml}']

  });

  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-bower');


  grunt.registerTask('server', [
    'build',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean',
    'sass',
    'copy',
    'assemble'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
