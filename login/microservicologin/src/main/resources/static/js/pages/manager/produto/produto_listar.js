/**
 * @apiNote Função responsável por listar os usuários cadastrados
 *
 * @author Vito Rodrigues Franzosi
 * @Data criação: 12.04.2024
 */


async function listarDados() {
	jQuery('#id_div_conteudo').html('');
	let json = {'token': null, 'nome': null, 'descricao': null, 'preco': null };
	if (jQuery('#id_nome').val() != '')
		json.nome = jQuery('#id_nome').val();
	if (jQuery('#id_descricao').val() != 'T')
		json.descricao = jQuery('#id_descricao').val();
	if (jQuery('#id_preco').val() != '')
		json.preco = jQuery('#id_preco').val();

	let token = decryptToken(window.sessionStorage.getItem('usuarioToken'), 'unisales123')
	json.token = token

	let lista = await listarDadosDaTabela('/listarProduto', json, 8095);
	if (lista.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if ((lista.length > 0) && (lista[0].id != 0))
		visualizarDados(lista);
}

function setComboBox() {
	let html = '';
	let grupo = window.sessionStorage.getItem('usuarioGrupo');
	jQuery('#id_grupo').html('');
	jQuery('#id_form_entidade').css('display', 'none');
	jQuery('#id_form_novo_entidade').css('display', 'none');
	jQuery('#id_div_btn_novo').css('display', 'none');
	if (grupo == 'Administrador') {
		jQuery('#id_grupo').html(html);
		jQuery('#id_form_entidade').css('display', 'block');
		jQuery('#id_div_btn_novo').css('display', 'block');
		jQuery('#id_form_novo_entidade').css('display', 'block');
	}
}

jQuery(function() {
	setComboBox();
	listarDados();

	jQuery('#id_btn_buscar').click(function() {
		listarDados();
	});

	jQuery('#id_btn_novo').click(function() {
		window.sessionStorage.setItem('idProduto', 0);
		jQuery('#id_div_pagina').html('');
		jQuery('#id_div_pagina').load('/pages/manager/produto/produto_form.html', function(statusTxt, xhr) {
			if (statusTxt == 'error')
				alert('Error: ' + xhr.status + ': ' + xhr.statusText);
		});
	});
});

function decryptToken(encryptedToken, key) {
	var decryptedToken = "";
	for (var i = 0; i < encryptedToken.length; i++) {
		var charCode = encryptedToken.charCodeAt(i);
		var keyChar = key.charCodeAt(i % key.length);
		var decryptedCharCode = charCode - keyChar;
		decryptedToken += String.fromCharCode(decryptedCharCode);
	}
	return decryptedToken;
}
