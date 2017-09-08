Markdown
========

Text
----

    This text is **bold**.
	
This text is **bold**.

    This text is also __bold__.
	
This text is also __bold__.

    This text is *italicized*.

This text is *italicized*.

    This text is also _italicized_.
	
This text is also _italicized_.

    `This is some code.`
	
`This is some code.`

        This is a rather
        long section of code
        taking multiple lines

<!-- -->

    This is a rather
    long section of code
    taking multiple lines
	
Links
-----

    Link to [Google](http://google.com).
	
Link to [Google](http://google.com).

    Link to <http://google.com>.
	
Link to <http://google.com>.
	
    Link to [Google][] with attributes later in the document.  
    Another Link to the [search engine][Google].  
    [Google]: http://google.com "The Google!"
	
Link to [Google][] with attributes later in the document.  
Another Link to the [search engine][Google].  
[Google]: http://google.com "The Google!"

    Send me an email at <address@example.com>.
	
Send me an email at <address@example.com>.

Headings
--------

    First Header
	============
	
<span class="h1">First Header</span>

    Second Header
	-------------
	
<span class="h2">Second Header</span>

    # First Header
	
<span class="h1">First Header</span>

    ## Second Header ##
	
<span class="h2">Second Header</span>

    ### Third Header
	
<span class="h3">Third Header</span>

Blockquotes
-----------

    Here is a normal paragraph.

    > This is the first level of quoting.
	
    >> This is nested blockquote
    that runs onto the next line.
	
    > Back to the first level.

    Notice the spaces when we start a new paragraph or separate the different blockquotes.

Here is the a normal paragraph.

> This is the first level of quoting.

>> This is nested blockquote
that runs onto the next line.

> Back to the first level.

Notice the spaces when we start a new paragraph or separate the different blockquotes.

Images
------

    This is the simplest example of an ![image](markdown.png) embedded in a paragraph.
	
This is the simplest example of an ![image](markdown.png) embedded in a paragraph.

    This is an image example with a title attribute ![Alternate Message](markdown.png "This is a title") embedded in a paragraph.
	
This is an image example with a title attribute ![Alternate Message](markdown.png "This is a title") embedded in a paragraph.

    Click on the image to open it: [![](markdown.png)](markdown.png)
    
Click on the image to open it: [![](markdown.png)](markdown.png)

Lists
-----

    * Milk
    * Bread
    * Cheese
      * Cheddar
      * Camembert
    * Rice
	
* Milk
* Bread
* Cheese
  * Cheddar
  * Camembert
* Rice 

<!-- -->

    1. Milk
    2. Bread
    3. Cheese
      1. Cheddar
      2. Camembert
    4. Rice 

1. Milk
2. Bread
3. Cheese
  1. Cheddar
  2. Camembert
4. Rice

Tables
------

    | First Header | Second Header |         Third Header |  
    | :----------- | :-----------: | -------------------: |  
    | First row    |      Data     | Very long data entry |  
    | Second row   |    **Cell**   |               *Cell* |  

| First Header | Second Header |         Third Header |  
| :----------- | :-----------: | -------------------: |  
| First row    |      Data     | Very long data entry |  
| Second row   |    **Cell**   |               *Cell* |  

Fenced code blocks
------------------

    ```
    This is a fenced
    code block
    ```
	
```
This is a fenced
code block
```

    ```perl
    # Demonstrate Syntax Highlighting with highlight.js #
    print "Hello, world!\n";
    $a = 0;
    while ($a < 10) {
      print "$a...\n";
      $a++;
    }
    ```

```perl
# Demonstrate Syntax Highlighting with highlight.js #
print "Hello, world!\n";
$a = 0;
while ($a < 10) {
  print "$a...\n";
  $a++;
}
```