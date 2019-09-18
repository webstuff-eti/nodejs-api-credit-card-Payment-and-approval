var logger = require('../servicos/logger.js');

module.exports = function(app){
  app.get('/pagamentos', function(req, res){
    logger.info('Recebida requisicao de teste na porta 3000.');
    res.send('OK.');
  });

  app.delete('/pagamentos/pagamento/:id', function(req, res){
    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CANCELADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          res.status(500).send(erro);
          logger.error('Erro ao atualizar pagamento' + erro );
          return;
        }
        logger.info('pagamento cancelado');
        res.status(204).send(pagamento);
    });
  });

  app.put('/pagamentos/pagamento/:id', function(req, res){

    var pagamento = {};
    var id = req.params.id;

    pagamento.id = id;
    pagamento.status = 'CONFIRMADO';

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.atualiza(pagamento, function(erro){
        if (erro){
          logger.error('Erro ao atualizar pagamento', erro);
          res.status(500).send(erro);
          return;
        }
        logger.info('pagamento alterado');
        res.send(pagamento);
    });

  });

  app.post('/pagamentos/pagamento', function(req, res){

    req.assert("pagamento.forma_de_pagamento",
        "Forma de pagamento eh obrigatorio").notEmpty();
    req.assert("pagamento.valor",
      "Valor eh obrigatorio e deve ser um decimal")
        .notEmpty().isFloat();

    var erros = req.validationErrors();

    if (erros){
      logger.error('Erros de validacao encontrados durante a criação do pagamento');
      res.status(400).send(erros);
      return;
    }

    var pagamento = req.body["pagamento"];
    logger.info('processando uma requisicao de um novo pagamento');

    pagamento.status = 'CRIADO';
    pagamento.data = new Date;

    var connection = app.persistencia.connectionFactory();
    var pagamentoDao = new app.persistencia.PagamentoDao(connection);

    pagamentoDao.salva(pagamento, function(erro, resultado){
      if(erro){
        logger.error('Erro ao inserir no banco:' + erro);
        res.status(500).send(erro);
      } 
      else {
        pagamento.id = resultado.insertId;
        logger.info('pagamento criado');

        //Impementação da busca no Cache
        var memcachedClient = app.cache.memcachedClient();

        memcachedClient.set('pagamento-' + pagamento.id, pagamento, 60000, 
          function(erro){
            if(erro){
              logger.error('Erro ao setar pagamento no cache:' + erro);
            } else {
              logger.error('Nova chave adicionada oa cache: pagamento-' + pagamento.id);
            }
        });

        if (pagamento.forma_de_pagamento == 'cartao'){
          
          var cartao = req.body["cartao"];
          logger.info('Cartão: ' + cartao);

          var clienteCartoes = new app.servicos.clienteCartoes();

          clienteCartoes.autoriza(cartao,
              function(exception, request, response, retorno){
              
                    if(exception){
                      logger.error(exception);
                      res.status(400).send(exception);
                      return;
                    }
                    logger.info('Retorno do serviço de autorização de cartões' + retorno);

                    res.location('/pagamentos/pagamento/' + pagamento.id);

                    if(pagamento.status == 'AUTORIZADO'){

                      var response = {
                        dados_do_pagamanto: pagamento,
                        cartao: retorno,
                        links: [
                          {
                            href:"http://localhost:3000/pagamentos/pagamento/"
                                    + pagamento.id,
                            rel:"confirmar",
                            method:"PUT"
                          },
                          {
                            href:"http://localhost:3000/pagamentos/pagamento/"
                                    + pagamento.id,
                            rel:"cancelar",
                            method:"DELETE"
                          }
                        ]
                      }
        
                      res.status(201).json(response);
                      return;

                    }else{
                      var response = {
                        dados_do_pagamanto: pagamento,
                        cartao: retorno,
                        links: [
                          {
                            //Fixme: indicação serviço de atualização de status do pagamento
                            href:"http://localhost:3000/pagamentos/pagamento/"
                                    + pagamento.id,
                            rel:"cancelar",
                            method:"DELETE"
                          }
                        ]
                      }
                      //Importante! a WebApp deverá consumir serviço de atualização de status do pagamento acima
                      res.status(203).json(response);
                      logger.info("Status code 200");
                      return;
                    }

              }); //FInaliza função de callbacḱ

        } 
        else {
            res.location('/pagamentos/pagamento/' + pagamento.id);

            var response = {
              dados_do_pagamanto: pagamento,
              links: [
                {
                  href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                  rel:"confirmar",
                  method:"PUT"
                },
                {
                  href:"http://localhost:3000/pagamentos/pagamento/" + pagamento.id,
                  rel:"cancelar",
                  method:"DELETE"
                }
              ]
            }

            res.status(201).json(response);
        }
      }
    });

  }); //Finaliza POST do pagamento


  //Implementação do cache
  app.get('/pagamentos/pagamento/:id', function(req, res){
    var id = req.params.id;
    logger.info('Consultando pagamento: ' + id);

    //Impementação da busca no Cache
    var memcachedClient = app.cache.memcachedClient();

    memcachedClient.get('pagamento-' + id, function(erro, retorno){
      
      if(erro || !retorno){
        logger.info('MISS - chave não encontrada');

        var connection = app.persistencia.connectionFactory();
        var pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.buscaPorId(id, function(erro, resultado){

          if(erro){
            logger.error('Erro ao consultar no banco:' + erro);
            res.status(500).send(erro);
            return;
          } else {
            logger.error('Pagamento encontrado:' + JSON.stringify(resultado));
            res.json(resultado);
            return;
          }

        });  
      } else{
        logger.info('HIT - Valor consultado no cache: ' + JSON.stringify(retorno));
        res.json(retorno);
        return;
      }
    });

      


  });




}//FInaliza o módulo pagamentos.js
