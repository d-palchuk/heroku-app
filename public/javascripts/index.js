fetch('https://lwc-with-lightning-out.herokuapp.com/token')
  .then(response => {
    return response.json();
  })
  .then(data => {
    createLightningComponents(data.token);
  })
  .catch(error => {
    console.log('NO TOKEN')
  });


function createLightningComponents(token) {
  $Lightning.use("c:lightningOutApp", () => {

    $Lightning.createComponent(
      "c:lightningOutCmp",
      {},
      "main",
      (cmp) => {
        console.log("LWC component was created");
        // do some stuff
      }
    );

    $Lightning.createComponent(
      "c:formCreateReadEditAccount",
      {},
      "sidebar",
      (cmp) => {
        console.log("LWC component was created");
        // do some stuff
      }
    );
  },
  'https://lwc-with-lightning-out-dev-ed.lightning.force.com',
  token
  );
}