const fs = require("fs");
const pkg = require("./package.json");
const exec = require("child_process").exec;

const localDependencies = pkg.localDependencies;

localDependencies.forEach((dependency) => {

  const dependencyProject = `${__dirname}/proyecto`;
  const dependencyFolder = `${__dirname}/${dependency}`;

  if (!fs.existsSync(dependencyFolder)) {
    console.error(`No existe la carpeta ${dependencyFolder}`);
  } else {
    const link = exec(`cd ${dependencyFolder} && npm link`);
    link.stdout.on("end", () => {
      const linked = exec(`cd ${dependencyProject} && npm link ${dependency}`);
      linked.stdout.on("end", () => console.log(`${dependency} dependency linked!`));
    });
  }
});
