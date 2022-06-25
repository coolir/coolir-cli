import * as shell from 'shelljs';
import { prompt } from '@pyramation/prompt';
import dargs from 'dargs';
const glob = require('glob').sync;
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const repo = 'git@github.com:coolir/tmpl-chakra-ui-workspace.git';
const clone = async argv => {
  if (!shell.which('git')) {
    shell.echo('Sorry, this script requires git');
    return shell.exit(1);
  }

  const { name } = argv;

  shell.exec(`git clone ${repo} ${name}`);
  shell.cd(name);
  mkdirp.sync('packages');

  const questions = JSON.parse(fs.readFileSync(`.questions.json`));

  const fullname = shell
    .exec('git config --global user.name', { silent: true })
    .trim();
  const email = shell
    .exec('git config --global user.email', { silent: true })
    .trim();

  const args = dargs(
    {
      _: [],
      ...argv,
      __PROJECTNAME__: name,
      __USERFULLNAME__: fullname,
      __USEREMAIL__: email,
    },
    { allowCamelCase: true }
  );

  const results = await prompt(questions, args);
  const license = await prompt(
    [
      {
        name: '__LICENSE__',
        message: 'Which license?',
        choices: ['MIT', 'closed'],
        type: 'list',
        required: true,
      },
    ],
    []
  );

  console.log({ license });

  const files = []
    .concat(glob(process.cwd() + '/**/.*'))
    .concat(glob(process.cwd() + '/**/*'));

  for (let i = 0; i < files.length; i++) {
    const templateFile = files[i];
    if (fs.lstatSync(templateFile).isDirectory()) continue;

    let content = fs.readFileSync(templateFile).toString();
    if (
      path.basename(templateFile) === 'LICENSE' &&
      license.__LICENSE__ === 'closed'
    ) {
      content = `Copyright (c) 2022 __USERFULLNAME__ <__USEREMAIL__> - All Rights Reserved
Unauthorized copying via any medium is strictly prohibited
Proprietary and confidential`;
    }

    Object.keys(results).forEach(key => {
      if (/^__/.test(key)) {
        content = content.replace(new RegExp(key, 'g'), results[key]);
      }
    });

    if (path.basename(templateFile) === 'README.md') {
      content = `# ${results.__PROJECTNAME__}`;
    }

    fs.writeFileSync(templateFile, content);
  }

  shell.rm('-rf', '.git');
  shell.rm('-rf', '.questions.json');
  shell.exec(`git init .`);

  console.log(`

  |||
 (o o)
ooO--(_)--Ooo-

✨ Great work!
`);
};

clone.questions = [
  {
    _: true,
    name: 'name',
    message: 'Enter your new workspace project name',
    required: true,
  },
];

export { clone };
