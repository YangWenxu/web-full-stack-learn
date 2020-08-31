import 'package:flutter/material.dart';

const double _kTextAndIconTabHeight = 53.0;
const double _kMarginBottom = 3.0;

class IconTab extends StatefulWidget {

  //构造器
  IconTab({
    Key key,
    this.text,
    this.icon,
    this.color
  });

  //属性
  final String text;
  final String icon;
  final Color color;

  // @override
  // IconTabState createState() => new IconTabState();
  //等价
  @override
  State<StatefulWidget> createState() {
    return new IconTabState();
  }

}

class IconTabState extends State<IconTab> {

  Widget _buildLabelText() {
    return Text(
      widget.text,
      softWrap: false,
      style: TextStyle(
        color: widget.color,
      )
    );
  }

  @override
  Widget build(BuildContext context) {

    double height = _kTextAndIconTabHeight;
    Widget label = new Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.center,
      children: <Widget>[
        new Container(
          child: new Image(
            image: new AssetImage(widget.icon),
            height: 30.0,
            width: 30.0,
          ),
          margin: const EdgeInsets.only(bottom: _kMarginBottom),
        ),
        _buildLabelText(),
      ],
    );

    return new SizedBox(
      height: height,
      child: Center(
        child: label
      )
    );
  }
}

