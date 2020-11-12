# Frontend-Data
This project is made for De Volkskrant. They asked us to make a interactive datavisualisation based on 37 datasets with parking data. We had to find an topic that interested us, and create a research question based on that topic. The question I'm researching is:   

**Which cities/pronvinces in the Netherland take the wheelchair accessibility of the parking spaces most into consideration?**

More information about the research question is in the [Wiki](https://github.com/roelandvs/frontend-data/wiki/Concept)

## What does this project do?
This project is made to create an interactive datavisualisation of the research question. In this project the data of RDW is being filtered and cleaned, and then a interactive chart is made using D3.

## Which features have I used?
The features of D3 are not yet implemented in this project. The interactivity is not made yet and updating the data is unfortunately not yet possible. The Functional Programming part is implemented in this project.

## Which data have I used?
The datasets I'm using in this project are from RDW. I'm combining two datasets to get the information I need.

I'm using the [SPECIFICATIES PARKEERGEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-SPECIFICATIES-PARKEERGEBIED/b3us-f26s) dataset to get the information about the wheelchair accessibility and the capacity of the parking spaces.

Used columns:
- AreaID
- Capacity
- DisabledAccess

I'm using the [GEOMETRIE GEBIED](https://opendata.rdw.nl/Parkeren/Open-Data-Parkeren-GEOMETRIE-GEBIED/nsk3-v9n7) dataset to get the geo locations of the parking spaces.

Used columns:
- AreaID
- GeoDataAsText


## Functional Programming
In this project I try to stick to FP principles. I'm doing this by using:
- `pure function`
- using higher order functions like: `filter()`, `reduce()` and `map()`

and avoinding:
- `shared state`
- `mutable data`
- `side-effects`

If you would like more information about the FP principles I'm using you could check: [this page](rontend-data/wiki/Functional-Programming), and you would like more explanation about the code you could check [this page](https://github.com/roelandvs/frontend-data/wiki/Cleaning-the-Data).

## Installation Guide
Create a directory using your terminal:
```
mkdir <directory name>
```

Navigate to the directory:
```
cd <directory name>
```

Install this project:
```
git clone https://github.com/roelandvs/frontend-data.git
```

## Research questions
[Questions](https://github.com/roelandvs/functional-programming/wiki/Parkeer-vragen)

## Sources
- [RGB to Hex](https://www.w3docs.com/snippets/javascript/how-to-convert-rgb-to-hex-and-vice-versa.html)
- [Filter numbers out of string](https://stackoverflow.com/questions/3977256/javascript-how-to-extract-multiple-numbers-from-a-string)
- [ParseInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
- [.map()](https://developer.mozilla.org/nl/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Received help from:
- Vincent van Leeuwen
- Jonah Meiers
