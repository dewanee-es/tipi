# Font Awesome

Current version: 4.7

To use Font Awesome icons add to config:

    {
      "addons": {
        "fontAwesome": true
      }
    }
  
This is an example of a <i class="fa fa-flag"></i> flag icon.

To add icons to menu, set the `icon` property for pages in config:

    {
      "pages": {
        "mypage": {
          "icon": "flag"
        }
      }
    }
    
You can use another icon library changing the icon class prefix in config. By default, it is configured for Font Awesome icons:

    {
      "theme": {
        "iconClass": "fa fa-"
      }
    }