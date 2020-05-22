export const SampleUISchema = [
    {
      "component": "div",
      "fieldOptions": {
        "class": [
          "form-group"
        ]
      },
      "children": [
        {
          "component": "label",
          "fieldOptions": {
            "attrs": {
              "for": "first-name"
            }
          }
        },
        {
          "component": "input",
          "model": "dVerForm",
          "errorOptions": {
            "class": [
              "is-invalid"
            ]
          },
          "fieldOptions": {
            "attrs": {
              "id": "dVerForm"
            }
          }
        }
      ]
    }];