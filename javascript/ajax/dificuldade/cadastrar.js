// JavaScript Document
/** * Fun��o para criar um objeto XMLHTTPRequest */
function CriaRequest()
{
	try
	{
		request = new XMLHttpRequest();
	}
	catch (IEAtual)
	{
		try
		{
			request = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(IEAntigo)
		{
			try
			{
				request = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch(falha)
			{
				request = false;
			}
		}
	}
	if (!request)
		alert("Seu Navegador n�o suporta Ajax!");
	else
		return request;
}

/** * Fun��o para enviar os dados */
function cadastrar()
{
	// Declara��o de Vari�veis
	var nome_dificuldade_cadastrar = document.getElementById("nome_dificuldade_cadastrar").value;
	var params = "nome_dificuldade="+nome_dificuldade_cadastrar+" ";
	var result = document.getElementById("status-cadastrar");
	var xmlreq = CriaRequest(); // recebe um objeto XMLHTTPRequest retornado pela fun��o CriaRequest()

	// Exibi a imagem de progresso
	//Essa anima��o ser� carregada no in�cio da requisi��o, uma esp�cie de progresso enquanto usu�rio aguarda o retorno da pesquisa.

	result.innerHTML = '<img src="../gif/ajax_loader/bar.gif" />';

	// Atribui uma fun��o para ser executada sempre que houver uma mudan�a de dado
	xmlreq.onreadystatechange = function()
	{
		// Verifica se foi conclu�do com sucesso e a conex�o fechada (readyState=4)
		if (xmlreq.readyState == 4)
		{
			// Verifica se o arquivo foi encontrado com sucesso
			if (xmlreq.status == 200)
			{
				result.innerHTML = xmlreq.responseText;
			}
			else
			{
				result.innerHTML = "Erro: " + xmlreq.statusText;
			}
		}
	};
	// Iniciar uma requisi��o
	xmlreq.open("POST", "../php/action/dificuldade_cadastrar.php", true);

	xmlreq.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	// xmlreq.setRequestHeader("Content-length", params.length);

	// xmlreq.setRequestHeader("Connection", "close");

	xmlreq.send(params);
	}
