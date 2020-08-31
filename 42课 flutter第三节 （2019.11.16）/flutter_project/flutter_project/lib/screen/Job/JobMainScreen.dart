import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class JobMainScreen extends StatefulWidget {
  @override
  _JobMainScreenState createState() => new _JobMainScreenState();
}

class _JobMainScreenState extends State<JobMainScreen> {

  @override
  Widget build(BuildContext context) {
    return Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: Center(
        child: new Text(
          '工作',
          style: TextStyle(
            fontSize: 50.0,
            fontWeight: FontWeight.bold,
            color: Colors.white
          ),),
      ),
    );
  }

}
