/**
 * @fileoverview Script which swaps the name of this package for release on
 * GitHub.
 */

const fs = require("fs");
const path = require("path");

const packagePath = path.join(__dirname, "..", "package.json");
const package = JSON.parse(fs.readFileSync(packagePath, {encoding: "utf-8"}));

const newPackage = {...package};
newPackage.name = `@ava-cassiopeia/${package.name}`;

const newPackageStr = JSON.stringify(newPackage, /* replacer= */ null, 2);
fs.writeFileSync(packagePath, newPackageStr, {encoding: "utf-8"});

console.log(`Updated package name to "${newPackage.name}"!`);
