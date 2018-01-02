'use strict';

import {
  driver,
  BASE_URL
} from './helper';

describe('test/umlplot.test.js', () => {
  describe('page func testing', () => {
    before(() => {
      return driver
        .initWindow({
          width: 800,
          height: 600,
          deviceScaleFactor: 2
        });
    });

    afterEach(function () {
      return driver
        .coverage()
        .saveScreenshots(this);
    });

    after(() => {
      return driver
        .openReporter(false)
        .quit();
    });

    it('plantuml render should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/plantuml.html?data=Iyv9B2vM2F3n3_4A1W00`)
        .sleep(1000);
    });

    it('mermaid render should be ok', () => {
      return driver
        .getUrl(`${BASE_URL}/mermaid.html?data=urA0WlJ4l98IBXYl9BCa9rN1KS4T9AhWafcONfIO2vTDIIn9TSiloaqiKL28109TNrzT5nUuT75gSabcVfv2C8I6Ypigb2GMPojO9HhgA1WP69hh6XW2aOw2QGfSYHDCILf9Qf42M25C4W00`)
        .sleep(1000);
    });
  });
});
