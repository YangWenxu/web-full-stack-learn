import 'package:flutter/material.dart';

class MineMain extends StatefulWidget {
  @override
  MineMainState createState() => new MineMainState();
}

class MineMainState extends State<MineMain> {

  @override
  Widget build(BuildContext context) {
    return new Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: new Padding(
        padding: const EdgeInsets.only(top: 180.0),
        child: new Column(
          children: <Widget>[
            new Text(
              '个人页面',
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