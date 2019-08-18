fetch('https://lwc-with-lightning-out.herokuapp.com/token')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(JSON.stringify(data));
    console.log(data.token);

    $Lightning.use("c:lightningOutApp", () => {
      $Lightning.createComponent(
        "c:lightningOutCmp",
        {},
        "lightningOutContainer",
        (cmp) => {
          console.log("LWC component was created");
          // do some stuff
        }
      );
    },
    'https://lwc-with-lightning-out-dev-ed.lightning.force.com',
    data.token
    );
  })
  .catch(error => {
    console.log('NO TOKEN')
  });

