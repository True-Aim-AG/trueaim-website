# Changelog

## [1.19.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.18.1...v1.19.0) (2026-10-15)


### Features

* launch build: crawling, tracking, content components and build checks ([#27](https://github.com/True-Aim-AG/trueaim-website/issues/27)) ([b8d7707](https://github.com/True-Aim-AG/trueaim-website/commit/b8d77073e540819983e235fb8354a1185e77ef5c))
* page inventory for launch ([#29](https://github.com/True-Aim-AG/trueaim-website/issues/29)) ([f8bc148](https://github.com/True-Aim-AG/trueaim-website/commit/f8bc148871920bcae1c64bf67dbad68cd2597887))
* per-page metadata source and JSON-LD graph by [@id](https://github.com/id) ([#31](https://github.com/True-Aim-AG/trueaim-website/issues/31)) ([80e8681](https://github.com/True-Aim-AG/trueaim-website/commit/80e8681b9a8e4017503519c4248654fd91550acf))


### Bug Fixes

* drop the in-browser www redirect now that Azure answers www with a 301 ([#30](https://github.com/True-Aim-AG/trueaim-website/issues/30)) ([271255a](https://github.com/True-Aim-AG/trueaim-website/commit/271255a611d1565794f572a651bcf456c21d8113))

## [1.18.1](https://github.com/True-Aim-AG/trueaim-website/compare/v1.18.0...v1.18.1) (2026-10-14)


### Bug Fixes

* use trailingSlash auto so files keep their URLs ([5c26039](https://github.com/True-Aim-AG/trueaim-website/commit/5c260395ccd422f1d07281f418328ee301e9b05a))

## [1.18.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.17.0...v1.18.0) (2026-10-14)


### Features

* prefix every locale and enforce trailing slashes ([6cd6072](https://github.com/True-Aim-AG/trueaim-website/commit/6cd607276c07668ba7e7003ea585606b94ec5a3c))


### Bug Fixes

* Consent Mode v2 defaults and basic consent mode ([5b3ef40](https://github.com/True-Aim-AG/trueaim-website/commit/5b3ef4083f14b0eacf4299494ab9a8a2e703c598))
* Consent Mode v2 defaults and basic consent mode for the Google tag ([26b809e](https://github.com/True-Aim-AG/trueaim-website/commit/26b809e8164318ac19baac367e380b1778506dfc))
* correct the Sentry entry on the sub-processors list ([c5d7342](https://github.com/True-Aim-AG/trueaim-website/commit/c5d73427826ede2c6f12bb068534875300bf34bc))
* correct the Sentry entry on the sub-processors list ([75114ef](https://github.com/True-Aim-AG/trueaim-website/commit/75114efcfb967569e23dd720caa9322eebab7108))
* list each redirect route once for Static Web Apps ([1d0d097](https://github.com/True-Aim-AG/trueaim-website/commit/1d0d0974d5f88a6fb9e517c6e12653ba2af8e9b2))
* write a root index.html so the deploy action accepts the export ([5d3c925](https://github.com/True-Aim-AG/trueaim-website/commit/5d3c925f61a4f308f9369e071f2a9f89359b8a11))

## [1.17.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.16.0...v1.17.0) (2026-10-06)


### Features

* **blog:** add "Where the Language Model Does Not Belong" ([9cb627b](https://github.com/True-Aim-AG/trueaim-website/commit/9cb627b21a0f15e1fa7c64b84c8d9e4940510e48))

## [1.16.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.15.0...v1.16.0) (2026-09-24)


### Features

* **legal:** restore the List of Sub-Processors at v1.1, adding Sentry ([#14](https://github.com/True-Aim-AG/trueaim-website/issues/14)) ([287e833](https://github.com/True-Aim-AG/trueaim-website/commit/287e8335609afd104ea01a932413d37ea2deb4f6))

## [1.15.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.14.0...v1.15.0) (2026-09-16)


### Features

* **blog:** add the AI claims auditability scorecard ([21e6e2c](https://github.com/True-Aim-AG/trueaim-website/commit/21e6e2cb74a22534b6a63df1fd0bf57ad836685f))
* **blog:** add the AI Claims Auditability Scorecard ([005ac5f](https://github.com/True-Aim-AG/trueaim-website/commit/005ac5fec71ebd4c2d8514e3bb2f00d1efe4d329))
* **design:** apply the True Aim Design System across the website ([#4](https://github.com/True-Aim-AG/trueaim-website/issues/4)) ([7fe1f82](https://github.com/True-Aim-AG/trueaim-website/commit/7fe1f827b6afcc13cd064dc6611f7d4b10475835))


### Bug Fixes

* **blog:** underline the in-body links on the scorecard post ([4685f30](https://github.com/True-Aim-AG/trueaim-website/commit/4685f309157848488ccbfadd5415981e564ed010))
* **blog:** underline the in-body links on the scorecard post ([19fe4b0](https://github.com/True-Aim-AG/trueaim-website/commit/19fe4b05ac90b0e1629312020c6881bc8da2bc1b))

## [1.14.0](https://github.com/True-Aim-AG/trueaim-website/compare/v1.13.1...v1.14.0) (2026-09-09)


### Features

* **ci:** staging from any branch, production dispatched by release-please, no PAT ([2a90446](https://github.com/True-Aim-AG/trueaim-website/commit/2a9044611496d5d73dd7be4013f076215f84bc0e))
* **hosting:** client-side www to apex redirect; no edge in front of the site ([2a5a37d](https://github.com/True-Aim-AG/trueaim-website/commit/2a5a37dbb659b9ed5b5239514294c7686c62bc2f))
* **hosting:** static export for Azure Static Web Apps, replacing Vercel ([15ca785](https://github.com/True-Aim-AG/trueaim-website/commit/15ca785f2c8a82e8e97e91c6d8deca8bb55d19d0))
* **hosting:** static export on Azure Static Web Apps, replacing Vercel ([66086d3](https://github.com/True-Aim-AG/trueaim-website/commit/66086d3e471b04c2a11a042e69f92e9969189eec))
* **release:** release-please drives production; contact endpoint from a GitHub secret ([98b43f2](https://github.com/True-Aim-AG/trueaim-website/commit/98b43f2d3b78d6e0a21aa17584d0b1515ec977ee))


### Bug Fixes

* **hosting:** review findings on the static export and the deploy workflow ([dbc2a24](https://github.com/True-Aim-AG/trueaim-website/commit/dbc2a24936169a224c67680dc9497e91dd9e763c))
* **hosting:** rewrite escaped Open Graph image URLs in embedded payloads too ([b904d71](https://github.com/True-Aim-AG/trueaim-website/commit/b904d71eb36e8ed9e13df5633761e9b18adb1c0f))
* **hosting:** serve Open Graph images as .png files ([f1def71](https://github.com/True-Aim-AG/trueaim-website/commit/f1def711ed61700af34c923432ec1cb059f7cdd9))
* **hosting:** serve Open Graph images as .png files ([2fda43f](https://github.com/True-Aim-AG/trueaim-website/commit/2fda43f245046ee4e80157ea7bea3849484ae570))
