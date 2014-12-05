<div class="container">


	<h3>Recherche de proche</h3>
	<form class="form-inline" onsubmit="recherche_proche();return false;">
		<div id="querybuilder" class="querybuilder" data-url="/v1/personne" data-usehash="true"></div>
		<input type="button" onclick="$('#querybuilder').querybuilder('add')" value="&#43; Ajouter un critère supplémentaire"></input>
		<input type="submit" value="&#8981; Rechercher"></input>
	</form>
	
	
	
	
	
	
	
	</div>
<div class="table-responsive"><table id="restable" class="restable table table-condensed table-hover"></table></div>

<script src="/js/personne.js"></script>
<script>
(document.getElementById('logo_modelespace')||{}).hidden=1;
function recherche_proche(){
	var q=$('#querybuilder').querybuilder('get');
	
	location.hash=JSON.stringify(q);
	$('#restable').restable('query',"/v1/personne/",JSON.parse(location.hash.slice(1)));
}
document.body.onload=(function(){
	$('#restable').restable(personne.table());

	$('#querybuilder').on('ready.bs.querybuilder',function(ev){
	
	
		if(!location.hash || location.hash.length<=2)return;
		$('#querybuilder').querybuilder('set',location.hash.slice(1));
		recherche_proche();
	});
})
</script>