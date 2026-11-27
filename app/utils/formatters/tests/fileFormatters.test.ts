import {
  buildFileAcceptMap,
  ensureFilenameMatchesType,
  formatFileSize,
  formatMimeFileFormatList,
  sanitizeFilename,
} from '../fileFormatters';

describe('buildFileAcceptMap', () => {
  it('files an extension under the MIME type it maps to', () => {
    expect(buildFileAcceptMap(['.pdf'])).toEqual({
      'application/pdf': ['.pdf'],
    });
  });

  it('keeps a MIME type given on its own', () => {
    expect(buildFileAcceptMap(['image/png'])).toEqual({ 'image/png': [] });
  });

  it('groups extensions that share a MIME type', () => {
    expect(buildFileAcceptMap(['.jpg', '.jpeg'])).toEqual({
      'image/jpeg': ['.jpg', '.jpeg'],
    });
  });

  it('keeps an extension the mime package does not know', () => {
    const accept = buildFileAcceptMap(['.pdf', '.qqq']);

    expect(accept).toHaveProperty(['.qqq']);
    expect(accept['application/pdf']).toEqual(['.pdf']);
  });

  it('does not invent a MIME type for an unknown extension', () => {
    expect(buildFileAcceptMap(['.qqq'])).not.toHaveProperty([
      'application/octet-stream',
    ]);
  });
});

describe('formatMimeFileFormatList', () => {
  it('de-duplicates the two shapes of the same format', () => {
    expect(formatMimeFileFormatList(['application/pdf', '.pdf'])).toBe('.pdf');
  });
});

describe('formatFileSize', () => {
  const MIB = 1024 * 1024;

  it('shows the API cap as the round number it was configured with', () => {
    expect(formatFileSize(104857600)).toBe('100 MB');
  });

  it('does not drift at two decimal places either', () => {
    expect(formatFileSize(104857600, 2)).toBe('100 MB');
  });

  it('divides by 1024, not by 1000', () => {
    expect(formatFileSize(5 * MIB)).toBe('5 MB');
    expect(formatFileSize(1024)).toBe('1 KB');
  });

  it('keeps bytes for small files', () => {
    expect(formatFileSize(512)).toBe('512 B');
  });

  it('carries over to GB', () => {
    expect(formatFileSize(2 * 1024 * MIB)).toBe('2 GB');
  });

  it('keeps one decimal place when asked, for a file listing', () => {
    expect(formatFileSize(1536 * 1024, 1)).toBe('1.5 MB');
  });
});

describe('sanitizeFilename', () => {
  it('keeps an ordinary name untouched', () => {
    expect(sanitizeFilename('raport.pdf')).toBe('raport.pdf');
  });

  it('keeps Polish characters and spaces', () => {
    expect(sanitizeFilename('wyniki badania ćwiczeń.png')).toBe(
      'wyniki badania ćwiczeń.png',
    );
  });

  it('strips a right-to-left override used to disguise the extension', () => {
    expect(sanitizeFilename('raport\u202Egnp.exe')).toBe('raportgnp.exe');
  });

  it('strips the other bidi controls as well', () => {
    expect(sanitizeFilename('a\u202Ab\u2066c\u2069d.txt')).toBe('abcd.txt');
  });

  it('strips control characters', () => {
    expect(sanitizeFilename('raport\u0000\u001F.pdf')).toBe('raport.pdf');
  });

  it('drops path separators so the name cannot address a directory', () => {
    expect(sanitizeFilename('../../etc/passwd')).toBe('passwd');
    expect(sanitizeFilename('C:\\Windows\\system32\\evil.dll')).toBe(
      'evil.dll',
    );
  });

  it('shortens an absurdly long name but keeps its extension', () => {
    const name = `${'a'.repeat(5000)}.pdf`;

    const sanitized = sanitizeFilename(name);

    expect(sanitized.length).toBeLessThanOrEqual(255);
    expect(sanitized.endsWith('.pdf')).toBe(true);
  });

  it('falls back when nothing usable is left', () => {
    expect(sanitizeFilename('\u202E\u0000')).toBe('file');
    expect(sanitizeFilename('')).toBe('file');
  });
});

describe('ensureFilenameMatchesType', () => {
  const ACCEPTED = [
    'jpg',
    'jpeg',
    'png',
    'heic',
    'gif',
    'webp',
    'pdf',
    'doc',
    'docx',
    'xls',
    'xlsx',
    'csv',
    'txt',
    'mp3',
    'm4a',
    'wav',
    'mp4',
    'm4v',
    'mov',
  ];

  it('leaves a name whose extension matches the detected type', () => {
    expect(
      ensureFilenameMatchesType('zdjecie.png', 'image/png', ACCEPTED),
    ).toBe('zdjecie.png');
  });

  it('accepts any spelling that means the same type', () => {
    expect(ensureFilenameMatchesType('foto.jpeg', 'image/jpeg', ACCEPTED)).toBe(
      'foto.jpeg',
    );
    expect(ensureFilenameMatchesType('foto.jpg', 'image/jpeg', ACCEPTED)).toBe(
      'foto.jpg',
    );
  });

  it.each([
    ['plik.jpg', 'image/jpeg'],
    ['plik.jpeg', 'image/jpeg'],
    ['plik.png', 'image/png'],
    ['plik.heic', 'image/heic'],
    ['plik.gif', 'image/gif'],
    ['plik.webp', 'image/webp'],
    ['plik.pdf', 'application/pdf'],
    ['plik.doc', 'application/msword'],
    [
      'plik.docx',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
    ['plik.xls', 'application/vnd.ms-excel'],
    [
      'plik.xlsx',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ],
    ['plik.csv', 'text/plain'],
    ['plik.txt', 'text/plain'],
    ['plik.mp3', 'audio/mpeg'],
    ['plik.m4a', 'audio/mp4'],
    ['plik.wav', 'audio/x-wav'],
    ['plik.mp4', 'video/mp4'],
    ['plik.m4v', 'video/mp4'],
    ['plik.mov', 'video/quicktime'],
  ])('leaves %s alone, which the API accepts', (filename, detected) => {
    expect(ensureFilenameMatchesType(filename, detected, ACCEPTED)).toBe(
      filename,
    );
  });

  it('appends the real extension when the name claims a type the API never accepts', () => {
    expect(
      ensureFilenameMatchesType('raport.html', 'image/png', ACCEPTED),
    ).toBe('raport.html.png');
    expect(ensureFilenameMatchesType('raport.svg', 'image/png', ACCEPTED)).toBe(
      'raport.svg.png',
    );
  });

  it('appends an extension when the name has none', () => {
    expect(
      ensureFilenameMatchesType('raport', 'application/pdf', ACCEPTED),
    ).toBe('raport.pdf');
  });

  it('leaves the name alone when the type is unknown to us', () => {
    expect(
      ensureFilenameMatchesType('raport.html', 'application/x-weird', ACCEPTED),
    ).toBe('raport.html');
    expect(ensureFilenameMatchesType('raport.html', '', ACCEPTED)).toBe(
      'raport.html',
    );
  });

  it('falls back to the detected type alone when the list is unavailable', () => {
    expect(ensureFilenameMatchesType('raport.html', 'image/png')).toBe(
      'raport.html.png',
    );
  });

  it('keeps the result within the length limit', () => {
    const name = `${'a'.repeat(260)}.html`;

    const result = ensureFilenameMatchesType(name, 'image/png', ACCEPTED);

    expect(result.length).toBeLessThanOrEqual(255);
    expect(result.endsWith('.png')).toBe(true);
  });
});
