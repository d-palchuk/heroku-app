fetch('https://lwc-with-lightning-out.herokuapp.com/getWidgetData')
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(JSON.stringify(data))

    data = JSON.parse(data);

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



function createWidgetForGuest(restaurantId) {
  console.log(`createWidgetForGuest : ${restaurantId}`)
  $Lightning.use("c:lightningOutApp", () => {
    $Lightning.createComponent(
    "c:widgetFoodDelivery",
    {
      "restaurantId" : restaurantId
    },
    "main",
    (cmp) => {
        console.log("Hello Guest!");
        console.log(restaurantId)
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
  'https://lwc-with-lightning-out-dev-ed.lightning.force.com',
  accessToken
  );
}