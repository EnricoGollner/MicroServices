/**
 * @ApiNote Função responsável por criar o ComboBox dos meses
 * @param Boolean sinal
 * @param String texto
 * @param Integer id 
 * @param HTML SELECT object
 * @returns
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 08.05.2024
 */

function getMeses(sinal, texto, id, object) {
	let meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
	if(sinal)
		object.append('<option value="0">'+texto+'</option>');
	for(let i=0; i<meses.length; i++) {
		if(id!=(i+1))
			object.append('<option value="'+(i+1)+'" class="text-uppercase">'+meses[i].toUpperCase()+'</option>');
		else
			object.append('<option value="'+(i+1)+'" class="text-uppercase" selected>'+meses[i].toUpperCase()+'</option>');
	}
}

/**
 * @ApiNote Função responsável por criar o devolver o mês em texto
 * @param Boolean sinal
 * @param String texto
 * @param Integer id 
 * @param HTML SELECT object
 * @returns
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 08.05.2024
 */

function getMes(indice) {
	let meses = ['JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO', 'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'];
	return meses[indice];
}

/**
 * @ApiNote Função responsável por ComboBox dos dias
 * @param Boolean sinal
 * @param String texto
 * @param Integer id 
 * @param HTML SELECT object
 * @returns
 * 
 * @author Vito Rodrigues Franzosi
 * @Data Criação 08.05.2024
 */

function getDias(sinal, texto, id, object) {
	let dias = ['01', '02', '03', '04', '05', '06', '06', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
	if(sinal)
		object.append('<option value="0">'+texto+'</option>');
	for(let i=0; i<dias.length; i++) {
		if(id==dias[i])
			object.append('<option value="'+dias[i]+'" selected>'+dias[i]+'</option>');
		else
			object.append('<option value="'+dias[i]+'">'+dias[i]+'</option>');
	}
}