## What is the lib folder?

The lib folder is used to store services your app provides AND util functions that are used here and there. It is like a combined "services" and "utils" folder.

## How are we using it?

### add-background-to-png.js

This code is a module that exports a function that takes a PNG image as a data URL and returns a new PNG image with a white background as a data URL.

The code first imports the bufferToDataUrl function from the buffer-to-data-url module and the PNG object from the pngjs module. It also imports the dataUriToBuffer function from a local module named data-uri-to-buffer.

The exported function, addBackgroundToPNG, takes a data URL as an argument and uses the PNG object to read the image data from the URL. It then sets the color type of the image to 2 and the background color to white using the bgColor option. The function then writes the updated image to a buffer using the PNG.sync.write method, and finally uses the bufferToDataUrl function to convert the buffer back to a data URL.

This code is a bit of a hack and it is synchronous, which means that it will block the execution of any code that comes after it until it finishes running. This can cause performance problems in some cases, so ideally this code should be rewritten to be asynchronous and/or to perform the image manipulation on the client side.

### data-uri-to-buffer.js

This code is a function that takes a string called a "Data URI" as input, and returns a Buffer object, which is a type of data structure used to hold binary data. It first checks that the input string starts with "data:", and if not, it throws an error. It then removes any newline characters from the input string. Next, it splits the string into two parts: the "metadata" part, which contains information about the data, and the "data" part, which is the actual data. The function then parses the metadata to determine the type and character set of the data, and uses this information to create the Buffer object. Finally, the function returns the Buffer object.
