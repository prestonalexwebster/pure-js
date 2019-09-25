const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

function extractModules(pathName, modulesJs, modulesCss){
    const dirs = [pathName];
    while(dirs.length){
        const dir = dirs.pop();
        fs.readdirSync(dir).forEach(fileName => {
            const fullName = path.join(dir, fileName);
            if(fs.lstatSync(fullName).isDirectory()){
                dirs.push(fullName);
            }else if(/.+\.js$/.test(fileName)){
                modulesJs.push(path.relative(pathName, fullName));
            }else if(/.+\.css$/.test(fileName)){
                modulesCss.push(path.relative(pathName, fullName));
            }
        });
    }
}

const createBaseHtmlTemplate = (headContent, bodyContent) => (
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
${headContent}
</head>
<body>
${bodyContent}
</body>
</html>
`
);

function createCssTemplate(modulesCss){
    return modulesCss.map(href => {
        return `    <link rel="stylesheet" href="${href}">`;
    }).join('\n');
}

function createJsTemplate(modulesJs){
    return modulesJs.map(src => {
        return `    <script type="module" src="${src}"></script>`;
    }).join('\n');
}

function createHtmlTemplate(modulesJs, modulesCss){
    return createBaseHtmlTemplate(createCssTemplate(modulesCss), createJsTemplate(modulesJs));
}

function buildBundle(pathName){
    const modulesJs = [];
    const modulesCss = [];

    extractModules(pathName, modulesJs, modulesCss);

    fs.writeFileSync(`${pathName}/index.html`, createHtmlTemplate(modulesJs, modulesCss));
}


fse.remove('./dist').then(() => {

    fs.mkdirSync('dist');
    fse.copySync('./src', './dist');

    buildBundle('./dist');

});
