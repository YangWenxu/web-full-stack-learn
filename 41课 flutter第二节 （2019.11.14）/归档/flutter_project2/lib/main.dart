import 'package:flutter/material.dart';
import 'package:flutter_project2/test.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text('首页'),
          // leading: Text('leading'),
          // actions: <Widget>[
          //   Text('actions1'),
          //   Text('actions2')
          // ],
          centerTitle: true,
        ),
        body: Center(
          child: Text('THIS IS BODY'),
        ),
        bottomNavigationBar: BottomNavigationBar(
          items: [
            new BottomNavigationBarItem(
              icon: Icon(Icons.access_alarm), title: Text('闹钟')
            ),
            new BottomNavigationBarItem(
              icon: Icon(Icons.access_alarm), title: Text('闹钟')
            ),
            new BottomNavigationBarItem(
              icon: Icon(Icons.access_alarm), title: Text('闹钟')
            ),
          ]
        ),
        drawer: Drawer(
          // elevation: 0
          child: Center(
            // child: Text('drawer'),//Navigator.pop(context);
            child: WelcomePage(),
          ),
        ),
      )
    );
  }
}

