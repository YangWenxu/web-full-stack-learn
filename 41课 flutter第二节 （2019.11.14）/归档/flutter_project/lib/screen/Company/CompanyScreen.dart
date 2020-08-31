import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class CompanyScreen extends StatefulWidget {
  @override
  _CompanyScreenState createState() => new _CompanyScreenState();
}

class _CompanyScreenState extends State<CompanyScreen> {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: new AppBar(
        elevation: 0,
        title: Text(
          '公司',
          style: TextStyle(fontSize: 20.0, color: Colors.white),
          ),
      ),
      body: Center(
        child: Text('data'),
      ),
    );
  }

}
