import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: CustomListView(),
    );
  }
}

class CustomListView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Center(
      child: getListView3(),
    );
  }

  //方式一：使用简单，适用于小量切相对固定的数据
  // getListView1() {
  //   return new ListView(
  //     padding: EdgeInsets.all(10),
  //     children: <Widget>[
  //       Text('data1'),
  //       Text('data2'),
  //       Text('data3'),
  //       Text('data4'),
  //       Text('data1'),
  //       Text('data2'),
  //       Text('data3'),
  //       Text('data4'),
  //       Text('data1'),
  //       Text('data2'),
  //       Text('data3'),
  //       Text('data4'),
  //     ],
  //   );
  // }

  //方式二：
  // getListView2() {
  //   return ListView.builder(
  //     itemCount: 20,
  //     itemBuilder: (BuildContext context, int index) {
  //       return Text('$index');

  //       // return ListTile(
  //       //   // leading: Text('leading'),
  //       //   title: Text('title$index'),
  //       //   subtitle: Text('subTitle$index')
  //       // );
  //     },
  //   );
  // }

  //方式三：分割线
  getListView3() {

    _loadData();

    return ListView.separated(
      itemCount: 20,
      itemBuilder: (BuildContext context, int index) {
        return Text('$index');
      },
      separatorBuilder: (BuildContext context, int index) {
        return Divider(
          color: Colors.red,
          // height: 100,
        );
      },
    );
  }

  //(1)创建httpClient
  var httpClient = new HttpClient();
  var url = 'https://randomuser.me/api/?results=30';

  _loadData() async{

    //（1）打开http连接，设置请求头
    // httpClient.get(host, port, path)
    var request = await httpClient.getUrl(Uri.parse(url));
    // request.headers.add(name, value)

    // (3)等待服务链接
    var response = await request.close();
    var result = await response.transform(utf8.decoder).join();

    print(result);

    //请求结束，关闭httpClient
    httpClient.close();

  }
  
}