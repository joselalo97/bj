export class Guide {
  tag: TitleGuide = new TitleGuide();
  img: string = '';
  description: TitleGuide[] = [];
}

export class TitleGuide {
  title: string = '';
  description: string = '';
  point: string = '';
}
