 module.exports = {
   entry: './src/main',
   output: {
     path: './public/build',
     filename: 'main.js',
   },
   module: {
     loaders: [{
       test: /\.js$/,
       loader: 'babel',
       exclude: '/node_modules/',
       query: {
         presets: ['es2015', 'react'],
         plugins: [
           'transform-async-to-generator',
           'transform-object-rest-spread',
         ],
       },
     }],
   },
 };
