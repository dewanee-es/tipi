//'use strict';
var service = angular.module('mdage.service', []);

service.service('consultaEntidadesService', function() {

	this.obtenerProvincias = function($log, $http) {
		return $http.get('rest/provincia/listaProvincias');
	}

	this.obtenerMunicipios = function(cpro, $log, $http) {
		return $http.get('rest/municipio/listaMunicipios/' + cpro);
	}

	this.obtenerUPs = function(cpro, cmun, $log, $http) {
		return $http.get('rest/up/listaUPs/' + cpro + '/' + cmun);
	}

	this.obtenerVias = function(cpro, cmun, $log, $http) {
		return $http.get('rest/vias/listaVias/' + cpro + '/' + cmun);
	}

	this.obtenerViasUP = function(cpro, cmun, centco, centsi, cnucle, $log, $http) {
		return $http.get('rest/vias/listaViasUP/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle);
	}

	this.obtenerAppsViaMarcas = function(cpro, cmun, cvia, clase, $log, $http) {
		return $http.get('rest/app/listaAppsViaMarcas/' + cpro + '/' + cmun + '/' + cvia + '/' + clase);
	}

	this.obtenerAppsViaMarcasInmueble = function(cpro, cmun, cvia, clase, $log, $http) {
		return $http.get('rest/app/listaAppsViaMarcasInmueble/' + cpro + '/' + cmun + '/' + cvia + '/' + clase);
	}

	this.obtenerAppsViaUP = function(cpro, cmun, centco, centsi, cnucle, cvia, clase, $log, $http) {
		return $http.get('rest/app/listaAppsViaUP/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle + '/' + cvia + '/' + clase);
	}

	this.obtenerInmueblesMarcas = function(nidenApp, $log, $http) {
		return $http.get('rest/inmueble/listaInmueblesMarcas/' + nidenApp);
	}
	
	this.obtenerProvincia = function(cpro, listProvincias, $http,$q) {
		
		if(!listProvincias)
		{
			return $http.get('/MDAGE_DepuracionWeb/rest/provincia/consultaProvincia/'+ cpro);
			
		}
		else
		{
			  var defered = $q.defer();
			  var promise = defered.promise;
			// Buscamos en la lista el código
				for(provincia in listProvincias )
				{

					if(parseInt(provincia)==cpro){
						defered.resolve(listProvincias[provincia]);
						break;
					}
				}
				
			  return promise;

			
		}
		
		
	}
	
	this.obtenerMunicipio = function(cpro,cmun, $http) {
		return $http.get('/MDAGE_DepuracionWeb/rest/municipio/consultaMunicipio/'+ cpro + '/' + cmun ); 
			
	}

	
	this.obtenerEntidadColectiva = function(cpro,cmun, centco, $http) {
		
		return $http.get('/MDAGE_DepuracionWeb/rest/entidadColectiva/consultaEntColectiva/'+ cpro + '/' + cmun + '/' + centco);
		
		
	}
	
	this.obtenerEntidadSingular= function(cpro,cmun, centco,centsi, $http) {
		
		return $http.get('/MDAGE_DepuracionWeb/rest/entidadSingular/consultaEntSingular/'+ cpro + '/' + cmun + '/' + centco+ '/' + centsi);
		
		
	}
	
	this.obtenerNucleo= function(cpro,cmun, centco,centsi,cnucle, $log, $http) {
		
		return $http.get('/MDAGE_DepuracionWeb/rest/nucleo/consultaNucleo/'+ cpro + '/' + cmun + '/' + centco+ '/' + centsi+ '/' + cnucle);

		
		
	}

	
	this.obtenerVia= function(cpro,cmun, clase,cvia, $log, $http) {
		
		return $http.get('/MDAGE_DepuracionWeb/rest/vias/consultaVia/'+ cpro + '/' + cmun + '/' + clase+ '/' + cvia);
		
		
	}

});

service.service('consultaDepuracionService', function() {
	
	this.obtenerProvinciasPorcentajes = function($log, $http) {
		return $http.get('rest/app/listaProvTotDep');
	}

	this.obtenerMunicipiosTotalPorcentajes = function(cpro, cmun, $log, $http) {
		return $http.get('rest/app/listaMunTotDep/' + cpro + '/' + cmun);
	}
	
	this.marcarApp = function(cpro, cmun, centco, centsi, cnucle, cvia, clase, $log, $http) {
		if(!cpro) {
			return $http.get('rest/app/marcar');
		} else if(!cmun) {
			return $http.get('rest/app/marcarProvincia/' + cpro);
		} else if(!centco && !centsi && !cnucle) {
			return $http.get('rest/app/marcarMunicipio/' + cpro + '/' + cmun);
		} else if(!cvia && !clase) {
			return $http.get('rest/app/marcarUP/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle);
		} else {
			return $http.get('rest/app/marcarVia/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle + '/' + cvia + '/' + clase);
		}
	}

	this.marcarInmueble = function(cpro, cmun, centco, centsi, cnucle, cvia, clase, nidenApp, $log, $http) {
		if(nidenApp) {
			return $http.get('rest/inmueble/marcarApp/' + nidenApp);
		} else if(!cpro) {
			return $http.get('rest/inmueble/marcar');
		} else if(!cmun) {
			return $http.get('rest/inmueble/marcarProvincia/' + cpro);
		} else if(!centco && !centsi && !cnucle) {
			return $http.get('rest/inmueble/marcarMunicipio/' + cpro + '/' + cmun);
		} else if(!cvia && !clase) {
			return $http.get('rest/inmueble/marcarUP/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle);
		} else {
			return $http.get('rest/inmueble/marcarVia/' + cpro + '/' + cmun + '/' + centco + '/' + centsi + '/' + cnucle + '/' + cvia + '/' + clase);
		}
	}
	
	this.obtenerInfoMarcas = function($log, $http) {
		return $http.get('json/marcado.json');
	}

	

});



