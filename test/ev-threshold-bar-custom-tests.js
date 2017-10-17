// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('Custom Automation Tests for ev-threshold-bar', function() {
    test('Check initial values', function(done){
      var thresholdEl = Polymer.dom(document).querySelector('ev-threshold-bar');

      assert.equal(thresholdEl.min, 0);
      assert.equal(thresholdEl.max, 100);
      assert.equal(thresholdEl.value, null);

      done();
    });
  });
}
