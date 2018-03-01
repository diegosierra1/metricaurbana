var myApp=new Framework7({
animateNavBackIcon:true,
swipePanel: 'left' //Activamos la acción slide para el menú deslizando el dedo desde el lateral
});
var $$=Dom7;
var mainView=myApp.addView('.view-main',{dynamicNavbar:true,domCache:true});

//Now we add our callback for initial page
myApp.onPageInit('index-1', function (page) {
  //Do something here with home page
bd_iniciar_inicio();
	
}).trigger(); //And trigger it right away


 



function bd_iniciar_inicio(){
//myApp.alert('ok');	
var estacion_id = JSON.parse(localStorage.getItem('estacion_id'));
var usuario= JSON.parse(localStorage.getItem('usuario'));
//
    if(estacion_id!==null && estacion_id!==''){
$$('#estacion').val(estacion_id);
$$('#estacion').hide();
$$('#texto_estacion').html('Estación N. '+estacion_id); 	
    }
    //
    if(estacion_id!==null && usuario!==null ){
	$$('#usuario').val(usuario);

	$$('#boton-2').click();
		//
	//setTimeout(cargar_listado_formularios(), 3000);
	cargar_listado_formularios();	
	reporte_encuestas();
		//
    }
   //
}









$$('#submmit-register').on('click', function () {
var usuario=$$('#usuario').val();
    var estacion=$$('#estacion').val();
	 //myApp.alert(usuario+'/'+estacion); 
    if(usuario==='' || estacion===''){
     myApp.alert('datos incompletos','error'); 
	
		if(estacion===''){
	$$('#estacion').show();
	$$('#texto_estacion').hide(); 
		}
		return;
    }else{
     localStorage.setItem('estacion_id',JSON.stringify(estacion));
     localStorage.setItem('usuario',JSON.stringify(usuario));
	//
		window.location='index.html';
    }  
    
});




function bd_listado_formularios(){
//myApp.alert($$('#ingreso_abierto').val());
$$("#elementsList").html('');
//
 var outerHTML = '';   
var i=0;
while(i<1000) {
    i++;
   //
   var fm= JSON.parse(localStorage.getItem('formulario'+i));
    if(fm!==null) {
//
		myApp.alert('ok:'+i);
    var datos = fm.split("~");
    //
                        outerHTML = outerHTML+'<tr valign="top"><td><b>' + i + '</b></td><td><a href="#view-3" class="tab-link" onclick="bd_load(' + datos[1] + ')">' + datos[2] + '</a></td></tr>';
//
                    }else{
                        outerHTML = outerHTML+'';
                    }
    //
}

                   $$("#elementsList").html(outerHTML);
               
//myApp.hideIndicator(); 
	
}



function cargar_listado_formularios(){
	//
var version_actual= '1.022';
var usuario= JSON.parse(localStorage.getItem('usuario'));
var ultima_actualizacion= JSON.parse(localStorage.getItem('ultima_actualizacion')); 
	if(ultima_actualizacion===null || ultima_actualizacion===''){
	ultima_actualizacion=10;	
	}
//
$$('.version').html('Metrica Urbana '+version_actual);	
$$('.usuario_doc').html('<i class="fa fa-user"></i> '+usuario);	
//
var ref=0;
var fx=0;
//var ultimo =0;
//var mensaje='';	
myApp.alert('A:'+ultima_actualizacion);
$$.post('http://metricaurbana.com/conecta.php',{nuevos_formularios:'si',ultima_actualizacion:ultima_actualizacion},function(data){
//	
	var nuevos = data.split("|");
    // 
    //var nueva_actualizacion=0;
    //var mensaje_resultado='';
	var primero = Number(nuevos[0])-1;
	//var ultimo = Number(nuevos[1]+2);
	var ultimo=Number(nuevos[1]);
	myApp.alert(ultima_actualizacion+':'+primero+'-'+ultimo);
	//myApp.alert(nuevos[0]+'*'+nuevos[1], 'descargando...');
    while(fx<ultimo){
		
	if(fx===0){
		$$('#lista_formularios_code').val('');
	}
	var listado=$$('#lista_formularios_code').val();
     fx++;
     //ref=fx-primero;
	ref=fx+1;	
		//myApp.alert(ref+': '+nuevos[ref],'formulario '+ref); 
        if(nuevos[ref]!==undefined && nuevos[ref]!=='' && ref>1){
		
            var formx = nuevos[ref].split("~");
            var formx_numero=formx[0];
            var formx_nombre=formx[1];
            var formx_version=formx[2];
            //var formx_actualizado=formx[3];
            var formx_html=formx[4];
            //
			localStorage.setItem('formulario'+formx_numero,JSON.stringify('ok~'+formx_numero+'~'+formx_nombre+'~'+formx_version+'~'+formx_html+'~si'));
			listado=listado+'<tr valign="top"><td><b>' + formx_numero + '</b></td><td><a href="#view-3" class="tab-link" onclick="bd_load(' + formx_numero + ')">' + formx_nombre + '</a></td></tr>';
			$$('#lista_formularios_code').val(listado);
			//bd_listado_formularios();
			$$("#elementsList").html(listado);	
			myApp.alert(formx_nombre,'formulario descargado: '+formx_numero);	
			
        }else{
			localStorage.removeItem('formulario'+fx);
		///
	}
	//
	}
	
         });
       //////

	cargar_listado_programacion();
	//
}




function vr(posicion){
	var incompleta='si';
	var respuesta='';
	var formulario=$$('#formulario_cargado').val();
var total=Number($$('#total_respuestas'+posicion).val());
	var r=0;
	while(r<total){
		r++;
	var estado=document.getElementById(formulario+'_'+posicion+'_'+r).checked;
	var valor=$$('#'+formulario+'_'+posicion+'_'+r).val();
		//alert(r+':'+estado);
		if(estado===true || valor!==''){
			incompleta='no';
			if(respuesta!==''){
			respuesta=respuesta+', ';	
			}
			respuesta=respuesta+valor;
		}
	}
	//
	if(incompleta==='no'){
		//
		$$('.respuesta'+posicion).prop("required", false);
	}	else{
		//
		$$('.respuesta'+posicion).prop("required", true);
	}
	//
	
}








function bd_load(id) {
//myApp.alert('Iniciando...');	
//myApp.showIndicator();	

var encuesta_id=JSON.parse(localStorage.getItem('encuesta_id'));
    if(encuesta_id===null){
     encuesta_id=1;   
    }
    
    var contenido=JSON.parse(localStorage.getItem('formulario'+id));
    var datos = contenido.split("~");   
                   
                    if (contenido !== null ) {
                 
                       $$('#formulario_cargado').val(id);
                       $$('#encuesta_id').val(encuesta_id); 
                        //
                        $$('#titulo_formulario').html('<strong> FORMULARIO: '+id+'</strong> - '+datos[2]);
						$$('#zona_id_formulario').html('<strong> N.:'+encuesta_id+'</strong>');
                        $$('#zona_formulario').html(datos[4]);
						
                    }

	//myApp.hideIndicator(); 
     //myApp.alert('Terminando...');                   
}






function salto(desde,hasta){
 //myApp.alert(desde+'/'+hasta);
    
    var d=Number(desde);
    var a=Number(hasta)-1;
var formulario_id=$$('#formulario_cargado').val();
 //ocultamos lo que este entre
while(d<a){
    d++;
$$('#p'+formulario_id+'_'+d).hide(); 
  $$('#'+formulario_id+'_'+d+'_1').val('n/a'); 
    /// si el campo es number
  if($$('#'+formulario_id+'_'+d+'_1').val()===''){
    $$('#'+formulario_id+'_'+d+'_1').val(0);
  }  
}

}


function no_salto(desde,hasta){
//myApp.alert(desde+'/'+hasta);	
 var d=Number(desde);
    var a=Number(hasta)-1;
var formulario_id=$$('#formulario_cargado').val();
 //ocultamos lo que este entre
while(d<a){
    d++;
 $$('#p'+formulario_id+'_'+d).show();  
 $$('#'+formulario_id+'_'+d+'_1').val(''); 
    
}
}



function ver_sub(ref,it){
//myApp.alert(ref+'/'+it);
 //ocultamos los sub de esta pregunta
$$('.subpreguntas'+ref).hide();
 // mostramos el que corresponde
$$('.sub_'+ref+'_'+it).show();   
}




	$$('#submit-encuesta').on('click', function () {
	//myApp.alert('m');
		
         myApp.confirm('Desea Cerrar y Guardar esta encuesta?', 'encuesta',
         function () {
        bd_guardar_encuesta();
         },
         function () {
         //myApp.alert('You have clicked the Cancel button!!!');
         }
         );
		
         });
	
 




function reporte_encuestas(){	
//myApp.alert('m');
	var limite=JSON.parse(localStorage.getItem('encuesta_id'));
    if(limite===null){
     limite=1;   
    }
//myApp.alert('limite:'+limite);	
var outerHTML = '';
//
var i=0;
	
while(i<limite) {
    i++;
    var fm=JSON.parse(localStorage.getItem('encuesta'+i));
	var estado_enviado=JSON.parse(localStorage.getItem('encuesta_enviada'+i));
	if(estado_enviado===null){
		estado_enviado='';
	}
   
    if(fm!==null) {

    var datos = fm.split("~");
    var fc = new Date(Number(datos[3]));
    
var fechax=fc.getFullYear() + "-" + (fc.getMonth()+1)+ "-" + fc.getDate();
var horax=fc.getHours();
var minutosx=fc.getMinutes();  
		
outerHTML = outerHTML+'<tr valign="top"><td><b>' + i + '</b></td><td>' + datos[2] + '</td><td>' + datos[1] + '</td><td>' + fechax + ' '+horax+':'+minutosx+'</td><td>' + estado_enviado + '</td></tr>';
		//
                    }
	
    //
}
	
	if(outerHTML===''){
		outerHTML='No hay registro de encuestas realizadas';
	}
//
$$("#elementsList_encuestas").html(outerHTML);
//	
}
      
        // });



function campos_persistentes(){
	var p=0;
	var totalp=Number(JSON.parse(localStorage.getItem('Total_persistentes')));
	
	while(p<totalp){
		p++;
		//myApp.alert(p, 'persistencia');
		var valor=JSON.parse(localStorage.getItem('ad'+p));
		//myApp.alert(p+'-'+valor, 'persistencia');
		var campo=JSON.parse(localStorage.getItem('ad_posicion'+p));
		//myApp.alert(p+'-'+campo, 'persistencia');
		$$('#'+campo).val(valor);
		//myApp.alert(campo+':'+valor, 'P:'+p);
	}
	var plani=JSON.parse(localStorage.getItem('planilla'));
	$$('#planilla').val(plani);
}




function bd_guardar_encuesta(){
//myApp.alert('Guardando..');		
  var estacion=JSON.parse(localStorage.getItem('estacion_id'));
  var usuario=JSON.parse(localStorage.getItem('usuario'));
  var formulario=$$('#formulario_cargado').val();
   //// identificador
  var encuesta_id=$$('#encuesta_id').val(); 
  var now=new Date().getTime();
	var pers=0;
    //// Preguntas
    var respuestas='';
    var p=0;
    var total_preguntas=0;
    while(p<50){
        p++;
    //
	var pvalor=$$('#pregunta'+formulario+'_'+p).val();
	
		
    if(pvalor!==undefined){
     respuestas=respuestas+'P'+formulario+'_'+p+'~';
     //Respuestas
      var r=0;
      //var total_respuestas=0;
        while(r<60){
            r++;
            var valor=$$('#'+formulario+'_'+p+'_'+r).val();
			var valorB=$$('#R'+formulario+'_'+p+'_'+r).val();
         if(valor!==undefined || valorB!==undefined){      
         //if(valor!==undefined){
           //if(valor==='' && p!==10 && r===1){  
          if(valor==='' && r===1){
              myApp.alert('falta completar la pregunta '+p,'error');
			  //
			  document.getElementById('p'+formulario+'_'+p).scrollIntoView();
              return;
          }else{
		var adicional=$$('#adicional'+formulario+'_'+p).val();
	
		if(adicional==='persistente'){
			pers++;
			localStorage.setItem('ad'+pers,JSON.stringify(valor));
			localStorage.setItem('ad_posicion'+pers,JSON.stringify(formulario+'_'+p+'_'+r));
			localStorage.setItem('Total_persistentes',JSON.stringify(pers));
			localStorage.setItem('planilla',JSON.stringify($$('#planilla').val()));
			//
			
		}
		var vmostrar=valor;
			  if(valor===undefined){
				  vmostrar='';
			  }
			  /*
			  if(valor==='' || valor===undefined){
				  vmostrar=valorB;
			  }
			  */
			   respuestas=respuestas+'R'+formulario+'_'+p+'_'+r+'|'+vmostrar+'~';
			 
		          // buscamos Subrespuestas
			  if(valor!=='' || valorB!==''){
     var s=0;
         //var total_subrespuestas=0;
        while(s<60){
            s++;
            var svalor=$$('input[name="'+formulario+'_'+p+'_'+r+'_'+s+'"] ').val(); /// no cambiar este metodo sin probarlo antes
			//
         //myApp.alert(formulario+'_'+p+'_'+r+': '+svalor);
         if(svalor!==undefined){
             respuestas=respuestas+'S'+formulario+'_'+p+'_'+r+'_'+s+'|'+svalor+'~';
         //myApp.alert('S'+formulario+'_'+p+'_'+r+'_'+s+':: '+svalor); 
             // buscamos subrespuestas
         }else{
		//myApp.alert('SXX'+formulario+'_'+p+'_'+r+'_'+s+':: '+svalor); 	 
			s=60; 
		 }
			 
        } 
			 ///
			  }
			  //
			  
		  }
             
         
			 
		 }else{
		//myApp.alert('RXX'+formulario+'_'+p+'_'+r+':: '+valor); 	 
			 r=60;
		 }
         //myApp.alert('R'+formulario+'_'+p+'_'+r+'|'+valor); 
         }
            //
     // fin de Respuestas
    }else{
      total_preguntas=p-1;
        p=50;    
     }
    }
     /// fin preguntas
    
  //myApp.alert('<textarea>total de preguntas: '+total_preguntas+' > '+respuestas+'</textarea>'); 
    /// registramos 
var planilla=$$('#planilla').val();
localStorage.setItem('encuesta'+encuesta_id, JSON.stringify(estacion+'~'+usuario+'~'+formulario+'~'+now+'~'+planilla));
    
localStorage.setItem('respuestas'+encuesta_id,JSON.stringify(respuestas)); 
 //
 var nuevo_consecutivo=Number(encuesta_id)+1;
   //myApp.alert(nuevo_consecutivo);
    
  localStorage.setItem('encuesta_id',JSON.stringify(nuevo_consecutivo));
    //localStorage['encuesta_id']=
  
    // cargamos un nuevo formulario
  bd_load(formulario);
    myApp.alert('Se ha cargado uno nuevo', 'formulario guardado');
	//$$('#'+formulario+'_1_1').focus(); /* revisar*/
	document.getElementById('p'+formulario+'_1').scrollIntoView();
	reporte_encuestas();
	campos_persistentes();
 }



reporte_encuestas();






function ir_encuestas(){
	$$('#boton-4').click();
}




function sincronizar(){
//
var limite=JSON.parse(localStorage.getItem('encuesta_id'));
	if(limite===null){
	limite=100;
	}
var outerHTMLx = '';
var i=0;
var enviados=0;	
	

	
while(i<limite) {
    i++;
    var en=JSON.parse(localStorage.getItem('encuesta'+i));
    var rp=JSON.parse(localStorage.getItem('respuestas'+i));
   //var respuestaS ='';
	
    if(en!==null) {
	//myApp.alert(i+':'+en,'test A');	
$$.post('http://metricaurbana.com/conecta.php',{sincronizar:'si',encuesta:en,respuestas:rp},function(dataS){
		 	var respuestaS = dataS.split("|");
	//myApp.alert(respuestaS[0]);
	//return;
	
	outerHTMLx = outerHTMLx +respuestaS[0]+'*'; 
             if(respuestaS[0]==='OK'){
			localStorage.setItem('encuesta_enviada'+i,JSON.stringify(respuestaS[1])); 
			//outerHTMLx = outerHTMLx + '<tr><td>' +i+ '</td><td>Encuesta enviada</td></tr>';
			enviados++;	
			//myApp.alert('B:'+respuestaS[0]);
             }else if(respuestaS[0]==='YA'){
			localStorage.setItem('encuesta_enviada'+i,JSON.stringify(respuestaS[1])); 
			//myApp.alert('C:'+respuestaS[0]);
             }
    //myApp.alert(respuestaS[1],'sincronizacion');
    reporte_encuestas(); 
         });
        ///
                    }
	
      if(i===limite){
		myApp.alert((i-1)+' encuestas analizadas','sincronizacion');
	
		  
	  } 
    //
}

           
}



function salir(){
myApp.confirm('Desea Salir?', 'cerrar sesión', function () {
//JSON.parse(localStorage.removeItem('usuario'));
localStorage.removeItem('usuario');
window.location='index.html';
});
}


function borrar_todo(){
myApp.confirm('Desea Borra todos los datos locales?', 'Borrar y Salir', function () {
localStorage.clear();
window.location='index.html';
            });
	
	//

}


function cargar_encuesta_aeropuerto(posicion){
var pre=$$('#aeropuerto'+posicion).val();
	bd_load(38);
	$$('#38_1_1').val(pre);
	var planilla=$$('#aeropuerto_planilla'+posicion).val();
	$$('#planilla').val(planilla);
}

function cargar_encuesta_terminal(posicion){
var pre=$$('#terminal'+posicion).val();
	bd_load(40);
	$$('#40_1_1').val(pre);
	var planilla=$$('#terminal_planilla'+posicion).val();
	$$('#planilla').val(planilla);
}



function bd_listado_programacion(tipo){
if(tipo==='aeropuerto'){ 
var i=0;
var limiteA=Number(JSON.parse(localStorage.getItem('programacion_aeropuerto_items')));
	if(limiteA>0){
	var resultado_aeropuerto='<tr><td colspan="10">Aeropuerto:</td></tr><tr> <th>&nbsp;</th><th>Fecha</th> <th>Estrato</th> <th>Planilla</th> <th>Lugar</th> <th>Aerolinea</th> <th>Vuelo</th> <th>Pais Destino</th> <th>Ciudad Destino</th> <th>Hora Captura</th> <th>Hora Salida</th></tr>';	
	}else{
	var resultado_aeropuerto=' <b>Sin Programación para Aeropuerto</b>';	
	}
	//
	
while(i<limiteA) {
    i++;
	
   var fmPA= JSON.parse(localStorage.getItem('PA_'+i));
	//myApp.alert(fmPA);
    var datosPA = fmPA.split("~");
                        resultado_aeropuerto = resultado_aeropuerto+'<tr valign="top"><td><b>' + i + '</b></td><td><a href="#view-3"  class="tab-link" onclick="cargar_encuesta_aeropuerto('+i+');"><b>'+datosPA[0]+'</b></a></td> <td>'+datosPA[1]+'</td> <td>'+datosPA[2]+'</td> <td>'+datosPA[3]+'</td> <td>'+datosPA[4]+'</td> <td>'+datosPA[5]+'</td> <td>'+datosPA[6]+'</td> <td>'+datosPA[7]+'</td> <td>'+datosPA[8]+'</td> <td>'+datosPA[9]+'</td> </tr><input type="hidden" id="aeropuerto'+i+'" value="'+datosPA[5]+'"><input type="hidden" id="aeropuerto_planilla'+i+'" value="'+datosPA[2]+' - '+datosPA[7]+'">';
//
                    
    //
}
	
	if(i===limiteA){
 $$("#listado_programacion_aeropuerto").html(resultado_aeropuerto);
	}
	
}else if(tipo==='terminal'){
	/////ahora la tabla de programacion terminal
	var x=0;
	var limiteT=Number(JSON.parse(localStorage.getItem('programacion_terminal_items')));
	//limiteT=10;
	var resultado_terminal='';
	if(limiteT>0){
	resultado_terminal='<tr><td colspan="10">Terminal:</td></tr><tr> <th>&nbsp;</th><th>Fecha</th><th>Planilla</th> <th>Modulo</th> <th>Empresa</th> <th>Destino</th> <th>Hora Aplicación</th></tr>';	
	}else{
	resultado_terminal='<b>Sin programación para Terminal</b>';	
	}
//myApp.alert(limiteT,'limite T');
while(x<limiteT) {
	 x++;
	//myApp.alert(x,'cargando terminal');
   var fmPT= JSON.parse(localStorage.getItem('PT_'+x));
	//myApp.alert(fmPT,'cargando terminal '+x);
    var datosPT = fmPT.split("~");
                        resultado_terminal = resultado_terminal+'<tr valign="top"><td><b>' + x + '</b></td><td><a href="#view-3"  class="tab-link" onclick="cargar_encuesta_terminal('+x+');"><b>'+datosPT[0]+'</b></a></td> <td>'+datosPT[1]+'</td> <td>'+datosPT[2]+'</td> <td>'+datosPT[3]+'</td> <td>'+datosPT[4]+'</td> <td>'+datosPT[5]+'</td></tr><input type="hidden" id="terminal'+x+'" value="'+datosPT[4]+'"><input type="hidden" id="terminal_planilla'+x+'" value="'+datosPT[1]+' - '+datosPT[4]+'">';
    //
}
	if(x===limiteT){
  $$("#listado_programacion_terminal").html(resultado_terminal);
	}

}
	///
}






function cargar_listado_programacion(){
//myApp.alert('p'); 	
var usuario= JSON.parse(localStorage.getItem('usuario'));
//
	if(usuario!==null && usuario!==''){
//myApp.alert(ultima_actualizacion); 	
$$.post('http://metricaurbana.com/conecta.php',{nueva_programacion:'si',usuario:usuario},function(data){
//myApp.alert(data,'resultado completo');
	var prog = data.split("|");
    // 
    var registros = Number(prog[0]);
	myApp.alert('Registros: '+registros,'Programación A');
	localStorage.setItem('programacion_aeropuerto_items',JSON.stringify(registros));
	var fx=0;
    while(fx<registros){
	fx++;
	//myApp.alert(fx+'-'+registros,'pa');   	
     localStorage.setItem('PA_'+fx,JSON.stringify(prog[fx]));
		//bd_listado_programacion('aeropuerto');
	}
	
	
	
	//// revisamos la programacion de terminal
	fx++;
	var registros2 = Number(prog[fx]);
	myApp.alert('Registros: '+registros2,'Programación B');
	localStorage.setItem('programacion_terminal_items',JSON.stringify(registros2));
	//
	//localStorage.setItem('programacion_terminal_item',JSON.stringify(registros2));
	var fx2=0;
	var lim=Number(registros2);
	//lim=3;
	//myApp.alert(fx2+'<'+lim,'Limite terminal'); 
	
	
	var resultadoT='';
    while(fx2<lim){
		fx++;
		fx2++;

			var dt=prog[fx];
		//myApp.alert(dt,'terminal: '+fx2);	
      localStorage.setItem('PT_'+fx2,JSON.stringify(dt));

	}
	
         });
    	
}
	
	//
	
}





function pulsar(obj,name,valor,base) {
    if (!obj.checked) return
	$$('#'+base+'_1').val(valor);
    elem=document.getElementsByName(name);
    for(i=0;i<elem.length;i++) 
        elem[i].checked=false;
    obj.checked=true;
} 
