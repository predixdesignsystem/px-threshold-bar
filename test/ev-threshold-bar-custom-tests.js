// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here
  let thresholdEl = Polymer.dom(document).querySelector('ev-threshold-bar');

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for ev-threshold-bar', function() {

    test('Check component was initialized', function(done) {

      assert.notEqual(thresholdEl, null);

      let container = Polymer.dom(thresholdEl.root).querySelector('.ev-threshold-bar-container');

      assert.notEqual(container, null);

      done();
    });

    test('Check initial values', function(done) {
      assert.equal(thresholdEl.min, 0);
      assert.equal(thresholdEl.max, 100);
      assert.isNull(thresholdEl.value);
      assert.equal(thresholdEl.uom, '');
      assert.equal(thresholdEl.config.length, 0);
      assert.isFalse(thresholdEl.hideValue);
      assert.isFalse(thresholdEl.hideScale);

      done();
    });

    test('Check for 1 threshold configuration', function (done) {

      let config = [{
        "min": 0,
        "max": 100,
        "color": "#cc2036",
        "order": 0
      }];

      thresholdEl.config = config;

      setTimeout(function() {
        let bar = thresholdEl.querySelectorAll('.threshold-bar');
        let barColor = window.getComputedStyle(bar[1], false)['background-color'];

        assert.equal(window.getComputedStyle(bar[0], false)['width'], '16px');
        assert.equal(window.getComputedStyle(bar[1], false)['width'], '200px');

        if (barColor[0] === "#") {
          assert.equal(barColor, '#cc2036');
        }
        else {
          assert.equal(barColor, 'rgb(204, 32, 54)');
        }

        done();
      }.bind(this));
    });

    test('Check Show threshold bar scale', function (done) {

      let bar = thresholdEl.querySelector('.threshold-bar'),
          scale = thresholdEl.querySelectorAll('.scale-value');

      assert.equal(window.getComputedStyle(bar.parentElement, false)['display'], 'flex');

      scale.forEach(function(scaleEl) {
        assert.equal(window.getComputedStyle(scaleEl, false)['display'], 'block');
      });

      done();
    });

    test('Check Hide threshold bar scale', function (done) {

      let bar = thresholdEl.querySelector('.threshold-bar'),
        scale = thresholdEl.querySelectorAll('.scale-value');

      thresholdEl.hideScale = true;

      assert.equal(window.getComputedStyle(bar.parentElement, false)['display'], 'none');

      scale.forEach(function(scaleEl, i) {
        assert.equal(window.getComputedStyle(scaleEl, false)['display'], i < 2 ? 'block' : 'none');
      });

      thresholdEl.hideScale = false;

      done();
    });

    test('Check Set current value', function (done) {

      let value = document.querySelector('.threshold-bar-value > span');

      thresholdEl.value = '50';
      assert.equal(value.innerText, '50');

      thresholdEl.value = '81';
      assert.equal(value.innerText, '81');

      done();
    });

    test('Check position of marker in the bar', function (done) {

      let marker = thresholdEl.querySelector('.threshold-marker-line'),
          caret = thresholdEl.querySelector('.fa-caret-down');

      assert.equal(window.getComputedStyle(marker, false)['left'], '178px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '174px');

      done();
    });

    test('Check position of marker in the bar when value is greater than max', function (done) {

      let marker = thresholdEl.querySelector('.threshold-marker-line'),
        caret = thresholdEl.querySelector('.fa-caret-down');

      thresholdEl.value = '200';

      assert.equal(window.getComputedStyle(marker, false)['left'], '216px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '212px');

      done();
    });

    test('Check position of marker in the bar when value is less than min', function (done) {

      let marker = thresholdEl.querySelector('.threshold-marker-line'),
        caret = thresholdEl.querySelector('.fa-caret-down');

      thresholdEl.value = '-100';

      assert.equal(window.getComputedStyle(marker, false)['left'], '16px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '12px');

      done();
    });

    test('Check position of marker in the bar when value is negative', function (done) {

      let marker = thresholdEl.querySelector('.threshold-marker-line'),
          caret = thresholdEl.querySelector('.fa-caret-down'),
          config = [{
            "min": -50,
            "max": 50,
            "color": "#cc2036",
            "order": 0
          }];

      thresholdEl.config = config;
      thresholdEl.value = '0';
      thresholdEl.min = '-50';
      thresholdEl.max = '50';

      assert.equal(window.getComputedStyle(marker, false)['left'], '116px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '112px');

      done();
    });

    test('Check Set uom', function (done) {

      let value = document.querySelector('.threshold-bar-value > span');

      thresholdEl.value = '100';
      thresholdEl.uom = '%';
      assert.equal(value.innerText, '100%');

      done();
    });

    test('Check Hide current value', function (done) {

      let value = document.querySelector('.threshold-bar-value > span');

      thresholdEl.hideValue = true;
      assert.equal(window.getComputedStyle(value, false)['display'], 'none');

      done();
    });

    test('Check Show current value', function (done) {

      let value = document.querySelector('.threshold-bar-value > span');

      thresholdEl.hideValue = false;
      assert.equal(window.getComputedStyle(value, false)['display'], 'inline-block');

      done();
    });

    test('Check for 2 thresholds configuration', function (done) {

      let config = [
        {
          "min": 0,
          "max": 50,
          "color": "#cc2036",
          "order": 0
        },
        {
          "min": 50,
          "max": 100,
          "color": "#f79838",
          "order": 1
        }];

      thresholdEl.config = config;

      setTimeout(function() {
        let bar = thresholdEl.querySelectorAll('.threshold-bar'),
            barColor = window.getComputedStyle(bar[1], false)['background-color'];

        assert.equal(window.getComputedStyle(bar[0], false)['width'], '16px');
        assert.equal(window.getComputedStyle(bar[1], false)['width'], '100px');
        assert.equal(window.getComputedStyle(bar[2], false)['width'], '100px');

        if (barColor[0] === "#") {
          assert.equal(barColor, '#cc2036');
        }
        else {
          assert.equal(barColor, 'rgb(204, 32, 54)');
        }

        barColor = window.getComputedStyle(bar[2], false)['background-color'];

        if (barColor[0] === "#") {
          assert.equal(barColor, '#f79838');
        }
        else {
          assert.equal(barColor, 'rgb(247, 152, 56)');
        }

        done();
      }.bind(this));
    });

    test('Check for 3 thresholds configuration', function (done) {

      let config = [
        {
          min: 0,
          max: 40,
          color: '#cc2036'
        },
        {
          min: 40,
          max: 80,
          color: '#f79838'
        },
        {
          min: 80,
          max: 100,
          color: '#6d6d6d'
        }];

      thresholdEl.config = config;

      setTimeout(function() {
        let bar = thresholdEl.querySelectorAll('.threshold-bar'),
          barColor = window.getComputedStyle(bar[1], false)['background-color'];

        assert.equal(window.getComputedStyle(bar[0], false)['width'], '16px');
        assert.equal(window.getComputedStyle(bar[1], false)['width'], '80px');
        assert.equal(window.getComputedStyle(bar[2], false)['width'], '80px');
        assert.equal(window.getComputedStyle(bar[3], false)['width'], '40px');

        if (barColor[0] === "#") {
          assert.equal(barColor, '#cc2036');
        }
        else {
          assert.equal(barColor, 'rgb(204, 32, 54)');
        }

        barColor = window.getComputedStyle(bar[2], false)['background-color'];

        if (barColor[0] === "#") {
          assert.equal(barColor, '#f79838');
        }
        else {
          assert.equal(barColor, 'rgb(247, 152, 56)');
        }

        barColor = window.getComputedStyle(bar[3], false)['background-color'];

        if (barColor[0] === "#") {
          assert.equal(barColor, '#6d6d6d');
        }
        else {
          assert.equal(barColor, 'rgb(109, 109, 109)');
        }

        done();
      }.bind(this));
    });
  });
}
