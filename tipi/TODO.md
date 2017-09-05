* cms.html
* .gitignore
* README.md
* themes/tipi/index.html
* content
* LICENSE

ROADMAP
-------

- angular
- halloween
- wiki
- hosting php: https://www.openshift.com	https://www.freehostia.com/free-cloud-hosting/
- github pages? (u alternativa?)
- dropbox?
- mega?
- google drive?
- wiki (con version actual picocms) / morphus como plugin v0.9
- actualizar picocms v1 / morphus como plugin v1.0
- fork picocms v1 / morphus como aplicación independiente basada en v1.0
- angular.js?
- modo debug?
- permitir sin configuracion? -> carga configuración por defecto
- configuracion por meta para algunas cosas, p.ej: modo html
- config por defecto en archivo aparte?
- errores solo por consola
- Un XMLHttpRequest síncrono en el hilo principal está desaprobado por sus efectos negativos en la experiencia del usuario final. Para más ayuda vea  http://xhr.spec.whatwg.org/
- no cargar jquery si ya está cargado
- pack de todos los js para evitar el cargado de varios archivos (y que se hacen con los snippets?)
- determinar ruta _app automáticamente a partir de script: http://stackoverflow.com/questions/13261970/how-to-get-the-absolute-path-of-the-current-javascript-file-name	document.getElementsByTagName('script')[n - 1].src
- warning si en appDir aparece el directorio padre en alguna posición (..)
- por defecto: theme <-> no theme
- por defecto: md <-> html
- warning si no se puede cargar jquery.js
- sin template
- includes (~ ng-include). Opciones: 1. markdown [cabecera](include:cabecera.html) 2. {{include: ... }} 3. {{include ...}}* (mod de Mark.up -> Karm.up) 4. {{> ... }} 5. <!-- include: --> 6. <include> 7. <... do-include="..."> 8. <... do:include="..."> 9. <... do_include="..."> 10. <... data-do-include="..."> 11. <... x-do-include="..."> 12. (include: ...) 13. <do:include src="..."> 14. template.txt
- content (~ ng-view). Opciones: 1. id="content" 2. class="content" 3. <content> 4. <!-- content --> 5. <... content> 6. <... data-content> 7. template.txt 8. <... do:content> 9. <... x-content>
- modo html
- warning chrome
- wait until all javascript load: http://stackoverflow.com/questions/11258068/is-it-possibile-to-wait-till-all-javascript-files-are-loaded-before-executing-ja
- (tareas antiguas a continuación:)

- Añadir meta charset utf-8
- Coger ideas de HTMLy
- Coger ideas de home/wiki/metas
- Symfony event system
- Baun
- http://event.thephpleague.com/2.0/	(u otro de la liga)
- Flightphp
- https://github.com/m-io/sunstreet
- navigation.md en _app ===>>>!!! PARTIALS!! Todo lo que no esté en config se coge de partials: navigation.md (o menu.md) / social.md / 404.md? / footer.md? / header.md? / slider.md?
- _app: limpieza archivos
- _app: separador secciones (divider.svg?)
- freepik > gothic
- _app: soporte para header
- _app: soporte para slider
- _app: animations
- _app: marcar elemento activo del menú con clase "active" > ver porque en bootstrap se mete color a pelo en dashboard.css
- _app: estilo para bootstrap nav sidebar, si se mete clase well no se distingue cuando se pasa sobre una opción
- _app: fade en reload page y al cargar el tema inicial y primera página
- _app: social
- http://www.mkdocs.org/	-> config en yaml
- MARKDOWN
- sanitize urls: _ -> %20 y demás
- Title para subpáginas
- Opción de menú resaltada tb para subpáginas: si se recarga con F5 no se mueestra bien, es porque hay que cargar el menú antes
- Ver porque se parsea 2 veces la página de inicio
- _app: social
- https://github.com/markdown-it/markdown-it
- _app: ids para headers (esperar a cambio de parser) y generar toc con los ids buenos
- DROPBOX / GOOGLE DRIVE
- ANDROID
- _app: título (h1) a partir de h1 de markdown
- nueva página de Wiki
- https://github.com/h5bp/html5-boilerplate
- metadata: 1. https://github.com/tj/js-yaml/blob/master/lib/yaml.js 2. https://github.com/mckoss/yaml/blob/master/yaml.min.js 3. https://github.com/femvc/yaml/blob/master/yaml.js 4. https://github.com/h4evr/commonjs-javascript-yaml-parser/blob/master/yamlparser.js
- index.html solo incluye main.js, ni loaders ni pollas en vinagre, desde ahí se gestiona todo. Posibilidad de definir archivo de configuracion en meta del html? Posibilidad de añadir js y css adicionales al index.html o mediante config?
- highlight
- CORS en chrome: https://github.com/mrdoob/three.js/wiki/How-to-run-things-locally	mongoose lighttpd	https://gist.github.com/willurd/5720255	https://www.srvdir.net/	http://fenixwebserver.com/	wapache
- HOXT: Nº imágenes trash variable (ver excel 2015)
- hoxt.md
- chino.md
- peliculas.md
- index.md
- Wiki theme: 1. http://bootstrapbay.com/theme/simpleness-cv-resume-template-BE8FE92 2. http://startbootstrap.com/template-overviews/freelancer/ 3. http://bootstrapbay.com/theme/plain-multi-purpose-bootstrap-template-BD832D1 4. http://bootstrapbay.com/theme/dash-responsive-admin-template-B749D4F 5. http://bootstrapbay.com/themes/blog-magazine 6. https://colorlib.com/wp/free-bootstrap-wordpress-themes/
- default theme
- Funcionalidades avanzadas:
  - _app: soporte para blog (content.json -> posts)
  - (aqui abajo)
  - Coger ideas de home/wiki/cms
  - Coger ideas de home/wiki/plugins
  - Coger ideas de home/wiki/vars-page
  - Coger ideas de home/wiki/markdown
  - Coger ideas de Automad (ult. doc. revisado: Installation)
  - http://symfony.com/doc/current/components/dependency_injection/index.html
  - Fork pico cms  
  - cms.txt
- Jekyll
- Hugo themes