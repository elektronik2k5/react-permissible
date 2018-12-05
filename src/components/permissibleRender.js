import { Component } from 'react';
import PropTypes from 'prop-types';
import intersection from 'lodash.intersection';
import difference from 'lodash.difference';

export function checkPermissions({ userPermissions, requiredPermissions, oneperm }) {
  if (oneperm) {
    return Boolean(intersection(userPermissions, requiredPermissions).length);
  }

  return difference(requiredPermissions, userPermissions).length === 0;
}

export class PermissibleRender extends Component {
  static propTypes = {
    oneperm: PropTypes.bool,
    userPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    requiredPermissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    children: PropTypes.element.isRequired,
    renderOtherwise: PropTypes.element,
  };

  checkPermissions() {
    const { userPermissions, requiredPermissions, oneperm } = this.props;

    return checkPermissions({ userPermissions, requiredPermissions, oneperm });
  }

  render() {
    const { children, userPermissions, requiredPermissions, renderOtherwise } = this.props;

    if (!children || !userPermissions || !requiredPermissions) {
      return null;
    }

    if (this.checkPermissions()) {
      return children;
    } else if (renderOtherwise) {
      return renderOtherwise;
    }
    return null;
  }
}
