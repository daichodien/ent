import { WebPortalModule } from './web-portal.module';

describe('WebPortalModule', () => {
  let webPortalModule: WebPortalModule;

  beforeEach(() => {
    webPortalModule = new WebPortalModule();
  });

  it('should create an instance', () => {
    expect(webPortalModule).toBeTruthy();
  });
});
