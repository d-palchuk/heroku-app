const RESTAURANT_FOOD_NAME   = 'food_dreams';
const RESTAURANT_DRINKS_NAME = 'alc_paradise';

fetch('https://lwc-with-lightning-out.herokuapp.com/getWidgetData')
  .then(response => {
    return response.json();
  })
  .then(data => {

    if (!!data.restaurantId === false) fetch('https://lwc-with-lightning-out.herokuapp.com/');

    defineRestaurantHeader(data.restaurantName, data.accessToken);
    createFoodDeliveryWidget(data.restaurantId, data.accessToken);

  })
  .catch(error => {
    alert('You\'ve broken this!')
  });


function defineRestaurantHeader(restaurantName, accessToken) {
  document.querySelector('#restaurantInfoContainer').appendChild(document.importNode(document.querySelector(`#${restaurantName}`).content, true));

  if (!!accessToken === false) {
    document.querySelector('#headerRow').appendChild(document.importNode(document.querySelector(`#loginButton`).content, true));
  }
}

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