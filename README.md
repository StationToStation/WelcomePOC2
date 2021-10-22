# wm-reply-WelcomeHandlebars-web-part

## Description

TODO

## Version history

| Version | Date | Comments |
| - | - | - |
| 1.9.1.x | TODO | Initial release |

## Installation

* drag and drop to SharePoint app catalog
* click deploy in Deploy window (optionally check tenant wide deployment checkbox)
* add an app to a site collection (only if tenant wide deployment not selected in the previous step)
* add to a page
* TODO add more steps if required

## Scripts

* serve - serve locally in DEV mode
* dev-standalone - create standalone DEV build without telemetry
* prod-standalone - create standalone PRD build without telemetry
* ~~prod-cdn~~ - create evergreen PRD build with telemetry **!!! DO NO RUN MANUALLY !!!**
* dev-cdn - create evergreen DEV build with telemetry
* serve-cdn - create DEV temporary build and upload to cdn

> *-cdn* builds will automatically publish assets into WM Reply CDN!