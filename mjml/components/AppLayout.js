/* eslint-disable no-use-before-define */
import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'

import { LOGO_URL_BUILD, LOGO_URL_WATCH } from '../utils/constants'

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'app-layout': ['*'],
  'mj-body': ['app-layout'],
})

export default class AppLayout extends BodyComponent {
  constructor(initialDatas = {}) {
    super(initialDatas)
    this.cssId = Math.floor(Math.random() * 9) + 1
    this.logoSrc = process.env.TASK === 'watch' ? LOGO_URL_WATCH() : LOGO_URL_BUILD()
  }

  // Tells the validator which attributes are allowed for app-layout
  static allowedAttributes = {
    header: 'string',
    mainText: 'string',
    buttonText: 'string',
    buttonUrl: 'string',
    footerText: 'string',
    buttonColor: 'color',
    buttonTextColor: 'color',
    description: 'string',
    otherInformation: 'string',
  }

  // Exactly what the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    header: '',
    mainText: '',
    buttonText: '',
    buttonUrl: '#',
    footerText: '',
    buttonColor: '#107969',
    buttonTextColor: '#FFF',
    description: '',
    otherInformation: '',
  }

  render() {
    const header = this.getAttribute('header')
    const mainText = this.getAttribute('mainText')
    const buttonText = this.getAttribute('buttonText')
    const buttonUrl = this.getAttribute('buttonUrl')
    const footerText = this.getAttribute('footerText')
    const buttonColor = this.getAttribute('buttonColor')
    const buttonTextColor = this.getAttribute('buttonTextColor')
    const description = this.getAttribute('description')
    const otherInformation = this.getAttribute('otherInformation')

    /*
      Components are supposed to return html. If we want to return mjml so as to
      use existing components, we need to process it manually using this.renderMJML()
    */
    return this.renderMJML(`
      <mj-wrapper padding="0" background-color="#FFF">
        <mj-section full-width="full-width">
          <mj-column>
            <! -- LOGO START -->
            <mj-image width="66px" max-width="100%" alt="CIAS Logo" src="${this.logoSrc}" />
            <! -- LOGO END -->
          </mj-column>
        </mj-section>
        <mj-section padding="16px 0 24px 0">
          <mj-column>
            <mj-text align="center" font-weight="700" font-size="22px" line-height="29px">
              <! -- HEADER START -->
              ${header}
              <! -- HEADER END -->
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section padding="0px 0px 0px 0px">
          <mj-column>
            <mj-text align="center" font-weight="700" font-size="16px" line-height="26px">
              <! -- MAIN-TEXT START -->
              ${mainText}
              <! -- MAIN-TEXT END -->
            </mj-text>
          </mj-column>
        </mj-section>

        ${
      description &&
      `
            <mj-section padding="4px 0px 0px 0px">
              <mj-column>
                <mj-text align="center" font-size="14px" line-height="24px">
                  <! -- DESCRIPTION START -->
                  ${description}
                  <! -- DESCRIPTION END -->
                </mj-text>
              </mj-column>
            </mj-section>
          `
    }
        ${
      buttonUrl &&
      buttonText &&
      `<mj-section padding="32px 0px 0px 0px">
            <mj-column>
              <mj-button border="1px solid ${buttonColor}" border-radius="100px" background-color="${buttonColor}" color="${buttonTextColor}" font-size="16px" font-weight="700" href="${buttonUrl}">
              <! -- BUTTON START -->
              ${buttonText}
              <! -- BUTTON END -->
              </mj-button>
            </mj-column>
          </mj-section>`
    }
        ${
      otherInformation &&
      `
          <mj-section>
            <mj-column>
              <mj-divider border-width="1px" border-color="#E9F1FB" padding="12px 0 22px 0"/>
              <mj-text align="center" font-size="14px" line-height="24px" padding-left="32px" padding-right="32px">
                <! -- OTHER INFORMATION START -->
                ${otherInformation}
                <! -- OTHER INFORMATION END -->
              </mj-text>
            </mj-column>
          </mj-section>
        `
    }
        ${
      footerText &&
      `<mj-section>
            <mj-column>
              <mj-text align="center" font-size="12px" color="#6D7485" line-height="20px">
              <! -- FOOTER START -->
              ${footerText}
              <! -- FOOTER END -->
              </mj-text>
            </mj-column>
          </mj-section>`
    }
      </mj-wrapper>`)
  }
}
