# Install & Start

1. Copy the contents of `.env.example` to `.env` (create this file)
1. Run `npm install` to install all required dependencies ***(optional => run only the first time or when dependencies
   change)**
1. Run `npm start` to run the project. It will be available at `localhost:4200`

# Cypress

* Open Cypress dashboard `npm run cy:open`
* Run Cypress tests `npm run cy:test`

# Colors

[COLOR NAME DETECTOR](https://www.color-blindness.com/color-name-hue/)

To name colors, please do not use custom, made-up names and let's use some kind of color name detector. There are many
detectors, so to have uniform results let's use that
one: [COLOR NAME DETECTOR](https://www.color-blindness.com/color-name-hue/) as it shows not only the name, but also the
group/hue of a color (useful when there are similar colors).

# Inner HTML

To render HTML elements use `interweave` library. See [DOCS](https://interweave.dev/docs/). It safely renders HTML
elements (tries to protect against XSS).

# MJML

### What is MJML?

A tool for creation of responsive html templates. It handles gotchas of most modern and known email clients.

Take a look at [official documentation](https://mjml.io/documentation/#getting-started).

3 examples can be found in `mjml/examples` directory. Each of them introduce new features, so they should be checked in
this order : `MjBasicComponent`, `MjImageText`, `MjLayout`.

For more complex examples, have a look at standard MJML components code such
as [mj-carousel](https://github.com/mjmlio/mjml/tree/master/packages/mjml-accordion).

### Getting started

A step-by-step tutorial is
available [here](https://medium.com/mjml-making-responsive-email-easy/tutorial-creating-your-own-component-with-mjml-4-1c0e84e97b36)
.

* Go into `mjml` directory
* `npm install` inside
* Add your components inside `components` folder
* Components have to be added in `.mjmlconfig`
* Use your own component in `templates/*.mjml`
* `npm run build` to build, or `npm start` if you want to watch recompile on change you make (to your component or
  to `templates/*.mjml`)
* The result will be outputted in `html/*.html`

### Information for backend developers

#### Generated htmls are in `mjml/html` directory

**Variables:**

* *confirm-email.html*: {BUTTON_URL}, {RECIPIENT_NAME}
* *csv-download.html*: {BUTTON_URL}, {SESSION_TITLE}
* *invite-session.html*: {BUTTON_URL}, {SESSION_TITLE}
* *reset-password.html*: {BUTTON_URL}
* *invite-email.html*: {BUTTON_URL}

#### Report templates are in `template` directory

There is `template.html` with all the sections etc. and `sample_template.html` file to show example of a report.

# Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!--suppress ALL:START -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/michal-grzelak">
      <img src="https://avatars3.githubusercontent.com/u/29845162?s=460&u=4898381c1c89b7c5170b49a21f49edf27b3fac7d&v=4" width="80px;" alt=""/>
      <br /><sub><b>Michał Grzelak</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/PiotrSokolinski">
      <img src="https://avatars3.githubusercontent.com/u/37448494?s=400&u=227e2e3078f33c70760dcf746011d1a73496b2d2&v=4" width="80px;" alt=""/>
      <br /><sub><b>Piotr Sokoliński</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/msniec">
      <img src="https://avatars3.githubusercontent.com/u/45016936?s=400&u=d580a237ea6314283f8912e5f7b705b73fd10dc5&v=4" width="80px;" alt=""/>
      <br /><sub><b>Michał Śnieć</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/Jakub-Zygmunt">
      <img src="https://avatars1.githubusercontent.com/u/67907594?s=400&u=fddd489b80f9b5aa7083008036614289c7c475bd&v=4" width="80px;" alt=""/>
      <br /><sub><b>Jakub Zygmunt</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/sflejszman">
      <img src="https://avatars2.githubusercontent.com/u/12885723?s=460&u=e388e77a2eb2422f8d29e18914aee0d91334cc06&v=4" width="80px;" alt=""/>
      <br /><sub><b>Sebastian Flejszman</b></sub></a><br />
    </td>
  </tr>
</table>

<!--suppress ALL:END -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
