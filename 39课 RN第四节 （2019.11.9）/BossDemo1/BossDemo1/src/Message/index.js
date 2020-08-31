import React, { Component } from 'react';
import { 
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
    RefreshControl
 } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {APIS, APP} from '../constants/API';
import {fetchGet} from '../util/httpTool';
import {connect} from 'react-redux';
import {setMessageList, updateMessageList} from './action';

const wWidth = Dimensions.get('window').width;

class Message extends Component {

    static navigationOptions = {
        title: '消息',
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            // messageList: [],
            isRefresh: false,
            // page: 1,
            showFoot: 0, // 控制foot， 0：隐藏footer  1：已加载完成,没有更多数据   2 ：显示加载中
        };


    }

    componentDidMount() {
        const {page} = this.props;
        this.fetchMessage(page);
    }

    //http://m.app.haosou.com/index/getData?type=1&page=1
    fetchMessage = (curPage) => {
        const requestParam = {
            ...APP,
            page: curPage
        };
        fetchGet({
            serviceType: APIS.ServiceInit,
            params: requestParam,
            success: response => {
                if(curPage === 1) {

                    const {setMessageList} = this.props;
                    setMessageList({
                        list: response.list,
                        page: curPage
                    });

                    this.setState({
                        isLoading: false,
                        // messageList: response.list,
                        isRefesh: false,
                        // page: curPage
                    });

                }else {
                
                    const {updateMessageList} = this.props;

                    updateMessageList({
                        page: curPage,
                        list: this.props.messageList.concat(response.list)
                    });

                    this.setState({
                        isLoading: false,
                        // page: curPage,
                        showFoot: 0,
                        // messageList: this.state.messageList.concat(response.list)
                    });
                }
            },
            error: error => {
                console.log(error);
            }
        });
    }

    _renderItem = ({item, index, separators}) => {
        return (
          <TouchableHighlight
            style={styles.itemContent}>
            <View>
              <View style={styles.pNameContent}>
                <ImageBackground
                  style={styles.pImage}
                  source={{uri: item.logo_url}}
                />
                <Text
                  style={styles.pName}
                  numberOfLines={1}
                  ellipsizeMode="tail">{`${item.name}`}</Text>
                <Text style={styles.pSalary}>{`|${item.single_word}\n|${
                  item.tag
                }\n|${item.download_times_fixed}`}</Text>
              </View>
              <View style={styles.pLine} />
              <Text style={styles.pHr}>{`${item.single_word}`}</Text>
            </View>
          </TouchableHighlight>
        );
      };
    
    _keyExtractor = (item, index) => `default_${item.name}_${index}`;

    _renderListEmptyComponent = () => {
    return (
        <View style={styles.emptyContent}>
        <Text style={{fontSize: 16}}>暂无数据下拉刷新</Text>
        </View>
    );
    };

    render() {
        const {isLoading} = this.state;
        const {messageList} = this.props;
        return (
            <View style={styles.container}>
            {isLoading ? (
            <ActivityIndicator animating={true} color="blue" size="large" />
            ) : (
            <FlatList
                style={styles.contentList}
                data={messageList}
                renderItem={this._renderItem}
                keyExtractor={this._keyExtractor}
                ItemSeparatorComponent={({highlighted}) => (
                <View style={styles.separator} />
                )}
                ListEmptyComponent={this._renderListEmptyComponent}

                ListFooterComponent={this._renderFooter}
                refreshControl={
                    <RefreshControl 
                    title='loading...'
                    refreshing={this.state.isRefesh}
                    tintColor= 'red'
                    titleColor= 'red'
                    onRefresh={()=>{
                    this._onRefeshData();
                    }}/>
                }

                onEndReached={this._onEndReached}
                onEndReachedThreshold={0.1}
            />
            )}
        </View>
        );
    }

    _onRefeshData = () => {
        this.setState({isRefesh: true});
        this.fetchMessage(1);
    }

    _onEndReached = () => {

        const {showFoot} = this.state;
        if(showFoot != 0) {
            return;
        }

        this.setState({showFoot: 2});

        // const { page } = this.state;
        const { page } = this.props;
        this.fetchMessage(page+1);
    }

    /** 上拉展示Footer */
    _renderFooter = () => {
        const { showFoot } = this.state;

        if (showFoot === 1) {
        // 无数据
        return (
            <View style={styles.footer}>
            <Text style={styles.footerText}>没有更多数据了</Text>
            </View>
        );
        } else if (showFoot === 2) {
        // 正在加载
        return (
            <View style={styles.footer}>
            <ActivityIndicator />
            <Text style={styles.footerText}>正在加载更多数据...</Text>
            </View>
        );
        } else if (showFoot === 0) {
            // 空View
            return <View style={styles.footer} />;
        }
    };
}

const MessageScreen = connect(
    state => ({
        page: state.messageList.page,
        messageList: state.messageList.list
    }),
    {setMessageList, updateMessageList},
)(Message);


const MessageStackNavigator = createStackNavigator(
    {
        Message:{
            screen: MessageScreen
        }
    },
    {
        defaultNavigationOptions: {
            headerTitleStyle: { color: 'white' },
            headerStyle: { backgroundColor: 'rgb(29,216,200)' },
        }
    }
)

export default MessageStackNavigator;

const ITEM_HEIGHT = 130;
const SEPERATOR_HEIGHT = StyleSheet.hairlineWidth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContent: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentList: {
    width: wWidth,
    flex: 1,
    backgroundColor: 'rgb(241,242,246)',
  },
  separator: {
    height: 5,
    alignSelf: 'stretch',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'column',
    height: ITEM_HEIGHT,
    backgroundColor: 'white',
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  pImage: {
    width: 40,
    height: 40,
  },
  pNameContent: {
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
  },
  pName: {
    fontSize: 12,
    width: 100,
  },
  pSalary: {
    textAlignVertical: 'center',
    fontSize: 16,
    color: 'grey',
  },
  pLine: {
    marginTop: 10,
    height: SEPERATOR_HEIGHT,
    backgroundColor: '#e0e0e0',
  },
  pHr: {
    marginTop: 10,
    height: 20,
    fontSize: 12,
    color: 'rgb(29,216,200)',
  },
  footer: {
    flexDirection: 'row',
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  footerText: {
    color: '#999999',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 5,
  },
});
