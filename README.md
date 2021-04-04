[![license](https://img.shields.io/github/license/autero1/action-terragrunt)](https://github.com/autero1/action-terragrunt/blob/master/LICENSE)
[![release](https://img.shields.io/github/release/autero1/action-terragrunt.svg)](https://github.com/autero1/action-terragrunt/releases/latest)
[![GitHub release date](https://img.shields.io/github/release-date/autero1/action-terragrunt.svg)](https://github.com/autero1/action-terragrunt/releases)
![Test Action](https://github.com/autero1/action-terragrunt/workflows/Test%20Action/badge.svg?branch=master&event=push)
[![CodeFactor](https://www.codefactor.io/repository/github/autero1/action-terragrunt/badge)](https://www.codefactor.io/repository/github/autero1/action-terragrunt)

# Setup Terragrunt GitHub Action

Set up your GitHub Actions workflow with a specific version of [Terragrunt](https://terragrunt.gruntwork.io/). You can optionally set version to `latest` to use the most recent version.

Because of [deprecation in the GitHub Actions environment](https://github.blog/changelog/2020-10-01-github-actions-deprecating-set-env-and-add-path-commands/), versions lower than v1.0.0 will no longer work properly.

## Usage

The next example step will install Terragrunt 0.21.13.

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
        uses: autero1/action-terragrunt@v1.1.0
        with:
          terragrunt_version: 0.21.13
      - name: Interact with Terragrunt
        run: terragrunt --version
```

### Inputs

| Parameter | Description | Required |
| --------- | ----------- | -------- |
| `terragrunt_version` | Terragrunt [version](https://github.com/gruntwork-io/terragrunt/releases) to deploy. Use `latest` for the most recent version. | true |

### Outputs

| Parameter | Description |
| --------- | ----------- |
| `terragrunt_path` | Cached tool path of Terragrunt |

### Supported platforms

This action has been tested on the following platforms:

* ubuntu-18.04
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
