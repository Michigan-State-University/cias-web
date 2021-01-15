import { HeadComponent } from 'mjml-core'

export default class AppHeader extends HeadComponent {
  static tagOmission = true

  static allowedAttributes = {}

  handler() {
    const { add } = this.context

    // Add DM Sans Google font
    add(
      'fonts',
      'DM Sans',
      'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap',
    )

    // Add default attributes for every tag
    add('defaultAttributes', 'mj-all', {
      'font-family': 'DM Sans, Helvetica, Arial',
      color: '#2F3850',
    })
  }
}
