import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import { toast } from 'react-toastify';

import share from 'assets/svg/share.svg';

import { themeColors } from 'theme';

import {
  generateTestLinkRequest,
  makeSelectCanCurrentUserMakeChanges,
  makeSelectGenerateTestLinkLoader,
} from 'global/reducers/intervention';

import Box from 'components/Box';
import { TextButton } from 'components/Button';
import Icon from 'components/Icon';
import Popup from 'components/Popup';
import Row from 'components/Row';
import Text from 'components/Text';

import messages from './messages';

const COPIED_POPUP_TIMEOUT = 1000;
const CLIPBOARD_TEXT_TYPE = 'text/plain';

const EXPIRY_FORMAT: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

type Deferred<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
};

const createDeferred = <T,>(): Deferred<T> => {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  promise.catch(() => {});
  return { promise, resolve, reject };
};

/**
 * WebKit spends the document's transient user activation on the first `await`, so a
 * `navigator.clipboard.writeText()` issued after the mint round-trip is refused with
 * `NotAllowedError` and the link is lost. `ClipboardItem` accepts a **promise**, which is the
 * sanctioned way to start the write synchronously inside the click and settle it later.
 */
const beginClipboardWrite = (
  text: Promise<string>,
): Nullable<Promise<void>> => {
  const ClipboardItemConstructor = (window as any)?.ClipboardItem;

  if (
    typeof ClipboardItemConstructor !== 'function' ||
    !navigator?.clipboard?.write
  ) {
    return null;
  }

  const blob = text.then(
    (value) => new Blob([value], { type: CLIPBOARD_TEXT_TYPE }),
  );
  blob.catch(() => {});

  try {
    const write = navigator.clipboard.write([
      new ClipboardItemConstructor({ [CLIPBOARD_TEXT_TYPE]: blob }),
    ]);

    write.catch(() => {});

    return write;
  } catch {
    return null;
  }
};

const writeClipboardText = async (text: string): Promise<void> => {
  if (!navigator?.clipboard?.writeText) {
    throw new Error('Clipboard API unavailable');
  }
  await navigator.clipboard.writeText(text);
};

export const useCanMintTestLink = (): boolean =>
  !!useSelector(makeSelectCanCurrentUserMakeChanges());

export type Props = {
  interventionId: string;
  url: string;
  label: string;
  disabled?: boolean;
};

export const CopyTestLinkButton: FC<Props> = ({
  interventionId,
  url,
  label,
  disabled = false,
}) => {
  const { formatMessage, formatDate } = useIntl();
  const dispatch = useDispatch();

  const canMintTestLink = useCanMintTestLink();
  const generating = useSelector(makeSelectGenerateTestLinkLoader(url));

  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef =
    useRef<Nullable<ReturnType<typeof setTimeout>>>(null);

  useEffect(
    () => () => {
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
    },
    [],
  );

  const formatExpiry = useCallback(
    (expiresAt: Nullable<string>): Nullable<string> => {
      if (!expiresAt) return null;

      const date = new Date(expiresAt);
      if (Number.isNaN(date.getTime())) return null;

      return formatDate(date, EXPIRY_FORMAT);
    },
    [formatDate],
  );

  const announceCopied = useCallback(
    (expiresAt: Nullable<string>) => {
      setCopied(true);
      if (copiedTimeoutRef.current) clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = setTimeout(
        () => setCopied(false),
        COPIED_POPUP_TIMEOUT,
      );

      const expiry = formatExpiry(expiresAt);

      toast.info(
        expiry
          ? formatMessage(messages.copyTestLinkSuccess, { expiresAt: expiry })
          : formatMessage(messages.copyTestLinkSuccessUnknownExpiry),
      );
    },
    [formatMessage, formatExpiry],
  );

  const handleClick = useCallback(() => {
    if (disabled) return;

    const deferredUrl = createDeferred<string>();
    const pendingWrite = beginClipboardWrite(deferredUrl.promise);

    const handleTestLinkReady = async (
      testUrl: string,
      expiresAt: Nullable<string>,
    ) => {
      deferredUrl.resolve(testUrl);

      try {
        if (pendingWrite) await pendingWrite;
        else await writeClipboardText(testUrl);
      } catch {
        toast.error(formatMessage(messages.copyTestLinkClipboardError));
        return;
      }

      // Outside the try: a formatting slip must never be reported as a failed copy.
      announceCopied(expiresAt);
    };

    const handleTestLinkFailed = (error: unknown) => {
      // Release the write the click started, or WebKit keeps the clipboard item pending forever.
      // The saga has already toasted the mint failure.
      deferredUrl.reject(
        error instanceof Error ? error : new Error('Test link mint failed'),
      );
    };

    dispatch(
      generateTestLinkRequest(
        interventionId,
        url,
        handleTestLinkReady,
        handleTestLinkFailed,
      ),
    );
  }, [disabled, dispatch, interventionId, url, announceCopied, formatMessage]);

  if (!canMintTestLink) return null;

  return (
    <Box mt={13} mb={13}>
      <Popup
        popupContent={formatMessage(messages.copyTestLinkCopied)}
        controlled
        visible={copied}
        verticalPosition="top"
        horizontalPosition="center"
      >
        <TextButton
          onClick={handleClick}
          disabled={disabled}
          loading={generating}
          spinnerProps={{ size: 20 }}
          buttonProps={{ type: 'button' }}
        >
          <Row align="center">
            <Icon
              src={share}
              alt={formatMessage(messages.copyTestLinkIconAlt)}
              mr={10}
              fill={disabled ? themeColors.comment : themeColors.secondary}
            />
            <Text
              disabled={disabled}
              color={themeColors.secondary}
              fontWeight="bold"
            >
              {label}
            </Text>
          </Row>
        </TextButton>
      </Popup>
    </Box>
  );
};

export default CopyTestLinkButton;
