# CONFERE PROJECT
<h3> Descrição básica </h3>
- O deploy da aplicação foi feito no Heroku <br/>
- A aplicação não necessita autenticação <br/>
- URL da aplicação https://confere-project.herokuapp.com/ <br/>
- Software usado para HTTP services: Postman

<h3> Respostas </h3>
1. Para começar utilizar o app vamos começar acessando a rota transaction https://confere-project.herokuapp.com/api/transaction <br/>
&emspi. Método POST, envie no corpo da requisição o seguinte JSON<br/>

### Conteudo do corpo
```
   {
	"value": 100.0, 
	"description": "Bicicleta ZXY Aro 21", 
	"type": "debit", // ou 'credit' ou 'installment_credit'
	"installments": null,
	"card": {
		"number": "5200555500001234", Passe um numero valido de 16 digitos
		"expiry": "2022-02-02", // Passe uma data valida
		"cvv": "123", // Passe um numero valido de 3 digitos
		"holder": "Fulano de tal"
	}
}
```

### Resposta
```
{
   // Transação 
    "transaction": {
        "_id": "5db8429a485e2100048d594a",
        "value": 100,
        "description": "Bicicleta ZXY Aro 21",
        "type": "debit",
        "installments": null,
        "card": {
            "number": "1234",
            "expiry": "01/22",
            "cvv": "123",
            "holder": "Fulano de tal"
        },
        "createdAt": "2019-10-29T13:46:02.814Z",
        "__v": 0
    },
    // Financeiro, se for parcelado, diversas parcelas serão criadas
    "financials": [
        {
            "_id": "5db8429a485e2100048d594b",
            "value": 97.2, // Valor ajustado com a taxa da adquirente
            "status": "received", // Status
            "received_date": "2019-10-29T13:46:02.814Z",
            "__v": 0
        }
    ]
}
```