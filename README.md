# WheelOfFortune.js

## Build
To build the WheelOfFortune.js you need to run `make build`.

## Example

![alt text](preview.png "Logo Title Text 1")

```HTML
    <canvas id="canvas" height="400px"></canvas>
    <script>
        data = [{
            backgroundColor: 'yellow',
            text: 'Section 1',
            id: 1
        },{
            backgroundColor: 'green',
            text: 'Section 2',
            id: 2
        },{
            backgroundColor: 'blue',
            textColor: 'white',
            text: 'Section 3',
            id: 3
        }]
        let wof = new WheelOfFortune(document.getElementById('canvas'), data, console.log);
    </script>
```
