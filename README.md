JSONDoc
=============

JSONDoc is a Javascript script that will render a json file as html.  It is meant to be embedded in a webpage.

**WARNING**: This is a a project that was written as a fun little project.  It is not guarenteed to function in a sensible manner, nor is it expected to be efficient.

### Usage:
To render a webpage written in JSON, create an html file that references the script `jsd.js`.  Beneath that create another script that calls `renderJSON(fileName, clearElement = false)`.

```xml
<script type="text/javascript" src="jsd.js"></script>
<script>renderJSON("example.json");</script>
```

The `render(element, json, clearElement, id)` function can also be used to render json in a specific html element.

### Load Event
In scripts loaded in the JSON, `window.onload` and `document.onload` never fire because the page is loaded before the script is called.  Instead, JSONDoc will fire an `onJsonLoad` synthetic event when the rendering of the json is finished.

### Example
See example.html as an example on how to use JSONDoc.
Note: example.html must be run from a server because many browsers no longer let local files load or link to other local files.
