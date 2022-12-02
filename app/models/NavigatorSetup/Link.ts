export enum LinkFor {
  PARTICIPANTS = 'participants',
  NAVIGATORS = 'navigators',
}

export type Link = {
  id: string;
  linkFor: LinkFor;
  displayName: string;
  url: string;
  deleting?: boolean;
  saving?: boolean;
};

export type LinkData = Pick<Link, 'displayName' | 'url'>;

export type ParticipantLink = Link & { linkFor: LinkFor.PARTICIPANTS };
export type NavigatorLink = Link & { linkFor: LinkFor.NAVIGATORS };
