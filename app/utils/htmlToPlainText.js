import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Markup } from 'interweave';

export const htmlToPlainText = html =>
  ReactDOMServer.renderToStaticMarkup(<Markup content={html} noWrap noHtml />);
