const integrations = `
  query integrations($channelId: String, $perPage: Int) {
    integrations(channelId: $channelId, perPage: $perPage) {
      _id
      name
      kind
      channels {
        _id
        name
      }
    }
  }
`;

const channelDetail = `
  query channelDetail($_id: String!) {
    channelDetail(_id: $_id) {
      _id
      name
      integrationIds
      memberIds
    }
  }
`;

const channels = `
  query channels($page: Int, $perPage: Int, $memberIds: [String]) {
    channels(page: $page, perPage: $perPage, memberIds: $memberIds) {
      _id
      name
      description
      integrationIds
      memberIds
    }
  }
`;

const users = `
  query users {
    users {
      _id
      details {
        avatar
        fullName
      }
    }
  }
`;

const channelsCount = `
  query totalChannelsCount {
    channelsTotalCount
  }
`;

const integrationsCount = `
  query totalIntegrationsCount {
    integrationsTotalCount
  }
`;

export default {
  users,
  channels,
  integrations,
  channelDetail,
  channelsCount,
  integrationsCount
};
