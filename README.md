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
		
# Lib Cache in Memory to NODEJS
npm install  --save memcached

Details:   https://memcached.org
[
    memcached trabalha em um sistema de cache, sobe vários nós para 
	guardar os dados que serão guardados em cache.
]


#Installing Memcached - Ubuntu
sudo apt-get update
sudo apt-get install memcached

#Configure:
gedit memcached.conf

Details: 
[
		You can find the details information about Memcache configuration here. 
		For inital level configuration check for the following settings under Memcache configuration file /etc/memcached.conf.

		-d => Run Memcached in deamon mode. You can use this option to configure your Memcached server to run as service.
		-m => Define the maximum number of Memory can be used by Memcached deamon. (default: 64 MB)
		-p => Defind port for Memcached to listen on. (default: 11211)
		-l => Defind the IP address to Memcached listen on. Set 0.0.0.0 to listen on all IPs(enterfaces) configured on system.
		After making changes, restart the Memcached service.
]

#

Once installed, simply run a command on the terminal itself to go up and ready to receive connections:

    memcached -vv
	
The -vv parameter indicates that we want it to run in a verbose level 2 mode.

After this execution, it already displays in the terminal an information of its current status, 
which is being updated in real time as the cache is used.

slab class  38: chunk size    394840 perslab       2
slab class  39: chunk size    524288 perslab       2
<26 server listening (auto-negotiate)


#About Memcached:
[
    Memcached is a great example of these frameworks.
	It's actually defined as a free, open source in-memory object caching system,
	high performance, generic in nature, but with a strong intention to accelerate
    dynamic web application processing, easing the burden of database access.
]


# Verify Memcache Setup
Command show the current statstics of your Memcached server:
echo "stats settings" | nc localhost 11211


# Kill Process by PID - Tests Clusters | SCALABILITY:
> kill -9 process_number

 







		


