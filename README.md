# functional-programming
## What does this project do?
This project is made to clean a dataset that contains the hexadecimal notation of the eye color 93 people. I'm converting hex codes without an # to correct hexadecimal notation, and this project also converts RGB notation to Hex notation. 

## Which features have I used?
To import the JSON object into the JS file I've converted the local JSON file into a JS file and importing it via the HTML. I'm using `.map()` to select every specific eye-color from every person and making an array out of it. I'm using `.replace` to remove spaces from the dataset and `.toUpperCase` to make every hex code more monotome. To check if the Hex codes are correct `ParseInt` is being used to convert parts of the hex code into RGB values. Furthermore I'm using `RegEx` to filter the RGB values out of the string and using a function to convert it into Hex values.

## Which data have I used?
The data I'm using is a survey that 93 students of CMD have answered, containing random question. This data contains personal information. That's why it's not available to the public. The specific information that is being filtered in this project is the column containign the eye color (in hex).

## Installation Guide


## Sources
