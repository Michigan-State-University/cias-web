/*
 * ShareBox Messages
 *
 * This contains all the text for the ShareBox container.
 */

import { defineMessages } from 'react-intl';

import { ShareBoxType } from './types';

export const scope = 'app.containers.ShareBox';

export default defineMessages({
  tooltipSelectorContent: {
    id: `${scope}.tooltipSelectorContent`,
    defaultMessage:
      'It means that any person who click the link will be able to complete the session. However please note, that people who starts session with the link and are not listed below won’t be able to use the branching and multisessions sequences.',
  },
  emailPlaceholder: {
    id: `${scope}.emailPlaceholder`,
    defaultMessage: `Enter emails to send link to this {type, select,
      ${ShareBoxType.SESSION} {session}
      ${ShareBoxType.INTERVENTION} {intervention}
      other {}
    }`,
  },
  uploadText: {
    id: `${scope}.uploadText`,
    defaultMessage: 'Upload emails with CSV file',
  },
  sendText: {
    id: `${scope}.sendText`,
    defaultMessage: 'Send emails',
  },
  copyLabel: {
    id: `${scope}.copyLabel`,
    defaultMessage: `Copy link to start with this {type, select,
      ${ShareBoxType.SESSION} {session}
      ${ShareBoxType.INTERVENTION} {intervention}
      other {}
    } externally`,
  },
  share: {
    id: `${scope}.share`,
    defaultMessage: 'share',
  },
  resend: {
    id: `${scope}.resend`,
    defaultMessage: 'Resend email',
  },
  userListLabel: {
    id: `${scope}.userListLabel`,
    defaultMessage: 'Email has been already sent to',
  },
  filename: {
    id: `${scope}.filename`,
    defaultMessage: 'participants_emails_{interventionName}_invite',
  },
  exportCsv: {
    id: `${scope}.exportCsv`,
    defaultMessage: 'Export emails to CSV file',
  },
  exampleCsvFilename: {
    id: `${scope}.exampleCsvFilename`,
    defaultMessage: 'example_csv_{interventionName}',
  },
  exportExampleCsv: {
    id: `${scope}.exportExampleCsv`,
    defaultMessage: 'Export example CSV to file',
  },
  inviteParticipant: {
    id: `${scope}.inviteParticipant`,
    defaultMessage: 'Invite participants',
  },
  invitedParticipants: {
    id: `${scope}.invitedParticipants`,
    defaultMessage: 'Invited ({invitedLength})',
  },
  generateLink: {
    id: `${scope}.generateLink`,
    defaultMessage: 'Generate the link',
  },
  selectClinicForLink: {
    id: `${scope}.selectClinicForLink`,
    defaultMessage: 'Select clinic to generate link for',
  },
  notFound: {
    id: `${scope}.notFound`,
    defaultMessage: 'No clinics',
  },
  selectClinic: {
    id: `${scope}.selectClinic`,
    defaultMessage: 'Select clinic',
  },
  emailOrganizationPlaceholder: {
    id: `${scope}.emailOrganizationPlaceholder`,
    defaultMessage: 'Enter participant e-mail addresses',
  },
});
