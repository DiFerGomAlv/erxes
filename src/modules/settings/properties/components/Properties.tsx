import {
  Button,
  DropdownToggle,
  EmptyState,
  Icon,
  ModalTrigger
} from 'modules/common/components';
import { __ } from 'modules/common/utils';
import { Wrapper } from 'modules/layout/components';
import * as React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';
import { PropertyForm, PropertyGroupForm } from '../containers';
import { PropertyList } from '../styles';
import { IFieldGroup } from '../types';
import { PropertyRow, Sidebar } from './';

type Props = {
  queryParams: any;
  refetch?: () => void;
  fieldsGroups: IFieldGroup[];
  currentType: string;
  removePropertyGroup: (data: { _id: string }) => any;
  removeProperty: (data: { _id: string }) => void;
  updatePropertyVisible: (data: { _id: string; isVisible: boolean }) => void;
  updatePropertyGroupVisible: (
    data: { _id: string; isVisible: boolean }
  ) => void;
};

class Properties extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.renderProperties = this.renderProperties.bind(this);
    this.renderActionBar = this.renderActionBar.bind(this);
  }

  renderProperties() {
    const {
      fieldsGroups,
      queryParams,
      removePropertyGroup,
      removeProperty,
      updatePropertyVisible
    } = this.props;

    if (fieldsGroups.length === 0) {
      return (
        <EmptyState
          icon="circular"
          text="There arent't any groups and fields"
        />
      );
    }

    return (
      <PropertyList>
        {fieldsGroups.map(group => {
          return (
            <PropertyRow
              key={group._id}
              group={group}
              queryParams={queryParams}
              removePropertyGroup={removePropertyGroup}
              removeProperty={removeProperty}
              updatePropertyVisible={updatePropertyVisible}
            />
          );
        })}
      </PropertyList>
    );
  }

  renderActionBar() {
    const { queryParams, fieldsGroups } = this.props;

    const addGroup = <MenuItem>{__('Add group')}</MenuItem>;
    const addField = <MenuItem>{__('Add Property')}</MenuItem>;

    return (
      <Dropdown id="dropdown-knowledgebase" className="quick-button" pullRight>
        <DropdownToggle bsRole="toggle">
          <Button btnStyle="success" size="small" icon="add">
            {__('Add Group & Field ')} <Icon icon="downarrow" />
          </Button>
        </DropdownToggle>
        <Dropdown.Menu>
          <ModalTrigger
            title="Add Group"
            trigger={addGroup}
            content={props => (
              <PropertyGroupForm {...props} queryParams={queryParams} />
            )}
          />
          <ModalTrigger
            title="Add Property"
            trigger={addField}
            content={modalProps => {
              if (fieldsGroups.length === 0) {
                return <div>{__('Please add property Group first')}!</div>;
              }

              return (
                <PropertyForm
                  {...modalProps}
                  {...this.props}
                  queryParams={queryParams}
                />
              );
            }}
          />
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  render() {
    const { currentType } = this.props;

    const breadcrumb = [
      { title: __('Settings'), link: '/settings' },
      { title: __('Properties'), link: '/settings/properties' },
      { title: __(currentType) }
    ];

    return (
      <Wrapper
        actionBar={<Wrapper.ActionBar right={this.renderActionBar()} />}
        header={<Wrapper.Header breadcrumb={breadcrumb} />}
        leftSidebar={<Sidebar title="Properties" currentType={currentType} />}
        content={this.renderProperties()}
      />
    );
  }
}

export default Properties;
