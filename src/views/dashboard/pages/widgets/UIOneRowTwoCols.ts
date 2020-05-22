export const UIOneRowTwoCols = (leftComp, rightComp) => ({
    "component": "v-row",
    "children": [
        {
            "component": "v-col",
            "fieldOptions": {
                "attrs": {
                    "cols": "6"
                }
            },
            "children": [leftComp],
        },
        {
            "component": "v-col",
            "fieldOptions": {
                "attrs": {
                    "cols": "6"
                }
            },
            "children": [rightComp],
        }]
});