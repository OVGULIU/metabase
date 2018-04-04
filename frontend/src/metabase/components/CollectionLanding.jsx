import React from "react";
import { Box, Flex, Heading, Subhead } from "rebass";
import { Link } from "react-router";

import Icon from "metabase/components/Icon";
import CollectionListLoader from "metabase/components/CollectionListLoader";
import EntityMenu from 'metabase/components/EntityMenu'

import SegmentList from 'metabase/components/SegmentList'
import MetricList from 'metabase/components/MetricList'

import LandingNav from "metabase/components/LandingNav";

const CollectionList = ({ collectionSlug }) => {
  return (
    <Box>
      <CollectionListLoader>
        {({ collections, loading, error }) => {
          if (loading) {
            return <Box>Loading...</Box>;
          }
          let collectionList = collections
          if(collectionSlug) {
            collectionList.reverse()
          }
          return (
            <Flex>
              {collections.map(collection => (
                <Box w={1/4}>
                  <Flex align="center" my={1} px={1} py={2} key={`collection-${collection.id}`} className="bordered rounded shadowed">
                    <Icon name="all" className="mr1" />
                    <Link to={`collections/${collection.slug}`}>
                      {collection.name}
                    </Link>
                  </Flex>
                </Box>
              ))}
            </Flex>
          );
        }}
      </CollectionListLoader>
    </Box>
  );
};

const DefaultLanding = () => {
  return (
    <Box w="100%">
      <MetricList />
      <SegmentList />
    </Box>
  );
};

class CollectionLanding extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <Box>
        <Box className="wrapper lg-wrapper--trim">
          <Flex py={3}>
            {/* TODO - this should be the collection or instance name */}
            <Subhead>
              <Flex align='center'>
                <Flex>
                  <Link to='/'>Metabase, Inc</Link>
                </Flex>
                { this.props.params.collectionSlug && (
                  <Flex align='center'>
                    <Icon name='chevronright' className="ml2 mr2" />
                    <Flex>
                      <Link to={`/collections/${this.props.params.collectionSlug}`}>
                        {this.props.params.collectionSlug }
                      </Link>
                    </Flex>
                  </Flex>
                )}
              </Flex>
            </Subhead>

            <Box ml='auto'>
              <EntityMenu
                items={[
                  {
                    action: function noRefCheck() {},
                    icon: 'editdocument',
                    title: 'Edit this question'
                  },
                  {
                    icon: 'history',
                    link: '/derp',
                    title: 'View revision history'
                  },
                  {
                    action: function noRefCheck() {},
                    icon: 'move',
                    title: 'Move'
                  },
                  {
                    action: function noRefCheck() {},
                    icon: 'archive',
                    title: 'Archive'
                  }
                ]}
                triggerIcon="pencil"
              />
            </Box>
          </Flex>
        </Box>
        <Box className="relative">
          <LandingNav collectionSlug={this.props.params.collectionSlug} />
          <Box className="wrapper lg-wrapper--trim">
            <CollectionList collectionSlug={this.props.params.collectionSlug} />
            {children ? children : <DefaultLanding />}
          </Box>
        </Box>
      </Box>
    );
  }
}

export default CollectionLanding;
