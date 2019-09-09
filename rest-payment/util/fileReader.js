var fs = require('fs');

fs.readFile('node-js.png', function(error, buffer){
   console.log('Arquivo lido');

   fs.writeFile('webstuff-node-js.png', buffer, function(exception){
       console.log('Arquivo escrito');
   });

});