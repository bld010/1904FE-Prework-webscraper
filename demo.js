var Nightmare = require('nightmare');

var nightmare = Nightmare({ show: true});

// nightmare
//   .goto('https://turing.io/team')
//   .click('a[href="/team/instructors"]')
//   .wait('h3')
//   .evaluate(function() {
//     var nameNodes = document.querySelectorAll('h3');
//     var list = [].slice.call(nameNodes);
//     return list.map(function(node) {
//       return node.innerText
//     })
//   })
//   .end()
//   .then(function (result) {
//     console.log(result[2]);
//   })
//   .catch(function(error) {
//     console.error('Search failed: ', error);
//   })

let searchTerms = [
  'impeachment',
  'Impeachment',
  'Whistle',
  'whistle',
  'Ukraine'
]

nightmare
  .goto('https://www.reddit.com/r/politics')
  .scrollTo(8000, 0)
  .wait(2000)
  .evaluate(() => {
    var ukraineNodes = document.querySelectorAll('h3')
    var unfilteredList = [].slice.call(ukraineNodes);
    return unfilteredList.map(item => {
      return item.innerText
    })
  })
  .end()
  .then(results => {
    let filteredArray = [];
    results.forEach(result => {
     searchTerms.forEach(searchTerm => {
       if (result.includes(searchTerm)) {
         filteredArray.push(result)
       }
     })
    })
    return filteredArray
  })
  .then(results => console.log(results))
  .catch(error => console.log(error))