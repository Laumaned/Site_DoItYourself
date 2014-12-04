/*--------------------------------
 * Script de génération de graphe 
 *-------------------------------*/
$(document).ready(function(){

    var width = $(document).width(); 
    var height = $(document).height(); 
    
    var valeur =  [170,22,55,66,3,65];
    var legende = ["test1","test2","test3","test4","test5","test6"];
    var titre = "Graphe Test";
    var type = $("#select-type-graphe").children("option:selected").val();
    
    $("#select-type-graphe").change(function(){
        location.reload();
    });
    
    $(window).resize(function(){
        location.reload();
    });
    
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
        var b_width =  Math.min(width/2,height/2);
        var b_height = height/2;
        
        // Crée un histogramme
        var r = Raphael(document.getElementById("chart"), width,height);                
        
        // x,y,width,height,data,options
        var b = r.barchart(posx,posy,b_width,b_height,  valeur, {stacked: true, type: "square"});
        r.label(posx,b_height+20,titre);
        var labels = ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6', 'Col 7', 'Col 8'];
    }

});