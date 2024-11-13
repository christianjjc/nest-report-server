import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

interface HeaderSectionOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

const currentDate: Content = {
  text: DateFormatter.getDDMMMMYYYY(new Date()),
  alignment: 'right',
  margin: [20, 40, 20, 0],
  width: 180,
};

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

export const headerSection = (options: HeaderSectionOptions): Content => {
  //
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content = showLogo ? logo : null;
  const headerDate: Content = showDate ? currentDate : null;

  const headerSubTitle: Content = subTitle
    ? {
        text: subTitle,
        style: {
          bold: true,
          fontSize: 16,
        },
        margin: [50, 0, 0, 0],
        alignment: 'center',
      }
    : null;

  const headerTitle: Content = title
    ? {
        stack: [
          {
            text: title,
            style: {
              bold: true,
              fontSize: 28,
            },
            margin: [50, 30, 0, 0],
            alignment: 'center',
          },
          headerSubTitle,
        ],
      }
    : null;
  return {
    columns: [headerLogo, headerTitle, headerDate],
  };
};
