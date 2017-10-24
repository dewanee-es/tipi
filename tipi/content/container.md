<!--
métodos mágicos: keyObjectMember
	member=property/method)
los métodos reciben el contexto con los argumentos de llamada, el container que permite obtener instancias, el handler previo, métodos para para la propagación...
Plugin?
Pluggable
Hookable
nombre método: keyObjectMemberNN (p.ej: beforeRender10)
Flight PHP: Routing
	Extending
	Filtering
	Variables
	Views
	Error Handling
	Requests
	Stopping
	Configuration
	Framework Methods
	Framework Instance
Lumen
todo.txt > plugin architecture
-->
# App container and plugin architecture

Tipi class is the app container and provides the plugin architecture.

## Container

Tipi::load($path)

	Load all files/folders from $path and adds their classes to container
	
Tipi::set($name, $value)

	Set the variable $name with $value
	
Tipi::get($name)

	Get the variable $name value
	
Tipi::run()

	Run the application
	
Container code:

```
Tipi::set('config_path', 'config/');	// Set config path
Tipi::load('lib');	// Load core modules in lib folder
Tipi::load('plugins');	// Load plugins folder
Tipi::run();	// Run application
```

## Plugins

Files structure:

	/plugins
		/MyPlugin
			MyPlugin.php (class MyPlugin)
			sample.php
			sample.jpg
			...

Each plugin has a main class with folder name with some methods. Tipi container init plugin creating an instance of main class.

Folder name can contain a two digits prefix number with plugin execution order, where 01 is first and 99 is last: 30.MyPlugin

Methods names:

* mapFunction: Override function execution (e.g: mapRun)
* beforeFunction: Before function execution
* afterFunction: After function execution
* registerObject: Register custom object (e.g: registerTemplate)
	
Where:

<!--
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