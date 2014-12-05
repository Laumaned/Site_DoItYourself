var Map={
	map:null,
	//markers handling
	markers:[],
	//core (init + 3 show)
	init:function(){
		Map.map = new google.maps.Map(document.getElementById('map_canvas'));
		Map.map.setOptions({center:new google.maps.LatLng(43.75, 1.75),zoom:7});
		Map.showCamps();
	},
	showCamps:function(){
		$('#infotip').show().html('Récuperation des camps');
		$.getJSON("/v1/camp/",function(camps){
			camps.forEach(function(camp){
				var marker=new google.maps.Marker({
					position: new google.maps.LatLng(camp.latitude,camp.longitude),
					map: Map.map,
					title: 'Hello World!',
					data:new google.maps.InfoWindow({content:""}),
				});
				Map.markers.push(marker);
				google.maps.event.addListener(marker, 'click', function(a){
					var bulle=this.data;
					if(!bulle.content){
						$.getJSON("/v1/personne/id_camp/"+camp.id,function(personnes){
							$.getJSON("/v1/ville_alerte/id_ville/"+camp.id_ville,function(alertes){
								bulle.content=personnes.length+" personnes<br/>Code(s) alerte(s) : "+alertes.map(function(a){return a.id_alerte}).join(' & ');
								bulle.open(Map.map,marker);
								
							})
						})
					}else{
						bulle.open(Map.map,marker);
					}
				});
			})
			$('#infotip').hide().html('Ok');
		});
	},
}
