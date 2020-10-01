#!/usr/bin/env node

import { cli } from 'coolir-commander';
import { clone as workspace } from './workspace';
import { clone as workspaceModule } from './workspace-module';
import { clone as npmModule } from './npm-module';
import { clone as styledWorkspace } from './styled-workspace';
import { clone as styledWorkspaceModule } from './styled-workspace-module';
import { clone as styledNpmModule } from './styled-npm-module';
import { clone as launchQLServer } from './launchql-server';
import { clone as graphileServer } from './graphile-server';
import { clone as graphilePlugin } from './graphile-plugin';

export const go = async () => {
  await cli({
    npmModule,
    workspace,
    workspaceModule,
    launchQLServer,
    graphileServer,
    graphileServer,
    styledWorkspace,
    styledWorkspaceModule,
    styledNpmModule
  });
};

(async () => {
  await go();
})();
