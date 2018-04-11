<?php
class IndexPage extends AbstractPicoPlugin
{
    /**
     * API version used by this plugin
     *
     * @var int
     */
    const API_VERSION = 2;
    
    /**
     * Triggered after Pico has discovered the content file to serve
     *
     * @see Pico::resolveFilePath()
     * @see Pico::getRequestFile()
     *
     * @param string &$file absolute path to the content file to serve
     *
     * @return void
     */
    public function onRequestFile(&$file) {
      $contentExt = $this->getConfig('content_ext');
      $indexFile = '/index' . $contentExt;
      $length = strlen($indexFile);
      
      if(substr($file, -$length) === $indexFile) {
        $welcomeFile = $this->getConfig('content_dir') . substr($indexFile, 1);
        
        if($file == $welcomeFile) {
          $page = $this->getConfig('welcome_page', 'index');
        } else {
          $page = $this->getConfig('folder_page', 'index');
          
          if($page == '%folder%') {
            $pos = strrpos(substr($file, 0, -$length), '/');
            $page = substr($file, $pos + 1, -$length);
          }
        }
        
        $file = substr($file, 0, -$length) . '/' . $page . $contentExt;
      }
    }

}
