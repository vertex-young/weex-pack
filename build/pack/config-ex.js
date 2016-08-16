"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inquirer = require('inquirer');

var platforms = ["init", "android", "ios", "html"];
var sweetAndroid = ["android", "an", "a", "andriod"];
var sweetPlat = platforms.concat(sweetAndroid);

module.exports = function (argv) {
  var _this = this;

  // 处理 build 的逻辑,
  // test build init | build init android | build init an | build init ios |
  // build init -url  www.baidu.com android | build init |  build ini
  // build android -d | build an | build android init
  //

  return new _promise2.default(function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
      var options, argv1;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              options = {};


              options.oprate = argv._[0];

              argv1 = argv._[1] ? argv._[1].toLocaleLowerCase() : null;

              // 处理不正常的输入

              if (!(argv1 === null || sweetPlat.indexOf(argv1) === -1)) {
                _context.next = 6;
                break;
              }

              _context.next = 6;
              return inquirer.prompt([{
                type: 'list',
                name: 'command',
                message: 'Choose an operation: ',
                choices: [options.oprate + " android", options.oprate + " ios", options.oprate + " html"]
              }]).then(function (value) {
                // exec(`pakeex ${value.command}`, {cwd: process.cwd()});
                argv1 = value.command.split(' ')[1];
              });

            case 6:

              if (sweetAndroid.indexOf(argv1) !== -1) {
                options.platform = "android";
              } else {
                options.platform = argv1;
              }

              if (options.oprate === "emulate") {
                options.isSimulator = true;
              }

              if (!(options.platform === "ios")) {
                _context.next = 11;
                break;
              }

              _context.next = 11;
              return inquirer.prompt([{
                type: 'list',
                name: 'type',
                message: 'Where would you like to install the app: ',
                choices: [{ value: true, name: 'Simulator' }, { value: false, name: 'Real Device' }]
              }]).then(function (value) {
                // exec(`pakeex ${value.command}`, {cwd: process.cwd()});
                console.log(1, value);
                options.isSimulator = value.type;
              });

            case 11:

              console.log(2, options);
              options.root = process.cwd();
              //
              if (options.oprate === 'run') {
                options.release = false;
                options.debug = true;
              }

              if (argv.release) {
                options.release = true;
                options.debug = false;
              }

              options.name = argv.n || "";

              resolve(options);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};