var myApp=new Framework7({
animateNavBackIcon:true,
swipePanel: 'left', //Activamos la acción slide para el menú deslizando el dedo desde el lateral
	
	///////*********************

	//////************
});
var $$=Dom7;
var mainView=myApp.addView('.view-main',{dynamicNavbar:true,domCache:true});



//Now we add our callback for initial page
myApp.onPageInit('index-1', function (page) {
  //Do something here with home page
bd_iniciar_inicio();
	
}).trigger(); //And trigger it right away


//var zz = JSON.parse(localStorage.length);
function espacio(){
var zz =JSON.stringify(localStorage).length;
zz=parseInt(zz/1000);
	var alerta='';
	if(zz>2560){
		alerta=' Se esta sobrepasado el Limite';
	}
myApp.alert(zz+' kb'+alerta,'Espacio Utilizado');

	//myApp.alert(navigator.onLine,'conexion');
}

////+++++++
function checkConnection() {
	if(navigator.onLine){
        return 'Online';
	}else{
		return 'Offline';
	}
}



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
$$('.panel').css({'visibility':'visible'});
$$('.tabbar-labels').show();
    }else{
$$('.panel').css({'visibility':'hidden'});		
$$('.tabbar-labels').hide();		
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
		//myApp.alert('ok:'+i);
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
	
var version_actual= '1.2.0';
var usuario= JSON.parse(localStorage.getItem('usuario'));
var ultima_actualizacion= JSON.parse(localStorage.getItem('ultima_actualizacion')); 
	if(ultima_actualizacion===null || ultima_actualizacion===''){
	ultima_actualizacion=10;	
	}

//
$$('.version').html('Metrica Urbana '+version_actual);	
$$('.usuario_doc').html('<i class="fa fa-user"></i> '+usuario);	
//
var tx_enviado=JSON.parse(localStorage.getItem('enviado'));
if(tx_enviado===null){
tx_enviado='';	
}
$$('#ya_enviado').html(tx_enviado);		
	//
var ref=0;
var fx=0;
var ultimo =0;
var mensaje='';	
	//
	//myApp.alert('ok 162');	
	var conexion=checkConnection();
	//myApp.alert('ok 164');	
	//myApp.alert(conexion);
	//if(navigator.onLine){
	if(conexion==='Online'){
	$$('#lista_formularios_code').val('');
		
$$.post('http://metricaurbana.com/conecta.php',{nuevos_formularios:'si',ultima_actualizacion:ultima_actualizacion},function(data){
//	
	var nuevos = data.split("|");
    // 
    //var nueva_actualizacion=0;
    //var mensaje_resultado='';
	var primero = Number(nuevos[0]);
	var ultimo = Number(nuevos[1])+2;
	//var ultimo=Number(nuevos[1]);
	//myApp.alert(primero+'*'+ultimo, 'descargando...');
    while(fx<ultimo){
	fx++;	
	if(fx<primero){
		localStorage.removeItem('formulario'+fx);
	}else{
     
     ref=(fx-primero)+2;
		var listado=$$('#lista_formularios_code').val();
		/*
		if(fx===44){
		myApp.alert(ref+': '+nuevos[ref],'formulario '+ref); 
		}
		*/
        if(nuevos[ref]!==undefined && nuevos[ref]!=='' && ref>1){
		
            var formx = nuevos[ref].split("~");
			
            var formx_numero=formx[0];
            var formx_nombre=formx[1];
            var formx_version=formx[2];
            //var formx_actualizado=formx[3];
            var formx_html=formx[4];
            //
			//myApp.alert(formx_numero+':'+formx_nombre,'cargando formulario '+fx);
			//
			localStorage.setItem('formulario'+formx_numero,JSON.stringify('ok~'+formx_numero+'~'+formx_nombre+'~'+formx_version+'~'+formx_html+'~si'));
			listado=listado+'<tr valign="top"><td><b>' + formx_numero + '</b></td><td><a href="#view-3" class="tab-link" onclick="bd_load(' + formx_numero + ')">' + formx_nombre + '</a></td></tr>';
			$$('#lista_formularios_code').val(listado);
			//bd_listado_formularios();
			$$("#elementsList").html(listado);
			localStorage.setItem('listado_formularios',JSON.stringify(listado));
			myApp.alert(formx_nombre,'formulario descargado N.'+formx_numero);	
			
        }else{
		//localStorage.removeItem('formulario'+fx);	
		}
		///
	}
	//
	}
	
         });
       //////
	}else{
		/// no hay internet se carga el ultimo listado guardado
		var lt=JSON.parse(localStorage.getItem('listado_formularios'));
		//+++
			$$('#lista_formularios_code').val(lt);
			//bd_listado_formularios();
			$$("#elementsList").html(lt);
		//+++
	}

	//cargar_listado_programacion();
	//setTimeout('cargar_listado_programacion()',3000);// revisar si se activa o no
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
var b=0;	
while(i<limite) {
    i++;
    var fm=JSON.parse(localStorage.getItem('encuesta'+i));
	//myApp.alert(fm,i+'encu');
	/*
	var estado_enviado=JSON.parse(localStorage.getItem('encuesta_enviada'+i));
	if(estado_enviado===null){
		estado_enviado='';
	}
   */
    if(fm!==null && fm!=='') {
b++;
    var datos = fm.split("~");
    var fc = new Date(Number(datos[3]));
var fechax=fc.getFullYear() + "-" + (fc.getMonth()+1)+ "-" + fc.getDate();
var horax=fc.getHours();
var minutosx=fc.getMinutes();  
		
outerHTML = outerHTML+'<tr valign="top"><td><b>' + i + '</b></td><td>' + datos[2] + '</td><td>' + datos[1] + '</td><td>' + datos[3] + '</td><td>' + fechax + ' '+horax+':'+minutosx+'</td><td>pendiente</td></tr>';
		//
                    }
	
    //
}
	
	if(outerHTML==='' || b===1){
		outerHTML=outerHTML+'<tr><td colspan="6">No hay encuestas pendientes por sincronizar<br> <span style="color:red" onclick="borrar_todo();" >Borrar todos los datos guardados en memoria?</span> <input type="text" id="codigo_borrado" style="width:60px;"></td></tr>';
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
	var conexion=checkConnection();
	if(conexion==='Online'){
	//if(navigator.onLine){
var limite=JSON.parse(localStorage.getItem('encuesta_id'));
		limite=limite+1;
		var limiteB=Number(limite)-250;
		var en1=JSON.parse(localStorage.getItem('encuesta'+limiteB));
		//
		if(limite>250 && en1!==null && en1!==''){
		limite=limiteB;	
		}
		//
		var limiteC=Number(limite)-250;
		var en2=JSON.parse(localStorage.getItem('encuesta'+limiteC));
		//
		if(limite>250 && en2!==null && en2!==''){
		limite=limiteC;	
		}
		//
	if(limite===null){
	limite=0;
	myApp.alert('No hay encuestas pendientes de sincronización', 'Sin Registros');
	}
//var outerHTMLx = '';
//var i=0;
var enviados=0;	

var tx_enviado=JSON.parse(localStorage.getItem('enviado'));
if(tx_enviado===null){
tx_enviado='';	
}		
//while(i<limite) {
   // i++;
		//var x=0;
		var proceso='';
for(var i=1;i<=limite;i++){	
proceso=proceso+'-'+i;	
    var en=JSON.parse(localStorage.getItem('encuesta'+i));
    var rp=JSON.parse(localStorage.getItem('respuestas'+i));
	var consecutivo=i;
   //var respuestaS ='';
	
    if(en!==null && en!=='') {
		enviados++;
		
	//myApp.alert(i+':'+en,'test A');	
$$.post('http://metricaurbana.com/conecta.php',{sincronizar:'si',encuesta:en,respuestas:rp, consecutivo:consecutivo},function(dataS){
		 	var respuestaS = dataS.split("|");
	//myApp.alert(respuestaS[0]);
	//return;
	
	//outerHTMLx = outerHTMLx +respuestaS[0]+'*'; 
             if(respuestaS[0]==='OK'){
localStorage.removeItem('encuesta'+respuestaS[3]);
localStorage.removeItem('respuestas'+respuestaS[3]);				 
//myApp.alert(i+' OK:'+respuestaS[3]);				 
				 ////*********** /// '0YA|1Enviada|2'.$ahora.'|3'.$consecutivo.'|4'.$formulario_id.'|5'.$usuario.'|6'.$fecha_encuesta.'|7'.$fecha;
tx_enviado='<tr valign="top" class="enviado"><td><b>' + respuestaS[3] + '</b></td><td>' + respuestaS[4] + '</td><td>' + respuestaS[5] + '</td><td>' + respuestaS[6] + '</td><td>' + respuestaS[7] + '</td><td>'+respuestaS[2]+'</td></tr>'+tx_enviado;
localStorage.setItem('enviado',JSON.stringify(tx_enviado)); 
$$('#ya_enviado').html(tx_enviado);				 
				 /////******

             }else if(respuestaS[0]==='YA'){
localStorage.removeItem('encuesta'+respuestaS[3]);
localStorage.removeItem('respuestas'+respuestaS[3]);
//myApp.alert(i+' YA:'+respuestaS[3]);				 
				 ////***********
tx_enviado='<tr valign="top" class="enviado"><td><b>' + respuestaS[3] + '</b></td><td>' + respuestaS[4] + '</td><td>' + respuestaS[5] + '</td><td>' + respuestaS[6] + '</td><td>' + respuestaS[7] + '</td><td>'+respuestaS[2]+'</td></tr>'+tx_enviado;
localStorage.setItem('enviado',JSON.stringify(tx_enviado)); 
$$('#ya_enviado').html(tx_enviado);				 
				 /////******

             }
    //myApp.alert(respuestaS[1],'sincronizacion');
    //reporte_encuestas(); 
         });
        ///
                    }
	/*
	if(enviados===300){/// limite de encuestas enviadas por cada vez
	i=limite;	
	}
	*/
	
      if(i===limite){
		  /*
		myApp.alert(i+' encuestas analizadas','sincronizacion');
	reporte_encuestas(); 
		myApp.alert(enviados+' Encuestas','Enviadas'); 
		myApp.alert(pendientes_sincronizar+' Encuestas','Sin Enviar');
		  */
		$$('#elementsList_encuestas').html('');
		  
		myApp.alert('proceso realizado','sincronización',function(){
		myApp.showTab('#view-4'); 
		reporte_encuestas(); 	
		});  
		 
	  } 
    //
	
}
//myApp.alert(proceso);	
		
		

	}else{
		myApp.alert('Por favor revise su conexión a internet','error en conexión');
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
	var code=$$('#codigo_borrado').val();
	if(code!=='2846'){
		myApp.alert('Error en el codigo de borrado','error');
	}else{
	localStorage.clear();
window.location='index.html';	
	}

            });
	
	//

}


function cargar_encuesta_aeropuerto(posicion){
var form_aeropuerto=Number(JSON.parse(localStorage.getItem('programacion_aeropuerto_formulario')));
var pre=$$('#aeropuerto'+posicion).val();
	bd_load(form_aeropuerto);
	$$('#'+form_aeropuerto+'_1_1').val(pre);
	var planilla=$$('#aeropuerto_planilla'+posicion).val();
	$$('#planilla').val(planilla);
}

function cargar_encuesta_terminal(posicion){
var form_terminal=Number(JSON.parse(localStorage.getItem('programacion_terminal_formulario')));	
var pre=$$('#terminal'+posicion).val();
	bd_load(form_terminal);
	$$('#'+form_terminal+'_1_1').val(pre);
	var planilla=$$('#terminal_planilla'+posicion).val();
	$$('#planilla').val(planilla);
}



function bd_listado_programacion(tipo){
if(tipo==='aeropuerto'){ 
var i=0;
var resultado_aeropuerto='';	
var limiteA=Number(JSON.parse(localStorage.getItem('programacion_aeropuerto_items')));
	if(limiteA>0){
	resultado_aeropuerto='<tr><td colspan="10">Aeropuerto:</td></tr><tr> <th>&nbsp;</th><th>Fecha</th> <th>Estrato</th> <th>Planilla</th> <th>Lugar</th> <th>Aerolinea</th> <th>Vuelo</th> <th>Pais Destino</th> <th>Ciudad Destino</th> <th>Hora Captura</th> <th>Hora Salida</th></tr>';	
	}else{
	resultado_aeropuerto=' <b>Sin Programación para Aeropuerto</b>';	
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
	var conexion=checkConnection();
	//myApp.alert(conexion);
	//if(navigator.onLine){
	if(conexion==='Online'){
	if(usuario!==null && usuario!==''){
//myApp.alert(ultima_actualizacion); 	
$$.post('http://metricaurbana.com/conecta.php',{nueva_programacion:'si',usuario:usuario},function(data){
//myApp.alert(data,'resultado completo');
	var prog = data.split("|");
    // 
	var registrosT = prog[0].split("~");
    var registros = Number(registrosT[0]);
	myApp.alert('Encuestas Aeropuerto: '+registros,'Programación');
	localStorage.setItem('programacion_aeropuerto_items',JSON.stringify(registros));
	localStorage.setItem('programacion_aeropuerto_formulario',JSON.stringify(registrosT[1]));
	//myApp.alert(registrosT[1],'formulario aeropuerto');
	var fx=0;
    while(fx<registros){
	fx++;
	//myApp.alert(fx+'-'+registros,'pa');   	
     localStorage.setItem('PA_'+fx,JSON.stringify(prog[fx]));
		bd_listado_programacion('aeropuerto');
	}
	
	
	
	//// revisamos la programacion de terminal
	fx++;
	var registros2T = prog[fx].split("~");
	var registros2 = Number(registros2T[0]);
	myApp.alert('Encuestas Terminal: '+registros2,'Programación');
	localStorage.setItem('programacion_terminal_items',JSON.stringify(registros2));
	localStorage.setItem('programacion_terminal_formulario',JSON.stringify(registros2T[1]));
	//myApp.alert(registros2T[1],'formulario terminal');
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
bd_listado_programacion('terminal');
	}
	
         }); 	
}	
	//
}else{
	
	bd_listado_programacion('aeropuerto');
	bd_listado_programacion('terminal');
	myApp.alert('Por favor revise su conexión a internet','error en conexión');
}
		
}





function pulsar(obj,name,valor,base) {
    if (!obj.checked) return
	$$('#'+base+'_1').val(valor);
    elem=document.getElementsByName(name);
    for(i=0;i<elem.length;i++) 
        elem[i].checked=false;
    obj.checked=true;
} 



////******************************

 var pictureSource;   // picture source
    var destinationType; // sets the format of returned value

    // Wait for device API libraries to load
    //
    document.addEventListener("deviceready",onDeviceReady,false);

    // device APIs are available
    //
    function onDeviceReady() {
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
		var pregunta=$$('#editando_photo_pregunta').val();
      // Uncomment to view the base64-encoded image data
      // console.log(imageData);

      // Get image handle
      //
      var smallImage = document.getElementById('smallImage'+pregunta);

      // Unhide image elements
      //
      smallImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
		$$('#datos_imagen'+pregunta).val(imageData);
    }

    // Called when a photo is successfully retrieved
    //
    function onPhotoURISuccess(imageURI) {
		var pregunta=$$('#editando_photo_pregunta').val();
      // Uncomment to view the image file URI
      // console.log(imageURI);

      // Get image handle
      //
      var largeImage = document.getElementById('largeImage'+pregunta);

      // Unhide image elements
      //
      largeImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      //
      largeImage.src = imageURI;
    }

    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 75,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 75, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 75,
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      myApp.alert('Failed because: ' + message);
    }

//
function editando_photo(pregunta){
	$$('#editando_photo_pregunta').val(pregunta);
}

function enviar_photo(pregunta){
	var formulario=$$('#formulario_cargado').val();
var conexion=checkConnection();
	myApp.alert(conexion);
	if(conexion==='Online'){
	
var dataIm=$$('#'+formulario+'_'+pregunta).val();
//var smallImage = document.getElementById('smallImage'+pregunta);
//var dataIm=$$('#smallImage'+pregunta).getImageData();
		//alert(dataIm);
$$.post('http://metricaurbana.com/conecta.php',{foto:'si',imagen:dataIm},function(data){
	var rx = data.split("|");
myApp.alert(rx[1],rx[0]);	
});

		
		
}
	
	
}


//////*********
