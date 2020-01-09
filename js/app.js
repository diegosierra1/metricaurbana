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


function crear_campos_fotos(){
	var cf='';
var i=0;
	while(i<80){
		i++;
		var f=0;
		while(f<5){
			f++;
		cf=cf+'<input type="hidden" id="Photo'+i+'_'+f+'" >';	
		}
	}
	///
	$$('#zona_campos_fotos').html(cf);
}




function bd_iniciar_inicio(){
//myApp.alert('ok');	
var estacion_id = JSON.parse(localStorage.getItem('estacion_id'));
var usuario= JSON.parse(localStorage.getItem('usuario'));
var empresa = JSON.parse(localStorage.getItem('empresa'));
var empresa_id = JSON.parse(localStorage.getItem('empresa_id'));	
var sesion = JSON.parse(localStorage.getItem('sesion'));	
	

    //
   if(sesion==='on'){
	 $$('#estacion').val(estacion_id);  
	$$('#usuario').val(usuario);
$$('#texto_estacion').html('Estación N. '+estacion_id);
$$('.texto_empresa').html(empresa);	   
	$$('#boton-2').click();
		//
	//setTimeout(cargar_listado_formularios(), 3000);
	cargar_listado_formularios();	
	reporte_encuestas();
	crear_campos_fotos();
		//
$$('.panel').css({'visibility':'visible'});
$$('.tabbar-labels').show();
 myApp.showTab('#view-2');
    }else{
$$('#estacion').val(estacion_id); 
$$('#texto_estacion').hide(); 
$$('.panel').css({'visibility':'hidden'});		
$$('.tabbar-labels').hide();		
	}
   //
}






function ingreso() {
var usuario=$$('#usuario').val();
var estacion=$$('#estacion').val();
	 //myApp.alert(usuario+'/'+estacion); 
    if(usuario==='' || estacion===''){
     myApp.alert('datos incompletos','error'); 
	/*
		if(estacion===''){
	$$('#estacion').show();
	$$('#texto_estacion').hide(); 
		}
		*/
		return;
    }else{
	//myApp.alert('ingresando');
	var conexion=checkConnection();
	//myApp.alert(conexion);
	//if(navigator.onLine){
	if(conexion==='Online'){
	$$.post('https://metricaurbana.com/conecta.php',{ingreso:'si',estacion:estacion},function(data){
//	
	var respuesta = data.split("|");
	//myApp.alert('data:'+data); 	
	if(respuesta[0]==='OK'){		
  localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('estacion_id',JSON.stringify(estacion));
	localStorage.setItem('empresa',JSON.stringify(respuesta[1]));
	localStorage.setItem('empresa_id',JSON.stringify(respuesta[2]));
	localStorage.setItem('firmas_empresa_id',JSON.stringify(respuesta[3]));	
	
	localStorage.setItem('sesion',JSON.stringify('on'));
		//
		bd_iniciar_inicio();
		/// si hay una nueva version se da aviso

	}else{
		myApp.alert(respuesta[1],respuesta[0]); 
	}
		});
		
		}else{
		//myApp.alert('Sin Internet');	
			// conexion off
var estacion_id = JSON.parse(localStorage.getItem('estacion_id'));

			//
			estacion_id =estacion_id.replace(" ", "");
		
		//// si estan vacias se indica que se necesita conexion a internet
		if(estacion_id===null || estacion_id===null){
		myApp.alert('Por favor revise su conexión a internet', 'problema');	
		}else if(estacion_id!==estacion){
		myApp.alert('Error en el codigo de estación, por favor verifique su conexión a internet e intentelo de nuevo','error');		
		}else if(estacion_id===estacion){
		localStorage.setItem('sesion',JSON.stringify('on'));
		//
			bd_iniciar_inicio();
			
		}
			//myApp.alert('504'); 
		}
		
		
    }  
    
}




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
	
var version_actual= '1.3.2';
var usuario= JSON.parse(localStorage.getItem('usuario'));
var empresa_id= JSON.parse(localStorage.getItem('empresa_id'));	
	//myApp.alert(empresa_id);
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
	var formularios_descargados='';
$$.post('https://metricaurbana.com/conecta.php',{nuevos_formularios:'si',ultima_actualizacion:ultima_actualizacion,empresa_id:empresa_id},function(data){
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

			//myApp.alert(formx_nombre,'formulario descargado N.'+formx_numero);	
			formularios_descargados=formularios_descargados+'<strong>N.'+formx_numero+':</strong> '+formx_nombre+'<br>';
        }else{
		//localStorage.removeItem('formulario'+fx);	
		}
		///
	}
	//
	}
	if(formularios_descargados!==''){
		myApp.alert(formularios_descargados,'formularios descargados');   
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
	/// actualizamos datos de GPS
    getPosition();
        //
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
		
outerHTML = outerHTML+'<tr valign="top" id="en_pen'+i+'"><td><b>' + i + '</b></td><td>' + datos[2] + '</td><td>' + datos[1] + '</td><td>' + datos[3] + '</td><td>' + fechax + ' '+horax+':'+minutosx+'</td><td>pendiente</td></tr>';
		//
                    }
	
    //
}
	
	//if(outerHTML==='' || b===1){
	if(outerHTML===''){	
		outerHTML=outerHTML+'<tr><td colspan="6">No hay encuestas pendientes por sincronizar<br> <span style="color:red" onclick="borrar_todo();" >Liberar espacio de la memoria interna, borrando todos los datos guardados?</span> <input type="hidden" id="codigo_borrado" style="width:60px;" value="8469"></td></tr>';
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
  var campos_obligatorios=$$('#campos_obligatorios').val();
   //// identificador
  var encuesta_id=$$('#encuesta_id').val(); 
  var now=new Date().getTime();
	var pers=0;
    //// Preguntas
    var respuestas='';
    var p=0;
    var total_preguntas=0;
    while(p<80){
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
			var foto_name=formulario+'_'+p+'_'+r;
			var foto_nameB=encuesta_id+'_'+p+'_'+r;
			var ii=r;
         if(valor!==undefined || valorB!==undefined){      
         //if(valor!==undefined){
           //if(valor==='' && p!==10 && r===1){  
          if(valor==='' && r===1 && campos_obligatorios!=='no'){
              myApp.alert('falta completar la pregunta '+p,'error');
			  //
			  document.getElementById('p'+formulario+'_'+p).scrollIntoView();
              return;
          }else if(valor==='Sin Firma'){
			  // si es firma siempre son obligatorias
			myApp.alert('falta completar las firmas en la sección '+p,'error');
			//
			document.getElementById('p'+formulario+'_'+p).scrollIntoView();
			return;
		}else{
		
			  if(valor==='foto'){
				  /// se guarda la foto como archivo para no llenar la memoria del storage
				  //myApp.alert('FFF'+p);
				  writeFile(foto_name,encuesta_id,p,ii);
				  localStorage.setItem('Foto'+foto_nameB,JSON.stringify(now+'|'+encuesta_id+'-'+formulario+'_'+p+'_'+ii));
			  }
			  /////
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
        p=80;    
     }
    }
     /// fin preguntas
    
  //myApp.alert('<textarea>total de preguntas: '+total_preguntas+' > '+respuestas+'</textarea>'); 
    /// registramos 
	if(p===80){
var planilla=$$('#planilla').val();
var coor=$$('#latitud').val()+'~'+$$('#longitud').val();
localStorage.setItem('encuesta'+encuesta_id, JSON.stringify(estacion+'~'+usuario+'~'+formulario+'~'+now+'~'+planilla));
localStorage.setItem('coordenadas'+encuesta_id,JSON.stringify(coor));    
localStorage.setItem('respuestas'+encuesta_id,JSON.stringify(respuestas)); 
 //
 var nuevo_consecutivo=Number(encuesta_id)+1;
   //myApp.alert(nuevo_consecutivo);
    
  localStorage.setItem('encuesta_id',JSON.stringify(nuevo_consecutivo));
    //localStorage['encuesta_id']=
  
    // cargamos un nuevo formulario
  //,bd_load(formulario)
    myApp.alert('Se ha cargado uno nuevo', 'formulario guardado',bd_load(formulario));
	//$$('#'+formulario+'_1_1').focus(); /* revisar*/
	document.getElementById('p'+formulario+'_1').scrollIntoView();
	reporte_encuestas();
	campos_persistentes();
}
	
 }



reporte_encuestas();






function ir_encuestas(){
	$$('#boton-4').click();
}




function sincronizar(){
//
	
	
	var conexion=checkConnection();
	//alert(conexion);
	if(conexion==='Online'){
		myApp.alert('procesando...', 'Sincronización');
	//if(navigator.onLine){
var limite=JSON.parse(localStorage.getItem('encuesta_id'));

		limite=limite+1;
		var limiteB=Number(limite)-250;
		var en1=JSON.parse(localStorage.getItem('encuesta'+limiteB));
		//alert('pp:'+en1);
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
		//alert('en2:'+en2);
		
	if(limite===null){
	limite=0;
	myApp.alert('No hay encuestas pendientes de sincronización', 'Sin Registros');
	}
//var outerHTMLx = '';
//var i=0;
var enviados=0;	
var recibidos=0;

if(JSON.parse(localStorage.getItem('enviado'))===null){
var tx_enviado='';	
}else{
var tx_enviado=JSON.parse(localStorage.getItem('enviado'));	
}
//alert(tx_enviado+'**');
//alert('limiteee:'+limite);	
//while(i<limite) {
   // i++;
		//var x=0;
		var proceso='';
		//alert('limite*:'+limite);
//for(var i=1;i<=limite;i++){	
var i=0;
while(i<limite){
i++	
 //alert(i+':::');
 //alert(JSON.parse(localStorage.getItem('coordenadas'+i))+'yy');	
proceso=proceso+'-'+i;
//alert(i+'--');
//var coordenadas='';	
//alert(typeof JSON.parse(localStorage.getItem('coordenadas'+i))+'--'+JSON.parse(localStorage.getItem('coordenadas'+i)));


	
	//alert(i+'pp');
    var en=JSON.parse(localStorage.getItem('encuesta'+i));
	var rp=JSON.parse(localStorage.getItem('respuestas'+i));
	//alert(i+'mm'+en);
	var consecutivo=i;
   //var respuestaS ='';
   //alert(i+'en:'+en);   
if(en!==null && en!=='') {	
	/// se revisa para enviar las fotos si las hay
		var f=0;
		while(f<80){
			f++;
		sf=0;	
		while(sf<2){/// 5 no 1
			sf++;
			var ft=JSON.parse(localStorage.getItem('Foto'+i+'_'+f+'_'+sf));
			if(ft!=='undefined' && ft!==null && ft!==''){
				var rft = ft.split("|");
			//enviar_photo(ft);
				//alert(rft[1]);
			//enviar_photo(ft,rft[1],f);
				//readFile(nombre,ref,pregunta)
				readFile(rft[1],ft,f,sf);
			}
			/// vemos si la foto existe y no esta en ''
		}
		}	
	//return; 
}

	
	//alert(i+'ennn:'+en); 
	//alert(JSON.parse(localStorage.getItem('coordenadas'+i)));
    if(en!==null && en!=='') {
var coordenadas='';	

/// activar para registrar coordenadas
if(JSON.parse(localStorage.getItem('coordenadas'+i))!==null && JSON.parse(localStorage.getItem('coordenadas'+i))!==''){
var coordenadas=JSON.parse(localStorage.getItem('coordenadas'+i));
}
//alert('coor:'+coordenadas);
/**/


		//if(en==='prueba'){
		enviados++;
		
	//myApp.alert(i+':'+en,'test A');
$$.post('https://metricaurbana.com/conecta.php',{sincronizar:'si',coordenadas:coordenadas,encuesta:en,respuestas:rp, consecutivo:consecutivo},function(dataS){
		 	var respuestaSS = dataS.split("|");
	//myApp.alert(respuestaSS[0]);
	//return;
	if(respuestaSS[0]!=''){
		recibidos++;
	}
	//alert(respuestaSS[0]+':'+respuestaSS[1]);
	//outerHTMLx = outerHTMLx +respuestaSS[0]+'*'; 
             if(respuestaSS[0]==='OK'){
                 
localStorage.removeItem('coordenadas'+respuestaSS[3]);
localStorage.removeItem('encuesta'+respuestaSS[3]);
localStorage.removeItem('respuestas'+respuestaSS[3]);				 
//myApp.alert(i+' OK:'+respuestaSS[3]);				 
				 ////*********** /// '0YA|1Enviada|2'.$ahora.'|3'.$consecutivo.'|4'.$formulario_id.'|5'.$usuario.'|6'.$fecha_encuesta.'|7'.$fecha;
tx_enviado='<tr valign="top" class="enviado"><td><b>' + respuestaSS[3] + '</b></td><td>' + respuestaSS[4] + '</td><td>' + respuestaSS[5] + '</td><td>' + respuestaSS[6] + '</td><td>' + respuestaSS[7] + '</td><td>'+respuestaSS[2]+'</td></tr>'+tx_enviado;
localStorage.setItem('enviado',JSON.stringify(tx_enviado)); 
$$('#ya_enviado').html(tx_enviado);				 
				 /////******
$$('#en_pen'+respuestaSS[3]).hide();
             }else if(respuestaSS[0]==='YA'){
                 
localStorage.removeItem('coordenadas'+respuestaSS[3]);
localStorage.removeItem('encuesta'+respuestaSS[3]);
localStorage.removeItem('respuestas'+respuestaSS[3]);
//myApp.alert(i+' YA:'+respuestaSS[3]);				 
				 ////***********
tx_enviado='<tr valign="top" class="enviado"><td><b>' + respuestaSS[3] + '</b></td><td>' + respuestaSS[4] + '</td><td>' + respuestaSS[5] + '</td><td>' + respuestaSS[6] + '</td><td>' + respuestaSS[7] + '</td><td>'+respuestaSS[2]+'</td></tr>'+tx_enviado;
localStorage.setItem('enviado',JSON.stringify(tx_enviado)); 
$$('#ya_enviado').html(tx_enviado);				 
				 /////ocultamos la linea que ya se ha sincronizado
				 $$('#en_pen'+respuestaSS[3]).hide();

             }
    //myApp.alert(respuestaSS[1],'sincronizacion');
    //reporte_encuestas(); 
         });
        ///
		
	
		
		
                    }
	/*
	if(enviados===300){/// limite de encuestas enviadas por cada vez
	i=limite;	
	}
	*/
	
      //if(i===limite){
		// alert(recibidos+'=='+enviados+' && '+i+'==='+limite);
		  if(recibidos==enviados && i===limite){
		  /*
		myApp.alert(i+' encuestas analizadas','sincronizacion');
	reporte_encuestas(); 
		myApp.alert(enviados+' Encuestas','Enviadas'); 
		myApp.alert(pendientes_sincronizar+' Encuestas','Sin Enviar');
		  */
		$$('#elementsList_encuestas').html('');
		  
		myApp.alert('se revisaron '+enviados+' encuestas','Fin sincronización',function(){
		myApp.showTab('#view-4'); 
		reporte_encuestas(); 	
		});
		 
	  } 
    //
	
}
//myApp.alert(proceso);	
		
myApp.alert('terminado', 'Sincronización');		

	}else{
		myApp.alert('Por favor revise su conexión a internet','error en conexión');
	}
           
}



function salir(){
myApp.confirm('Desea Salir?', 'cerrar sesión', function () {
//JSON.parse(localStorage.removeItem('usuario'));
localStorage.removeItem('sesion');
window.location='index.html';
});
}


function borrar_todo(){
myApp.confirm('Desea Borra todos los datos locales?', 'Borrar y Salir', function () {
	var code=$$('#codigo_borrado').val();
	if(code!=='8469'){
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
	resultado_aeropuerto='<tr><td colspan="10">Programación A:</td></tr><tr> <th>&nbsp;</th><th>Fecha</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>Lugar</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>Hora Captura</th> <th>Hora Salida</th></tr>';	
	}else{
	resultado_aeropuerto=' <b>Sin Programación A</b>';	
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
	resultado_terminal='<tr><td colspan="10">Programación B:</td></tr><tr> <th>&nbsp;</th><th>Fecha</th><th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>&nbsp;</th> <th>Hora</th></tr>';	
	}else{
	resultado_terminal='<b>Sin programación B</b>';	
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
$$.post('https://metricaurbana.com/conecta.php',{nueva_programacion:'si',usuario:usuario},function(data){
//myApp.alert(data,'resultado completo');
	var prog = data.split("|");
    // 
	var registrosT = prog[0].split("~");
    var registros = Number(registrosT[0]);
	myApp.alert(registros+' Registros','Programación A');
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
	myApp.alert(registros2+' Registros','Programación B');
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

myApp.showTab('#view-6');	
}





function pulsar(obj,name,valor,base) {
    if (!obj.checked) return;
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
		var formulario=$$('#formulario_cargado').val();
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
		$$('#Photo'+pregunta).val(imageData);
		
		$$('#'+formulario+'_'+pregunta).val('foto');
		//alert('#Photo'+pregunta);
		
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



function enviar_photo(ref,nombre,pregunta){
	var formulario=$$('#formulario_cargado').val();
var conexion=checkConnection();
	myApp.alert(conexion);
	if(conexion==='Online'){
	
//***var dataIm=$$('#Photo'+formulario+'_'+pregunta).val();
var dataIm=readFile(nombre);		
//var smallImage = document.getElementById('smallImage'+pregunta);
//var dataIm=$$('#smallImage'+pregunta).getImageData();
//alert('datos:'+dataIm);
$$.post('https://metricaurbana.com/conecta.php',{foto:'si',imagen:dataIm, ref:ref, nombre:nombre,pregunta:pregunta},function(data){
	var rx = data.split("|");
//myApp.alert(rx[1],rx[0]);	
});

		
		
}
	
	
}





//////*********


function createFile() {
   //var type = window.TEMPORARY;
	var type = window.PERSISTENT;
   //var size = 5*1024*1024;
var size = 0;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('prueba_metrica.jpg', {create: true, exclusive: true}, function(fileEntry) {
         alert('File creation successfull!');
      }, errorCallback);
   }

   function errorCallback(error) {
      alert("ERROR: " + error.code)
   }
	
}


function writeFile(nombre,encuesta,pregunta,posicion) {
	//myApp.alert('preg:'+pregunta);
	/// buscamos hasta 5 fotos
//alert('Creando: Photo'+encuesta+'-'+nombre+'.jpg');
//alert('#Photo'+pregunta+'_'+posicion);	
   //var type = window.TEMPORARY;
var type = window.PERSISTENT;
   //var size = 5*1024*1024;
var size = 0;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('Photo'+encuesta+'-'+nombre+'.jpg', {create: true}, function(fileEntry) {

         fileEntry.createWriter(function(fileWriter) {
            fileWriter.onwriteend = function(e) {
            //alert('Write completed: Photo'+encuesta+'-'+nombre+'.jpg');
            };

            fileWriter.onerror = function(e) {
            alert('Error al Guardar Foto: ' + e.toString());
            };

			 //alert('Escribiendo: '+pregunta+'_'+posicion);
			 //var contenido_imagen=$$('#Photo'+formulario+'_'+pregunta).val();
			 var contenido_imagen=$$('#Photo'+pregunta+'_'+posicion).val();
			//alert('Contenido Imagen #Photo'+pregunta+'_'+posicion+':'+contenido_imagen);
            //var blob = new Blob(['HOla Hola'], {type: 'text/plain'});
			 
			 var blob = new Blob([contenido_imagen], {type: 'image/jpeg'});
            fileWriter.write(blob);
			$$('#Photo'+pregunta+'_'+posicion).val('');///limpiamos el campo 
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
     alert("ERROR Guardando: " + error.code)
   }
		//

}



function readFile(nombre,ref,pregunta,posicion) {

   //var type = window.TEMPORARY;
var type = window.PERSISTENT;
//var type = LocalFileSystem.PERSISTENT;
   //var size = 5*1024*1024;
var size = 0;
var nomSS=nombre.split("-");
//alert('Leyendo: Photo'+nombre+'.jpg /R:'+ref+'/P:'+pregunta+'/Po:'+posicion);
//alert('Leyendo: '+nomSS[1]+'.jpg /R:'+ref+'/P:'+pregunta+'/Po:'+posicion);
	
window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile('Photo'+nombre+'.jpg', {}, function(fileEntry) {
		//fs.root.getFile(nomSS[1]+'.jpg', {}, function(fileEntry) {  

         fileEntry.file(function(file) {
            var reader = new FileReader();

            reader.onloadend = function(e) {
               //**var txtArea = document.getElementById('textarea');
               //**txtArea.value = this.result;
				
				//****
var dataIm=this.result;		
//var smallImage = document.getElementById('smallImage'+pregunta);
//var dataIm=$$('#smallImage'+pregunta).getImageData();
//alert('Photo'+nombre+'.jpg > datos:'+dataIm);
				
			
//myApp.alert('enviando:'+name+' > '+pregunta);
$$.post('https://metricaurbana.com/conecta.php',{foto:'si',imagen:dataIm, ref:ref, nombre:nombre,pregunta:pregunta,posicion:posicion},function(data){
	var rx = data.split("|");
//myApp.alert(rx[1],rx[0]);	
	removeFile('Photo'+nombre+'.jpg');
});
				
				//****
            };
			 
			 
            reader.readAsText(file);
			 
			 
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
	  //alert("ERROR: " + error.code);
	  /// no existe el archivo porque ya se envio al servidor
   }
		//
	
}	


function removeFile(archivo) {
   //var type = window.TEMPORARY;
var type = window.PERSISTENT;
   //var size = 5*1024*1024;
var size = 0;
   window.requestFileSystem(type, size, successCallback, errorCallback)

   function successCallback(fs) {
      fs.root.getFile(archivo, {create: false}, function(fileEntry) {

         fileEntry.remove(function() {
           //alert('File removed.');
         }, errorCallback);
      }, errorCallback);
   }

   function errorCallback(error) {
      //alert("ERROR: " + error.code)
   }
}	

//document.getElementById("getPosition").addEventListener("click", getPosition);
//document.getElementById("watchPosition").addEventListener("click", watchPosition);


function getPosition() {
   var options = {
      enableHighAccuracy: true,
      maximumAge: 3600000
   };
   var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

   function onSuccess(position) {
       /*
      alert('Latitude: '          + position.coords.latitude          + '\n' +
         'Longitude: '         + position.coords.longitude         + '\n' +
         'Altitude: '          + position.coords.altitude          + '\n' +
         'Accuracy: '          + position.coords.accuracy          + '\n' +
         'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
         'Heading: '           + position.coords.heading           + '\n' +
         'Speed: '             + position.coords.speed             + '\n' +
         'Timestamp: '         + position.timestamp                + '\n');
       */
       $$('#latitud').val(position.coords.latitude);
       $$('#longitud').val(position.coords.longitude);
       
   }

   function onError(error) {
      alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
   }
}



function cargar_contenido_personalizado(boton,titulo,contenido){
    $$('#zona_personalizada_boton').html(boton);
    $$('#zona_personalizada_titulo').html(titulo);
    $$('#zona_personalizada_contenido').html(contenido);   
    
}



function cargar_mi_contenido(){
var usuario= JSON.parse(localStorage.getItem('usuario'));
var cliente_id= JSON.parse(localStorage.getItem('empresa_id'));
//
	var conexion=checkConnection();
	//myApp.alert(conexion+':'+usuario);
	//if(navigator.onLine){
	if(conexion==='Online'){
	if(usuario!==null && usuario!==''){
//myApp.alert(ultima_actualizacion); 	
$$.post('https://metricaurbana.com/conecta.php',{mi_contenido:'si',usuario:usuario,cliente_id:cliente_id},function(data){
//myApp.alert(data,'resultado mi contenido');
	var inf = data.split("|");
    // 
	var para_mi = inf[0];
    var mi_boton = inf[1];
    var mi_titulo = inf[2];
    var mi_contenido = inf[3];
    
   
    localStorage.setItem('mi_boton',JSON.stringify(mi_boton));
	localStorage.setItem('mi_titulo',JSON.stringify(mi_titulo));
    localStorage.setItem('mi_contenido',JSON.stringify(mi_contenido));
    //
    /// cargamos el contenido
$$('#zona_personalizada_boton').html(mi_boton);
$$('#zona_personalizada_titulo').html(mi_titulo);
$$('#zona_personalizada_contenido').html(mi_contenido);
    //
    if(para_mi==='si'){
     myApp.alert('Contenido Disponible en "'+mi_titulo+'" ','Mi Contenido'); 
    
    }else if(para_mi==='no'){
     myApp.alert('No hay contenido disponible'+cliente_id,'Mi Contenido');
    }

	
         }); 	
}else{
 myApp.alert('Por favor haga click en Salir e ingrese de Nuevo con sus Claves a la Aplicación','error');   
}	
	//
}else{
myApp.alert('Por favor revise su conexión a internet','error en conexión');
}
/// cargamos el contenido
$$('#zona_personalizada_boton').html(JSON.parse(localStorage.getItem('mi_boton')));
$$('#zona_personalizada_titulo').html(JSON.parse(localStorage.getItem('mi_titulo')));
$$('#zona_personalizada_contenido').html(JSON.parse(localStorage.getItem('mi_contenido')));
    
    ///
    if(JSON.parse(localStorage.getItem('mi_titulo'))!==null && JSON.parse(localStorage.getItem('mi_titulo'))!=''){
   myApp.showTab('#view-8');     
    }
//
    ///+++++++++++++    
}



function verificar_firma(posicion){
	$$('#mensaje_'+posicion).html('');
	var us=$$('#usuario_'+posicion).val();
	var cl=$$('#clave_'+posicion).val();
	us=us.trim();
	cl=cl.trim();
	var fff=JSON.parse(localStorage.getItem('firmas_empresa_id'));
	//alert(fff);
	
	
	/// recorremos el array
	//alert(posicion);jkfjhjh
	var fx='Sin Firma';
var firmas = fff.split('+');
//alert(ff);

	$$.each( firmas, function( i, val ) {
	 //alert( "firma "+i+': ' + val );
	 /// separamos
	var ff = val.split('~'); 
	var usff=ff[3];
	var clff=ff[4];
	//alert(ff);
	
	if(usff==us && clff==cl){
	fx=ff[0]+' <br>'+ff[1]+' - documento: '+ff[2];
	//alert(fx);
	}
	
	});
	/**/
	$$('#'+posicion).val(fx);
	$$('#mensaje_'+posicion).html(fx);
	if(fx=='Sin Firma'){
		myApp.alert('Usuario o Clave incorrecto','error en firma'); 
	}else{
		myApp.alert('Se ha validado la firma','firma'); 
	}
	}