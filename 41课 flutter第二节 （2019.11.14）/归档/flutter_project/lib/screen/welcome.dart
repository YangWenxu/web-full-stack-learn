import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_project/home.dart';

class WelcomePage extends StatefulWidget {
  @override
  _WelcomePageState createState() => new _WelcomePageState();
}

class _WelcomePageState extends State<WelcomePage> {

  Timer _t;
  @override
  void initState() {
    super.initState();

    _t = new Timer(Duration(milliseconds: 2000), (){
      Navigator.of(context).pushAndRemoveUntil(new MaterialPageRoute(
        builder: (BuildContext context) => new BOSSApp()
      ), (Route route) => route == null);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: Center(
        child: new Text(
          'BOSS直聘',
          style: TextStyle(
            fontSize: 50.0,
            fontWeight: FontWeight.bold,
            color: Colors.white
          ),),
      ),
    );
  }

  @override
  void dispose() {
    _t.cancel();
    super.dispose();
  }

}
