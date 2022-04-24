export const initialPageData = (key: string) => ({
  [key]: {
    header: {
      title: '',
      img: '',
    },
    introduction: {
      title: '',
      text: '',
    },
    content: [],
  },
});

export interface IPageHeader {
  title: string;
  img: string;
}

export interface IPageIntroduction {
  title: string;
  text: string;
}

export interface IPageContent {
  img: string;
  content: string;
}
