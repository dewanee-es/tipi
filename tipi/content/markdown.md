Markdown
========

Basic Text Formatting (commonmark)
----------------------------------

  *Italic*
  
  _Italic_
  
  **Bold**
  
  __Bold__
  
Horizontal Rule (or slide break)
  
  ---
  
  ***
  
Blockquotes (commonmark)
------------------------

Here is the a normal paragraph.

> This is the first level of quoting.
>> This is nested blockquote
that runs onto the next line.
> Back to the first level.

Breaks (breaks)
---------------

Add an empty line to start a new paragraph.  
  
Use '\n' in paragraphs
to break line.
  
Code (commonmark)
-----------------

  `Inline code` with backticks
  
  
    # code block
    print '3 backticks or'
    print 'indent 4 spaces'

```
# code block
print '3 backticks or'
print 'indent 4 spaces'
```

    # code block
    print 'tab'
      
Syntax highlighting: Apply syntax highlighting to fenced code blocks.

```perl
# Demonstrate Syntax Highlighting with highlight.js #
print "Hello, world!\n";
$a = 0;
while ($a < 10) {
  print "$a...\n";
  $a++;
}
```

Diagrams (powerdown)
--------------------

* [Code2flow](https://code2flow.com/): Code block with `code2flow` key.

  ```code2flow
  Welcome to code2flow;
  if(In doubt?) {
    Press Help;
    while(!Ready?)
      Read help;
  }
  // the preview updates
  // as you write
  Improve your workflow!;
  ```
  
* [PlantUML](http://plantuml.com/): Code block with `plantuml` key. Inside the block you can add any of the supported diagrams by PlantUML such as Sequence, Use Case, Class, Activity, Component, State, and Object diagrams. You do not need to use the PlantUML diagram delimiters `@startuml`/`@enduml`.

  ```plantuml
  Bob -> Alice : hello
  Alice -> Bob : Go Away
  ```

Emojis (gfm)
------------

:smile:

For a full list of available emoji and codes, check out [emoji-cheat-sheet.com](http://emoji-cheat-sheet.com/)

Extended Text Formatting (markdown-it)
--------------------------------------

  superscript^2^
  
  ~~strikethrough~~

Footnotes (markdown-it)
-----------------------

  Some long sentence. [^footnote]

  [^footnote]: Test, [Link](https://google.com).

Headers (named-headers, attrs)
------------------------------

  # Heading 1
  
  # Heading 1 {#identifier .class .class key=value key=value}
  
  Heading 1
  =========
  
  ## Heading 2
  
  ## Heading 2 ## {#identifier .class .class key=value key=value}
  
  Heading 2
  ---------
  
  Heading 2 {#identifier .class .class key=value key=value}
  ---------
  
  ### Heading 3
  
  #### Heading 4
  
  ##### Heading 5
  
  ###### Heading 6
  
A header without an explicitly specified identifier will be automatically assigned a unique identifier based on the header text. It uses string.js's slugify to translate header text into a url safe name.
To avoid ID duplication, when several headers have the same text; in this case, the first will get an identifier as described above; the second will get the same identifier with -1 appended; the third with -2; and so on.

HTML (commonmark)
-----------------

<!-- Comment -->

Images (commonmark)
-------------------

  ![Image](markdown.png)
  
  ![Image][1]
  ⋮
  [1]: markdown.jpg
  
  ![Alternate Message](markdown.png "This is the title")
  
  [![](markdown.png)](markdown.png)
  
Includes (powerdown)
--------------------

Include macro.

> Macros hints:
> [[name:value]]
> [[name:single string]]
> [[name:value param1=value1 ...]]
> [[name:value param1 param2 ...]]
> [[name:param1=value1 ...]]
> [[name:param1 param2 ...]]
> Optional space: [[name: value ...]]
> Mix: [[name:value param1 param2=value2 ...]]
> Important! Name ALWAYS starts with lowercase

Include file:

  [[include:file.md]]
  
Include wiki page:

  [[include:Page]]
  
Optional spaces are allowed:

  [[include: file.md]]

Links (linkify)
---------------

  [Google](http://google.com)
  
  [Google][1]
  ⋮
  [1]: http://google.com
  
  Link to [Google][] with attributes later in the document.  
  Another Link to the [search engine][Google].  
  [Google]: http://google.com "The Google!"
  
Autoconvert URL-like text to links:

  http://google.com
  
  <http://google.com>
  
  Send me an email at <address@example.com>.

Lists (commonmark)
------------------

  * List
  * List
  * List
    + sub-item 1
    + sub-item 2
  
* Milk
* Bread
* Cheese
  * Cheddar
  * Camembert
* Rice 

  + List
  + List
  + List
  
  - List
  - List
  - List
  
  1. One
  2. Two
  3. Three
    + sub-item 1
    + sub-item 2
  
1. Milk
2. Bread
3. Cheese
  1. Cheddar
  2. Camembert
4. Rice

  1) One
  2) Two
  3) Three
  
An ordered list could start with a number different than 1:

  2. Two
  3. Three
  4. Four
  
Math (powerdown)
----------------

  Inline equation: $A = \pi*r^{2}$
  
Mentions and references (gfm)
-----------------------------

No implemented by default. Autolinking by extensions.
Examples:

16c999e8c71134401a78d4d46435517b2271d6ac
mojombo@16c999e8c71134401a78d4d46435517b2271d6ac
mojombo/github-flavored-markdown@16c999e8c71134401a78d4d46435517b2271d6ac
#1
mojombo#1
mojombo/github-flavored-markdown#1
@user

Metadata (powerdown)
--------------------

  ---
  title: A Web Doc
  author: John Doe
  date: May 1, 2015
  ---
  
Table of contents
-----------------

  [TOC]
  
  [toc]
  
Note: Only `h2` and `h3` are shown in toc.

Tables (markdown-it)
--------------------

  Table Header | Second Header
  ------------ | -------------
  Table Cell   | Cell 2
  Cell 3       | Cell 4
  
| First Header | Second Header |         Third Header |  
| :----------- | :-----------: | -------------------: |  
| First row    |      Data     | Very long data entry |  
| Second row   |    **Cell**   |               *Cell* |  

Task lists (gfm)
----------------

- [x] list syntax required (any unordered or ordered list supported)
- [x] this is a complete item
- [ ] this is an incomplete item

Typographer (typographer)
-------------------------

Enable some language-neutral replacement + quotes beautification.

  endash: --
  
  emdash: ---
  
  ellipsis: ...
  
  quotes: ""'' as “”‘’

Unstable:
=========

Features under formal definition and development.

Filters
-------

Inspired by http://pandoc.org/scripting.html
and https://github.com/markdown-it/markdown-ast-spec/blob/master/ast.md
