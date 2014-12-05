    // Valeur par défaut
    var valeur =  [];
    var legende = [];
    var tmp = [];
    var titre = "Humanitaria";   

/*--------------------------------
 * Script de génération de graphe 
 *-------------------------------*/
$(document).ready(function(){
 
    var width = $(document).width(); 
    var height = $(document).height(); 
    
        
    //Requêtes utilisateurs
    $("#select-req-graphe").change(function(){
        var n = $( "#select-req-graphe option:selected" ).val();
        getData(n);
        genererGraphe();
    });    
    
    $("input[class*=graph]").on("click",function(){
        var n = $( "#select-req-graphe option:selected" ).val()
        getData(n);
        genererGraphe();
    });
    
    $("#select-type-graphe").bind("change",function(){
        
        type = $( "#select-type-graphe option:selected" ).val();
        var n = $( "#select-req-graphe option:selected" ).val()
        getData(n);
        genererGraphe();
    });

    var type = $("#select-type-graphe").children("option:selected").val();
    
    
    function getData(n){
        
        if(n==1){
            $.getJSON("/v1/camp/id_ville",function(camps){

                camps.forEach(function(camp){
                    valeur.push(camp.rows);
                    tmp.push(camp.id_ville);
                });
            });
            console.log(tmp);
            var i=0;
            for(;i<tmp.length;i++){
                console.log("kdk");
                 $.getJSON("/v1/ville/"+tmp[i],function(villes){
                        villes.forEach(function(ville){
                            legende.push(ville.nom);
                        });
                });
            }
        }
        else{
            $.getJSON("/v1/ville/id_pays",function(camps){

                camps.forEach(function(camp){
                    valeur.push(camp.rows);
                    tmp.push(camp.id_ville);
                });
            });
        }
        
    }
    function genererGraphe(){
    
    // vider les tableaux
        var i=0;
        for(;i<valeur.length;i++)
            valeur.pop();
        for(;i<legende.length;i++)
            legende.pop();
        for(;i<tmp.length;i++)
            tmp.pop();
    $("div#chart").children().remove();
        
    // Type CAMEMBERT
    if(type==1){
        
        var posx = width/2;
        var posy = height/3;
        var radius = Math.min(width/4,height/4);
        
        // Crée un camembert
        var r = Raphael(document.getElementById("chart"),width,height);
        
        // x,y,radius,data,options
        r.piechart(posx,posy,radius,valeur,{legend:legende,legendpos:"east"}); 
        r.label(posx,posy+radius+20,titre);
    }
    
    // Type BARCHART
    else if(type==2){
        
        var posx = width/4;
        var posy = height/4;
        var b_width =  width/4;
        var b_height = height/2;
        
        // Crée un histogramme
        var r = Raphael(document.getElementById("chart"), width,height);                
        
        // x,y,width,height,data,options
        var chart = r.barchart(posx,posy,b_width,b_height, [valeur],{stacked: true, type: "square",colors:["#aa5522"]});
        
        // traitement legende
        Raphael.fn.labelBarChart = function(x_start, y_start, width, labels, textAttr) {    
            
            var paper = this;
              // offset width and x_start for bar chart gutters
              x_start += 10;
              width -= 20;

              var labelWidth = width / labels.length;

              // offset x_start to center under each column
              x_start += labelWidth / 2;

              for ( var i = 0, len = labels.length; i < len; i++ ) {
                paper.text( x_start + ( i * labelWidth ), y_start, labels[i] ).attr( textAttr );
              }
        };
        
        r.labelBarChart(posx,posy+b_height,b_width, legende, {'font-size': 11});
        r.labelBarChart(posx,posy+b_height-30,b_width,valeur, {'font-size': 11});
        r.label(posx+20,b_height+posy+30,titre);

    }
    }

    //refresh page on browser resize
    $(window).bind('resize', function(e)
    {
      this.location.reload(false); 
    });
    
    $(window).bind('resize', function(e)
    {
        if (window.RT) clearTimeout(window.RT);
            window.RT = setTimeout(function()
            {
                this.location.reload(false); /* false to get page from cache */
            }, 200);
    });
    
    
    
    
        
});