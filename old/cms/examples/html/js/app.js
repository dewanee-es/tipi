
'use strict';
// Creación del módulo
var app = angular.module('mdage', ['ngRoute','mdage.controller','mdage.service','mdage.jquery.directive']);


// Configuración de las rutas
app.config(function($routeProvider) {

    $routeProvider
        .when('/consultas/consultaProvincias', {
            templateUrl : 'pages/consultas/marcado/consultaProvincias.html',
            controller  : 'ConsultaDepuracionController'
        })
         .when('/consultas/consultaMunicipios', {
            templateUrl : 'pages/consultas/marcado/consultaMunicipios.html',
            controller  : 'ConsultaDepuracionController'
        })
        .when('/consultas/consultaApps', {
            templateUrl : 'pages/consultas/consultaApps.html',
            controller  : 'ConsultaEntidadesController'
        })     
        .when('/consultas/consultaInmuebles', {
            templateUrl : 'pages/consultas/consultaInmuebles.html',
            controller  : 'ConsultaEntidadesController'
        })
        .when('/marcado/ejecutar', {
            templateUrl : 'pages/consultas/marcado/ejecutar.html',
            controller  : 'EjecutarMarcadoController'
        })
        .otherwise({
            redirectTo: '/'
        });
});


// Filtros
app.filter('orderStringBy', function() {
	return function(items, field, reverse) {
		var filtered = [];
		if(Array.isArray(items)) {	
			filtered = items;
		} else {
			angular.forEach(items, function(item) {
				filtered.push(item);
			});
		}
		filtered.sort(function (a, b) {
			if(typeof field === 'string') {			
				return a[field].localeCompare(b[field]);
			} else {
				return field(a).localeCompare(field(b));
			}
		});
		if(reverse) filtered.reverse();
		return filtered;
	};
});
