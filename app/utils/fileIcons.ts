import jpgIcon from 'assets/svg/file-icons/jpg_file.svg';
import pngIcon from 'assets/svg/file-icons/png_file.svg';
import pdfIcon from 'assets/svg/file-icons/pdf_file.svg';
import microsoftWordIcon from 'assets/svg/file-icons/doc_file.svg';
import microsoftExcelIcon from 'assets/svg/file-icons/xls_file.svg';
import defaultIcon from 'assets/svg/file-icons/other_file.svg';
import csvIcon from 'assets/svg/file-icons/csv_file.svg';
import txtIcon from 'assets/svg/file-icons/txt_file.svg';

interface IconMap {
  [key: string]: SVGElement;
}

const ExtensionIcons: IconMap = {
  txt: txtIcon,
  csv: csvIcon,
  docx: microsoftWordIcon,
  jpg: jpgIcon,
  jpeg: jpgIcon,
  pdf: pdfIcon,
  png: pngIcon,
  xls: microsoftExcelIcon,
  default: defaultIcon,
};

export const getIconForExtension = (fileName: string): SVGElement => {
  const extension = fileName.split('.').pop()?.toLowerCase().trim();
  return extension && extension in ExtensionIcons
    ? ExtensionIcons[extension]
    : ExtensionIcons.default;
};

export default ExtensionIcons;
