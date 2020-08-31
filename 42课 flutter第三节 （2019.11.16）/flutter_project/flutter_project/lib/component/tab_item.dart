import 'package:flutter/material.dart';

class IconTab extends StatefulWidget {

  final String text;
  final String icon;
  final Color color;

  IconTab({
    this.text,
    this.icon,
    this.color,
  });

  // @override
  // _IconTabState createState() => new _IconTabState();

  @override
  State<StatefulWidget> createState() {
    return _IconTabState();
  }

}

class _IconTabState extends State<IconTab> {

  @override
  Widget build(BuildContext context) {

      Widget icon = new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: <Widget>[
            new Container(
              child: new Image(
                image: AssetImage(widget.icon),
                height: 30.0,
                width: 30.0,
              ),
              margin: EdgeInsets.only(bottom: 3.0),
            ),
            Text(
              widget.text,
              softWrap: false,
              style: TextStyle(color: widget.color),
            )
          ],
        );

    return SafeArea(
      child: SizedBox(
        height: 53.0,
        child: icon,
      )
    );
  }

}