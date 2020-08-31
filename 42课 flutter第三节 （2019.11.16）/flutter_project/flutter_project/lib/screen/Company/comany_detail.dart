import 'package:flutter/material.dart';
import 'package:flutter_project/component/DotsIndicator.dart';
import 'package:flutter_project/model/companylist_item.dart';
import 'package:flutter_project/screen/Company/company_hot_job.dart';
import 'package:flutter_project/screen/Company/company_inc.dart';
import 'package:flutter_project/screen/Company/company_info.dart';

const _kAppImageHeight = 256.0;

class CompanyDetail extends StatefulWidget {
  
  final Company _company;

  CompanyDetail(this._company);

  @override
  _CompanyDetailState createState() => _CompanyDetailState();
}

class _CompanyDetailState extends State<CompanyDetail> with TickerProviderStateMixin {

  List<String> _urls = [
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20170725/861159df793857d6cb984b52db4d4c9c.jpg',
    'https://img2.bosszhipin.com/mcs/chatphoto/20151215/a79ac724c2da2a66575dab35384d2d75532b24d64bc38c29402b4a6629fcefd6_s.jpg',
    'https://img.bosszhipin.com/beijin/mcs/chatphoto/20180207/c15c2fc01c7407b98faf4002e682676b.jpg'
  ];

  List<Widget> _imagePages = <Widget>[];

  Widget _companyTabContent;

  List<Tab> _tabs;
  TabController _controller;
  VoidCallback onChanged;
  int currentIndex;


  @override
  void initState() {
    super.initState();

    _urls.forEach((String url) {
      _imagePages.add(
        new Container(
          color: Colors.black.withAlpha(900),
          child: new ConstrainedBox(
            constraints: BoxConstraints.expand(),
            child: new Image.network(
              url,
              fit: BoxFit.cover,
              height: _kAppImageHeight,
            ),
          ),
        )
      );
    });

    _tabs = [
      new Tab(text: '公司概况'),
      new Tab(text: '热招职位'),
    ];
    _controller = new TabController(length: _tabs.length, vsync: this);
    _companyTabContent = CompanyInc();
    onChanged = () {
      setState(() {

        if(currentIndex == 0) {
          _companyTabContent = CompanyInc();
        }else {
          _companyTabContent = CompanyHotJob();
        }

        currentIndex = this._controller.index;
      });
    };
    _controller.addListener(onChanged);

  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      backgroundColor: Color.fromARGB(255, 242, 242, 245),
      body: new Stack(
        children: <Widget>[
          SingleChildScrollView(
            child: Column(
              children: <Widget>[
                SizedBox.fromSize(
                  size: Size.fromHeight(_kAppImageHeight),
                  child: IndicatorViewPager(pages: _imagePages),
                ),
                Container(
                  color: Colors.white,
                  child: Column(
                    children: <Widget>[
                      new CompanyInfo(widget._company),

                      Divider(),

                      new TabBar(
                        tabs: _tabs,
                        indicatorWeight: 3.0, //设置选中下划线的高度
                        indicatorSize: TabBarIndicatorSize.tab, //设置选中下划线的宽度
                        labelStyle: new TextStyle(fontSize: 16.0),
                        // indicatorColor: Colors.red,
                        controller: _controller,
                      )
                    ],
                  ),
                ),
                _companyTabContent
              ],
            ),
          ),

          //back
          new Positioned(
            top: 25,
            left: 5,
            child: new BackButton(color: Colors.white),
          )
        ],
      ),
    );
  }
}