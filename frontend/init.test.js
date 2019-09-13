/* global require */

/*
    VUE
*/

require("jsdom-global")();
window.Date = Date;

const shallow = require("@vue/test-utils").shallowMount;

const prettyFormat = require("pretty-format");

// const cloneElement = element => ({
//   attributes
//   childNodes
// })

const mapVnode = vNode => ({

});

// type
// nodeType


const wrapperToHtml = wrapper => {
  // console.log(wrapper.vm.$options.render);

  // console.log(wrapper.vm);

  // const h = (component) => ({

  // });
  // const out = wrapper.vm.$options.render.call(
  //   wrapper.vm, h
  // );

  // console.log(out);
  // console.log(wrapper.vm.$vnode);
  return prettyFormat(wrapper.vm.$vnode, {
    indent: 2,
    plugins: [
      // {
      //   test: obj =>
      //     (obj.type === "object" && obj.constructor == Object) || Array.isArray(obj),
      //   serialize: node => JSON.stringify(node)
      // },
      prettyFormat.plugins.DOMElement
    ],
    callToJSON: true
  });
};

/*
    SINON
*/

const sinon = require("sinon");

/*
    CHAI
*/

const chai = require("chai");
const { expect } = chai;

const sinonChai = require("sinon-chai");
chai.use(sinonChai);

const chaiDiff = require("chai-diff");
chai.use(chaiDiff);

/*
    ASSIGN TO GLOBAL
*/

Object.assign(global, {
  shallow,
  wrapperToHtml,
  sinon,
  expect
});
