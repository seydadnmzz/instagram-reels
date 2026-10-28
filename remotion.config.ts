/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";
import { existsSync } from "node:fs";

// Bulut ortamında yalnızca hazır Chromium, ajan proxy'sinin sertifikasına güveniyor
// (Remotion'ın indirdiği tarayıcı Google Fonts'u çekemiyor).
const CLOUD_CHROMIUM = "/opt/pw-browsers/chromium";
if (existsSync(CLOUD_CHROMIUM)) {
  Config.setBrowserExecutable(CLOUD_CHROMIUM);
}

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);
