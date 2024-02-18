[![license](https://img.shields.io/github/license/autero1/action-terragrunt)](https://github.com/autero1/action-terragrunt/blob/main/LICENSE)
[![release](https://img.shields.io/github/release/autero1/action-terragrunt.svg)](https://github.com/autero1/action-terragrunt/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/autero1/action-terragrunt.svg)](https://github.com/autero1/action-terragrunt/releases)
![Test Action](https://github.com/autero1/action-terragrunt/workflows/Test%20Action/badge.svg?branch=main&event=push)
[![CodeFactor](https://www.codefactor.io/repository/github/autero1/action-terragrunt/badge)](https://www.codefactor.io/repository/github/autero1/action-terragrunt)

# Setup Terragrunt GitHub Action

Set up your GitHub Actions workflow with a specific version of [Terragrunt](https://terragrunt.gruntwork.io/). You can optionally set version to `latest` to use the most recent version.

Because of [deprecation in the GitHub Actions environment](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/), versions lower than v1.0.0 will no longer work properly.

## Special Notice

From version `v3.0.0`, the inputs and outputs are changed to dash-separated version (`terragrunt-version`, `terragrunt-version-file`, `terragrunt-path`).

This convention aligns with the YAML style guide and is more prevalent in the GitHub Actions community and documentation.

## Usage

The next example step will install Terragrunt 0.55.2.

```yaml
name: Example workflow

on: [push]

jobs:
  example:
    name: Example Terragrunt interaction
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version: 0.55.2
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Interact with Terragrunt
        run: terragrunt --version
```
If you want to use a version file, e.g. `.terragrunt-version`, you can use the following example:

```yaml
name: Example workflow with version file

on: [push]

jobs:
  example:
    name: Example Terragrunt interaction
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Terragrunt
        uses: autero1/action-terragrunt@v3
        with:
          terragrunt-version-file: .terragrunt-version
          token: ${{ secrets.GITHUB_TOKEN }}
      - name: Interact with Terragrunt
        run: terragrunt --version

```

### Inputs

| Parameter                 | Description                                                                                                                    | Required                                |
|---------------------------|--------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
| `terragrunt-version`      | Terragrunt [version](https://github.com/gruntwork-io/terragrunt/releases) to deploy. Use `latest` for the most recent version. | either version or version file required |
| `terragrunt-version-file` | Terragrunt [version](https://github.com/gruntwork-io/terragrunt/releases) to deploy. Use `latest` for the most recent version. | either version or version file required |
| `token`                   | Github API Token to avoid rate limiting while getting latest Terragrunt release                                                | false                                   |

### Outputs

| Parameter         | Description |
|-------------------| ----------- |
| `terragrunt-path` | Cached tool path of Terragrunt |

### Supported platforms

This action has been tested on the following platforms:

* ubuntu-22.04
* windows-latest
* macos-latest


## Contributing

Contributions to this repository are very welcome! We follow a fairly standard [pull request process](
https://help.github.com/articles/about-pull-requests/) for contributions, subject to the following guidelines:

1. File a GitHub issue
1. Fork the repository
1. Update the documentation
1. Update the tests
1. Update the code
1. Create a pull request
1. (Merge and release)

The maintainers for this repo will review your code and provide feedback. If everything looks good, they will merge the
code and release a new version, which you'll be able to find in the [releases page](../../releases).

## License

The scripts and documentation in this project are released under the [MIT](./LICENSE) license.
