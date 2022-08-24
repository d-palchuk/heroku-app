function createComponent() {
    const token = undefined;
    const url = 'https://vrpconsulting36-dev-ed.my.site.com/lightningoutdemo';

    $Lightning.use(
        "c:bsGuidedSellFlow", // LIGHTNING APP NAME
        () => {
            $Lightning.createComponent( // CREATE LIGHTNING COMPONENT
                "c:donationFortmApp", // COMPONENT NAME
                {}, // COMPONENT ATTRIBUTES
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

createComponent();