import { registerDependencies } from 'mjml-validator'
import { BodyComponent } from 'mjml-core'
import { ciasLogo } from '../assets/rawImages'

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
    footNote: 'string',
    buttonColor: 'color',
    buttonTextColor: 'color',
  }

  // Exactly what the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {
    header: 'Header text',
    mainText: 'Main <span style="color:red;">text</span>!',
    buttonText: 'Link',
    buttonUrl: '#',
    footNote: 'Footnote',
    buttonColor: '#107969',
    buttonTextColor: '#FFF',
  }

  render() {
    const header = this.getAttribute('header')
    const mainText = this.getAttribute('mainText')
    const buttonText = this.getAttribute('buttonText')
    const buttonUrl = this.getAttribute('buttonUrl')
    const footNote = this.getAttribute('footNote')
    const buttonColor = this.getAttribute('buttonColor')
    const buttonTextColor = this.getAttribute('buttonTextColor')
    /*
      Components are supposed to return html. If we want to return mjml so as to
      use existing components, we need to process it manually using this.renderMJML()
    */
    return this.renderMJML(`
      <mj-wrapper padding="0" background-color="#FFF">
        <mj-section full-width="full-width">
          <mj-column>
            <mj-image width="100%" src="${ciasLogo}" />
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
           <mj-text align="center" font-weight="700" font-size="30px">${header}</mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
           <mj-text align="center" font-weight="700" font-size="20px">${mainText}</mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          <mj-column>
            <mj-button border="1px solid ${buttonColor}" border-radius="100px" background-color="${buttonColor}" color="${buttonTextColor}" font-size="16px" font-weight="700" href="${buttonUrl}">
              ${buttonText}
            </mj-button>
          </mj-column>
        </mj-section>
        ${footNote &&
          `<mj-section>
        <mj-column>
         <mj-text align="center" font-size="15px">${footNote}</mj-text>
        </mj-column>
      </mj-section>`}
      </mj-wrapper>`)
  }
}
