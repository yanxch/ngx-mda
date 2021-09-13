## NGX - MDA - Markdown Anguar

Write Markdown, mix it with Angular Template syntax `{{ yolo }}`, `*ngIf`and `*ngFor`

Example:
```
## Angular is awesome still in 2021

Hello guys, this post is about Angular.

Is it still relevant?

What should we do in the future?

Test

<div *ngIf="show">Test 2</div>

<div>
Test 3
</div> 


# Heading 2

* *ngFor="let item of items" <div><h3>List Item Titel: {{item}} </h3>`test`</div>

\`\`\`
function test() {
  console.log('Hello world!");
}
\`\`\`
```

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