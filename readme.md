<h2>CONFERE PROJECT</h2>
<h3> Descrição básica </h3>
- O deploy da aplicação foi feito no Heroku <br/>
- A aplicação não necessita autenticação <br/>
- URL da aplicação https://confere-project.herokuapp.com/ <br/>
- Software usado para HTTP services: Postman

<h3> Respostas </h3>
1. Para começar utilizar o app vamos começar acessando a rota transaction https://confere-project.herokuapp.com/api/transaction <br/>
   i. Método POST, envie no corpo da requisição o seguinte JSON<br/>

# Markdown

```
   {
	"value": 100.0, 
	"description": "Bicicleta ZXY Aro 21", 
	"type": "debit", // Ou 'credit' ou 'installment_credit'
	"installments": null,
	"card": {
		"number": "5200555500001234", 
		"expiry": "2022-02-02", // Passe uma data valida
		"cvv": "123", // Numero
		"holder": "Fulano de tal"
	}
}
```