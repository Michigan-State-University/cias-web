/* eslint-disable no-use-before-define */
import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'
import flow from 'lodash/flow'

import { LOGO_URL, TEXT } from '../utils/constants'

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'app-layout': ['*'],
  'mj-body': ['app-layout'],
})

export default class AppLayout extends BodyComponent {
  constructor(initialDatas = {}) {
    super(initialDatas)
    this.cssId = Math.floor(Math.random() * 9) + 1
  }

  // Tells the validator which attributes are allowed for app-layout
  static allowedAttributes = {
    header: 'string',
    mainText: 'string',
    buttonText: 'string',
    buttonUrl: 'string',
    ignoreEmail: 'boolean',
    doNotReply: 'boolean',
    noPwdChange: 'boolean',
    buttonColor: 'color',
    buttonTextColor: 'color',
  }

  // Exactly what the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    header: 'Header text',
    mainText: 'Main <span style="color:red;">text</span>!',
    buttonText: 'Link',
    buttonUrl: '#',
    ignoreEmail: false,
    noPwdChange: false,
    doNotReply: true,
    buttonColor: '#107969',
    buttonTextColor: '#FFF',
  }

  render() {
    const header = this.getAttribute('header')
    const mainText = this.getAttribute('mainText')
    const buttonText = this.getAttribute('buttonText')
    const buttonUrl = this.getAttribute('buttonUrl')
    const ignoreEmail = this.getAttribute('ignoreEmail')
    const noPwdChange = this.getAttribute('noPwdChange')
    const doNotReply = this.getAttribute('doNotReply')
    const buttonColor = this.getAttribute('buttonColor')
    const buttonTextColor = this.getAttribute('buttonTextColor')

    const textWithBreak = (text) => textBuilder(text, [textSpaceDecorator])

    const textBuilder = (text, decorators) => (decorators ? flow(...decorators)(text) : text)

    const textSpaceDecorator = (text) => `${text}<br/><br/> `

    const createFootNote = () => {
      const textArray = []

      if (ignoreEmail) textArray.push(textWithBreak(TEXT.IGNORE_EMAIL))

      if (noPwdChange) textArray.push(textWithBreak(TEXT.NO_PWD_CHANGE))

      if (doNotReply) textArray.push(textWithBreak(TEXT.DO_NOT_REPLY))

      return textArray.join('')
    }

    const footNote = createFootNote()

    const hasFootNote = !!(footNote && footNote.length)

    /*
      Components are supposed to return html. If we want to return mjml so as to
      use existing components, we need to process it manually using this.renderMJML()
    */
    return this.renderMJML(`
      <mj-wrapper padding="0" background-color="#FFF">
        <mj-section full-width="full-width">
          <mj-column>
            <! -- LOGO START -->
            <mj-image width="100%" src="${LOGO_URL}" />
            <! -- LOGO END -->
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>

          <mj-text align="center" font-weight="700" font-size="30px">
            <! -- HEADER START -->
            ${header}
            <! -- HEADER END -->
          </mj-text>

          </mj-column>
          </mj-section>
          <mj-section>
          <mj-column>
          <mj-text align="center" font-weight="700" font-size="20px">
            <! -- MAIN-TEXT START -->
            ${mainText}
            <! -- MAIN-TEXT END -->
          </mj-text>
          </mj-column>
        </mj-section>
        ${
          buttonUrl &&
          buttonText &&
          `<mj-section>
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
          hasFootNote &&
          `<mj-section>
        <mj-column>
         <mj-text align="center" font-size="15px">
         <! -- FOOTNOTE START -->
         ${footNote}
         <! -- FOOTNOTE END -->
         </mj-text>
        </mj-column>
      </mj-section>`
        }
      </mj-wrapper>`)
  }
}
