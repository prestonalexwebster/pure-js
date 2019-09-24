const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

//todo: add compile time templating
fse.remove('./dist').then(() => {
    fs.mkdirSync('dist');
    fse.copySync('./src', './dist');

    const modulesPaths = [];
    const modulesCss = [];
    const dirs = ['./dist'];
    while(dirs.length){
        const dir = dirs.pop();
        fs.readdirSync(dir).forEach(fileName => {
            const fullName = path.join(dir, fileName);
            if(fs.lstatSync(fullName).isDirectory()){
                dirs.push(fullName);
            }else if(/.+\.js$/.test(fileName)){
                modulesPaths.push(path.relative('./dist', fullName));
            }else if(/.+\.css$/.test(fileName)){
                modulesCss.push(path.relative('./dist', fullName));
            }
        });
    }
    const indexHtml =
        `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    ${
            modulesCss.map(href => {
                return `<link rel="stylesheet/css" href="${href}">`;
            }).join('\n    ')
            }
</head>
<body>
    ${modulesPaths.map(src => {
            return `<script type="module" src="${src}"></script>`;
        }).join('\n    ')}
</body>
</html>
`;
    fs.writeFileSync('./dist/index.html', indexHtml);

});
