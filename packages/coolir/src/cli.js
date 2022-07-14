#!/usr/bin/env node

import { cli } from 'coolir-commander';
import { clone as workspace } from './workspace';
import { clone as workspaceModule } from './workspace-module';
import { clone as npmModule } from './npm-module';
import { clone as tsNpmModule } from './ts-npm-module';
import { clone as tsReactNpmModule } from './ts-react-npm-module';
import { clone as styledWorkspace } from './styled-workspace';
import { clone as styledWorkspaceModule } from './styled-workspace-module';
import { clone as chakraWorkspace } from './chakra-ui-workspace';
import { clone as chakraWorkspaceModule } from './chakra-ui-workspace-app';
import { clone as styledNpmModule } from './styled-npm-module';
import { clone as launchQLServer } from './launchql-server';
import { clone as graphileServer } from './graphile-server';
import { clone as graphilePlugin } from './graphile-plugin';
import { clone as nextSite } from './next-site';
import { clone as craApp } from './cra-app';

export const go = async () => {
  await cli({
    npmModule,
    tsNpmModule,
    tsReactNpmModule,
    workspace,
    workspaceModule,
    craApp,
    nextSite,
    launchQLServer,
    graphileServer,
    graphilePlugin,
    chakraWorkspace,
    chakraWorkspaceModule,
    styledWorkspace,
    styledWorkspaceModule,
    styledNpmModule
  });
};

(async () => {
  await go();
})();
