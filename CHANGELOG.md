# Changelog

## [3.0.2](https://github.com/autero1/action-terragrunt/compare/v3.0.1...v3.0.2) (2024-02-23)


### Bug Fixes

* Add build assets ([#364](https://github.com/autero1/action-terragrunt/issues/364)) ([fbf57bc](https://github.com/autero1/action-terragrunt/commit/fbf57bc433aed5187d2e745446f2419812152f8c))
* add release assets ([3a76193](https://github.com/autero1/action-terragrunt/commit/3a76193b51ee86b2d323f3e8af9a1a778bd805e2))
* add release assets ([393ac34](https://github.com/autero1/action-terragrunt/commit/393ac341d39571e7dc22a18f04d80005b47cd2d5))
* add release assets ([c53f921](https://github.com/autero1/action-terragrunt/commit/c53f921686ba808ddcb498879db5c842ee337f04))
* add release assets ([cad37c7](https://github.com/autero1/action-terragrunt/commit/cad37c7dc4ca97e8647320457fcbea74f32042ba))
* **build:** add release assets PR creation ([#365](https://github.com/autero1/action-terragrunt/issues/365)) ([24242c3](https://github.com/autero1/action-terragrunt/commit/24242c3c1939ffeede02edc8f798c4f5158df72a))
* **deps:** update dependency @types/node to v20.11.20 ([#363](https://github.com/autero1/action-terragrunt/issues/363)) ([71fb2ea](https://github.com/autero1/action-terragrunt/commit/71fb2eafa29729c9e3c006cb83536e64d80d26c2))
* **deps:** update dependency node to v20.11.1 ([#356](https://github.com/autero1/action-terragrunt/issues/356)) ([870bacd](https://github.com/autero1/action-terragrunt/commit/870bacd3fd0dffc17f5f3936549b0ce77f307f96))
* **deps:** update typescript-eslint monorepo to v7.0.2 ([#361](https://github.com/autero1/action-terragrunt/issues/361)) ([1dc625a](https://github.com/autero1/action-terragrunt/commit/1dc625a2683c48a6e34d6f30f9dd6275cb650823))

## [3.0.1](https://github.com/autero1/action-terragrunt/compare/v3.0.0...v3.0.1) (2024-02-19)


### Bug Fixes

* **lint:** resolve linting issues across the codebase ([22304b0](https://github.com/autero1/action-terragrunt/commit/22304b0ef1e8a1af51e0b6403dd134cc0e2f2c99))
* **release:** fix release-please configuration ([#354](https://github.com/autero1/action-terragrunt/issues/354)) ([d568e25](https://github.com/autero1/action-terragrunt/commit/d568e2550c289e3cfa25247ebe2aef76e07c0e70))
* **release:** fix release-please configuration and CHANGELOG.md formatting ([#352](https://github.com/autero1/action-terragrunt/issues/352)) ([4d12d72](https://github.com/autero1/action-terragrunt/commit/4d12d72ced25a11ac99a6acf709cfad540d01448))
* **tests:** use proper glob pattern to run tests on all branches ([22304b0](https://github.com/autero1/action-terragrunt/commit/22304b0ef1e8a1af51e0b6403dd134cc0e2f2c99))

## [3.0.0](https://github.com/autero1/action-terragrunt/compare/v2.0.0...v3.0.0) (2024-02-18)


### ⚠ BREAKING CHANGES

* change input/output vars underscores to dashes
* use an optional version file to specify Terragrunt version (one of `terragrunt-version` or `terragrunt-version-file` required)

### Features

* use an optional version file to specify Terragrunt version (one of `terragrunt-version` or `terragrunt-version-file` required) ([ea717b1](https://github.com/autero1/action-terragrunt/commit/ea717b1be44da5d5d4f6b9bc07688c1945d766d7))
* use release-please instead of manual release process ([#347](https://github.com/autero1/action-terragrunt/issues/347)) ([46abb67](https://github.com/autero1/action-terragrunt/commit/46abb67fe1471e7458d19b2920ee0237892aaafc))


### Bug Fixes

* fix formatting ([#348](https://github.com/autero1/action-terragrunt/issues/348)) ([ffcb03c](https://github.com/autero1/action-terragrunt/commit/ffcb03c8cf39ea7489d53fc80e67689c318bfbed))


### Code Refactoring

* change input/output vars underscores to dashes ([ea717b1](https://github.com/autero1/action-terragrunt/commit/ea717b1be44da5d5d4f6b9bc07688c1945d766d7))




## [2.0.0](https://github.com/autero1/action-terragrunt/compare/v1.3.2...v2.0.0) (2024-02-17)

### chore

* bump dependencies ([5853e32](https://github.com/autero1/action-terragrunt/commit/5853e327548746e7f8044d26a47e97de912f33a3))

### test

* install 0.54.0 terragrunt in test ([f9da40a](https://github.com/autero1/action-terragrunt/commit/f9da40a1acbeb5c62601a5ba9b6f067a86cd518e))
* only upload ubuntu coverage ([a4f7188](https://github.com/autero1/action-terragrunt/commit/a4f7188b08b0bee271c08dc81ae828860a9834d3))
* restore got for the time being ([9a2698f](https://github.com/autero1/action-terragrunt/commit/9a2698f760748ca2930d82a358c7e5bd14bac9b3))



## [1.3.2](https://github.com/autero1/action-terragrunt/compare/v1.3.1...v1.3.2) (2023-05-18)


### chore

* upgrade actions runners ([563c789](https://github.com/autero1/action-terragrunt/commit/563c789ec8329b843cda989b95ca6a6709814b6f))

### fix

* use tag instead of name for latestRelease ([1acad56](https://github.com/autero1/action-terragrunt/commit/1acad564aa48ef43b0e77521a705975b4f90434d))

### test

* mock os architecture ([02a9d37](https://github.com/autero1/action-terragrunt/commit/02a9d37ea715bff4a5b304be8f2fc7f4d3cf466f))



## [1.3.1](https://github.com/autero1/action-terragrunt/compare/v1.3.0...v1.3.1) (2023-03-04)




## [1.3.0](https://github.com/autero1/action-terragrunt/compare/v1.2.0...v1.3.0) (2023-01-24)


### feat

* add github api token input ([318b30a](https://github.com/autero1/action-terragrunt/commit/318b30a44f5bbc0d6a26e1b24943b8e82993da2f))



## [1.2.0](https://github.com/autero1/action-terragrunt/compare/v1.1.1...v1.2.0) (2022-10-23)


### ci

* adds dependabot and removes set-output ([9dfad21](https://github.com/autero1/action-terragrunt/commit/9dfad210201719258722bec257b0139aaa5277d6))
* fix jest/got issue ([13cd122](https://github.com/autero1/action-terragrunt/commit/13cd122986927d25c6006bf2e1409e600d9daa2e))
* increases limit of dependabot PRs ([bc7790c](https://github.com/autero1/action-terragrunt/commit/bc7790cbc3a7f3309e0e5a48530592690e0d837a))
* prettier fix ([cb464b4](https://github.com/autero1/action-terragrunt/commit/cb464b42c1f941d7983ac4562971bd33b85aeae6))
* updates nodejs ([860c045](https://github.com/autero1/action-terragrunt/commit/860c04594b3cb957c4893588eb761411686ed1dd))
* updates nodejs in action.yml ([4a5561d](https://github.com/autero1/action-terragrunt/commit/4a5561d0242b7d58c90a48fdc876c0ef69bf158c))



## [1.1.1](https://github.com/autero1/action-terragrunt/compare/v1.1.0...v1.1.1) (2021-09-03)




## [1.1.0](https://github.com/autero1/action-terragrunt/compare/v1.0.1...v1.1.0) (2021-04-04)


### feat

* add ability to get latest Terragrunt version (#11) ([989a3e6](https://github.com/autero1/action-terragrunt/commit/989a3e649c2b234217eb6576af09a39916d94fbf)), closes [#11](https://github.com/autero1/action-terragrunt/issues/11)



## [1.0.1](https://github.com/autero1/action-terragrunt/compare/v1.0.0...v1.0.1) (2021-02-09)

- Update packages to latest versions


## [1.0.0](https://github.com/autero1/action-terragrunt/compare/v0.1.0...v1.0.0) (2020-12-15)

- Fix CVE-2020-15228 with GitHub Actions Path and Environment variables
- Update packages to latest versions
- Migrate @zeit/ncc to @vercel/ncc



## 0.1.0 (2020-02-16)
