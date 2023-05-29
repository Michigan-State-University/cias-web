<!-- omit in toc -->

# Contributing to CIAS 3.0

First off, thanks for taking the time to contribute!

All types of contributions are encouraged and valued. See the [Table of Contents](#table-of-contents) for different ways
to help and details about how this project handles them. Please make sure to read the relevant section before making
your contribution. It will make it a lot easier for us maintainers and smooth out the experience for all involved. The
community looks forward to your contributions. 🎉

> And if you like the project, but just don't have time to contribute, that's fine. There are other easy ways to support
> the project and show your appreciation, which we would also be very happy about:
> - Star the project
> - Tweet about it
> - Refer this project in your project's readme
> - Mention the project at local meetups and tell your friends/colleagues

<!-- omit in toc -->

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Documentation](#documentation)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Your First Code Contribution](#your-first-code-contribution)
  - [Improving The Documentation](#improving-the-documentation)
- [Styleguides](#styleguides)
  - [Code Style](#code-style)
  - [Documentation](#styleguides-documentation)
  - [Testing](#testing)
  - [Pull Requests](#pull-requests)
  - [Commit Messages](#commit-messages)
- [Join The Project Team](#join-the-project-team)

## Code of Conduct

This project and everyone participating in it is governed by the
[CIAS 3.0 Code of Conduct](CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report unacceptable behavior
to [cias@msu.edu](cias@msu.edu).

## Documentation

Available documentation:

[//]: # (TODO CIAS30-1130 update the below links when cias is transferred to MSU's GitHub organization)

- [Frontend (cias-web)](https://github.com/HTD-Health/cias-web#readme)
- [Backend (cias-api)](https://github.com/HTD-Health/cias-api#readme)

## I Have a Question

> If you want to ask a question, we assume that you have read the
> available [documentation](#documentation)

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)
Before you ask a question, it is best to search for existing [Issues](https://github.com/HTD-Health/cias-web/issues)
that might help you. In case you have found a suitable issue and still need clarification, you can write your question
in this issue. It is also advisable to search the internet for answers first.

If you then still feel the need to ask a question and need clarification, we recommend the following:

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)

- Open an [Issue](https://github.com/HTD-Health/cias-web/issues/new).
- Provide as much context as you can about what you're running into.
- Provide project and platform versions (nodejs, npm, etc), depending on what seems relevant.

We will then take care of the issue as soon as possible.

## I Want To Contribute

> ### Legal Notice <!-- omit in toc -->
> When contributing to this project, you must agree that you have authored 100% of the content, that you have the
> necessary rights to the content and that the content you contribute may be provided under the project license.

### Reporting Bugs

<!-- omit in toc -->

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more information. Therefore, we ask you to
investigate carefully, collect information and describe the issue in detail in your report. Please complete the
following steps in advance to help us fix any potential bug as fast as possible.

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)

- Make sure that you are using the latest version.
- Determine if your bug is really a bug and not an error on your side e.g. using incompatible environment
  components/versions (Make sure that you have read the [documentation](#documentation).
  If you are looking for support, you might want to check [this section](#i-have-a-question)).
- To see if other users have experienced (and potentially already solved) the same issue you are having, check if there
  is not already a bug report existing for your bug or error in
  the [bug tracker](https://github.com/HTD-Health/cias-webissues?q=label%3Abug).
- Also make sure to search the internet (including Stack Overflow) to see if users outside of the GitHub community have
  discussed the issue.
- Collect information about the bug:
  - Stack trace (Traceback)
  - OS, Platform and Version (Windows, Linux, macOS, x86, ARM)
  - Version of the interpreter, compiler, SDK, runtime environment, package manager, depending on what seems relevant.
  - Possibly your input and the output
  - Can you reliably reproduce the issue? And can you also reproduce it with older versions?

<!-- omit in toc -->

#### How Do I Submit a Good Bug Report?

> You must never report security related issues, vulnerabilities or bugs including sensitive information to the issue
> tracker, or elsewhere in public. Instead sensitive bugs must be sent by email to [cias@msu.edu](cias@msu.edu).
<!-- You may add a PGP key to allow the messages to be sent encrypted as well. -->

We use GitHub issues to track bugs and errors. If you run into an issue with the project:

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)

- Open an [Issue](https://github.com/HTD-Health/cias-web/issues/new). (Since we can't be sure at this point whether it
  is a bug or not, we ask you not to talk about a bug yet and not to label the issue.)
- Explain the behavior you would expect and the actual behavior.
- Please provide as much context as possible and describe the *reproduction steps* that someone else can follow to
  recreate the issue on their own. This might include your code. For good bug reports you should isolate the problem
  and create a reduced test case.
- Provide the information you collected in the previous section.

Once it's filed:

- The project team will label the issue accordingly.
- A team member will try to reproduce the issue with your provided steps. If there are no reproduction steps or no
  obvious way to reproduce the issue, the team will ask you for those steps and mark the issue as `needs-repro`. Bugs
  with the `needs-repro` tag will not be addressed until they are reproduced.
- If the team is able to reproduce the issue, it will be marked `needs-fix`, as well as possibly other tags (such
  as `critical`), and the issue will be left to be [implemented by someone](#your-first-code-contribution).

<!-- You might want to create an issue template for bugs and errors that can be used as a guide and that defines the structure of the information to be included. If you do so, reference it here in the description. -->

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for CIAS 3.0, **including completely new features
and minor improvements to existing functionality**. Following these guidelines will help maintainers and the community
to understand your suggestion and find related suggestions.

<!-- omit in toc -->

#### Before Submitting an Enhancement

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)

- Make sure that you are using the latest version.
- Read the [documentation](#documentation) carefully and find out if the functionality is
  already covered, maybe by an individual configuration.
- Perform a [search](https://github.com/HTD-Health/cias-web/issues) to see if the enhancement has already been
  suggested. If it has, add a comment to the existing issue instead of opening a new one.
- Find out whether your idea fits with the scope and aims of the project. It's up to you to make a strong case to
  convince the project's developers of the merits of this feature. Keep in mind that we want features that will be
  useful to the majority of our users and not just a small subset. If you're just targeting a minority of users,
  consider writing an add-on/plugin library.

<!-- omit in toc -->

#### How Do I Submit a Good Enhancement Suggestion?

[//]: # (TODO CIAS30-1130 update the below link when cias is transferred to MSU's GitHub organization)
Enhancement suggestions are tracked as [GitHub issues](https://github.com/HTD-Health/cias-web/issues).

- Use a **clear and descriptive title** for the issue to identify the suggestion.
- Provide a **step-by-step description of the suggested enhancement** in as many details as possible.
- **Describe the current behavior** and **explain which behavior you expected to see instead** and why. At this point
  you can also tell which alternatives do not work for you.
- You may want to **include screenshots and animated GIFs** which help you demonstrate the steps or point out the part
  which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS
  and Windows, and [this tool](https://github.com/colinkeenan/silentcast)
  or [this tool](https://github.com/GNOME/byzanz) on
  Linux. <!-- this should only be included if the project has a GUI -->
- **Explain why this enhancement would be useful** to most CIAS 3.0 users. You may also want to point out the other
  projects that solved it better and which could serve as inspiration.

### Your First Code Contribution

See [documentation](#documentation) for how to start with the project.

### Improving The Documentation

Explain your improvements in GitHub issue, please.

## Styleguides

### Code Style

- Follow the existing code style and conventions used throughout the project.
- Use consistent indentation (e.g., spaces or tabs) and line spacing.
- Make sure to use descriptive variable and function names that accurately convey their purpose.
- Write clear and concise code that is easy to read and understand.

### Documentation {#styleguides-documentation}

- Document your code using comments, especially for complex or non-obvious parts.
- Update the documentation when making significant changes to the codebase.

### Testing

- Maintain existing test cases.
- Make sure all tests pass before submitting your changes.
- Consider adding additional tests for any bug fixes or new features.

### Pull Requests

- Create a separate branch for each feature or bug fix you are working on.
- Make sure your branch is up to date with the latest changes from the main branch.
- Clearly describe the purpose and scope of your changes in the pull request.
- Reference any relevant issues or pull requests in your description.
- Request reviews from other team members before merging your changes.

### Commit Messages

- Use a descriptive and succinct commit message that clearly explains the purpose of your changes.
- Start the commit message with a capitalized verb in the imperative tense (e.g., "Add feature," "Fix bug," "Update
  documentation").
- Limit the commit message to 50 characters or less for the first line.
- Optionally, provide additional details in the commit message body, if necessary.
- Reference relevant issues or pull requests by including their numbers in the commit message (e.g., "Fix bug #123").
- Avoid committing unrelated changes in the same commit. Split them into separate commits when possible.

## Join The Project Team

Contact us by [cias@msu.edu](cias@msu.edu).

## Attribution

This guide is based on the **contributing-gen**. [Make your own](https://github.com/bttger/contributing-gen)!
