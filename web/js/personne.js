personne={
table:function(type){return {
	struct:"/v1/personne",
	table :{
		'id'       :{title:"&nbsp;",format:function(val,row,t,c){return $("<button/>",{title:$.map(row,function(a,b){return (a&&a!="0"&&t[b])?(t[b].desc || t[b].name || b)+" :\n\t"+a+'\n':''}).join('')}).html('&#9432;').click(function(){alert(this.title)})}},
	},
	tfoot:!type,
	pagination:type?99:20,
}}
};
