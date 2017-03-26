import { EngPresentationAppPage } from './app.po';

describe('eng-presentation-app App', () => {
  let page: EngPresentationAppPage;

  beforeEach(() => {
    page = new EngPresentationAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
