import {
  ActionButtons,
  Button,
  Label,
  Table,
  Tip
} from 'modules/common/components';
import { __ } from 'modules/common/utils';
import { Wrapper } from 'modules/layout/components';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { ISegment } from '../types';

type Props = {
  contentType?: string;
  segments: ISegment[];
  removeSegment: (_id: string) => void;
};

class SegmentsList extends React.Component<Props> {
  renderActionButtons(segment) {
    const { contentType, removeSegment } = this.props;

    return (
      <ActionButtons>
        <Tip text={__('Edit')}>
          <Link to={`/segments/edit/${contentType}/${segment._id}`}>
            <Button btnStyle="link" icon="edit" />
          </Link>
        </Tip>
        <Tip text={__('Delete')}>
          <Button
            btnStyle="link"
            onClick={() => {
              removeSegment(segment._id);
            }}
            icon="cancel-1"
          />
        </Tip>
      </ActionButtons>
    );
  }

  renderContent() {
    const { segments } = this.props;

    const parentSegments: ISegment[] = [];

    segments.forEach(segment => {
      if (!segment.subOf) {
        parentSegments.push(segment, ...segment.getSubSegments);
      }
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>{__('Name')}</th>
            <th>{__('Description')}</th>
            <th>{__('Color')}</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {parentSegments.map(segment => (
            <tr key={segment._id}>
              <td>
                {segment.subOf ? '\u00a0\u00a0' : null} {segment.name}
              </td>
              <td>{segment.description}</td>
              <td>
                <Label style={{ backgroundColor: segment.color }}>
                  {segment.color}
                </Label>
              </td>
              <td>{this.renderActionButtons(segment)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  render() {
    const { contentType } = this.props;

    const actionBarRight = (
      <Link to={`/segments/new/${contentType}`}>
        <Button btnStyle="success" size="small" icon="add">
          New segment
        </Button>
      </Link>
    );

    const actionBar = <Wrapper.ActionBar right={actionBarRight} />;

    return (
      <Wrapper
        header={<Wrapper.Header breadcrumb={[{ title: __('Segments') }]} />}
        actionBar={actionBar}
        content={this.renderContent()}
      />
    );
  }
}

export default SegmentsList;
