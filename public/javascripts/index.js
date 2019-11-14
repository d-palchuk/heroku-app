const RESTAURANT_FOOD_NAME   = "food_dreams";
const RESTAURANT_DRINKS_NAME = "alc_paradise";


fetch("https://lwc-with-lightning-out.herokuapp.com/getWidgetData") //CALL TO NODE
    .then(response => {
        return response.json(); //PARSE JSON TO OBJECT
    })
    .then(data => {
        if (!!data.restaurantId === false) {
            fetch("https://lwc-with-lightning-out.herokuapp.com/"); // GO TO THE WELCOME PAGE
        }

        defineRestaurantHeader(data.restaurantName, data.accessToken);
        createFoodDeliveryWidget(data.restaurantId, data.accessToken);
    })
    .catch(error => {
        alert("You've broken this!");
    });


function defineRestaurantHeader(restaurantName, token) {
    document.querySelector("#restaurantInfoContainer").appendChild(getTemplateElement(restaurantName));

    if (!!token === false)
        document.querySelector("#headerRow").appendChild(getTemplateElement('loginButton'));
}

function createFoodDeliveryWidget(restaurantId, token) {
    let url = token
        ? "https://lwc-with-lightning-out-dev-ed.lightning.force.com"
        : "https://food-delivery-developer-edition.ap15.force.com/customers";

    $Lightning.use(
        "c:lightningOutApp", // LIGHTNING APP NAME
        () => {
            $Lightning.createComponent( // CREATE LIGHTNING COMPONENT
                "c:widgetFoodDelivery", // COMPONENT NAME
                {
                    restaurantId: restaurantId // COMPONENT ATTRIBUTES
                },
                "main", // ELEMENT'S ID FOR OUR COMPONENT
                cmp => {
                    console.log("Hello World!"); //SOME ACTION AFTER COMPONENT CREATION
                }
            );
        },
        url,  // ORG or COMMUNITY URL
        token // TOKEN FOR AUTH
    );
}


function getTemplateElement(templateId) {
    return document.importNode(document.querySelector(`#${templateId}`).content,true);
}
