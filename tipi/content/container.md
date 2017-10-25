<!--
métodos mágicos: keyObjectMember
	member=property/method)
los métodos reciben el contexto con los argumentos de llamada, el container que permite obtener instancias, el handler previo, métodos para para la propagación...
Pluggable
Hookable
nombre método: keyObjectMemberNN (p.ej: beforeRender10)
Flight PHP: Routing
	Extending
	Variables
	Views
	Error Handling
	Requests
	Stopping
	Framework Methods
	Framework Instance
Lumen
IMPLEMENTACION EN PHP!
morphus/
before/after con params normales y return normal. Reciben $app (Tipi). Posibilidad de manejar la cadena de ejecución (incluso para map) con return $app->break/skip/methodBreak/breakMethod($return_value); o return $app->continue/next/methodContinue/continueMethod($return_value)
https://github.com/getgrav/grav-plugin-markdown-notices/blob/develop/markdown-notices.php
https://craftcms.com/docs/plugins/introduction
Service/Microservice
http://nibble-development.com/nibble-framework-php-plugin-based-framework/
Event/Hook
https://dzone.com/articles/practical-php-patterns/basic/practical-php-patterns-plugin
PHP League
https://github.com/jarektkaczyk/hookable
https://www.npmjs.com/package/hookable
https://www.npmjs.com/package/make-it-hookable
Container
Factory
FlightPHP
https://stackoverflow.com/questions/10053479/a-php-plugin-architecture
https://stackoverflow.com/questions/2315289/plugin-architecture-in-php
https://stackoverflow.com/questions/22550323/hook-plugin-architecture-in-php
https://blog.shameerc.com/2010/12/simple-plugin-architecture-using-php5-reflection-api.html
https://www.barik.net/archive/2006/05/04/181727/	-> phpplugins-barik.pdf
https://laracasts.com/discuss/channels/general-discussion/plugin-architecture-and-project-organisation
http://www.devnetwork.net/viewtopic.php?f=6&t=101012
https://softwareengineering.stackexchange.com/questions/262062/would-this-be-considered-a-plugin-or-template-type-architecture
https://github.com/zumba/symbiosis
https://www.reddit.com/r/PHP/comments/33ojvv/plugin_architecture_can_anyone_recommend_a/
https://pydio.com/en/docs/developer-guide-v8/plugin-architecture
Flight
https://lumen.laravel.com/docs/5.5/container
https://lumen.laravel.com/docs/5.5/providers
https://lumen.laravel.com/docs/5.5/events
google: Developing a Plugin Architecture for PHP Applications
Where:

* action:
	* do: implements action execution
	* before: before action execution
	* after: after action execution
	* get?
	* set?
	* eval?
	* new? (estático)
	* extend?
* object: object/class name
-->
# App container and plugin architecture

Tipi class is the app container and provides the plugin architecture.

## Container

The container can be populated with modules (a.k.a. plugins) and can hold values.

Tipi::load($path)

	Load all files/folders from $path and adds their classes to container
	
Tipi::set($name, $value)

	Set the variable $name with $value
	
Tipi::get($name)

	Get the variable $name value
	
Container code (index.php):

```
Tipi::set('config_path', 'config/');	// Set config path
Tipi::load('lib');	// Load core modules in lib folder
Tipi::load('plugins');	// Load plugins folder
Tipi::run();	// Run application
```

### System methods

Each method is defined in a module:

* `void run()`: Run application (Core, called in index.php)

## Plugins

Files structure:

	/plugins
		/MyPlugin
			MyPlugin.php (class MyPlugin)
			sample.php
			sample.jpg
			...

Each plugin has a main class (extends Plugin class) with folder name with some methods. Tipi container init plugin creating an instance of main class.

Folder name can contain a two digits prefix number with plugin execution order, where 01 is first and 99 is last: 30.MyPlugin

Methods names:

* mapMethod: Override method execution (e.g: mapRun). A map with same name overwrite existing function.
	function($param1, $param2, ...) { ... }
* beforeMethod: Before method execution. You can add as many functions as you want to any method. They will be called in the order that they are declared. You can break the chain by returning false in any of your functions.
	function(&$params, &$output) {
		...		
	}
* afterFunction: After function execution
	Like beforeFunction
* registerObject: Register custom object (e.g: registerTemplate)
