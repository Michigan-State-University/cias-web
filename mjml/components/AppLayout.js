import { registerDependencies } from 'mjml-validator';
import { BodyComponent } from 'mjml-core';

registerDependencies({
  // Tell the validator which tags are allowed as our component's children
  'app-layout': ['*'],
  'mj-body': ['app-layout'],
});

export default class AppLayout extends BodyComponent {
  constructor(initialDatas = {}) {
    super(initialDatas);
    this.cssId = Math.floor(Math.random() * 9) + 1;
  }

  // Tells the validator which attributes are allowed for app-layout
  static allowedAttributes = {};

  // Exactly what the name suggests. Fallback value for this.getAttribute('attribute-name').
  static defaultAttributes = {};

  render() {
    /*
      Components are supposed to return html. If we want to return mjml so as to
      use existing components, we need to process it manually using this.renderMJML()
    */
    return this.renderMJML(`
      <mj-wrapper background-color="#808080" full-width="full-width">
        <mj-section background-color="#fff">
          <mj-column>
            <mj-text align="center" font-size="20px" color="blue">
              App Header
            </mj-text>
          </mj-column>
        </mj-section>
        <mj-section>
          ${this.renderChildren(this.props.children, {
            /* The rawXML option prevents processing on children : we already call this.renderMJML on the whole block so we don't want the children to be processed twice */
            rawXML: true,

            /* The renderer option allows to use a specific rendering function, or wrap each child if needed. Below is the default, see mj-column code for an example of this. */
            renderer: component => component.render,
          })}
        </mj-section>
      </mj-wrapper>
		`);
  }
}
