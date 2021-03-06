import { DataWithLoader } from 'modules/common/components';
import { IRouterProps } from 'modules/common/types';
import { __, router } from 'modules/common/utils';
import { Wrapper } from 'modules/layout/components';
import { SidebarCounter, SidebarList } from 'modules/layout/styles';
import { KIND_CHOICES } from 'modules/settings/integrations/constants';
import * as React from 'react';
import { withRouter } from 'react-router';

interface IProps extends IRouterProps {
  counts: { [key: string]: number };
}

function IntegrationFilter({ history, counts }: IProps) {
  const { Section, Header } = Wrapper.Sidebar;

  const data = (
    <SidebarList>
      {KIND_CHOICES.ALL_LIST.map((kind, index) => (
        <li key={index}>
          <a
            tabIndex={0}
            className={
              router.getParam(history, 'integrationType') === kind
                ? 'active'
                : ''
            }
            onClick={() => {
              router.setParams(history, { integrationType: kind });
            }}
          >
            {kind}
            <SidebarCounter>{counts[kind]}</SidebarCounter>
          </a>
        </li>
      ))}
    </SidebarList>
  );

  return (
    <Section>
      <Header uppercase>{__('Filter by integrations')}</Header>

      <DataWithLoader
        data={data}
        loading={false}
        count={KIND_CHOICES.ALL_LIST.length}
        emptyText="No integrations"
        emptyIcon="pie-graph"
        size="small"
        objective={true}
      />
    </Section>
  );
}

export default withRouter<IProps>(IntegrationFilter);
