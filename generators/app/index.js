'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');

// module.exports = class extend Generator({
module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the primo ' + chalk.red('generator-vue-express-webpack') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (vue_project):',
        default: 'vue_project'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (lix):',
        default: 'lix'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0']
      }
    ];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  }

  defaults () {

    if (path.basename(this.destinationPath()) !== this.props.projectName) {
      this.log(
        'Your generator must be inside a folder named ' + this.props.projectName + '\n' +
        'I\'ll automatically create this folder.'
      );
      mkdirp(this.props.projectName);
      this.destinationRoot(this.destinationPath(this.props.projectName));
    }

  }


  writing () {
    console.log(chalk.bgGreen('创建文件...'));
    // var readmeTmpl = _.template(this.fs.read(this.templatePath('./README.md')));
    // this.fs.write(this.destinationPath('README.md'), readmeTmpl({
    //   project_name: this.props.projectName,
    //   project_license: this.props.projectLicense,
    //   project_author: this.props.projectAuthor
    // }));

    // var readmeTmpl2 = _.template(this.fs.read(this.templatePath('./package.json')));
    // this.fs.write(this.destinationPath('package.json'), readmeTmpl2({
    //   project_name: this.props.projectName,
    //   project_desc: this.props.projectDesc,
    //   project_author: this.props.projectAuthor
    // }));
    // var readmeTmpl2 = _.template(this.fs.read());
    // this.fs.write(this.destinationPath('package.json'), readmeTmpl2({
    //   project_name: this.props.projectName,
    //   project_desc: this.props.projectDesc,
    //   project_author: this.props.projectAuthor
    // }));
    // console.log(this.props);
    // this.fs.copyTpl(
    //     this.templatePath('./package.json'),
    //     this.destinationPath('./package.json'),{
    //       project_name: this.props.projectName,
    //       project_desc: this.props.projectDesc,
    //       project_author: this.props.projectAuthor
    //     }
    // );

    // 复制目录所有文件
    this.fs.copy(
        this.templatePath('.'),
        this.destinationPath('.'),{
          globOptions: {
            dot: true
          }
        }
    );

    // 覆盖存在变量的文件
    this.fs.copyTpl(
        this.templatePath('./package.json'),
        this.destinationPath('./package.json'),{
          project_name: this.props.projectName,
          project_desc: this.props.projectDesc,
          project_author: this.props.projectAuthor
        }
    );
    this.fs.copyTpl(
        this.templatePath('./README.md'),
        this.destinationPath('./README.md'),{
          project_name: this.props.projectName,
          project_license: this.props.projectLicense,
          project_author: this.props.projectAuthor
        }
    );

  }

  install () {
    console.log(chalk.bgGreen('安装依赖...'));
    // this.installDependencies();
  }
}