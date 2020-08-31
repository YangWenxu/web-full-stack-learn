import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class MineMain extends StatefulWidget {
  @override
  _MineMainState createState() => new _MineMainState();
}

class _MineMainState extends State<MineMain> {

  @override
  Widget build(BuildContext context) {
    return Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: Center(
        child: new Text(
          '个人',
          style: TextStyle(
            fontSize: 50.0,
            fontWeight: FontWeight.bold,
            color: Colors.white
          ),),
      ),
    );
  }

}
