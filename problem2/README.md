# Currency Swap App in React
This app was written as part of a coding challenge by 99tech.

Author: An Dang - anppdang@gmail.com

To run the app:
- Clone the repo
- `npm install` for dependencies
- `npm start` to run app in development mode

## Demo
[Youtube Link](https://youtu.be/zEb01ARxsAo)

## Potential Improvements
- Currently, the app uses a hardcoded data structure for tracking currencies and their conversion rate. Ideally, this data would sit on a server and the app would use .fetch() to get the data.
  - The provided data also has objects whose currency name attribute is the same. Ideally, a function to eliminate duplicates and keep the conversion object with the latest timestamp is better. For now, however, I have taken the liberty of removing the duplicates myself.
- A button for swapping the current units.
 
If it wouldn't trouble you, feedback on code organization, CSS, or anything else would make me a better programmer and is greatly appreciated! Thank you!