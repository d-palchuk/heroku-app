fetch('https://lwc-with-lightning-out.herokuapp.com/getWidgetData')
  .then(response => {
    return response.json();
  })
  .then(data => {

    if (!!data.restaurantId === false) fetch('https://lwc-with-lightning-out.herokuapp.com/');

    createWidgetForAdmin(data.restaurantId, data.accessToken);

    // if (data.accessToken) {
    //   createWidgetForAdmin(data.restaurantId, data.accessToken);
    // } else {
    //   createWidgetForGuest(data.restaurantId);
    // }
  })
  .catch(error => {
    alert('You are break this!')
  });



function createWidgetForGuest(restaurantId) {
  $Lightning.use("c:lightningOutApp", () => {
    $Lightning.createComponent(
    "c:widgetFoodDelivery",
    {
      "restaurantId" : restaurantId
    },
    "main",
    (cmp) => {
        console.log("Hello Guest!");
    }
    );
  },
  'https://food-delivery-developer-edition.ap15.force.com/customers'
  );
}

function createWidgetForAdmin(restaurantId, accessToken) {
  $Lightning.use("c:lightningOutApp", () => {
    $Lightning.createComponent(
    "c:widgetFoodDelivery",
    {
      restaurantId : restaurantId
    },
    "main",
    (cmp) => {
        console.log("Hello Admin!");
    }
    );
  },
  accessToken ? 'https://lwc-with-lightning-out-dev-ed.lightning.force.com' : 'https://food-delivery-developer-edition.ap15.force.com/customers',
  accessToken ? accessToken : null
  );
}