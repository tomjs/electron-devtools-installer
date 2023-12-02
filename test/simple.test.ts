import { app } from 'electron';

describe('simple', () => {
  it('should work', () => {
    return app.whenReady().then(() => {
      // some code
      expect(app.getVersion()).not.toBe(undefined);
    });
  });
});
