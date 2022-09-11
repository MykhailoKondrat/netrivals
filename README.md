# Readme

## Design decision

### Background 

Since initial requirements did not provide any boundaries to what should be the formula , the UI solution should rely on some heuristics and general thoughts: 
1. As formula could be applied only to value that represents a price of product: 
    1. The result should be always > 0 and les then 100000000
    2. Result should be rounded to 1/1000 like 
        
    `123.123131 => 123.123`


2. Any sequence of  math operations could be narrowed to 4 basic math operations: `add, deduce, multiply, divide`
  
    #### For example 
    `f(x) = x*4-20/5`
    
    `price === 10`

    `f(price) =  10 + 30 - 4 => 10 + 26`
    

3. Interface with pre-defined available options is less error-prone and more predictable than the one with free user input.


4. Basic but well-working feature is better than complex but not fully implemented.

###  Possible Solutions
There are two possible options how user can provide price modification formula from UI perspective: 
1. Free input, so user can type in the formula.


      ✅  Pros:
           + user can type in complex calculations

       👎 Cons:
           - it implies user understands priorities of math operators and scopes

           - easy to make a mistake by typing in incorrect symbol

           - requires a legend with list of available operators.
             For expample, not claer do user need sqrt/esponentiate/ e^x / log(x) etc.

           - harder to validate, requires extensive error handling for good UX. 
             We can't just say "formula is wrong" - but need to explain what exatly is wrong. 

           -  Without strict boundaires  - really hard to test.
           

2. Basic math operation + value input, like 
     
   ` old price (add/deduce/multiply/divide) (some user value) =  new price`
    
    #### Examples:
        price === $50
        pirce + 2 = 52
        pirce - 2 = 48
        pirce * 2 = 100
        proce / 3 = 16,667


      ✅  Pros:
           + Simple to use
           + Simple validate user input
           + Predicatable behaviuor 
           + Easy to test
           + Easy to write meaningful error messages.

       👎 Cons:
           - not suitable for complex scenarios when user needs to calculate price shift based on complex formula


### Outcome
It was decided to go with 
    `Basic math operation + value input`


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
