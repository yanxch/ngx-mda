## NGX - MDA - Markdown Anguar

1. Install ngx-build-plus
   ```
   npm install -D ngx-build-plus
   ```

2. Configure ngx-build-plus
   
   - Modify `angular.json`
```
      "architect": {
        "build": {
          "builder": "ngx-build-plus:browser",
          "options": {
            ..
            "extraWebpackConfig": "./webpack/webpack.config.js",
            "plugin": "~dist/out-tsc/src/extensions/plugin.js"
        ..

        "serve": {
          "builder": "ngx-build-plus:dev-server",
          "options": {
            "browserTarget": "example-app:build",
            "extraWebpackConfig": "./webpack/webpack.config.js",
            "plugin": "~dist/out-tsc/src/extensions/plugin.js"
          },
```