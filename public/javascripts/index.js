console.log('THIS')

fetch('https://lwc-with-lightning-out.herokuapp.com/token')
  .then(response => {
    console.log(JSON.stringify(response));
  })
  .catch(error => {
    console.log('NO TOKEN')
  });

// $Lightning.use("c:lightningOutApp",
//   () => {                                           // Callback once framework and app loaded
//     $Lightning.createComponent("c:lightningOutCmp", // top-level component of your app
//       { },                                          // attributes to set on the component when created
//       "lightningOutContainer",                      // the DOM location to insert the component
//       (cmp) {                                       // callback when component is created and active on the page
//         console.log("LWC component was created");
//         // do some stuff
//       }
//     );
//   },
//   'https://lwc-with-lightning-out-dev-ed.lightning.force.com
//   //authorization token
// );