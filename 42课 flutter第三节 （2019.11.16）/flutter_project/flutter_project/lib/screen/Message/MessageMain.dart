import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class MessageMain extends StatefulWidget {
  @override
  _MessageMainState createState() => new _MessageMainState();
}

class _MessageMainState extends State<MessageMain> {

  @override
  Widget build(BuildContext context) {
    return Material(
      color: new Color.fromARGB(255, 0, 215, 198),
      child: Center(
        child: new Text(
          '消息',
          style: TextStyle(
            fontSize: 50.0,
            fontWeight: FontWeight.bold,
            color: Colors.white
          ),),
      ),
    );
  }

}
