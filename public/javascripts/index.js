fetch('https://lwc-with-lightning-out.herokuapp.com/getWidgetData')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log('ZHOPA')
    console.log(JSON.stringify(data))
    if (!!data.restaurantId === false) fetch('https://lwc-with-lightning-out.herokuapp.com/');

    if (data.accessToken) {
      createWidgetForAdmin(data.restaurantId, data.accessToken);
    } else {
      createWidgetForGuest(data.restaurantId);
    }
  })
  .catch(error => {
    alert('You are break this!')
  });



function createWidgetForGuest(restaurentId) {
  $Lightning.use("c:lightningOutApp", () => {
    $Lightning.createComponent(
    "c:widgetFoodDelivery",
    {
        restaurantId : restaurentId
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

function createWidgetForAdmin(restaurentId, accessToken) {
  $Lightning.use("c:lightningOutApp", () => {
    $Lightning.createComponent(
    "c:widgetFoodDelivery",
    {
        restaurantId : restaurentId
    },
    "main",
    (cmp) => {
        console.log("Hello Admin!");
    }
    );
  },
  'https://lwc-with-lightning-out-dev-ed.lightning.force.com',
  accessToken
  );
}