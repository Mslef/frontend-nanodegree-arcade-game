module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //Resizing all images and compressing them
    responsive_images: {
    dev: {
      options: {
        engine: 'gm',
        sizes: [{
          name: 'reduced',
          width: '100%',
          quality: 70
        }]
      },
      files: [{
        expand: true,
        src: ['*.{gif,jpg,png}'],
        cwd: 'images/',
        dest: 'build-images/'
      }]
    }
   },

   //Minimizing main CSS and JS
    cssmin: {
      css: {
        expand: true,
        src: ['css/*.css', '!*min.css'],
        ext:'.min.css'
      }       
    },

    uglify: {
      js1: {
        files: {
            'js/app.min.js': ['js/app.js'], 
        }
      }, js2: {
        files: {
            'js/engine.min.js': ['js/engine.js']
        }
      }, js3: {
        files: {
            'js/resources.min.js': ['js/resources.js']
        }
      }
    }
  });


  grunt.registerTask('default', ['responsive_images', 'cssmin', 'uglify']);

};