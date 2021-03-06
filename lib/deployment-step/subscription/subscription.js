const EventEmitter = require('events');

const calculatePostInstallState = function (preInstallState, options) {
  let validation = validate(preInstallState, options);
  if (!validation.valid) {
    return preInstallState;
  }

  let postInstallState = preInstallState;

  if (!postInstallState.subscriptions) {
    postInstallState.subscriptions = {
      rhv: 0,
      openstack: 0,
      openshift: 0,
      cloudforms: 0
    };
  }

  postInstallState.subscriptions.rhv+= options.subscriptions.rhv;
  postInstallState.subscriptions.openstack+= options.subscriptions.openstack;
  postInstallState.subscriptions.openshift+= options.subscriptions.openshift;
  postInstallState.subscriptions.cloudforms+= options.subscriptions.cloudforms;

  return postInstallState;
};

const validate = function (preInstallState, options) {
  let errors = [];
  let warnings = [];

  if (!options || !options.subscriptions) {
    errors.push = ['No subscriptions registered'];
  }

  let valid = errors.length === 0;
  return {valid, errors,  warnings}
};

const run = function (options) {
  const emitter = new EventEmitter();
  console.log('running sub');

  let ticks = 0;
  const tickCount = 11;
  const period = 500;

  const interval = setInterval(() => {
    if(ticks === tickCount) {
      clearInterval(interval);
      emitter.emit('done');
    }

    const progress = ticks++ / tickCount;
    emitter.emit('progress', {progress});

  }, period);

  return emitter;
};

const additionalFunctions = {
  generateFakeOptions: function () {
    return {
      subscriptions: {
        rhv: 1,
        openstack: 1,
        openshift: 1,
        cloudforms: 1
      }
    }
  }
};

module.exports = { calculatePostInstallState, validate, run, additionalFunctions};