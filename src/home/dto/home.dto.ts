export interface IUpdateTitleRequestBody {
  heading: string;
  text: string;
}

export interface IStudyCarousel {
  id?: string;
  img: string;
  title: string;
  text: string;
  href: string;
}

export interface ITestomonialCarousel {
  id?: string;
  img: string;
  name: string;
  text: string;
}

export interface IAchievements {
  id?: string;
  title: string;
  icon: string;
  marks: string;
}
