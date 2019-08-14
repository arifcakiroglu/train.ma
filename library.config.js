/*!
 * Train - v1.0
 * Copyright 2018 train.ma | @Train
 */

const vendor = {
  js: {
    src : './src/assets/toolkit/scripts/vendors/'
  },
  css: {
    src : './src/assets/toolkit/styles/vendors/'
  }
};

const fabricator    = './src/assets/fabricator/scripts/fabricator';
const toolkit       = './src/assets/toolkit/scripts/toolkit';

module.exports = {
  js: {
  	'fabricator/scripts/f'                : fabricator,
    'toolkit/scripts/toolkit'             : toolkit,
    'vendors/scripts/datetimepicker'      : `${vendor.js.src}datetimepicker`,
    'vendors/scripts/daterangepicker'     : `${vendor.js.src}daterangepicker`,
    'vendors/scripts/jstree'              : `${vendor.js.src}jstree`,
    'vendors/scripts/moment'              : `${vendor.js.src}moment`,
    'vendors/scripts/chartist'            : `${vendor.js.src}chartist`,
    'vendors/scripts/datatables'          : `${vendor.js.src}datatables`,
    'vendors/scripts/bootstrap'           : `${vendor.js.src}bootstrap`,
    'vendors/scripts/jquery'              : `${vendor.js.src}jquery`
  },
  css: [
    `${vendor.css.src}datatables.scss`,
    `${vendor.css.src}chartist.scss`,
    `${vendor.css.src}jstree.scss`,
    `${vendor.css.src}daterangepicker.scss`,
    `${vendor.css.src}datetimepicker.scss`,
    `${vendor.css.src}bootstrap.scss`,
    `${vendor.css.src}icons.scss`,
    `${vendor.css.src}rtl.scss`
  ]
}
