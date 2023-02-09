# Install & Start

1. Copy the contents of `.env.example` to `.env` (create this file)
1. Run `npm install` to install all required dependencies **\*(optional => run only the first time or when dependencies
   change)**
1. Run `npm start` to run the project. It will be available at `localhost:4200`

# Cypress

- Open Cypress dashboard `npm run cy:open`
- Run Cypress tests `npm run cy:test`

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

- Go into `mjml` directory
- `npm install` inside
- Add your components inside `components` folder
- Components have to be added in `.mjmlconfig`
- Use your own component in `templates/*.mjml`
- `npm run build` to build, or `npm start` if you want to watch recompile on change you make (to your component or
  to `templates/*.mjml`)
- The result will be outputted in `html/*.html`

### Information for backend developers

#### Generated htmls are in `mjml/html` directory

**Available Templates**

1. no-button
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 37" src="https://user-images.githubusercontent.com/52409023/200245127-5410b77f-00ef-4ccd-994c-f04bd2c84cd1.png">
2. with-button
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 30" src="https://user-images.githubusercontent.com/52409023/200245146-5e6acb04-9bff-44be-8265-6b598839c574.png">
3. with-button-and-other-information-ignore-email
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 24" src="https://user-images.githubusercontent.com/52409023/200245153-7cfbfe24-0d86-4fd4-aaf6-39dac55db376.png">
4. with-button-ignore-email
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 16" src="https://user-images.githubusercontent.com/52409023/200245157-78c0abbb-2577-4a3c-9fc2-4ca652730990.png">
5. with-button-ignore-email-no-pwd
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 10" src="https://user-images.githubusercontent.com/52409023/200245160-e3b6fca9-0e1d-4538-a02b-ae871b764aca.png">
6. with-button-and-description-ignore-email
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 50 03" src="https://user-images.githubusercontent.com/52409023/200245164-447c2ff6-c2fa-43f7-a492-22405983dd9b.png">
7. no-button-ignore-email
   <img width="1904" alt="Zrzut ekranu 2022-11-7 o 07 49 56" src="https://user-images.githubusercontent.com/52409023/200245166-ab4c017d-365d-4110-a804-697a535d27e7.png">

**Tags**
For easier maintaining and searching for proper sections and variables, there are tags in `.html` files:

1. `LOGO START` and `LOGO END`
2. `HEADER START` and `HEADER END`
3. `MAIN-TEXT START` and `MAIN-TEXT END`
4. `BUTTON START` and `BUTTON END`
5. `FOOTNOTE START` and `FOOTNOTE END`
6. `OTHER INFORMATION START` and `OTHER INFORMATION END`
7. `DESCRIPTION START` and `DESCRIPTION END`

**Variables:**

- _`no-button`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**
- _`no-button-ignore-email`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**
- _`with-button-and-description-ignore-email`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**, **`{DESCRIPTION}`**, **`{BUTTON_URL}`**, **`{BUTTON_TEXT}`**
- _`with-button-and-other-information-ignore-email`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**, **`{OTHER_INFORMATION}`**, **`{BUTTON_URL}`**, **`{BUTTON_TEXT}`**
- _`with-button-ignore-email-no-pwd`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**, **`{BUTTON_URL}`**, **`{BUTTON_TEXT}`**
- _`with-button-ignore-email`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**, **`{BUTTON_URL}`**, **`{BUTTON_TEXT}`**
- _`with-button`_: **`{HEADER_TEXT}`**, **`{MAIN_TEXT}`**, **`{BUTTON_URL}`**, **`{BUTTON_TEXT}`**

**Styling in email templates**

You will need to add proper html tags with styles to style inline text within email variables. For example, MAIN_TEXT variable can be:

```
  You have been invited to <span style='color: #c866ea;'>Screening Test</span>.
```

To add a new line inside a text block (eg. MAIN_TEXT), please add a double break, for example:

```
  You have been invited to <span style='color: #c866ea;'>Screening Test</span>.<br /><br />Click below to start the session.
```

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
    <td align="center"><a href="https://github.com/msniecHTD">
      <img src="https://avatars.githubusercontent.com/u/115976801?v=4" width="80px;" alt=""/>
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
        <td align="center"><a href="https://github.com/bartosz-kepka-htd">
      <img src="https://avatars.githubusercontent.com/u/86963976?v=4" width="80px;" alt=""/>
      <br /><sub><b>Bartosz Kępka</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/mkjedrzejewska">
      <img src="https://avatars.githubusercontent.com/u/52409023?v=4" width="80px;" alt=""/>
      <br /><sub><b>Klara Jędrzejewska</b></sub></a><br />
    </td>
    <td align="center"><a href="https://github.com/maciej-gorski">
      <img src="https://avatars.githubusercontent.com/u/86961379?v=4" width="80px;" alt=""/>
      <br /><sub><b>Maciej Górski</b></sub></a><br />
    </td>
  </tr>
</table>

<!--suppress ALL:END -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
