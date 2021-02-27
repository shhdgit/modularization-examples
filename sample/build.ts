import { buildModel } from './buildModel';
import * as fs from 'fs';
import * as path from 'path';

class Model {
    public qualifiedName: string;
    public srcFiles: string[] = [];
}

const models = new Map<string, Model>();

const project = process.argv[2];
if (!project) {
    console.error('must specify project to build');
    process.exit(1);
}

function main() {
    const projectPackageJson = require(`${project}/package.json`);
    for (const pkg of Object.keys(projectPackageJson.dependencies)) {
        const packageJsonPath = require.resolve(`${pkg}/package.json`);
        scanPackage(path.dirname(packageJsonPath));
    }
    build();
}

function build() {
    const projectDir = path.dirname(require.resolve(`${project}/package.json`));
    const gateways = [];
    for (const model of models.values()) {
        const archetype = buildModel(projectDir, model.qualifiedName, model.srcFiles);
        if (archetype === 'Gateway') {
            gateways.push(model.qualifiedName);
        }
    }
    const gatewayArray = gateways.map(gateway => `require('./${gateway}').${path.basename(gateway)}`).join(',\n');
    fs.writeFileSync(path.join(projectDir, 'server', 'gateways.js'), `
        exports.gateways = [${gatewayArray}];
    `);
}

function scanPackage(pkgDir: string) {
    const srcDir = path.join(pkgDir, 'src');
    for (const srcFile of walk(srcDir)) {
        const ext = path.extname(srcFile);
        if (!ext) {
            continue;
        }
        const relPath = path.relative(srcDir, srcFile);
        const dotPos = relPath.indexOf('.');
        const qualifiedName = relPath.substr(0, dotPos);
        const model = registerModel(qualifiedName);
        model.srcFiles.push(srcFile);
    }
}

function registerModel(qualifiedName: string) {
    let model = models.get(qualifiedName);
    if (!model) {
        model = new Model();
        model.qualifiedName = qualifiedName;
        models.set(qualifiedName, model);
    }
    return model;
}

function* walk(filePath: string): Generator<string> {
    try {
        for (const dirent of fs.readdirSync(filePath)) {
            if (dirent.startsWith('.')) {
                continue;
            }
            yield* walk(path.join(filePath, dirent));
        }
    } catch (e) {
        yield filePath;
    }
}

main();