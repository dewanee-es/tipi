* addons: pace (no está funcionando, creo que el loader de estilos no funciona bien), pace.css a theme y pace.css default (si no se define otra hoja de estilo) => pace.css a theme, no existe un css por defecto
* anchors: link to headings ## The Walking Dead (2004) <-- [link](#The-Walking-Dead-2004)
* errores: 404.md, codificacion caracteres tipi.html, error xml
* iconos: para páginas
* layout: reload template on page change vs. transitions (ajaxcms, sunstreet, ...) vs. mustache data binding (ractive.js)
* local storage: tick mark for read pages in links
* markdown: test page, browserify, javascript package system, async (code2flow)
* menu: list pages
* metadata: title, date, category, modified, tags, slug, authors, summary, lang, status (draft)
* posts: slider, posts sin fecha y aleatorios
* render: powerdown url rewriting/overriding render methods?
* samples: Dev
* samples: Halloween
* samples: Verano
* samples: Start. Theme: 1. fixed header 2. volver arriba 3. menú 4. https://livedemo00.template-help.com/wordpress_53761/ 5. https://livedemo00.template-help.com/wordpress_53761/about/ 6. https://livedemo00.template-help.com/wordpress_53761/portfolio/ 7. mini banner arriba con system info (a partir linea 29) 8. https://livedemo00.template-help.com/wordpress_53761/portfolio/portfolio-3/category-2/ 9. https://livedemo00.template-help.com/wordpress_53761/contacts/
* samples: Tipi
* **samples: Wiki**
* similar: see projects.md
* templating: Features: includes, compile template, helpers, html no escape. ~Jinja2
* theme: 1. tipi theme css, 2. http://www.bypeople.com/css-template/, 3. tipi (cd-scroll-down), 4. sunstreet, 5. pico, 6. default, 7. bastard, 8. uno-zen, 9. ambition, 10. theme tipi (google: codepen, html, css, simple, blog, theme, template, minimalist): #header, #toc, #tocIcon, #slider, #slides, #menu, #blog, #content, #disqus_thread, #footer, #pages, #social, #copyright, #poweredby, #error, blockquote, 11. blackdoc 12. bootstrap 13. start
* toc: TOC, anchor.svg, TOC con nºs
* ROADMAP
* theme no carga con symbolic link, poder especificar tema con url
* bastard.html de tema, cosas como {{ site_logo }}
* no funcionan páginas como #/Cómics o #/Decoración
* index.html con el template no funciona si añade scripts adicionales (bastard)
* permitir #/comics.md para ver el archivo
* bastard: scroll to top no funciona
* blocks: al cargar tema lo del head al head (title, metas...) y lo del body al body.
* images: random splash image, logo, favicon
* welcome: NO THEME (index page is the template), home, default page with folder name
* headers: h1
* config pages/links/hash... Slug: wiki (upper first letter) / blog (lowercase), spaces / dash (space -> -) / underscore (space -> _), special (España) / translate (Espana). Files: title (case as slug) / lower (lowercase), spaces/dash (space -> -) / underscore (space -> _), special (España) / translate (Espana). Folders: files + subfolders / folder (files + subfolders) / force folder (page is always a folder) / auto (js only: try files + folders, if not found try folder with files)
* URL routing & rewriting: todos los links que no sean externos son reescritos para añadir # por delante. Así: /Absoluto -> #/Absoluto, Relativo -> #Relativo, ./Subpagina -> #./Subpagina, ../Padre -> #../Padre, #anchor -> ##anchor
* Cambiar en config page.url por page.file
* Main page: # -> #/. La ruta # no está definida
* Trailing slash: una página puede indicar que se redirija a pagina/ ya que los links cambian o forzar todas las páginas del sitio acaben con / o que se les quite /
- pages.md: http://automad.org/documentation/editing-content How Automad Stores Content http://automad.org/documentation/editing-content/adding-pages Using a Text-Editor http://automad.org/documentation/editing-content/linking-to-files-and-pages
* loader: 1. sunstreet 2. mkdocs 3. mdwiki 4. tiddlewiki 5. docsify 6. tipi 7. madoko 8. gitbook 9. jekyll 10. markdown blog 11. markdown wiki 12. ajax cms 13. hackmd.io 14. https://nystudio107.com/blog/loadjs-as-a-lightweight-javascript-loader	15. https://davidwalsh.name/javascript-loader

system info js:
https://stackoverflow.com/questions/8180296/what-information-can-we-access-from-the-client
https://stackoverflow.com/questions/9514179/how-to-find-the-operating-system-version-using-javascript
https://stackoverflow.com/questions/11219582/how-to-detect-my-browser-version-and-operating-system-using-javascript
https://www.devarticles.com/c/a/JavaScript/How-to-Use-JavaScript-for-Hardware-Knowledge/
https://clientjs.org/
http://w3schools.invisionzone.com/topic/46648-jquery-and-system-information/
http://www.web-wise-wizard.com/javascript-tutorials/javascript-jscript-get-user-information.html
https://www.w3schools.com/js/js_window_navigator.asp
https://superuser.com/questions/470348/how-much-information-can-websites-get-about-your-browser-pc
https://www.daniweb.com/programming/web-development/threads/91649/need-client-machine-s-system-information

ROADMAP
-------

- composer
- screenshot.png (multiple devices, responsive)
- cms.html / cms.css
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
-mdwiki
- MARKDOWN
- sanitize urls: _ -> %20 y demás
- Title para subpáginas
- Opción de menú resaltada tb para subpáginas: si se recarga con F5 no se mueestra bien, es porque hay que cargar el menú antes
- Ver porque se parsea 2 veces la página de inicio
- _app: social
- https://github.com/markdown-it/markdown-it
- _app: ids para headers (esperar a cambio de parser) y generar toc con los ids buenos
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
- Jekyll
- Hugo themes
- Twitter Bootstrap,
- Summernote Text Editor,
- JQuery,
- PHP,
- MySQL,
- AdminLTE,
- elFinder File Manager
- https://github.com/semplon/GeniXCMS
- .editorconfig
- https://docsify.js.org
https://github.com/utensil/mdwiki-gimmicks

Static Site Generators
----------------------

DAUX.IO
Documentation generator that uses a simple folder structure and Markdown files to create WebHelp on the fly. Needs to be installed on a web server. Key features are: Mobile-friendly responsive design, auto syntax highlighting, themes, flat design style, shareable SEO-friendly URLs, as well as support for Google Analytics and Piwik Analytics.
Price: free (open source)
http://daux.io
MkDocs
Static site generator geared towards building project documentation. Documentation source files are written in Markdown. For creation, needs Python installed on your system.
Price: free (open source)
http://www.mkdocs.org
docpress
Creates simple static documentation sites.
Price: free (open source)
http://docpress.github.io
docsify
Creates simple static documentation sites.
Price: free (open source)
https://docsify.js.org
Docute
Creates simple static documentation sites.
Price: free (open source)
https://docute.js.org
 
 
The following is a list of some general open source static site generators that transform reStructuredText or Markdown into static web sites:

https://getgrav.org
https://blog.getpelican.com
https://hexo.io
http://brunch.io
https://middlemanapp.com
http://gohugo.io
http://www.metalsmith.io
http://wintersmith.io
https://github.com/eudicots/Cactus -> assets optimization, sitemap.xml, robots.txt
https://nanoc.ws
 
Many more static site generators are listed here along with figures about their current popularity:
https://www.staticgen.com
Documentation theme for GRAV
Price: free (open source)
https://github.com/getgrav/grav-theme-learn2

https://libraries.io/search?keywords=recyclerview%2Cdocumentation&languages=JavaScript
http://www.blogduwebdesign.com/ressources-documentation/ressources-generer-automatiquement-documentation-projets/2354
https://npm.taobao.org/package/marked > dependants
http://couscous.io/