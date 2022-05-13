import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Markup } from 'interweave';
import { decode } from 'he';

export const htmlToPlainText = (html) =>
  decode(
    ReactDOMServer.renderToStaticMarkup(
      <Markup content={html} noWrap noHtml />,
    ),
  );
