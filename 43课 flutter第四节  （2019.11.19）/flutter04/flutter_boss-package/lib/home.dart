import 'package:flutter/material.dart';
import 'app/component/icon_tab.dart';
import 'app/screen/Company/CompanyMain.dart';
import 'app/screen/Job/JobMainScreen.dart';
import 'app/screen/Message/MessageMain.dart';
import 'app/screen/Mine/MineMain.dart';

class BossApp extends StatefulWidget {
  @override
  HomeState createState() => new HomeState();
}

const int INDEX_JOB = 0;
const int INDEX_COMPANY = 1;
const int INDEX_MESSAGE = 2;
const int INDEX_MINE = 3;
Color _kPrimaryColor = new Color.fromARGB(255, 0, 215, 198);

class HomeState extends State<BossApp> with SingleTickerProviderStateMixin {

  int _currentIndex = 0;
  TabController _controller;
  VoidCallback onChanged;


  @override
  void initState() {
    super.initState();

    //初始化
    _controller = new TabController(initialIndex: _currentIndex, length: 4, vsync: this);
    //设置监听并且实现监听后执行的方法
    onChanged = (){
      setState(() {
        _currentIndex = this._controller.index;
      });
    };
    _controller.addListener(onChanged);
  }

  @override
  void dispose() {
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: TabBarView(
        children: <Widget>[
          JobMainScreen(),
          CompanyMain(),
          MessageMain(),
          MineMain()
        ],
        controller: _controller,
        physics: NeverScrollableScrollPhysics(),  //是否可以滚动
      ),
      bottomNavigationBar: new Material(
        color: Colors.white,
        child: new TabBar(
          controller: _controller,
          indicatorSize: TabBarIndicatorSize.label,
          labelStyle: new TextStyle(fontSize: 11.0),
          tabs: <Widget>[
            new IconTab(
              icon: _currentIndex == INDEX_JOB
              ? 'assets/images/ic_main_tab_find_nor.png'
              : 'assets/images/ic_main_tab_find_pre.png',
              text: '职位',
              color: _currentIndex == INDEX_JOB ? Colors.grey[998] : _kPrimaryColor
            ),
            new IconTab(
              icon: _currentIndex == INDEX_COMPANY
              ? 'assets/images/ic_main_tab_company_nor.png'
              : 'assets/images/ic_main_tab_company_pre.png',
              text: '公司',
              color: _currentIndex == INDEX_COMPANY ? Colors.grey[998] : _kPrimaryColor
            ),
            new IconTab(
              icon: _currentIndex == INDEX_MESSAGE
              ? 'assets/images/ic_main_tab_contacts_nor.png'
              : 'assets/images/ic_main_tab_contacts_pre.png',
              text: '消息',
              color: _currentIndex == INDEX_MESSAGE ? Colors.grey[998] : _kPrimaryColor
            ),
            new IconTab(
              icon: _currentIndex == INDEX_MINE
              ? 'assets/images/ic_main_tab_my_nor.png'
              : 'assets/images/ic_main_tab_my_pre.png',
              text: '我的',
              color: _currentIndex == INDEX_MINE ? Colors.grey[998] : _kPrimaryColor
            )
          ],
        ),
      ),
    );
  }
}