var app = angular.module('mdage.controller',[]); 



app.controller('ConsultaDepuracionController',  function($scope,$log, $http,consultaDepuracionService) {
	
	
	$scope.mostrarTabla=false;	
	$scope.getMunicipiosPorcentajes = function(cpro,cmun) {
		
		var promise=consultaDepuracionService.obtenerMunicipiosTotalPorcentajes(cpro,cmun,$log, $http);
		promise.then(function(data){
		$scope.municipiosTotal=data.data;
		$scope.mostrarTabla=true;	
		});
	

	}
		
	
	$scope.calculaProcentaje=function (total, parcial)
	{
		if(parcial==0) return 0;
		else return Math.round(parcial/total*10000)/100;
		
	}

} );


app.controller('ConsultaEntidadesController',  function($scope,$log, $http,$q,$rootScope,consultaEntidadesService) {
	
	$scope.disMunicipio = true;
	$scope.disVia = true;	
	$scope.mostrarTabla = false;
	$scope.mostrarTablaInmuebles = false;
	
	$scope.getAppsMarcas = function(cpro,cmun,cvia,clase) {
		
		$scope.mostrarTabla = false;
		$scope.mostrarTablaInmuebles = false;
		consultaEntidadesService.obtenerAppsViaMarcas(cpro, cmun, cvia, clase, $log, $http).then(function(data) {
			$scope.apps=data.data;
			$scope.mostrarTabla=true;	
		});

	}
	
	
	$scope.getAppsMarcasInmueble = function(cpro,cmun,cvia,clase) {
		
		$scope.mostrarTabla = false;
		$scope.mostrarTablaInmuebles = false;
		consultaEntidadesService.obtenerAppsViaMarcasInmueble(cpro, cmun, cvia, clase, $log, $http).then(function(data) {
			$scope.apps=data.data;
			$scope.mostrarTabla=true;	
		});

	}
	
	
	$scope.getMunicipios = function(cpro) {
		
		$scope.mostrarTabla = false;
		$scope.mostrarTablaInmuebles = false;
		consultaEntidadesService.obtenerMunicipios(cpro,$log, $http).then(function(data){
			$scope.municipios=data.data;
			$scope.disMunicipio=false;
		});
		
	}
	
	
	$scope.getVias = function(cpro,cmun) {
		
		$scope.mostrarTabla = false;
		$scope.mostrarTablaInmuebles = false;
		consultaEntidadesService.obtenerVias(cpro,cmun,$log, $http).then(function(data){
			$scope.vias=data.data;
			$scope.disVia=false;
		});
		
	}
	
	$scope.getUps= function(cpro,cmun) {
		consultaEntidadesService.obtenerUPs(cpro, cmun, $log, $http).then(function(data) {
			$scope.ups = {};
			for(var i = 0; i < data.data.length; i++) {
				$scope.ups[data.data[i][0]+''+data.data[i][1]+''+data.data[i][2]+''+data.data[i][3]+''+data.data[i][4]] = data.data[i];
			}
				
		});		
	}
	
	
	
	$scope.mostrarInmueblesApp = function(app) {
		
		consultaEntidadesService.obtenerInmueblesMarcas(app.nidenApp, $log, $http).then(function(data) {
			$scope.inmuebles = data.data;
			$scope.mostrarTablaInmuebles = true;
		});
		
	}
	
	$scope.tablaAppsColumns = [
	                           {data: 'nidenApp'},
	                           {data: function(row, type, set, meta) {
	                        	   return $scope.ups[row.cpro+''+row.cmun+''+row.centco+''+row.centsi+''+row.cnucle][7];
	                           }},
	                           {data: function(row, type, set, meta) {
	                        	   return row.numero + (row.calificador ? row.calificador : '');
	                           }},
	                           {data: 'bloque'},
	                           {data: 'portal'},
	                           {data: function(row, type, set, meta) {
	                        	   return $scope.leyendaMarcas(row.depuracion, $scope.infoMarcas.app)
	                           }}
	                          ];
	
	$scope.tablaInmueblesColumns = [	                                
	                                {data: 'nidenHueco'},
	                                {data: 'escalera'},
	                                {data: 'planta'},
	                                {data: 'puerta'},
	                                {data: function(row, type, set, meta) {
	 	                        	   return $scope.leyendaMarcas(row.depuracion, $scope.infoMarcas.inmueble)
	 	                            }}
	                               ];
	
});

app.controller('mainController', function($rootScope,$scope,$log, $http,consultaEntidadesService,consultaDepuracionService) {
	
		$rootScope.cabeceraCargada = false;
		$rootScope.sidebarCargada = false;
	
		/* Inicializa AdminLTE */
		$rootScope.$on('$includeContentLoaded', function(event, src) {
			if(src == 'pages/template/cabecera.html') {
				$rootScope.cabeceraCargada = true;
			} else if(src == 'pages/template/sidebar.html') {
				$rootScope.sidebarCargada = true;
			}
			if($rootScope.cabeceraCargada && $rootScope.sidebarCargada) {
				$.AdminLTE.init();
			}
		});
		
		/* Cargamos las provincias*/
		consultaEntidadesService.obtenerProvincias($log, $http).then(function(data) {
			$rootScope.provincias = {};
			for(var i = 0; i < data.data.length; i++) {
				$rootScope.provincias[data.data[i].cpro] = data.data[i];
			}
		});
		
		
		/* Cargamos las provincias de depuración */
		consultaDepuracionService.obtenerProvinciasPorcentajes($log, $http).then(function(data) {
			$rootScope.provinciasDepuracion = data.data;
		});
		
		
		/* Cargamos la definición de las marcas */
		consultaDepuracionService.obtenerInfoMarcas($log, $http).then(function(data) {
			$rootScope.infoMarcas = data.data;
		});
		
		
		/* Función para transformar las marcas en una leyenda */
		$rootScope.leyendaMarcas = function(marcas, infoMarcas) {
			marcas = marcas.replace(/-/g, ' '); 
			var texto = "";
			
			for(var i = 0; i < infoMarcas.length; i++) {
				var longitud = 1;
				
				if(infoMarcas[i].longitud) {
					longitud = infoMarcas[i].longitud;
				}
				
				var marca = marcas.substring(infoMarcas[i].pos - 1, infoMarcas[i].pos - 1 + longitud).trim();
				
				if(marca.length > 0) {
					var desc = null;
					var leyenda = null;
					
					if(infoMarcas[i].valores && infoMarcas[i].valores[marca]) {
						desc = infoMarcas[i].valores[marca].desc;
						leyenda = infoMarcas[i].valores[marca].leyenda;
					} else if(infoMarcas[i].valor) {
						desc = infoMarcas[i].valor.desc.replace(/%s/g, marca);
						leyenda = infoMarcas[i].valor.leyenda;
					}
					
					if(leyenda) {
						texto += '<span title="' + desc + '" class="label bg-';
						
						switch(leyenda[0]) {
						case 'NUM':
							texto += 'teal">N ';
							break;
						case 'CAL':
							texto += 'purple">C ';
							break;
						case 'BLQ':
							texto += 'orange">B ';
							break;
						case 'POR':
							texto += 'maroon">P ';
							break;
						case 'ESC':
							texto += 'green">E ';
							break;
						case 'PLA':
							texto += 'yellow">P ';
							break;
						case 'PUE':
							texto += 'red">P ';
							break;
						default:
							texto += 'gray">';
						}
						
						texto += '<i class="fa ' + leyenda[1] + '"></i>';
						
						if(leyenda.length > 2) {
							texto += ' ' + leyenda[2];
						}
						
						texto += '</span> ';
					}
				}
			}
			
			return texto;
		};
		

});

app.controller('EjecutarMarcadoController', function($scope, $log, $http, consultaEntidadesService, consultaDepuracionService) {
	
	$scope.ejecutar = 0;	// 1 - App, 2 - Inmueble
	$scope.lanzado = false;
	
	$scope.mostrarFiltroApps = function() {
		$scope.ejecutar = 1;
		$scope.lanzado = false;
		$scope.provinciaSelect = null;
		$scope.municipioSelect = null;
		$scope.upSelect = null;
		$scope.viaSelect = null;
		$scope.appSelect = null;
	}
	
	$scope.mostrarFiltroInmuebles = function() {
		$scope.ejecutar = 2;
		$scope.lanzado = false;
		$scope.provinciaSelect = null;
		$scope.municipioSelect = null;
		$scope.upSelect = null;
		$scope.viaSelect = null;
		$scope.appSelect = null;
	}
	
	$scope.getMunicipios = function(cpro) {
		$scope.municipioSelect = null;
		$scope.upSelect = null;
		$scope.viaSelect = null;
		$scope.appSelect = null;
		
		consultaEntidadesService.obtenerMunicipios(cpro, $log, $http).then(function(data) {
			$scope.municipios = data.data;
		});		
	}
	
	$scope.getUPs = function(cpro, cmun) {
		$scope.upSelect = null;
		$scope.viaSelect = null;
		$scope.appSelect = null;
		
		consultaEntidadesService.obtenerUPs(cpro, cmun, $log, $http).then(function(data) {
			$scope.ups = data.data;
		});		
	}
	
	$scope.getVias = function(cpro, cmun, centco, centsi, cnucle) {		
		$scope.viaSelect = null;
		$scope.appSelect = null;
		
		consultaEntidadesService.obtenerViasUP(cpro, cmun, centco, centsi, cnucle, $log, $http).then(function(data) {
			$scope.vias=data.data;
		});		
	}
	
	$scope.getApps = function(cpro, cmun, centco, centsi, cnucle, cvia, clase) {
		$scope.appSelect = null;
		
		if($scope.ejecutar == 2) {
			consultaEntidadesService.obtenerAppsViaUP(cpro, cmun, centco, centsi, cnucle, cvia, clase, $log, $http).then(function(data) {
				$scope.apps=data.data;
			});
		}
	}
	
	$scope.descripcionUP = function(up) {
		var ec = up[5].trim();
		var es = up[6].trim();
		var nd = up[7].trim();
		var descripcion = "";
		var partes = 0;
		var ultimo = "";
		
		if(ec.length > 0) {
			descripcion = ec;
			partes++;
			ultimo = ec;
		}
		
		if(es.length > 0 && es != ultimo) {
			if(partes == 0) {
				descripcion = es;
			} else {
				descripcion += " (" + es;
			}
			partes++;
			ultimo = es;
		}
		
		if(nd.length > 0 && nd != ultimo) {
			if(partes == 0) {
				descripcion = nd;
			} else if(partes == 1) {
				descripcion += " (" + nd;				
			} else {
				descripcion += ", " + nd;
			}
			partes++;
		}
		
		if(partes > 1) {
			descripcion += ")";
		}
		
		return descripcion;
	}
	
	$scope.descripcionApp = function(app) {
		var descripcion = app.tnum;
		
		if(app.numero) {
			descripcion += " " + app.numero;
			
			if(app.calificador) {
				descripcion += app.calificador;
			}
		} else if(app.kmt) {
			descripcion += " " + app.kmt;
			
			if(app.hmt) {
				descripcion += "," + app.hmt;
			}
		}
		
		if(app.bloque) {
			descripcion += " Bloque " + app.bloque;
		}
		
		if(app.portal) {
			descripcion += " Portal " + app.portal;
		}
		
		if(app.escalera) {
			descripcion += " Escalera " + app.escalera;
		}
		
		return descripcion;
	}
	
	$scope.marcar = function(modo, provincia, municipio, up, via, app) {
		var cpro = (provincia ? provincia.cpro : null);
		var cmun = (municipio ? municipio.cmun: null);
		var centco = (up ? up[2] : null);
		var centsi = (up ? up[3] : null);
		var cnucle = (up ? up[4] : null);
		var cvia = (via ? via.cvia : null);
		var clase = (via ? via.clase : null);
		var nidenApp = (app ? app.nidenApp : null);
		
		if(modo == 1) {
			consultaDepuracionService.marcarApp(cpro, cmun, centco, centsi, cnucle, cvia, clase, $log, $http);
		} else {
			consultaDepuracionService.marcarInmueble(cpro, cmun, centco, centsi, cnucle, cvia, clase, nidenApp, $log, $http);
		}
		
		$scope.lanzado = true;
		$scope.ejecutar = 0;
	}
	
});