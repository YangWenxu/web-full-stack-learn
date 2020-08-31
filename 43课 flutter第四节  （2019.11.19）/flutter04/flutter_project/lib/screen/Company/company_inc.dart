import 'package:flutter/material.dart';

class CompanyInc extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    
    return new Padding(
      padding: const EdgeInsets.only(
        top: 10.0,
        left: 10.0,
        right: 10.0,
        bottom: 10.0
      ),
      child: new Row(
        children: <Widget>[
          RichText(
            text: new TextSpan(
              text: '敬请期待公司概况',
              style: TextStyle(
                fontSize: 16.0,
                color: Colors.black
              )
            ),
          )
        ],
      ),
    );
  }
}