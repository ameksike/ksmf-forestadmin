# KsMf ForestAdmin Integration

For further information consult the following links:

- https://docs.forestadmin.com/developer-guide-agents-nodejs/getting-started/quick-start
- https://docs.forestadmin.com/documentation/how-tos/maintain/migrate-to-the-new-role-system

## Install

- Set the configuration file: `cfg\core.json`

```json
{
  "onLoadedModules": ["ksmf.forestadmin.wrapper"],
  "helper": {
      "ksmf.forestadmin.wrapper": {
        "name": "ksmf-forestadmin",
        "type": "lib",
        "dependency": {
          "helper": "helper"
        }
      }
  }
}
```
- Set the required enviroments vars
  - FOREST_AUTH_SECRET
  - FOREST_ENV_SECRET
- [Check the project](https://app.forestadmin.com/projects)
