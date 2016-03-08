

/**
 * @param {Object} grunt Grunt DSL object.
 */
module.exports = function(grunt) {

  var testSrc = 'test/**/*.js';
  var libSrc = 'lib/**/*.js';

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'gruntfile.js'
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: [testSrc, '!test/fixtures/**/*.*']
      },
      lib: {
        src: libSrc
      }
    },
    mochaTest: {
      all: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.spec.js']
      }
    },
    watch: {
      gruntfile: {
        files: 'gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      test: {
        files: testSrc,
        tasks: ['jshint:test', 'mochaTest']
      },
      lib: {
        files: libSrc,
        tasks: ['jshint:lib', 'mochaTest']
      }
    }
  });

  grunt.registerTask('test', ['jshint', 'mochaTest']);
  grunt.registerTask('default', 'test');

};
