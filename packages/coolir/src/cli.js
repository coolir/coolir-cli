#!/usr/bin/env node

import { cli } from 'coolir-commander';
import { clone as workspace } from './workspace';
import { clone as workspaceModule } from './workspace-module';
import { clone as npmModule } from './npm-module';
import { clone as styledWorkspace } from './styled-workspace';
import { clone as styledWorkspaceModule } from './styled-workspace-module';
import { clone as styledNpmModule } from './styled-npm-module';

export const go = async () => {
  await cli({
    npmModule,
    workspace,
    workspaceModule,
    styledWorkspace,
    styledWorkspaceModule,
    styledNpmModule
  });
};

(async () => {
  await go();
})();
