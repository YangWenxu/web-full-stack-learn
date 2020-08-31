import 'package:flutter/material.dart';
import 'dart:async';

import 'package:flutter_boss/home.dart';

class SplashPage extends StatefulWidget {
  @override
  SplashPageState createState() => new SplashPageState();
}

class SplashPageState extends State<SplashPage> {

  Timer _t;

  @override
  void initState() {
    super.initState();

    _t = new Timer(const Duration(milliseconds: 1500), (){
      // print('timerAction');
      try{
        Navigator.of(context).pushAndRemoveUntil(new MaterialPageRoute(
        builder: (BuildContext context)=> new BossApp()),(
        Route route) => route == null);
      }catch(error){
        print('$error');
      }
    });
  }

  @override
  void dispose() {
    _t.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return new Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: new Padding(
        padding: const EdgeInsets.only(top: 180.0),
        child: new Column(
          children: <Widget>[
            new Text(
              'BOSS直聘',
              style: TextStyle(
                fontSize: 50.0,
                fontWeight: FontWeight.bold,
                color: Colors.white
              ),),
          ],
        ),
      ),
    );
  }
}