#!/usr/bin/env node

import { cli } from 'mania';
import { clone as workspace } from './workspace';
import { clone as workspaceModule } from './workspace-module';
import { clone as npmModule } from './npm-module';

export const go = async () => {
  await cli({
    npmModule,
    workspace,
    workspaceModule,
  });
};

(async () => {
  await go();
})();
