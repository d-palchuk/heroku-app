(function createLightningComponents(token) {
    $Lightning.use("c:lightningOutApp", () => {
      $Lightning.createComponent(
        "c:widgetFoodDelivery",
        {
            restaurantId : '0012v00002STk9AAAT'
        },
        "main",
        (cmp) => {
          console.log("LWC component was created");
          // do some stuff
        }
      );
    },
    'https://food-delivery-developer-edition.ap15.force.com/customers/'
    );
  })()