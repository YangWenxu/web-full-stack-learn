
import 'package:flutter/material.dart';
import 'package:flutter_project/component/tab_item.dart';
import 'package:flutter_project/screen/Company/CompanyScreen.dart';
import 'package:flutter_project/screen/Job/JobMainScreen.dart';
import 'package:flutter_project/screen/Message/MessageMain.dart';
import 'package:flutter_project/screen/Mine/MineMain.dart';

class BOSSApp extends StatefulWidget {
  @override
  _BOSSAppState createState() => new _BOSSAppState();
}

class _BOSSAppState extends State<BOSSApp> with SingleTickerProviderStateMixin {

  TabController _controller;
  int _currentIndex = 0;
  VoidCallback onChanged;

  @override
  void initState() {
    super.initState();

    _controller = new TabController(initialIndex:_currentIndex, length: 4, vsync: this);
    onChanged = () {
      setState(() {
        _currentIndex = this._controller.index;
      });
    };
    _controller.addListener(onChanged);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: TabBarView(
        children: <Widget>[
          JobMainScreen(),
          CompanyScreen(),
          MessageMain(),
          MineMain()
        ],
        physics: NeverScrollableScrollPhysics(),
        controller: _controller,
      ),
      bottomNavigationBar: new Material(
        color: Colors.white,
        child: TabBar(
          controller: _controller,
          labelStyle: TextStyle(fontSize: 11),
          tabs: <Widget> [
            new IconTab(
              icon: _currentIndex == 0 
              ? 'assets/images/ic_main_tab_find_pre.png'
              : 'assets/images/ic_main_tab_find_nor.png',
              text: '职位',
              color: _currentIndex == 0 ? Theme.of(context).primaryColor: Colors.grey,
            ),
            new IconTab(
              icon: _currentIndex == 1 
              ? 'assets/images/ic_main_tab_company_pre.png'
              : 'assets/images/ic_main_tab_company_nor.png',
              text: '公司',
              color: _currentIndex == 1 ? Theme.of(context).primaryColor: Colors.grey,
            ),
            new IconTab(
              icon: _currentIndex == 2
              ? 'assets/images/ic_main_tab_contacts_pre.png'
              : 'assets/images/ic_main_tab_contacts_nor.png',
              text: '消息',
              color: _currentIndex == 2 ? Theme.of(context).primaryColor: Colors.grey,
            ),
            new IconTab(
              icon: _currentIndex == 3 
              ? 'assets/images/ic_main_tab_my_pre.png'
              : 'assets/images/ic_main_tab_my_nor.png',
              text: '个人',
              color: _currentIndex == 3 ? Theme.of(context).primaryColor: Colors.grey,
            )
          ]
        ),
      ),
    );
  }
}