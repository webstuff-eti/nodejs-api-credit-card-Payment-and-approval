var fs = require('fs');

module.exports = function(app){

        app.get('/upload', function(req, res){
            console.log('Recebida requisicao GET da rota de upload de imagens.')
            res.send('upload-OK.');
        });

        app.post('/upload/imagem', function(req, res){
            console.log('Recebendo imagem');

            var fileName = req.headers.filename;

            console.log('Valor filename: ', fileName);

            req.pipe(fs.createWriteStream('filesIn/' + fileName))
            .on('finish', function(){
                console.log('Upload concluido');
                res.status(201).send('ok');
            });

        });
}