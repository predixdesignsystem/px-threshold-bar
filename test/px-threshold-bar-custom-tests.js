/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

suite('Custom Automation Tests for px-threshold-bar', function() {
  let thresholdEl;

  setup(function(done) {
    thresholdEl = fixture('px_threshold_bar');
    flush(()=>{
      done();
    });
  });

  test('Check component was initialized', function(done) {
    assert.notEqual(thresholdEl, null);
    let container = Polymer.dom(thresholdEl.root).querySelector('.container');
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
    thresholdEl.set('config', config);
    flush(function() {
      let bar = Polymer.dom(thresholdEl.root).querySelectorAll('.threshold-bar'),
          barColor = window.getComputedStyle(bar[1], false)['background-color'];
      assert.equal(window.getComputedStyle(bar[0], false)['width'], '16px');
      assert.equal(window.getComputedStyle(bar[1], false)['width'], '200px');
      if (barColor[0] === "#") {
        assert.equal(barColor, '#cc2036');
      }
      else {
        assert.equal(barColor, 'rgb(204, 32, 54)');
      }
      done();
    });
  });

  test('Show threshold bar scale', function (done) {
    let bar = Polymer.dom(thresholdEl.root).querySelector('.threshold-bar'),
        scale = Polymer.dom(thresholdEl.root).querySelectorAll('.scale__value');
    scale.forEach(function(scaleEl) {
      assert.equal(window.getComputedStyle(scaleEl, false)['display'], 'block');
    });
    done();
  });

  test('Hide threshold bar scale', function (done) {
    thresholdEl.hideScale = true;
    flush(function() {
      let bar = Polymer.dom(thresholdEl.root).querySelector('.threshold-bar'),
          scale = Polymer.dom(thresholdEl.root).querySelectorAll('.scale__value');
      scale.forEach(function(scaleEl, i) {
        assert.equal(window.getComputedStyle(scaleEl, false)['display'], i < 2 ? 'block' : 'none');
      });
      done();
    });
  });

  test('Set current value', function (done) {
    thresholdEl.value = '50';
    flush(function() {
      let value = Polymer.dom(thresholdEl.root).querySelector('.value > span');
      assert.equal(value.innerText, '50');
      done();
    });
  });

  test('Check position of marker in the bar when value is greater than max', function (done) {
    thresholdEl.value = '200';
    flush(function() {
      let marker = Polymer.dom(thresholdEl.root).querySelector('.marker-line'),
          caret = Polymer.dom(thresholdEl.root).querySelector('.caret');
      assert.equal(window.getComputedStyle(marker, false)['left'], '200px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '196px');
      done();
    });
  });

  test('Check position of marker in the bar when value is less than min', function (done) {
    thresholdEl.value = '-100';
    flush(function() {
      let marker = Polymer.dom(thresholdEl.root).querySelector('.marker-line'),
          caret = Polymer.dom(thresholdEl.root).querySelector('.caret');
      assert.equal(window.getComputedStyle(marker, false)['left'], '0px');
      assert.equal(window.getComputedStyle(caret, false)['left'], '-4px');
      done();
    });
  });

  test('Check position of marker in the bar when value is negative', function (done) {
    let marker = Polymer.dom(thresholdEl.root).querySelector('.marker-line'),
        caret = Polymer.dom(thresholdEl.root).querySelector('.caret'),
        config = [{
          "min": -50,
          "max": 50,
          "color": "#cc2036",
          "order": 0
        }];
    thresholdEl.set('config', config);
    thresholdEl.value = '0';
    thresholdEl.min = '-50';
    thresholdEl.max = '50';
    assert.equal(window.getComputedStyle(marker, false)['left'], '100px');
    assert.equal(window.getComputedStyle(caret, false)['left'], '96px');
    done();
  });

  test('Set uom', function (done) {
    thresholdEl.value = '100';
    thresholdEl.uom = '%';
    flush(function() {
      let value = Polymer.dom(thresholdEl.root).querySelector('.value > span');
      assert.equal(value.innerText, '100%');
      done();
    });
  });

  test('Hide current value', function (done) {
    thresholdEl.hideValue = true;
    flush(function() {
      let value = Polymer.dom(thresholdEl.root).querySelector('.value > span');
      assert.equal(window.getComputedStyle(value, false)['display'], 'none');
      done();
    });
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
    thresholdEl.set('config', config);
    flush(function() {
      let bar = Polymer.dom(thresholdEl.root).querySelectorAll('.threshold-bar'),
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
    });
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
    thresholdEl.set('config', config);
    flush(function() {
      let bar = Polymer.dom(thresholdEl.root).querySelectorAll('.threshold-bar'),
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
    });
  });
});
