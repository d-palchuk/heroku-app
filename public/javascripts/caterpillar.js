function createComponent() {
    const token = undefined;
    const url = 'https://baas-ipsdcommunity.cs189.force.com/DealerHub';

    $Lightning.use(
        "c:bsGuidedSellFlow", // LIGHTNING APP NAME
        () => {
            $Lightning.createComponent( // CREATE LIGHTNING COMPONENT
                "c:bsGuidedSellFlowContainer", // COMPONENT NAME
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