import * as React from 'react';
import { render } from 'react-dom';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies, /* this is what we're testing */
import { PermissibleRender, PermissibleRenderProps, CheckPermissionsParams, checkPermissions, } from '@brainhubeu/react-permissible';

const VIEW_PERMISSION = 'VIEW';

const checkPermissionsParams: CheckPermissionsParams = {
  oneperm: false,
  userPermissions: [VIEW_PERMISSION],
  requiredPermissions: [VIEW_PERMISSION],
};

const permissibleRenderTestProps: PermissibleRenderProps = {
  ...checkPermissionsParams,
  children: 'restricted content',
  renderOtherwise: 'ACCESS DENIED',
};

render(<PermissibleRender {...permissibleRenderTestProps} />, document.createElement('div'));

checkPermissions(checkPermissionsParams);
