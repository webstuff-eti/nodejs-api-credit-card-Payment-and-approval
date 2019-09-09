# nodejs-api-credit-card-Payment-and-approval
PAYMENT API WITH INTEGRATION WITH CREDIT APPROVAL - REST FULL WITH NODEJS


#Uploading Services
nodemon index.js


#Installing lib to become a client and consume another REST service:
npm install --save restify


#POST WITH CURL
curl http://localhost:3000/pagamentos/pagamento -X POST  -v  -H "Contente-Type:  application/json"  -d  @files/pagamento-cartao.json


#Post Office Services:
http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?op=CalcPrazo

http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?wsdl


#Details - 
. nCdServico - String

		Código do serviço:

		04014 = SEDEX à vista
		04065 = SEDEX à vista pagamento na entrega
		04510 = PAC à vista
		04707 = PAC à vista pagamento na entrega
		40169 = SEDEX12 ( à vista e a faturar)
		40215 = SEDEX 10 (à vista e a faturar)
		40290 = SEDEX Hoje Varejo
		
.sCepOrigem - String

		Origin ZIP Code without hyphen. Example: 04110120

.sCepDestino - String

		Destination ZIP Code without hyphen. Example: 35540000


