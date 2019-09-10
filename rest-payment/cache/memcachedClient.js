var memcached = require('memcached');

function createMencachedClient(){

    var cliente = new memcached('localhost:11211', {
        retries: 10, //Número de tentativas de consultas/ request 
        retry: 10000, // tempo de espera entre uma falha de um servidor e a tentativa de voltar ao serviços
        remove: true // Remove do pull, algum novo que esteja sem uso, ou seja, mortos do pool
    });
    return cliente;
}

module.exports = function(){
    return createMencachedClient;
}






