var restify = require('restify');

function CartoesClient(){
  this._cliente = restify.createJsonClient({
    url:'http://localhost:3001'
  });
}

CartoesClient.prototype.autoriza = function(cartao, callback){
  console.log('Consumindo serviço de cartão!');
  this._cliente.post('/cartoes/autoriza', cartao , callback);
}


module.exports = function(){
  return CartoesClient;
}
