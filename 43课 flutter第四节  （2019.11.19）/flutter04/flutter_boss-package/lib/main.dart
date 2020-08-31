import 'package:flutter/material.dart';
import 'package:flutter_boss/splash.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BOSS直聘',
      //设置主题
      theme: ThemeData(
        primaryIconTheme: const IconThemeData(color: Colors.white),
        primaryColor: new Color.fromARGB(255, 0, 215, 198),
        accentColor: Colors.cyan[300]
      ),
      home: SplashPage(),
    );
  }
}