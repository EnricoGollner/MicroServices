/**
 * @apiNote Função responsável por validar os dados do usuário
 * @param Json json
 * @returns String frase
 */
function validarDados(json) {
    let frase='';
    if((json.nome==null) || ((json.nome.trim()).length<2))
        frase +='O campo nome não pode está com menos de 2 caracteres!<br>';
    if((json.descricao==null) ||  ((json.descricao.trim()).length==0))
        frase +='O campo descrição não pode está vazio!<br>';
    if((json.preco==null) ||  ((json.preco.trim()).length==0))
        frase +='O campo preco não pode está vazio!<br>';
    return frase;
}

async function salvar() {
    let json={'id':null, 'nome':null, 'descricao':null, 'preco':null};
    let id = window.sessionStorage.getItem('idProduto');
    json.id=id;
    json.nome=jQuery('#id_nome').val();
    json.descricao=jQuery('#id_descricao').val();
    json.preco=jQuery('#id_preco').val();

        let frase = validarDados(json);
        console.log('Json: ', json);
        if(frase=='') {
            let resposta = await alterarDadosDaTabela('/salvarProduto', json);
            if(resposta.id) {
                alert('Os dados do produto foram salvos com sucesso!');
                if(json.grupo=='Cliente') {
                    window.sessionStorage.setItem('idProduto', resposta.id);
                    // window.sessionStorage.setItem('idCliente', 0);
                    jQuery('#id_div_pagina').html('');
                    jQuery('#id_div_pagina').load('/pages/manager/produto/produto_form.html', function(statusTxt, xhr) {
                        if(statusTxt == 'error')
                            alert('Error: ' + xhr.status + ': ' + xhr.statusText);
                    });
                } else
                    window.location='/manager';
            } else
                alert('Os dados do produto NÃO foram salvos!');
        } else
            alert(frase);

}

function visualizarDados(produto) {
    jQuery('#id_nome').val(produto.nome);
    jQuery('#id_descricao').val(produto.descricao);
    jQuery('#id_preco').val(produto.preco);
}

/**
 * @apiNote Função responsável por listar os usuários cadastrados
 * 
 * @author Vito Rodrigues Franzosi
 * @Data criação: 28.04.2024
 */
async function listarDados(id) {
	let json={'id':id};
	let produto = await listarDadosDaTabela('/buscarProdutoPorId', json);
	if(produto.resposta)
		jQuery('#id_div_conteudo').html('<div class="col-sm-12 col-md-12 col-lg-12 col-xl-12 text-center fw-bold">A busca, com os parâmetros passados, gerou uma lista vazia!</div>');
	else if((produto!=null) && (produto.id!=null))
		visualizarDados(produto);
}

jQuery(function() {
    let id = window.sessionStorage.getItem('idProduto');
    if(id!==0)
	    listarDados(id);
    jQuery('#id_btn_salvar').click(function() {
        salvar();
    });
    jQuery('#id_btn_cancelar').click(function() {
        window.location="/manager";
    });
});