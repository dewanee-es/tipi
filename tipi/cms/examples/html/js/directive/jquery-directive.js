var app = angular.module('mdage.jquery.directive',[]); 

/***** DATATABLE ****/

app.directive('datatable', ['$timeout', function($timeout) {
    return function(scope, element, attrs) {

        // apply DataTable options, use defaults if none specified by user
        var options = {
        	language: {
        		url: 'plugins/datatables/jquery.dataTables.spanish.json'
        	}
        };
        if (attrs.datatable.length > 0) {
            options = scope.$eval(attrs.datatable);
        }
        //scope.rows = scope.$eval(attrs.rows);

        // Tell the dataTables plugin what columns to use
        // We can either derive them from the dom, or use setup from the controller           
        /*var explicitColumns = [];
        element.find('th').each(function(index, elem) {
            explicitColumns.push($(elem).text());
        });
        if (explicitColumns.length > 0) {
            options["aoColumns"] = explicitColumns;
        } else*/
        if (attrs.columns) {
            options["columns"] = scope.$eval(attrs.columns);
        }

        // aoColumnDefs is dataTables way of providing fine control over column config
        /*if (attrs.aoColumnDefs) {
            options["aoColumnDefs"] = scope.$eval(attrs.aoColumnDefs);
        }
        
        if (attrs.fnRowCallback) {
            options["fnRowCallback"] = scope.$eval(attrs.fnRowCallback);
        }*/

        // apply the plugin
        var dataTable = $(element).DataTable(options);
        
        if(attrs.select) {
        	$(element).on('click', 'tr', function() {
        		dataTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var data = dataTable.row(this).data();
                var f = scope.$eval(attrs.select);
                f(data);
        	})
        }
        
        // watch for any changes to our data, rebuild the DataTable
        scope.$watch(attrs.rows, function(value) {
        	//scope.rows = scope.$eval(attrs.rows);
            var val = value || null;
            if (val) {
                dataTable.clear();
                dataTable.rows.add(val).draw();
            	/*$timeout(function() {
            		$(element).dataTable(options);
                	//$(element).dataTable($.extend({destroy: true}, options));
            	})*/
            }
        });
    };
}]);

/***** KNOB *****/

app.directive('knob', ['$timeout', function($timeout) {
    'use strict';

    return {
        restrict: 'EA',
        replace: true,
        template: '<input value="{{ data }}"/>',
        scope: {
            data: '='
        },
        link: function($scope, $element, $attrs) {
            var knobInit = {};
            var options = {
              color: 'fgColor'
            };
            
            for(var attr in $attrs.$attr) {
            	if(attr != 'data') {
            		if(options[attr] != undefined) {
            			knobInit[options[attr]] = $attrs[attr];
            		} else {
            			knobInit[attr] = $attrs[attr];
            		}
            	}
            }

            knobInit.release = function(newValue) {
                $timeout(function() {
                    $scope.knobData = newValue;
                    $scope.$apply();
                });
            };

            $scope.$watch('data', function(newValue, oldValue) {
                if (newValue != oldValue) {
                    $($element).val(newValue).change();
                }
            });

            $($element).val($scope.data).knob(knobInit);
        }
    };
}]);

/***** SELECT2 *****/

app.directive('select2', function ($timeout) {
	  return {
	    link: function (scope, element, attrs) {
	    	$timeout(function() {
	    		element.select2();
	    	})
	    }
	  };
	});