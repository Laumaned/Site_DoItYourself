

Informations sur un camp
======

<select id="list" class="form-control" onchange="viewCamp(this.value)"></select>

Medicament
----------
<ul id="camp_medicament"></ul>

Nourriture
----------
<ul id="camp_nourriture"></ul>
<script>
document.body.onload=(function(){
	$.getJSON("/v1/camp/",function(camps){
		document.getElementById('list').innerHTML="<option>Choisir un camp</option>"+camps.map(function(camp){
			return '<option value="'+camp.id+'">camp:'+camp.id+'</option>'}).join('');
	})
});
function viewCamp(id){
	$.getJSON("/v1/nourriture_camp/id_camp/"+id,function(nourritures){
		document.getElementById('camp_nourriture').innerHTML=nourritures.map(function(n){return "<li>type:"+n.id_nourriture + '*' + n.quantite+'</li>';}).join('');
	})
	$.getJSON("/v1/medicament_camp/id_camp/"+id,function(medicaments){
		document.getElementById('camp_medicament').innerHTML=medicaments.map(function(m){return "<li>type:"+m.id_medicament + '*' + m.quantite+'</li>';}).join('');
	})
}
</script>
