fetch('https://lwc-with-lightning-out.herokuapp.com/getWidgetData')
  .then(response => {
    return response.json();
  })
  .then(data => {

    if (!!data.restaurantId === false) fetch('https://lwc-with-lightning-out.herokuapp.com/');

    createFoodDeliveryWidget(data.restaurantId, data.accessToken);

  })
  .catch(error => {
    alert('You\'ve broken this!')
  });


function createFoodDeliveryWidget(restaurantId, accessToken) {
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