# CONFERE PROJECT
<h3> Descrição básica </h3>
- O deploy da aplicação foi feito no Heroku <br/>
- A aplicação não necessita autenticação <br/>
- URL da aplicação https://confere-project.herokuapp.com/ <br/>
- Software usado para HTTP services: Postman

<h3> Respostas para desafio</h3>
1. Para começar utilizar o app vamos começar acessando a rota transaction https://confere-project.herokuapp.com/api/transaction <br/>
<pre>Método POST, envie no corpo da requisição o seguinte JSON</pre><br/>


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
            "number": "1234", // Apenas quatro ultimos digitos
            "expiry": "01/22", // Data formatada
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

2. A URL é a mesma do exercício 1
<pre>Método GET, envie na query os seguintes parâmetros. obs: se quiser testar os filtros, lembre-se de inserir outra tranção.</pre><br/>


### Conteudo da query
```
type:debit
value:100
card.expiry:01/22
```

### Resposta
```
[
    {
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
    }
]
```

3, 4. Mesmo sendo chamado automaticamente pelo transactions o serviço financials pode ser testado manualmente
<pre>Método Post, envie como parâmetro na URL ttps://confere-project.herokuapp.com/api/financials/5db8429a485e2100048d594a o id da transaction e veja a magica acontecer </pre><br/>




### Resposta
```
[
  {
        "_id": "5db8429a485e2100048d594b",
        "value": 97.2,
        "status": "received",
        "received_date": "2019-10-29T13:46:02.814Z",
        "__v": 0
    }
]
```

5. O Serviço para listar o financials está na URL ttps://confere-project.herokuapp.com/api/financials
<pre>Método get, se quiser pode passar parâmetros na query para filtros</pre><br/>

### Conteudo da query
```
value:97.2
```

### Resposta
```
[
    {
        "_id": "5db8429a485e2100048d594b",
        "value": 97.2,
        "status": "received",
        "received_date": "2019-10-29T13:46:02.814Z",
        "__v": 0
    }
]
```

6. O Serviço para listar o saldo do cliente está na URL ttps://confere-project.herokuapp.com/api/financials/total
<pre>Método get, quatro parametros são obrigatórios. Data inicio, Data termino, valor minimo e valor maximo </pre><br/>

### Conteudo da query
```
firsDate:2018-01-01
lastDate:2021-01-01
minValue:5.00
maxValue:100
```

### Resposta
```
[
   {
        "_id": {
            "status": "received"
        },
        "total": 97.2
    }
]
```