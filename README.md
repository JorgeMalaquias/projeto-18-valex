# projeto-18-valex

Projeto back-end escrito em Typescript, feito para gerenciar dados 
de cartões de benefícios para empresas e seus colaboradores.


## Como usar as rotas

<h2>Link Deploy:</h2>
https://valex18-jorge.herokuapp.com/

<h3>post - '/cards'</h3>
<p>Esta é a rota para criação de um novo cartão. 
É necessário informar uma chave(que somente empresas cadastradas possuem) via headers:</p>

```
{
 headers:{
    "x_api_key": "string cujo valor representa a chave"
 }
}
```
Devem ser passado no body o id do colaborador e o tipo do cartão que se está solicitando, como no exemplo:

```
{
    "employeeId": 1,  //tem que ser number
    "type": 'groceries' //tem que ser string
}
```
<h3>patch - '/cards/active'</h3>
Devem ser passado no body o id do cartão que se quer ativar, o código de segurança do mesmo, e sua senha como no exemplo:

```
{
    "id": 1,//tem que ser number
    "securityCode": '222',  //tem que ser string e possuir 3 caracteres
    "password": '2222'  //tem que ser string  e possuir 4 caracteres
}
```

<h3>get - '/cards/:id'</h3>
Essa rota retorna o saldo do cartão e dados de compras e recargas do mesmo
, é necessário informadar o id do cartão via params

```
{
  "balance": 35000,
  "transactions": [
		{ "id": 1, "cardId": 1, "businessId": 1, "businessName": "DrivenEats", "timestamp": "22/01/2022", "amount": 5000 }
	]
  "recharges": [
		{ "id": 1, "cardId": 1, "timestamp": "21/01/2022", "amount": 40000 }
	]
}
```


<h3>patch - '/cards/block'</h3>
Essa é a rota onde é feito o bloqueio de um cartão, ela recebe um body no formato abaixo:

```
{

  "id": 1,  //tem que ser number
  "password": '2222'  //tem que ser string  e possuir 4 caracteres

}
```

<h3>patch - '/cards/unblock'</h3>
Essa é a rota onde é feito o desbloqueio de um cartão, ela recebe um body no formato abaixo:

```
{

  "id": 1,  //tem que ser number
  "password": '2222'  //tem que ser string  e possuir 4 caracteres

}
```

<h3>post - '/purchases'</h3>
Rota para registro de uma nova compra em algum estabelecimento que aceita um dos cartões de benefícios.
 Ela recebe via body o id do cartão, o id do estabelecimento, o valor da compra, e a senha do cartão como no exemplo
 abaixo:

{
  "cardId": 1,  //tem que ser number
  "businessId": 1,  //tem que ser number
  "amount": 1000,  //tem que ser number
  "password": '2222'  //tem que ser string  e possuir 4 caracteres
}

<h3>post - '/recharges'</h3>
Rota para registro de uma nova recarga em algum cartões de benefícios existente, e não expirado.
Recebe via headers uma chave para validação da empresa que está realizando a nova recarga no seguinte formato:

```
{
 headers:{
    "x_api_key": "string cujo valor representa a chave"
 }
}
```

Pelo body devem ser informados o id do cartão, e a quantia da recarga no seguinte formato:


```

{
  "cardId": 1,  //tem que ser number
  "amount": 1000  //tem que ser number
}
    
```










```
```





