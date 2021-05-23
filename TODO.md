* ESM vs CommonJS Module resolution. Build is always generating CommonJS syntax now. 
  - used the wrong tsconfig, still not working as before (yesterday)
  - we have to build the plugin with target es5 because ngx-build-plus uses a require statement to load it.
  -- this does not work if it is a ESM Module
  -- then I have probles with 3rd party libs that only come in esm style.
  -- I would need to setup a build for that i guess. I could enhance the webpack build, with the already exposed webpack.config.js but did not do 

* ngFor for list-items poc is working (/) 
* ngIf (/)


* Extensible / Plugin System
  -- In JavaScript oder in TypeScript?
  -- TypeScript ist schwieriger! ==> TypeScript ist heutzutage ein muss

* Es geht nicht mit Windows
  -- \n\r Problematik ?
  
* Typings
* Tests
* Schematics
* Publish

* Frontmatter

* Custom Code Component?