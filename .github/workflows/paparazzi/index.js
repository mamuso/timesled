"use strict";
/**
 * Paparazzi
 * A GitHub action to capture, compare, minify and store screenshots
 */

const config = require("../../../timesled-config");
const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const capture = require("./lib/capture");
const compare = require("./lib/compare");
const minify = require("./lib/minify");
const store = require("./lib/store");
const utils = require("./lib/utils");

const date = new Date().toISOString().split("T")[0];
const tmpFolder = "tmp";

(async () => {
  utils.logHeader(`✨ Paparazzi - ${date}`);

  /**
   * Create tmp infrastructure
   */
  if (!fs.existsSync(tmpFolder)) {
    await fs.promises.mkdir(tmpFolder);
  }
  if (!fs.existsSync(`${tmpFolder}/${date}`)) {
    await fs.promises.mkdir(`${tmpFolder}/${date}`);
  }
  if (!fs.existsSync(`${tmpFolder}/current`)) {
    await fs.promises.mkdir(`${tmpFolder}/current`);
  }

  /**
   * Capture
   */
  await capture({
    devices: config.devices,
    urls: config.urls,
    format: config.format,
    destination: `${tmpFolder}/${date}`
  });

  /**
   * Clean tmp infrastructure
   */
  await fs.promises.rmdir(tmpFolder, { recursive: true });
})();
