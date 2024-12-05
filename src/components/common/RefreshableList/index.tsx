import React from 'react';
import {FlatList, RefreshControl, ViewStyle} from 'react-native';
import {styles} from './styles';

interface RefreshableListProps<T> {
  data: T[];
  renderItem: (item: T) => React.ReactElement;
  isLoading: boolean;
  onRefresh: () => void;
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement | null;
  contentContainerStyle?: ViewStyle;
  keyExtractor?: (item: T, index: number) => string;
}

const RefreshableList = <T extends {}>({
  data,
  renderItem,
  isLoading,
  onRefresh,
  ListHeaderComponent,
  contentContainerStyle,
  keyExtractor = (_, index) => index.toString(),
}: RefreshableListProps<T>) => (
  <FlatList
    data={data}
    keyExtractor={keyExtractor}
    renderItem={({item}) => renderItem(item)}
    ListHeaderComponent={ListHeaderComponent}
    contentContainerStyle={[styles.container, contentContainerStyle]}
    refreshControl={
      <RefreshControl testID="refreshable-list-control" refreshing={isLoading} onRefresh={onRefresh} />
    }
    testID="refreshable-list"
  />
);

export default RefreshableList; 